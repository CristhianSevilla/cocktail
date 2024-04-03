import api from "@/api/axios";

export default {
    obtenerCategorias() {
        return api.get('/list.php?c=list')
    },
    buscarRecetas({categoria, nombre}) {
        return api(`/filter.php?c=${categoria}&i=${nombre}`)
    },
}