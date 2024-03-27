<script setup></script>

<template>
  <header>
    <div class="mx-auto container px-5 py-16">
      <div></div>
      <form
        class="md:w-1/2 2xl:w-1/3 bg-orange-400 my-32 p-10 rounded-lg shadow space-y-6"
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
            placeholder="Nombre o Ingrediente: ej. Vodka, Tequila, etc."
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
          >
            <option value="">-- Seleccione --</option>
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
