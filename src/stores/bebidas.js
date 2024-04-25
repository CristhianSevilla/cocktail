import { ref, onMounted, reactive, computed } from "vue";
import { defineStore } from "pinia";
import APIServices from "../services/APIServices";
import { useModalStore } from "./modal";

export const useBebidasStore = defineStore("bebidas", () => {
  const modal = useModalStore();
  const categorias = ref([]);
  const busqueda = reactive({
    nombre: "",
    categoria: "",
  });
  const recetas = ref([]);
  const receta = ref({});

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
    receta.value = drinks[0];
    modal.handleClickModal();
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
