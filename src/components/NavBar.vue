<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { useAuthStore } from '@/stores/auth'
import { useThemeStore } from '../utils/theme'

const cart = useCartStore()
const auth = useAuthStore()
const theme = useThemeStore()
const router = useRouter()
const mobileOpen = ref(false)

function handleLogout(): void {
  auth.logout()
  router.push('/')
}
</script>

<template>
  <header class="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-stone-200 dark:border-gray-800 transition-colors">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <RouterLink to="/" class="flex items-center gap-2">
          <span class="text-2xl font-display font-bold text-gray-900 dark:text-white">Stack 
            <span class="text-brand-600 dark:text-orange-400 tracking-tight"> & 
              <span class="text-gray-900 dark:text-white">Stock</span>
            </span>
          </span>
        </RouterLink>

        <!-- Desktop Nav -->
        <nav class="hidden md:flex items-center gap-6">
          <RouterLink to="/" class="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-brand-600 dark:hover:text-orange-400 transition-colors">Shop</RouterLink>
          
          <!-- Dark mode toggle -->
          <button @click="theme.toggle()" class="p-2 rounded-full hover:bg-stone-100 dark:hover:bg-gray-800 transition-colors" :aria-label="theme.isDark ? 'Switch to light mode' : 'Switch to dark mode'">
            <svg v-if="theme.isDark" class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.5 12a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM18.894 6.166a.75.75 0 0 0-1.06-1.06l-1.591 1.59a.75.75 0 1 0 1.06 1.061l1.591-1.59ZM21.75 12a.75.75 0 0 1-.75.75h-2.25a.75.75 0 0 1 0-1.5H21a.75.75 0 0 1 .75.75ZM17.834 18.894a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 1 0-1.061 1.06l1.59 1.591ZM12 18a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-2.25A.75.75 0 0 1 12 18ZM7.166 17.834a.75.75 0 0 0-1.06 1.06l1.59 1.591a.75.75 0 1 0 1.061-1.06l-1.59-1.591ZM6 12a.75.75 0 0 1-.75.75H3a.75.75 0 0 1 0-1.5h2.25A.75.75 0 0 1 6 12ZM6.166 6.166a.75.75 0 0 0 1.06 1.06l1.59-1.59a.75.75 0 0 0-1.06-1.061L6.166 6.166Z"/></svg>
            <svg v-else class="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z" clip-rule="evenodd"/></svg>
          </button>

          <!-- Cart -->
          <RouterLink to="/cart" class="relative p-2 hover:bg-stone-100 dark:hover:bg-gray-800 rounded-full transition-colors" aria-label="View Shopping Cart">
            <svg class="w-5 h-5 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-8 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/></svg>
            <span v-if="cart.totalItems > 0" class="absolute -top-1 -right-1 bg-brand-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">{{ cart.totalItems }}</span>
          </RouterLink>

          <!-- Auth -->
          <template v-if="auth.isLoggedIn">
            <div class="flex items-center gap-3">
              <img :src="auth.user!.image" :alt="auth.user!.firstName" class="w-8 h-8 rounded-full object-cover ring-2 ring-brand-500" />
              <button @click="handleLogout" class="text-sm font-medium text-red-500 hover:text-red-600 transition-colors">Logout</button>
            </div>
          </template>
          <template v-else>
            <RouterLink to="/login" class="bg-brand-500 hover:bg-brand-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">Sign In</RouterLink>
          </template>
        </nav>

        <!-- Mobile toggle -->
        <div class="md:hidden flex items-center gap-3">
          <RouterLink to="/cart" class="relative p-2" aria-label="View Shopping Cart">
            <svg class="w-5 h-5 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-8 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/></svg>
            <span v-if="cart.totalItems > 0" class="absolute -top-1 -right-1 bg-brand-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{{ cart.totalItems }}</span>
          </RouterLink>
          <button @click="mobileOpen = !mobileOpen" class="p-2" :aria-label="mobileOpen ? 'Close navigation menu' : 'Open navigation menu'">
            <svg class="w-6 h-6 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path v-if="!mobileOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <Transition name="slide">
        <div v-if="mobileOpen" class="md:hidden py-4 border-t border-stone-200 dark:border-gray-800 flex flex-col gap-4">
          <RouterLink to="/" @click="mobileOpen = false" class="text-sm font-medium">Shop</RouterLink>
          <RouterLink v-if="!auth.isLoggedIn" to="/login" @click="mobileOpen = false" class="text-sm font-medium text-brand-600">Sign In</RouterLink>
          <button v-else @click="handleLogout(); mobileOpen = false" class="text-sm font-medium text-red-500 text-left">Logout</button>
          <button @click="theme.toggle()" class="text-sm font-medium text-left">{{ theme.isDark ? '☀️ Light Mode' : '🌙 Dark Mode' }}</button>
        </div>
      </Transition>
    </div>
  </header>
</template>

<style scoped>
.slide-enter-active, .slide-leave-active { transition: all 0.2s ease; }
.slide-enter-from, .slide-leave-to { opacity: 0; transform: translateY(-8px); }
</style>