import { ref, onMounted, reactive } from "vue";
import { defineStore } from "pinia";
import APIServices from "../services/APIServices";

export const useBebidasStore = defineStore("bebidas", () => {
  const categorias = ref([]);
  const busqueda = reactive({
    nombre: "",
    categoria: "",
  });
  const recetas = ref([]);

  onMounted(async function () {
    const {
      data: { drinks },
    } = await APIServices.obtenerCategorias();

    categorias.value = drinks;
  });

  async function obtenerRecetas() {
    try {
      if (busqueda.nombre && !busqueda.categoria) {
        console.log("Por nombre");
        const { data } = await APIServices.recetasNombre(busqueda.nombre);
        recetas.value = data.drinks;
      } else if (busqueda.categoria && !busqueda.nombre) {
        console.log("Por categoria");
        const { data } = await APIServices.recetasCategoria(busqueda.categoria);
        recetas.value = data.drinks;
      } else if (busqueda.nombre && busqueda.categoria) {
        console.log("Por nombre y categoria");
        const { data } = await APIServices.recetasCatYnom(busqueda);
        recetas.value = data.drinks;
      }
    } catch (error) {
      console.log(error);
    }
  }

  return {
    categorias,
    busqueda,
    obtenerRecetas,
    recetas,
  };
});
