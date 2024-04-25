import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { useFavoritosStore } from "./favoritos";
import { useBebidasStore } from "./bebidas";

export const useModalStore = defineStore("modal", () => {
  const modal = ref(false);
  const favoritos = useFavoritosStore();
  const bebidas = useBebidasStore();

  function handleClickModal() {
    modal.value = !modal.value;
  }

  const textoBoton = computed(() => {
    return favoritos.existeFavorito(bebidas.receta.idDrink)
      ? "Eliminar de Favoritos"
      : "Agregar a Favoritos";
  });

  return {
    modal,
    handleClickModal,
    textoBoton,
  };
});
