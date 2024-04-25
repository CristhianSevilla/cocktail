<script setup>
import { computed } from "vue";
import { RouterLink, useRoute } from "vue-router";
import { useBebidasStore } from "../stores/bebidas";
import { useNotificacionStore } from "@/stores/notificacion";

const route = useRoute();
const store = useBebidasStore();
const notificacion = useNotificacionStore();

const paginaInicio = computed(() => route.name === "inicio");

const handleSubmit = () => {
  if (
    store.busqueda.nombre.trim() !== "" ||
    store.busqueda.categoria.trim() !== ""
  ) {
    store.obtenerRecetas();
  } else {
    notificacion.texto =
      "Por lo menos uno de los campos de búsqueda es obligatorio";
    notificacion.error = true;
    notificacion.mostrar = true;
  }
};
</script>

<template>
  <header
    class="bg-slate-800 md:px-8"
    :class="paginaInicio ? 'header h-svh' : ''"
  >
    <div class="mx-auto container px-5 xl:px-16 pt-5 md:pt-7 pb-16">
      <div class="flex justify-between items-center">
        <div>
          <RouterLink :to="{ name: 'inicio' }">
            <img class="w-32" src="/img/logo.svg" alt="Logotipo" />
          </RouterLink>
        </div>
        <nav class="flex gap-4 text-white">
          <RouterLink
            :to="{ name: 'inicio' }"
            class="uppercase font-bold"
            active-class="text-orange-500"
          >
            Inicio
          </RouterLink>
          <RouterLink
            :to="{ name: 'favoritos' }"
            class="uppercase font-bold"
            active-class="text-orange-500"
          >
            Favoritos
          </RouterLink>
        </nav>
      </div>
      <form
        v-if="paginaInicio"
        class="md:w-1/2 2xl:w-1/3 bg-orange-400 my-32 p-10 rounded-lg shadow space-y-6"
        @submit.prevent="handleSubmit"
      >
        <div class="space-y-4">
          <label
            class="block text-white uppercase font-extrabold text-lg"
            for="ingrediente"
            >Nombre o Ingrediente</label
          >
          <input
            class="p-3 w-full rounded-lg focus:outline-none"
            id="ingrediente"
            type="text"
            placeholder="Ej. Vodka, Tequila, Gin, etc."
            v-model="store.busqueda.nombre"
          />
        </div>
        <div class="space-y-4">
          <label
            class="block text-white uppercase font-extrabold text-lg"
            for="categoria"
            >Categoría</label
          >
          <select
            class="p-3 w-full rounded-lg focus:outline-none"
            id="categoria"
            v-model="store.busqueda.categoria"
          >
            <option value="">-- Seleccione --</option>
            <option
              v-for="categoria in store.categorias"
              :key="categoria.strCategory"
              :value="categoria.strCategory"
            >
              {{ categoria.strCategory }}
            </option>
          </select>
          <input
            class="bg-orange-800 hover:bg-orange-900 cursor-pointer text-white font-extrabold w-full p-2 rounded-lg uppercase"
            type="submit"
          />
        </div>
      </form>
    </div>
  </header>
</template>

<style>
.header {
  background-image: url("/img/bg.jpg");
  background-size: cover;
  background-position: center;
}
</style>
