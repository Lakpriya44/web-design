<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { useAuthStore } from '@/stores/auth'

const cart = useCartStore()
const auth = useAuthStore()
</script>

<template>
  <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h1 class="font-display text-3xl font-bold text-gray-900 dark:text-white mb-8">
      Your Cart
      <span v-if="cart.totalItems > 0" class="text-lg font-normal text-gray-500 dark:text-gray-400 ml-2">({{ cart.totalItems }} items)</span>
    </h1>

    <!-- Empty cart -->
    <div v-if="cart.items.length === 0" class="text-center py-24">
      <div class="text-7xl mb-6">🛒</div>
      <h2 class="font-display text-2xl font-bold text-gray-900 dark:text-white mb-2">Your cart is empty</h2>
      <p class="text-gray-500 dark:text-gray-400 mb-8">Start browsing to add items to your cart.</p>
      <RouterLink to="/" class="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors">
        Continue Shopping
      </RouterLink>
    </div>

    <!-- Cart items + summary -->
    <div v-else class="grid lg:grid-cols-3 gap-8">
      <!-- Items list -->
      <div class="lg:col-span-2 space-y-4">
        <div
          v-for="item in cart.items"
          :key="item.product.id"
          class="flex gap-4 bg-white dark:bg-gray-900 border border-stone-100 dark:border-gray-800 rounded-2xl p-4 shadow-sm"
        >
          <!-- Product image -->
          <RouterLink :to="`/product/${item.product.id}`" class="shrink-0">
            <img
              :src="item.product.thumbnail"
              :alt="item.product.title"
              class="w-20 h-20 rounded-xl object-cover bg-stone-100 dark:bg-gray-800"
            />
          </RouterLink>

          <!-- Details -->
          <div class="flex-1 min-w-0">
            <p class="text-xs font-medium text-brand-500 dark:text-orange-400 uppercase tracking-wide mb-0.5">{{ item.product.category }}</p>
            <RouterLink :to="`/product/${item.product.id}`">
              <h3 class="font-semibold text-gray-900 dark:text-white text-sm leading-snug hover:text-brand-600 dark:hover:text-orange-400 transition-colors line-clamp-2">{{ item.product.title }}</h3>
            </RouterLink>
            <p class="text-sm font-bold text-gray-900 dark:text-white mt-1">${{ item.product.price.toFixed(2) }}</p>
          </div>

          <!-- Quantity controls + remove -->
          <div class="flex flex-col items-end justify-between">
            <button @click="cart.removeItem(item.product.id)" class="text-gray-400 hover:text-red-500 transition-colors p-1">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
            <div class="flex items-center border border-stone-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <button
                @click="cart.updateQuantity(item.product.id, item.quantity - 1)"
                class="px-2.5 py-1.5 text-gray-600 dark:text-gray-300 hover:bg-stone-100 dark:hover:bg-gray-700 text-sm font-bold transition-colors"
              >−</button>
              <span class="px-3 py-1.5 text-sm font-semibold text-gray-900 dark:text-white">{{ item.quantity }}</span>
              <button
                @click="cart.updateQuantity(item.product.id, item.quantity + 1)"
                class="px-2.5 py-1.5 text-gray-600 dark:text-gray-300 hover:bg-stone-100 dark:hover:bg-gray-700 text-sm font-bold transition-colors"
              >+</button>
            </div>
            <p class="text-sm font-bold text-brand-600 dark:text-orange-400">${{ (item.product.price * item.quantity).toFixed(2) }}</p>
          </div>
        </div>
      </div>

      <!-- Order summary -->
      <div class="lg:col-span-1">
        <div class="sticky top-24 bg-white dark:bg-gray-900 border border-stone-100 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
          <h2 class="font-display font-bold text-lg text-gray-900 dark:text-white mb-5">Order Summary</h2>

          <div class="space-y-3 text-sm text-gray-700 dark:text-gray-300">
            <div class="flex justify-between">
              <span>Subtotal ({{ cart.totalItems }} items)</span>
              <span class="font-medium">${{ cart.totalPrice.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between text-green-600 dark:text-green-400">
              <span>Shipping</span>
              <span class="font-medium">Free</span>
            </div>
            <div class="border-t border-stone-100 dark:border-gray-800 pt-3 flex justify-between text-base font-bold text-gray-900 dark:text-white">
              <span>Total</span>
              <span>${{ cart.totalPrice.toFixed(2) }}</span>
            </div>
          </div>

          <!-- Checkout CTA -->
          <template v-if="auth.isLoggedIn">
            <button
              class="w-full mt-6 bg-brand-500 hover:bg-brand-600 text-white font-semibold py-3 px-5 rounded-xl transition-colors active:scale-95 flex items-center justify-center gap-2"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              Proceed to Checkout
            </button>
          </template>
          <template v-else>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-5 mb-3 text-center">Sign in to complete your purchase</p>
            <RouterLink
              to="/login"
              class="w-full mt-2 bg-brand-500 hover:bg-brand-600 text-white font-semibold py-3 px-5 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              Sign In to Checkout
            </RouterLink>
          </template>

          <button @click="cart.clearCart()" class="w-full mt-3 text-sm text-red-500 hover:text-red-600 font-medium transition-colors py-2">
            Clear Cart
          </button>

          <RouterLink to="/" class="block text-center text-sm text-gray-500 dark:text-gray-400 hover:text-brand-600 dark:hover:text-orange-400 transition-colors mt-2">
            ← Continue Shopping
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>