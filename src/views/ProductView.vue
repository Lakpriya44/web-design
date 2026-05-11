<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import axios from 'axios'
import { useCartStore } from '@/stores/cart'
import type { Product } from '@/services/api'

const props = defineProps<{ id: string }>()
const cart = useCartStore()
const router = useRouter()

const product = ref<Product | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)
const selectedImage = ref(0)
const quantity = ref(1)

onMounted(async () => {
  try {
    const res = await axios.get<Product>(`https://dummyjson.com/products/${props.id}`)
    product.value = res.data
  } catch (err: unknown) {
    error.value = axios.isAxiosError(err) ? (err.message ?? 'Failed to load') : 'Unknown error'
  } finally {
    loading.value = false
  }
})

function addToCart(): void {
  if (!product.value) return
  for (let i = 0; i < quantity.value; i++) {
    cart.addItem(product.value)
  }
}

function goBack(): void {
  router.back()
}
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Back button -->
    <button @click="goBack" class="flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-brand-600 dark:hover:text-orange-400 transition-colors mb-6">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
      </svg>
      Back to shop
    </button>

    <!-- Loading -->
    <div v-if="loading" class="grid md:grid-cols-2 gap-12 animate-pulse">
      <div class="aspect-square rounded-3xl bg-stone-200 dark:bg-gray-800" />
      <div class="space-y-4">
        <div class="h-5 bg-stone-200 dark:bg-gray-800 rounded w-1/4" />
        <div class="h-8 bg-stone-200 dark:bg-gray-800 rounded w-3/4" />
        <div class="h-4 bg-stone-200 dark:bg-gray-800 rounded w-full" />
        <div class="h-4 bg-stone-200 dark:bg-gray-800 rounded w-5/6" />
        <div class="h-10 bg-stone-200 dark:bg-gray-800 rounded w-1/3 mt-6" />
      </div>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="text-center py-24">
      <p class="text-red-500 font-medium">{{ error }}</p>
      <RouterLink to="/" class="mt-4 inline-block text-brand-600 dark:text-orange-400 text-sm">← Back to shop</RouterLink>
    </div>

    <!-- Product Detail -->
    <div v-else-if="product" class="grid md:grid-cols-2 gap-12">
      <!-- Images -->
      <div>
        <div class="aspect-square rounded-3xl overflow-hidden bg-stone-100 dark:bg-gray-800 mb-4">
          <img
            :src="product.images[selectedImage] || product.thumbnail"
            :alt="product.title"
            class="w-full h-full object-cover"
          />
        </div>
        <div v-if="product.images.length > 1" class="flex gap-3 overflow-x-auto pb-2">
          <button
            v-for="(img, i) in product.images"
            :key="i"
            @click="selectedImage = i"
            :class="selectedImage === i ? 'ring-2 ring-brand-500' : 'opacity-60 hover:opacity-100'"
            class="shrink-0 w-16 h-16 rounded-xl overflow-hidden bg-stone-100 dark:bg-gray-800 transition-all"
          >
            <img :src="img" :alt="`Image ${i + 1}`" class="w-full h-full object-cover" />
          </button>
        </div>
      </div>

      <!-- Info -->
      <div class="flex flex-col">
        <!-- Breadcrumb -->
        <p class="text-xs font-medium text-brand-500 dark:text-orange-400 uppercase tracking-wider mb-2">{{ product.category }}</p>

        <h1 class="font-display text-3xl font-bold text-gray-900 dark:text-white leading-snug mb-3">{{ product.title }}</h1>

        <!-- Rating & Stock -->
        <div class="flex items-center gap-4 mb-4">
          <div class="flex items-center gap-1">
            <span v-for="i in 5" :key="i" :class="i <= Math.round(product.rating) ? 'text-amber-400' : 'text-gray-300'" class="text-lg">★</span>
            <span class="text-sm text-gray-500 dark:text-gray-400 ml-1">({{ product.rating.toFixed(1) }})</span>
          </div>
          <span :class="product.stock > 0 ? 'text-green-600 bg-green-50 dark:bg-green-900/30 dark:text-green-400' : 'text-red-600 bg-red-50 dark:bg-red-900/30 dark:text-red-400'" class="text-xs font-semibold px-2.5 py-1 rounded-full">
            {{ product.stock > 0 ? `${product.stock} in stock` : 'Out of stock' }}
          </span>
        </div>

        <!-- Price -->
        <div class="flex items-baseline gap-3 mb-4">
          <span class="text-4xl font-bold text-gray-900 dark:text-white">${{ product.price.toFixed(2) }}</span>
          <span v-if="product.discountPercentage > 0" class="text-sm font-semibold text-red-500 bg-red-50 dark:bg-red-900/30 px-2.5 py-1 rounded-full">
            -{{ Math.round(product.discountPercentage) }}% OFF
          </span>
        </div>

        <!-- Description -->
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">{{ product.description }}</p>

        <!-- Meta details -->
        <div class="grid grid-cols-2 gap-3 mb-6 text-sm">
          <div class="bg-stone-50 dark:bg-gray-800 rounded-xl p-3">
            <p class="text-xs text-gray-500 dark:text-gray-400 mb-0.5">Brand</p>
            <p class="font-medium text-gray-900 dark:text-white">{{ product.brand || '—' }}</p>
          </div>
          <div class="bg-stone-50 dark:bg-gray-800 rounded-xl p-3">
            <p class="text-xs text-gray-500 dark:text-gray-400 mb-0.5">SKU</p>
            <p class="font-medium text-gray-900 dark:text-white">{{ product.sku }}</p>
          </div>
          <div class="bg-stone-50 dark:bg-gray-800 rounded-xl p-3">
            <p class="text-xs text-gray-500 dark:text-gray-400 mb-0.5">Shipping</p>
            <p class="font-medium text-gray-900 dark:text-white">{{ product.shippingInformation }}</p>
          </div>
          <div class="bg-stone-50 dark:bg-gray-800 rounded-xl p-3">
            <p class="text-xs text-gray-500 dark:text-gray-400 mb-0.5">Warranty</p>
            <p class="font-medium text-gray-900 dark:text-white">{{ product.warrantyInformation }}</p>
          </div>
        </div>

        <!-- Quantity + Add to cart -->
        <div class="flex items-center gap-4 mt-auto">
          <div class="flex items-center border border-stone-200 dark:border-gray-700 rounded-xl overflow-hidden">
            <button @click="quantity = Math.max(1, quantity - 1)" class="px-4 py-3 text-gray-600 dark:text-gray-300 hover:bg-stone-100 dark:hover:bg-gray-700 transition-colors font-medium">−</button>
            <span class="px-4 py-3 font-semibold text-gray-900 dark:text-white min-w-[3rem] text-center">{{ quantity }}</span>
            <button @click="quantity = Math.min(product.stock, quantity + 1)" class="px-4 py-3 text-gray-600 dark:text-gray-300 hover:bg-stone-100 dark:hover:bg-gray-700 transition-colors font-medium">+</button>
          </div>
          <button
            @click="addToCart"
            :disabled="product.stock === 0"
            :class="cart.isInCart(product.id) ? 'bg-green-500 hover:bg-green-600' : 'bg-brand-500 hover:bg-brand-600'"
            class="flex-1 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-8 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>
            </svg>
            {{ cart.isInCart(product.id) ? 'In Cart ✓' : 'Add to Cart' }}
          </button>
        </div>

        <!-- Return policy -->
        <p class="text-xs text-gray-400 dark:text-gray-500 mt-3 flex items-center gap-1.5">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
          </svg>
          {{ product.returnPolicy }}
        </p>
      </div>
    </div>

    <!-- Reviews -->
    <section v-if="product && product.reviews?.length" class="mt-16">
      <h2 class="font-display text-2xl font-bold text-gray-900 dark:text-white mb-6">Customer Reviews</h2>
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <div v-for="(review, i) in product.reviews" :key="i" class="bg-white dark:bg-gray-900 border border-stone-100 dark:border-gray-800 rounded-2xl p-5">
          <div class="flex items-center justify-between mb-3">
            <div>
              <p class="font-semibold text-gray-900 dark:text-white text-sm">{{ review.reviewerName }}</p>
              <p class="text-xs text-gray-400 dark:text-gray-500">{{ new Date(review.date).toLocaleDateString() }}</p>
            </div>
            <div class="flex">
              <span v-for="j in 5" :key="j" :class="j <= review.rating ? 'text-amber-400' : 'text-gray-200 dark:text-gray-700'" class="text-sm">★</span>
            </div>
          </div>
          <p class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{{ review.comment }}</p>
        </div>
      </div>
    </section>
  </div>
</template>