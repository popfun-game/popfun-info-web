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
    getNewsList(params) {
        return axios.get('@api/article/news-list', { params });
    },
};

export default {};
