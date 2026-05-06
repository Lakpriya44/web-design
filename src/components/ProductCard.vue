<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import type { Product } from '@/services/api'

const props = defineProps<{ product: Product }>()
const cart = useCartStore()
</script>

<template>
  <div class="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-100 dark:border-gray-800 flex flex-col">
    <!-- Image -->
    <RouterLink :to="`/product/${product.id}`" class="block overflow-hidden aspect-square bg-stone-100 dark:bg-gray-800 relative">
      <img
        :src="product.thumbnail"
        :alt="product.title"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        loading="lazy"
      />
      <!-- Discount badge -->
      <span v-if="product.discountPercentage > 0" class="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
        -{{ Math.round(product.discountPercentage) }}%
      </span>
    </RouterLink>

    <!-- Content -->
    <div class="p-4 flex flex-col flex-1">
      <p class="text-xs text-brand-500 dark:text-orange-400 font-medium uppercase tracking-wider mb-1">{{ product.category }}</p>
      <RouterLink :to="`/product/${product.id}`">
        <h3 class="font-semibold text-gray-900 dark:text-white line-clamp-2 leading-snug hover:text-brand-600 dark:hover:text-orange-400 transition-colors">{{ product.title }}</h3>
      </RouterLink>

      <!-- Rating -->
      <div class="flex items-center gap-1 mt-2">
        <div class="flex">
          <span v-for="i in 5" :key="i" :class="i <= Math.round(product.rating) ? 'text-amber-400' : 'text-gray-300'" class="text-sm">★</span>
        </div>
        <span class="text-xs text-gray-500 dark:text-gray-400">({{ product.rating.toFixed(1) }})</span>
      </div>

      <div class="mt-auto pt-3 flex items-center justify-between">
        <div>
          <span class="text-xl font-bold text-gray-900 dark:text-white">${{ product.price.toFixed(2) }}</span>
        </div>
        <button
          @click="cart.addItem(product)"
          :class="cart.isInCart(product.id) ? 'bg-green-500 hover:bg-green-600' : 'bg-brand-500 hover:bg-brand-600'"
          class="text-white text-sm font-medium px-3 py-2 rounded-xl transition-all duration-200 active:scale-95 flex items-center gap-1.5"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17"/></svg>
          {{ cart.isInCart(product.id) ? 'In Cart' : 'Add' }}
        </button>
      </div>
    </div>
  </div>
</template>