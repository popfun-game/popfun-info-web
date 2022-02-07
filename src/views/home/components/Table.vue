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
        { id: 'gaming', label: t('menu_game') },
        { id: 'guild', label: t('menu_guild') },
        { id: 'chain', label: t('menu_chain') },
        { id: 'token', label: t('menu_token') },
    ],
    data: [],
    page: 1,
    pages: {
        current: 1,
        size: 20,
        total: 1,
    },
    timer: null,
});

// 当前 table 列
const column = computed(() => columns(state.pages.size * (state.pages.current - 1), state.tab));

const methods = {
    // 获取列表
    getList(isLoop) {
        if (!isLoop) state.loading = true;
        if (state.timer) clearTimeout(state.timer);

        const params = {
            page: state.page,
            limit: state.pages.size,
            cat: state.tab === 'token' ? '' : state.tab,
        };

        api.getCoinRank(params).then((res) => {
            if (params.cat === state.tab || (params.cat === '' && state.tab === 'token')) {
                state.loading = false;

                if (res.success) {
                    state.pages.current = state.page;
                    state.data = res.data?.result;
                    state.pages.total = res.data?.extra?.stats?.fullCount ?? res.data?.result.length;

                    if (res.data?.result.length) methods.loop();
                } else {
                    if (state.pages.current === 1 && !state.data.length) {
                        state.data = [];
                    }
                    ElMessage.error(res.message);
                }
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
    loop() {
        state.timer = setTimeout(() => {
            methods.getList(true);
        }, 30000);
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
