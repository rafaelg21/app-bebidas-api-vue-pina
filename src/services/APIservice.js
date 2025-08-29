import api from '@/lib/axios'

export default{
    obtenerCategorias(){
        return api.get('/list.php?c=list')
    },
    //buscarRecetas(busqueda){ //SIN DESTRCCTION 
    buscarRecetas({categoria, nombre}){ // CON DESTRUCTURACION DE OBJETO    
        return api('/filter.php?c=' + categoria + '&i=' + nombre);
    },
    buscarReceta(id){
        return api('/lookup.php?i=' + id);
    }
}