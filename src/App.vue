<script setup lang="ts">
import NavBar from './components/NavBar.vue'
import { useThemeStore } from './utils/theme'

const themeStore = useThemeStore()
</script>

<template>
  <div class="min-h-screen bg-stone-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
    <NavBar />
    <main class="pt-16">
      <RouterView v-slot="{ Component }">
        <Transition name="fade" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </main>
  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>