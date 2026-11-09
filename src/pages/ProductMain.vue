<template>
  <div>
    <ProductCard v-for="p in product" :key="p.id" 
    :product="p" @add-to-cart="handleAddToCart"></ProductCard>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import ProductCard from '@/components/ProductCard.vue'; 

const product = ref([
  { id: 1, name: 'ProductA', price: 150, image: '/view.jpg' }, 
  { id: 2, name: 'ProductB', price: 300, image: '/view.jpg' }  
])
const handleAddToCart =(product) => {
    console.log("Add: " ,product.name, product.price, " Bant")
}
</script>