import { defineStore } from "pinia";
import { ref } from "vue";

export const useNotificacionStore = defineStore("notificacion", () => {
  const texto = ref("");
  const error = ref(false);
  const mostrar = ref(false);

  return {
    texto,
    error,
    mostrar,
  };
});
