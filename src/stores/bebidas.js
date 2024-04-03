import { ref, onMounted, reactive, computed } from "vue";
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

  const porNombre = computed(() => {
    return busqueda.nombre !== "" && busqueda.categoria === "";
  });
  const porCategoria = computed(() => {
    return busqueda.categoria !== "" && busqueda.nombre === "";
  });
  const porNombreYcategoria = computed(() => {
    return busqueda.nombre !== "" && busqueda.categoria !== "";
  });

  async function obtenerRecetas() {
    try {
      if (porNombre) {
        const { data } = await APIServices.recetasNombre(busqueda.nombre);
        recetas.value = data.drinks;
      } else if (porCategoria) {
        const { data } = await APIServices.recetasCategoria(busqueda.categoria);
        recetas.value = data.drinks;
      } else if (porNombreYcategoria) {
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
