<template>
    <layout-default>
        <section class="flex-1 body-bg">
            <div class="wrapper">
                <infor-menu style="margin-top: 27px;" />
                <ul class="flex-row flex-wrap">
                    <li
                        v-for="(item,index) in state.list"
                        :key="index"
                    >
                        <card :data="item" />
                    </li>
                </ul>

                <div class="btn-wrap flex-row-center">
                    <button
                        v-if="state.show_more"
                        v-loading="state.loading"
                        class="btn-info"
                        @click="methods.getNewList"
                    >
                        {{ t('btn_load_more') }}
                    </button>
                </div>
            </div>
        </section>
    </layout-default>
</template>
<script setup>
import { reactive } from 'vue';
import { useI18n } from 'vue-i18n';
import layoutDefault from '@/components/layouts/Default';
import card from '@/components/Card';
import InforMenu from '@/components/InforMenu';
import { ElMessage } from 'element-plus';
import { api } from '@/config/api';

const { t } = useI18n();
const state = reactive({
    limit: 9,
    page: 0,
    show_more: false,
    loading: false,
    list: [
        {
            link: '',
            img: '',
            title: '--',
        },
        {
            link: '',
            img: '',
            title: '--',
        },
        {
            link: '',
            img: '',
            title: '--',
        },
    ],
});
const methods = {
    // 获取资讯列表
    getNewList() {
        if (state.loading) return;
        state.loading = true;

        api.getArticleList({ limit: state.limit, type: 'strategy', page: state.page + 1 }).then((res) => {
            state.loading = false;

            if (res.success) {
                state.page += 1;

                if (res.data && res.data.result.length) {
                    const cache = res.data.result.slice(0, state.limit).map((item) => {
                        item.img = item.img ? item.img : '--';

                        return item;
                    });

                    state.list = state.page === 1 ? cache : [...state.list, ...cache];
                    state.show_more = res.data.result.length === state.limit;
                } else if (state.page === 1) {
                    methods.setEmptyList();
                } else {
                    state.show_more = false;
                }
            } else {
                ElMessage.error(res.message);

                if (!state.page) methods.setEmptyList();
            }
        });
    },
    // 设置空列表
    setEmptyList() {
        state.list = state.list.map((item) => {
            item.img = '--';
            return item;
        });
    },
    showHtml(val) {
        state.html = val.html;
        state.visible = true;
    },
};

methods.getNewList();
</script>
<style lang="scss" scoped>
section {
    .wrapper {
        position: relative;
        z-index: 2;
        overflow: hidden;
    }

    ul {
        padding-top: 40px;
        padding-bottom: 60px;
        margin: -29px -18px;

        li {
            padding: 29px 18px;
            width: 33.3333%;
        }
    }

    .btn-wrap {
        padding-bottom: 40px;

        button {
            min-width: 320px;
        }
    }

    @media screen and (max-width: 600px) {
        ul li {
            min-width: 100%;
        }
    }
}
</style>
