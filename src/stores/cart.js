// stores/cart.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  // === State (使用 ref) ===
  const cartList = ref([]) // 购物车里的商品数组

  // === Getters (使用 computed) ===
  const totalPrice = computed(() =>
    cartList.value.reduce((sum, item) => sum + item.price * item.count, 0),
  )
  const totalCount = computed(() => cartList.value.length)

  // === Actions (普通函数) ===
  function addToCart(product) {
    const exist = cartList.value.find((item) => item.id === product.id)
    if (exist) {
      exist.count++
    } else {
      cartList.value.push({ ...product, count: 1 })
    }
  }

  // === 必须 return 暴露出去 ===
  return { cartList, totalPrice, totalCount, addToCart }
})
