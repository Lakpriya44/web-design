// src/stores/cart.ts — Global shopping cart with localStorage persistence
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { CartItem, Product } from '../services/api'

function isCartItem(x: unknown): x is CartItem {
  return typeof x === 'object' && x !== null && 'product' in x && 'quantity' in x
}

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>(loadFromStorage())

  function loadFromStorage(): CartItem[] {
  try {
    const raw = localStorage.getItem('cart')
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed.filter(isCartItem) : []
  } catch {
    return []
  }
}

  function persist(): void {
    localStorage.setItem('cart', JSON.stringify(items.value))
  }

  const totalItems = computed(() =>
    items.value.reduce((sum, item) => sum + item.quantity, 0)
  )

  const totalPrice = computed(() =>
    items.value.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  )

  function addItem(product: Product): void {
    const existing = items.value.find((i) => i.product.id === product.id)
    if (existing) {
      existing.quantity++
    } else {
      items.value.push({ product, quantity: 1 })
    }
    persist()
  }

  function removeItem(productId: number): void {
    items.value = items.value.filter((i) => i.product.id !== productId)
    persist()
  }

  function updateQuantity(productId: number, quantity: number): void {
    const item = items.value.find((i) => i.product.id === productId)
    if (item) {
      if (quantity <= 0) {
        removeItem(productId)
      } else {
        item.quantity = quantity
        persist()
      }
    }
  }

  function clearCart(): void {
    items.value = []
    persist()
  }

  function isInCart(productId: number): boolean {
    return items.value.some((i) => i.product.id === productId)
  }

  return {
    items,
    totalItems,
    totalPrice,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    isInCart,
  }
})