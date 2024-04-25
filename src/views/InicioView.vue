<script setup>
import { useBebidasStore } from "@/stores/bebidas";
import Receta from "../components/Receta.vue";

const bebidas = useBebidasStore();
</script>

<template>
  <div class="mx-3 md:mx-5 xl:mx-8">
    <h1 class="text-5xl font-extrabold">Recetas</h1>
    <h2
      v-if="bebidas.noRecetas"
      class="mt-10 text-2xl font-semibold text-center"
    >
      <span class="text-orange-600">¡Ups!</span> No hay resultados para esa
      búsqueda
    </h2>
    <div
      v-else
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 my-10 gap-10"
    >
      <Receta
        v-for="receta in bebidas.recetas"
        :key="receta.id"
        :receta="receta"
      />
    </div>
  </div>
</template>
