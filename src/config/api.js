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
    // 获取工会/游戏/链 列表
    getProjectList(params) {
        return axios.get('@api/project/list', { params });
    },
    // 获取项目价格信息
    getProjectPrice(params) {
        return axios.get('@api/project/price', { params });
    },
    // 获取币种详情列表
    getCoinDetail(params) {
        return axios.get('@api/coin/info', { params });
    },
    // 获取工会/游戏 详情
    getProjectDetail(params) {
        return axios.get('@api/project/info', { params });
    },
    // 获取币种 详情
    getTokenDetail(params) {
        return axios.get('@api/project/token', { params });
    },
    // 获取币种kline
    getCoinKline(params) {
        return axios.get('@api/coin/kline', { params });
    },
    // 订阅邮箱推送
    subEmail(data) {
        return axios.post('@api/subscribe', data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
    },
};

export default {};
