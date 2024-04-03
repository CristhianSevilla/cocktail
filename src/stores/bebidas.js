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
      if (busqueda.nombre !== "" && busqueda.categoria === "") {
        const {
          data: { drinks },
        } = await APIServices.recetasNombre(busqueda.nombre);
        recetas.value = drinks;
      } else if (busqueda.categoria !== "" && busqueda.nombre === "") {
        const {
          data: { drinks },
        } = await APIServices.recetasCategoria(busqueda.categoria);
        recetas.value = drinks;
      } else if (busqueda.nombre !== "" && busqueda.categoria !== "") {
        const {
          data: { drinks },
        } = await APIServices.recetasCatYnom(busqueda);
        recetas.value = drinks;
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
