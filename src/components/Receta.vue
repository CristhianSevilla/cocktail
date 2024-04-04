<script setup>
import { useBebidasStore } from "@/stores/bebidas";

const bebidas = useBebidasStore();
defineProps({
  receta: {
    type: Object,
  },
});
</script>

<template>
  <div class="border shadow-lg overflow-hidden rounded bg-orange-100">
    <div>
      <img
        class="hover:scale-105 transition-transform hover:rotate-1"
        :src="receta.strDrinkThumb"
        alt="Imagen Receta"
      />
    </div>
    <div class="p-5">
      <h2 class="text-2xl truncate font-extrabold">{{ receta.strDrink }}</h2>
      <button
        class="bg-orange-500 hover:bg-orange-600 transition-all mt-5 w-full p-3 font-bold text-white text-lg rounded"
        @click="bebidas.obtenerRecetaById(receta.idDrink)"
      >
        Ver Receta
      </button>
    </div>
  </div>
</template>
