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
    const { data } = await APIServices.recetasNombre("gin");
    categorias.value = drinks;
    recetas.value = data.drinks;
  });

  async function obtenerRecetas() {
    try {
      if (busqueda.nombre && !busqueda.categoria) {
        // Por nombre
        const { data } = await APIServices.recetasNombre(busqueda.nombre);
        recetas.value = data.drinks;
      } else if (busqueda.categoria && !busqueda.nombre) {
        //Por categoria
        const { data } = await APIServices.recetasCategoria(busqueda.categoria);
        recetas.value = data.drinks;
      } else if (busqueda.nombre && busqueda.categoria) {
        //Por nombre y categoria
        const { data } = await APIServices.recetasCatYnom(busqueda);
        recetas.value = data.drinks;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function obtenerRecetaById(id) {
    const {
      data: { drinks },
    } = await APIServices.buscarRecetaporId(id);
    console.log(drinks[0]);
  }

  return {
    categorias,
    busqueda,
    obtenerRecetas,
    recetas,
    obtenerRecetaById,
  };
});
