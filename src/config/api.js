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

export const $api = {
    test(params) {
        return axios.get('@api2/spot/api/v1/auth/check', { params });
    },
};

export default {};
