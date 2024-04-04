<script setup>
import Receta from "../components/Receta.vue";
import { useBebidasStore } from "../stores/bebidas";

const bebidas = useBebidasStore();
</script>

<template>
  <div class="px-3 xl:px-16 mb-5">
    <h1 class="text-4xl font-extrabold">Recetas</h1>
    <div class="grid grid-cols-1 md:grid-cols-3 2xl:grid-cols-4 mt-10 gap-10">
      <Receta
        v-for="receta in bebidas.recetas"
        :key="receta.idDrink"
        :receta="receta"
      />
    </div>
  </div>
</template>
