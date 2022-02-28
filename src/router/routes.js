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
    // 学习
    {
        path: '/learn/',
        component: () => import('@/views/learn/index'),
    },
    // 行情
    {
        path: '/market/',
        component: () => import('@/views/market/index'),
    },
    // 战略/学习 详情
    {
        path: '/detail/:key',
        component: () => import('@/views/detail/detail'),
    },
    {
        path: '/about-us/',
        component: () => import('@/views/about-us/index'),
    },
    // 币种详情
    {
        path: '/currency/:coin',
        component: () => import('@/views/detail/currency'),
    },
    // 游戏详情
    {
        path: '/game/:coin',
        alias: '/guild/:coin', // 工会详情
        component: () => import('@/views/detail/game'),
    },
    // 链详情
    {
        path: '/chain/:coin',
        component: () => import('@/views/detail/chain'),
    },
    {
        path: '/:404*',
        redirect: '/',
    },
];

export default routes;
