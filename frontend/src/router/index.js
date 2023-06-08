import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "@/components/Login.vue";
import Dashboard from "@/components/Dashboard.vue";

Vue.use(VueRouter)

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router

router.beforeEach((to, from, next) => {
    const publicPages = ['/login'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('access');
    if (to.path === '/' && loggedIn) {
        return next('/dashboard');
    } else if (to.path === '/' && !loggedIn) {
        return next('/login');
    }
    if (authRequired && !loggedIn) {
        return next('/login');
    }
    next();

});
