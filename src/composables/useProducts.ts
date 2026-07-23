// src/composables/useProducts.ts — Fetching and filtering products
import { ref, computed } from 'vue'
import axios from 'axios'
import type { Product, ProductsResponse, CategoriesResponse, SearchFilters } from '../services/api'

const BASE = 'https://dummyjson.com'

export function useProducts() {
  const products = ref<Product[]>([])
  const categories = ref<CategoriesResponse[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const total = ref(0)

  const filters = ref<SearchFilters>({
    query: '',
    category: '',
    minPrice: 0,
    maxPrice: 2000,
    sortBy: 'title',
  })

  async function fetchCategories(): Promise<void> {
    try {
      const res = await axios.get<CategoriesResponse[]>(`${BASE}/products/categories`)
      categories.value = res.data
    } catch {
      // non-critical
    }
  }

  async function fetchProducts(skip = 0, limit = 30): Promise<void> {
    loading.value = true
    error.value = null
    try {
      let url = ''
      if (filters.value.query) {
        url = `${BASE}/products/search?q=${encodeURIComponent(filters.value.query)}&limit=${limit}&skip=${skip}`
      } else if (filters.value.category) {
        url = `${BASE}/products/category/${filters.value.category}?limit=${limit}&skip=${skip}`
      } else {
        url = `${BASE}/products?limit=${limit}&skip=${skip}`
      }
      const res = await axios.get<ProductsResponse>(url)
      products.value = res.data.products
      total.value = res.data.total
    } catch (err: unknown) {
      error.value = axios.isAxiosError(err) ? (err.message ?? 'Failed to fetch') : 'Unknown error'
    } finally {
      loading.value = false
    }
  }

  const filteredAndSorted = computed<Product[]>(() => {
    let result = products.value.filter(
      (p) => p.price >= filters.value.minPrice && p.price <= filters.value.maxPrice
    )
    switch (filters.value.sortBy) {
      case 'price-asc':
        result = [...result].sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        result = [...result].sort((a, b) => b.price - a.price)
        break
      case 'rating':
        result = [...result].sort((a, b) => b.rating - a.rating)
        break
      case 'title':
        result = [...result].sort((a, b) => a.title.localeCompare(b.title))
        break
    }
    return result
  })

  return { products: filteredAndSorted, categories, loading, error, total, filters, fetchProducts, fetchCategories }
}