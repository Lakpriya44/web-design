<script setup lang="ts">
import { onMounted } from 'vue'
import FilterBar from '@/components/FilterBar.vue'
import ProductCard from '@/components/ProductCard.vue'
import { useProducts } from '@/composables/useProducts'

const { products, categories, loading, error, total, filters, fetchProducts, fetchCategories } = useProducts()

onMounted(async () => {
  await fetchCategories()
  await fetchProducts()
})

async function handleSearch(): Promise<void> {
  await fetchProducts()
}
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Hero Banner -->
    <div class="relative rounded-3xl overflow-hidden bg-gradient-to-br from-orange-500 to-orange-700 mb-10 px-8 py-12 text-white shadow-xl">
      <div class="relative z-10">
        <p class="text-orange-200 font-medium text-sm uppercase tracking-widest mb-2">New Arrivals</p>
        <h1 class="font-display text-4xl sm:text-5xl font-bold leading-tight mb-4">
          Discover <br class="hidden sm:block" />Amazing Products
        </h1>
        <p class="text-orange-100 text-lg max-w-md">
          Thousands of quality products from top brands, delivered to your door.
        </p>
      </div>
      <!-- Decorative circles -->
      <div class="absolute -right-16 -top-16 w-72 h-72 rounded-full bg-white/10 pointer-events-none" />
      <div class="absolute -right-4 bottom-0 w-48 h-48 rounded-full bg-white/5 pointer-events-none" />
    </div>

    <div class="flex flex-col lg:flex-row gap-8">
      <!-- Sidebar Filter -->
      <aside class="w-full lg:w-72 shrink-0">
        <div class="sticky top-24">
          <FilterBar
            :categories="categories"
            :filters="filters"
            :total="total"
            @update:filters="(v) => Object.assign(filters, v)"
            @search="handleSearch"
          />
        </div>
      </aside>

      <!-- Product Grid -->
      <main class="flex-1 min-w-0">
        <!-- Loading skeleton -->
        <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          <div v-for="n in 9" :key="n" class="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-stone-100 dark:border-gray-800 animate-pulse">
            <div class="aspect-square bg-stone-200 dark:bg-gray-800" />
            <div class="p-4 space-y-3">
              <div class="h-3 bg-stone-200 dark:bg-gray-700 rounded w-1/3" />
              <div class="h-4 bg-stone-200 dark:bg-gray-700 rounded w-3/4" />
              <div class="h-4 bg-stone-200 dark:bg-gray-700 rounded w-1/2" />
              <div class="flex justify-between items-center pt-2">
                <div class="h-6 bg-stone-200 dark:bg-gray-700 rounded w-20" />
                <div class="h-9 bg-stone-200 dark:bg-gray-700 rounded-xl w-20" />
              </div>
            </div>
          </div>
        </div>

        <!-- Error state -->
        <div v-else-if="error" class="flex flex-col items-center justify-center py-24 text-center">
          <div class="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-4">
            <svg class="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
            </svg>
          </div>
          <p class="text-gray-900 dark:text-white font-semibold text-lg">Failed to load products</p>
          <p class="text-gray-500 dark:text-gray-400 text-sm mt-1">{{ error }}</p>
          <button
            @click="fetchProducts()"
            class="mt-4 bg-brand-500 hover:bg-brand-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors"
          >
            Try again
          </button>
        </div>

        <!-- Empty state -->
        <div v-else-if="products.length === 0" class="flex flex-col items-center justify-center py-24 text-center">
          <div class="text-6xl mb-4">🔍</div>
          <p class="text-gray-900 dark:text-white font-semibold text-lg">No products found</p>
          <p class="text-gray-500 dark:text-gray-400 text-sm mt-1">Try adjusting your filters or search terms</p>
        </div>

        <!-- Products -->
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          <ProductCard v-for="product in products" :key="product.id" :product="product" />
        </div>
      </main>
    </div>
  </div>
</template>