const routes = [
    {
        path: '/',
        component: () => import(/* webpackChunkName: "home" */ '@/views/home/index'),
    },
    // 资讯
    {
        path: '/information/',
        component: () => import(/* webpackChunkName: "info" */ '@/views/info/index'),
    },
    // 战略
    {
        path: '/strategy/',
        component: () => import(/* webpackChunkName: "strategy" */ '@/views/strategy/index'),
    },
    // 学习
    {
        path: '/learn/',
        component: () => import(/* webpackChunkName: "learn" */ '@/views/learn/index'),
    },

    {
        path: '/about-us/',
        component: () => import(/* webpackChunkName: "about-us" */ '@/views/about-us/index'),
    },
    {
        path: '/:404*',
        redirect: '/',
    },
];

export default routes;
