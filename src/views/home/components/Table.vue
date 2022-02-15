<!-- 分类table -->
<template>
    <section class="wrapper">
        <div class="menu flex-row flex-items-center">
            <tabs
                v-model="state.tab"
                :list="state.menu_list"
                @onChange="methods.changeTab"
            />
        </div>

        <c-table
            v-loading="state.loading"
            :class="{'is-loading': state.loading}"
            :columns="column"
            :data="state.data"
            :element-loading-text="t('list_loading')"
            @onRetry="methods.getList()"
        />

        <div
            v-if="state.data.length"
            class="pagination flex-row-space-between flex-items-center scroller"
        >
            {{ t('page_info', { size: state.pages.size, total: state.pages.total }) }}

            <el-pagination
                :current-page="state.page"
                background
                hide-on-single-page
                :page-size="state.pages.size"
                :page-sizes="[100, 50, 20]"
                :total="state.pages.total"
                layout="prev, pager, next, sizes, jumper"
                @size-change="methods.sizeChange"
                @current-change="methods.pageChange"
            />
        </div>
    </section>
</template>
<script setup>
import {
    defineProps,
    reactive,
    computed,
    onBeforeUnmount,
} from 'vue';
import { useI18n } from 'vue-i18n';
import cTable from '@/components/Table';
import tabs from '@/components/Tabs';
import { api } from '@/config/api';
import { ElMessage } from 'element-plus';
import useColumn from './columns';

const props = defineProps({
    active: {
        type: String,
        required: true,
    },
});

const { t } = useI18n();
const columns = useColumn();
const state = reactive({
    tab: props.active,
    loading: false,
    menu_list: [
        { id: 'game', label: t('menu_game') },
        { id: 'gameGuild', label: t('menu_guild') },
        { id: 'chain', label: t('menu_chain') },
        { id: 'token', label: t('menu_token') },
    ],
    data: [],
    price_map: {},
    page: 1,
    pages: {
        current: 1,
        size: 20,
        total: 1,
    },
    timer: null,
});

// 当前 table 列
const column = computed(() => columns(state.pages.size * (state.pages.current - 1), state.tab, state.price_map));

const methods = {
    // 获取列表
    getList(isLoop) {
        if (!isLoop) state.loading = true;
        if (state.timer) clearTimeout(state.timer);

        const params = {
            page: state.page,
            limit: state.pages.size,
        };

        if (state.tab !== 'token') params.type = state.tab;

        const req = state.tab === 'token' ? api.getCoinRank(params) : api.getProjectList(params);

        req.then((res) => {
            if (params.type === state.tab || (!params.type && state.tab === 'token')) {
                state.loading = false;

                if (res.success) {
                    state.pages.current = state.page;
                    state.data = res.data?.result;
                    state.pages.total = res.data?.extra?.stats?.fullCount ?? res.data?.result.length;

                    if (res.data?.result.length) {
                        if (state.tab === 'token') {
                            methods.loop();
                        } else {
                            // 如果不是token获取价格信息
                            methods.getPrice();
                        }
                    }
                } else {
                    if (state.pages.current === 1 && !state.data.length) {
                        state.data = [];
                    }
                    ElMessage.error(res.message);
                }
            }
        });
    },
    // 获取项目价格信息
    getPrice() {
        const tokens = [];
        state.data.forEach((item) => {
            if (item.tokens.length) {
                tokens.push(...item.tokens.map((token) => token.code));
            }
        });
        api.getProjectPrice({ codes: tokens.join(',') }).then((res) => {
            if (res.success && res.data?.result?.length) {
                const map = {};

                res.data.result.forEach((item) => {
                    map[item.token] = item;
                });

                state.price_map = map;
                methods.loop(true);
            }
        });
    },
    // 切换tab
    changeTab() {
        state.data = [];
        state.pages.current = 1;
        state.pages.total = 1;
        state.page = 1;

        methods.getList();
    },
    // 每页显示条目个数修改
    sizeChange(val) {
        state.pages.size = val;
        state.page = 1;
        methods.getList();
    },
    // 页码修改
    pageChange(page) {
        if (page === state.page) return;
        state.page = page;

        methods.getList();
    },
    // 轮训
    loop(isProject) {
        state.timer = setTimeout(() => {
            if (isProject) {
                methods.getPrice();
            } else {
                methods.getList(true);
            }
        }, 40000);
    },
};

methods.getList();

onBeforeUnmount(() => {
    clearTimeout(state.timer);
});
</script>
<style lang="scss" scoped>

.wrapper {
    overflow: initial;

    :deep(.el-table) {
        overflow: initial;

        .el-table__header-wrapper {
            position: sticky;
            top: 0;
            z-index: 1000;
        }
    }
}

.menu {
    margin-bottom: 34px;
}

.pagination {
    padding-top: 28px;
}

</style>
