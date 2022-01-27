const routes = [
    {
        path: '/',
        component: () => import('@/views/home/index'),
    },
    // 资讯
    {
        path: '/information/',
        component: () => import('@/views/info/index'),
    },
    // 战略
    {
        path: '/strategy/',
        component: () => import('@/views/strategy/index'),
    },
    // 学习
    {
        path: '/learn/',
        component: () => import('@/views/learn/index'),
    },
    {
        path: '/about-us/',
        component: () => import('@/views/about-us/index'),
    },
    {
        path: '/currency/:coin',
        component: () => import('@/views/detail/currency'),
    },
    {
        path: '/:404*',
        redirect: '/',
    },
];

export default routes;
