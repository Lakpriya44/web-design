<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const router = useRouter()

const username = ref('')
const password = ref('')
const showPassword = ref(false)

async function handleLogin(): Promise<void> {
  if (!username.value || !password.value) return
  const success = await auth.login(username.value, password.value)
  if (success) {
    router.push('/')
  }
}
</script>

<template>
  <div class="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12">
    <div class="w-full max-w-md">
      <!-- Card -->
      <div class="bg-white dark:bg-gray-900 rounded-3xl shadow-xl border border-stone-100 dark:border-gray-800 p-8 sm:p-10">
        <!-- Header -->
        <div class="text-center mb-8">
          <div class="inline-flex items-center justify-center w-14 h-14 bg-brand-500 rounded-2xl mb-4 shadow-lg shadow-orange-200 dark:shadow-orange-900/30">
            <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM12 14a7 7 0 0 0-7 7h14a7 7 0 0 0-7-7z"/>
            </svg>
          </div>
          <h1 class="font-display text-3xl font-bold text-gray-900 dark:text-white">Welcome back</h1>
          <p class="text-gray-500 dark:text-gray-400 text-sm mt-1">Sign in to your ShopVue account</p>
        </div>

        <!-- Demo hint -->
        <div class="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-xl p-3.5 mb-6">
          <p class="text-xs text-orange-700 dark:text-orange-300 font-medium flex items-start gap-2">
            <svg class="w-4 h-4 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"/>
            </svg>
            Demo credentials: <strong class="font-semibold">emilys</strong> / <strong class="font-semibold">emilyspass</strong>
          </p>
        </div>

        <!-- Form -->
        <div class="space-y-5">
          <!-- Username -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Username</label>
            <input
              v-model="username"
              type="text"
              autocomplete="username"
              placeholder="e.g. emilys"
              @keyup.enter="handleLogin"
              class="w-full px-4 py-3 bg-stone-50 dark:bg-gray-800 border border-stone-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 transition"
            />
          </div>

          <!-- Password -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Password</label>
            <div class="relative">
              <input
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                autocomplete="current-password"
                placeholder="Your password"
                @keyup.enter="handleLogin"
                class="w-full px-4 py-3 bg-stone-50 dark:bg-gray-800 border border-stone-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 transition pr-11"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
              >
                <svg v-if="showPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0 1 12 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 0 1 1.563-3.029m5.858.908a3 3 0 1 1 4.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0 1 12 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 0 1-4.132 5.411m0 0L21 21"/>
                </svg>
                <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- Error -->
          <div v-if="auth.error" class="flex items-center gap-2.5 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl px-4 py-3 text-sm">
            <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
            </svg>
            {{ auth.error }}
          </div>

          <!-- Submit -->
          <button
            @click="handleLogin"
            :disabled="auth.loading || !username || !password"
            class="w-full bg-brand-500 hover:bg-brand-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <svg v-if="auth.loading" class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
            </svg>
            {{ auth.loading ? 'Signing in…' : 'Sign In' }}
          </button>
        </div>
      </div>

      <p class="text-center text-sm text-gray-500 dark:text-gray-400 mt-5">
        Powered by
        <a href="https://dummyjson.com" target="_blank" rel="noopener" class="text-brand-600 dark:text-orange-400 hover:underline">DummyJSON</a>
        — demo accounts only
      </p>
    </div>
  </div>
</template>