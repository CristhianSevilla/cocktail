import api from "@/api/axios";

export default {
  obtenerCategorias() {
    return api.get("/list.php?c=list");
  },
  recetasCatYnom({ categoria, nombre }) {
    return api(`/filter.php?c=${categoria}&i=${nombre}`);
  },
  recetasCategoria(categoria) {
    return api(`/filter.php?c=${categoria}`);
  },
  recetasNombre(nombre) {
    return api(`/filter.php?i=${nombre}`);
  },
};
