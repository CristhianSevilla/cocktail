import api from "@/api/axios";

export default {
    obtenerCategorias() {
        return api.get('/list.php?c=list')
    }
}