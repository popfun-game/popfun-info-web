/**
 * @file 统一操作 API
 *
 * @example
 *  - vm.$api.post.test
 *
 *  - import { $api } from '@/utils/api';
 *  - $api.test
 */

import axios from '@/utils/axios';

export const api = {
    // 获取资讯列表
    getArticleList(params) {
        return axios.get('@api/article/list', { params });
    },
    // 获取资讯详情
    getArticleDetail(params) {
        return axios.get('@api/article/info', { params });
    },
    // 获取币种排行
    getCoinRank(params) {
        return axios.get('@api/coin/rank', { params });
    },
    // 获取币种详情列表
    getCoinDetail(params) {
        return axios.get('@api/coin/info', { params });
    },
    // 获取币种kline
    getCoinKline(params) {
        return axios.get('@api/coin/kline', { params });
    },
};

export default {};
