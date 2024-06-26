import { ref, watch, onMounted, computed } from "vue";
import { defineStore } from "pinia";
import { useBebidasStore } from "./bebidas";
import { useModalStore } from "./modal";
import { useNotificacionStore } from "./notificacion";

export const useFavoritosStore = defineStore("favoritos", () => {
  const bebidas = useBebidasStore();
  const modal = useModalStore();
  const notificacion = useNotificacionStore();

  const favoritos = ref([]);

  onMounted(() => {
    favoritos.value = JSON.parse(localStorage.getItem("favoritos")) ?? [];
  });

  watch(
    favoritos,
    () => {
      sincronizarLocalStorage();
    },
    {
      deep: true,
    }
  );

  function sincronizarLocalStorage() {
    localStorage.setItem("favoritos", JSON.stringify(favoritos.value));
  }
  function existeFavorito() {
    const favoritosLocalStorage =
      JSON.parse(localStorage.getItem("favoritos")) ?? [];
    return favoritosLocalStorage.some(
      (favorito) => favorito.idDrink === bebidas.receta.idDrink
    );
  }
  function agregarFavorito() {
    favoritos.value.push(bebidas.receta);
    notificacion.mostrar = true;
    notificacion.texto = "Se agregó a tus favoritos";
    setTimeout(() => {}, 3000);
  }
  function eliminarFavorito() {
    favoritos.value = favoritos.value.filter(
      (favorito) => favorito.idDrink !== bebidas.receta.idDrink
    );
    notificacion.mostrar = true;
    notificacion.texto = "Se eliminó de tus favoritos";
    setTimeout(() => {}, 3000);
  }
  function handleClickFavorito() {
    if (existeFavorito()) {
      eliminarFavorito();
    } else {
      agregarFavorito();
    }
    modal.modal = false;
  }

  const noFavoritos = computed(() => favoritos.value.length === 0);

  return {
    favoritos,
    handleClickFavorito,
    existeFavorito,
    noFavoritos,
  };
});
