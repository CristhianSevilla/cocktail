import { ref } from "vue";
import { defineStore } from "pinia";
import { useBebidasStore } from "./bebidas";

export const useFavoritosStore = defineStore("favoritos", () => {
  const bebidas = useBebidasStore();
  const favoritos = ref([]);

  const handleClickFavorito = () => {
    favoritos.value.push(bebidas.receta);
    console.log(bebidas.receta);
  };

  return {
    favoritos,
    handleClickFavorito,
  };
});
