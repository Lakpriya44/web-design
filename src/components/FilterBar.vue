<script setup lang="ts">
import type { CategoriesResponse, SearchFilters } from '../services/api'

const props = defineProps<{
  categories: CategoriesResponse[]
  filters: SearchFilters
  total: number
}>()

const emit = defineEmits<{
  'update:filters': [value: SearchFilters]
  'search': []
}>()

function update(key: keyof SearchFilters, value: string | number): void {
  emit('update:filters', { ...props.filters, [key]: value })
  // Only 'category' changes the underlying data set fetched from the API.
  // 'query' is triggered separately (Enter key / search action), and
  // 'sortBy' / 'maxPrice' / 'minPrice' are already applied client-side in
  // useProducts' filteredAndSorted computed, so re-fetching for them is
  // redundant network traffic.
  if (key === 'category') emit('search')
}
</script>

<template>
  <div class="bg-white dark:bg-gray-900 border border-stone-200 dark:border-gray-800 rounded-2xl p-5 shadow-sm">
    <h2 class="font-display font-semibold text-lg text-gray-900 dark:text-white mb-4">Filters</h2>

    <!-- Search -->
    <div class="mb-4">
      <label class="block text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5">Search</label>
      <div class="relative">
        <input
          type="text"
          :value="filters.query"
          @input="update('query', ($event.target as HTMLInputElement).value)"
          @keyup.enter="emit('search')"
          placeholder="Search products..."
          class="w-full pl-9 pr-4 py-2.5 bg-stone-50 dark:bg-gray-800 border border-stone-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 transition"
        />
        <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0z"/></svg>
      </div>
    </div>

    <!-- Category -->
    <div class="mb-4">
      <label class="block text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5">Category</label>
      <select
        :value="filters.category"
        @change="update('category', ($event.target as HTMLSelectElement).value)"
        class="w-full py-2.5 px-3 bg-stone-50 dark:bg-gray-800 border border-stone-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 transition"
      >
        <option value="">All Categories</option>
        <option v-for="cat in categories" :key="cat.slug" :value="cat.slug">{{ cat.name }}</option>
      </select>
    </div>

    <!-- Sort -->
    <div class="mb-4">
      <label class="block text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5">Sort By</label>
      <select
        :value="filters.sortBy"
        @change="update('sortBy', ($event.target as HTMLSelectElement).value)"
        class="w-full py-2.5 px-3 bg-stone-50 dark:bg-gray-800 border border-stone-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 transition"
      >
        <option value="title">Name (A–Z)</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="rating">Top Rated</option>
      </select>
    </div>

    <!-- Price range -->
    <div>
      <label class="block text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5">
        Max Price: <span class="text-brand-600 dark:text-orange-400">${{ filters.maxPrice }}</span>
      </label>
      <input
        type="range"
        min="0"
        max="2000"
        step="50"
        :value="filters.maxPrice"
        @input="update('maxPrice', Number(($event.target as HTMLInputElement).value))"
        class="w-full accent-orange-500"
      />
    </div>

    <!-- Result count -->
    <p class="mt-4 text-xs text-gray-500 dark:text-gray-400">Showing {{ total }} products</p>
  </div>
</template>