import { createRouter, createWebHistory } from 'vue-router';
import AuthC from '@/views/AuthC.vue';
import AccueilC from '@/views/AccueilC.vue';
import ProfilC from '@/views/ProfilC.vue';
import NotFound from '@/views/NotFound.vue';


const routes = [
    {
        name: 'Auth',
        path: '/auth',
        component: AuthC,
        meta: {
            title: 'S\'identifier'
        } 
    }, {
        name: 'AccueilC',
        path: '/',
        component: AccueilC,
        meta: {
            title: 'Accueil'
        }
    }, {
        name: 'Profil',
        path: '/profil',
        component: ProfilC,
        meta: {
            title: 'Profil'
        }
    }, {
        name: 'NotFound',
        path: '/:pathMatch(.*)',
        component: NotFound,
        meta: {
            title: '404 Not Found'
        }
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.afterEach((to) =>{
    document.title = to.meta.title;
})

export default router;