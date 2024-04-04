<script setup>
import { useBebidasStore } from "@/stores/bebidas";
import Receta from "../components/Receta.vue";

const bebidas = useBebidasStore();
</script>

<template>
  <div class="mx-3 md:mx-5 xl:mx-10">
    <h1 class="text-5xl font-extrabold">Recetas</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-10 gap-10">
      <Receta
        v-for="receta in bebidas.recetas"
        :key="receta.id"
        :receta="receta"
      />
    </div>
  </div>
</template>
