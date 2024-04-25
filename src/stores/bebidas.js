import { ref, onMounted, reactive, computed } from "vue";
import { defineStore } from "pinia";
import APIServices from "../services/APIServices";
import { useModalStore } from "./modal";
import { useSpinnerStore } from "./spinner";

export const useBebidasStore = defineStore("bebidas", () => {
  const modal = useModalStore();
  const spinner = useSpinnerStore();

  const categorias = ref([]);
  const busqueda = reactive({
    nombre: "",
    categoria: "",
  });
  const recetas = ref([]);
  const receta = ref({});

  onMounted(async function () {
    try {
      spinner.spinner = true;
      const {
        data: { drinks },
      } = await APIServices.obtenerCategorias();
      const { data } = await APIServices.recetasNombre("gin");
      categorias.value = drinks;
      recetas.value = data.drinks;
    } catch (error) {
      throw error;
    } finally {
      spinner.spinner = false;
    }
  });

  async function obtenerRecetas() {
    try {
      spinner.spinner = true;
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
      throw error;
    } finally {
      spinner.spinner = false;
    }
  }
  async function obtenerRecetaById(id) {
    try {
      spinner.spinner = true;
      const {
        data: { drinks },
      } = await APIServices.buscarRecetaporId(id);
      receta.value = drinks[0];
      modal.handleClickModal();
    } catch (error) {
      throw error;
    } finally {
      spinner.spinner = false;
    }
  }

  const noRecetas = computed(() => recetas.value.length === 0);

  return {
    categorias,
    busqueda,
    recetas,
    receta,
    obtenerRecetas,
    obtenerRecetaById,
    noRecetas,
  };
});
