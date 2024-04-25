<script setup>
import Receta from "@/components/Receta.vue";
import { useFavoritosStore } from "@/stores/favoritos";

const favoritos = useFavoritosStore();
</script>

<template>
  <h1 class="text-6xl font-extrabold">Mis Favoritos</h1>
  <h2
    v-if="favoritos.noFavoritos"
    class="mt-10 text-2xl font-semibold text-center"
  >
    <span class="text-orange-600">¡Ups!</span> Aún no agregas Favoritos
  </h2>
  <div
    v-else
    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 my-10 gap-10"
  >
    <Receta
      v-for="receta in favoritos.favoritos"
      :key="receta.id"
      :receta="receta"
    />
  </div>
</template>
