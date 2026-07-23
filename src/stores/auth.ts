// src/stores/auth.ts — Authentication with DummyJSON /auth/login
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'
import type { AuthResponse } from '../services/api'

interface ApiErrorResponse {
  message: string
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<AuthResponse | null>(null)
  const token = ref<string | null>(localStorage.getItem('token'))
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Rehydrate user from localStorage on store init
  const storedUser = localStorage.getItem('user')
  if (storedUser) {
    try {
      user.value = JSON.parse(storedUser) as AuthResponse
    } catch {
      localStorage.removeItem('user')
    }
  }

  const isLoggedIn = computed(() => !!token.value && !!user.value)

  async function login(username: string, password: string): Promise<boolean> {
    loading.value = true
    error.value = null
    try {
      const response = await axios.post<AuthResponse>(
        'https://dummyjson.com/auth/login',
        { username, password, expiresInMins: 60 },
        { headers: { 'Content-Type': 'application/json' } }
      )
      user.value = response.data
      token.value = response.data.token
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user', JSON.stringify(response.data))
      return true
    } catch (err: unknown) {
      if (axios.isAxiosError<ApiErrorResponse>(err)) {
        error.value = err.response?.data?.message ?? 'Login failed'
      } else {
        error.value = 'An unexpected error occurred'
      }
      return false
    } finally {
      loading.value = false
    }
  }

  function logout(): void {
    user.value = null
    token.value = null
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  return { user, token, loading, error, isLoggedIn, login, logout }
})