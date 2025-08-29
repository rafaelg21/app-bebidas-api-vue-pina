import { ref, watch, onMounted, computed } from 'vue'
import { defineStore } from 'pinia'
import { useBebidasStore } from './bebidas';
import { useNotificacionesStore } from './Notificaciones';
import { useModalStore } from './modal';





export const useFavoritosStore = defineStore('favoritos', () =>{

    const bebidas = useBebidasStore();
    const favoritos = ref([]);
    const notificaciones = useNotificacionesStore();
    const modal = useModalStore();

    onMounted(() => {
        const favoritosLocalStorage = JSON.parse(localStorage.getItem('favoritos')) || [];
        favoritos.value = favoritosLocalStorage;
    });

    watch(favoritos, () => {
        sincronizarLocalStorage();
    }, {deep: true})

    function sincronizarLocalStorage() {
        localStorage.setItem('favoritos', JSON.stringify(favoritos.value));
    }

    function existeFavorito() {
        //  const favoritosLocalStorage = JSON.parse(localStorage.getItem('favoritos')) || [];
        //  return favoritosLocalStorage.some(favorito => favorito.idDrink === id);

        return favoritos.value.some(favorito => favorito.idDrink === bebidas.receta.idDrink);

    }

    function eliminarFavorito() {
        favoritos.value = favoritos.value.filter(favorito => favorito.idDrink !== bebidas.receta.idDrink);

        notificaciones.texto = 'Bebida eliminada de favoritos';
        notificaciones.mostrar = true;
        notificaciones.error = true;
        modal.modal = false;
    }

    function agregarFavorito() {
        favoritos.value.push(bebidas.receta);
        notificaciones.texto = 'Bebida agregada a favoritos';
        notificaciones.mostrar = true;
        //modal.modal = false;
    }

    function handleClickFavorito() {
        console.log(bebidas.receta);
        if(!existeFavorito()) {
            agregarFavorito();
        }else{
            eliminarFavorito();
        }
    }

    const noFavoritos = computed(() => {
        return favoritos.value.length === 0;
    });

    return {
        favoritos,
        handleClickFavorito,
        existeFavorito,
        noFavoritos
    }

})