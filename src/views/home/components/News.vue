<template>
    <ul class="flex-row flex-wrap">
        <li
            v-for="(item, index) in state.list"
            :key="index"
            class="card"
        >
            <router-link
                :to="replacePath(`/detail/${item._key}/?from=home`)"
            >
                <auto-img
                    :src="item.img"
                    width="100%"
                    height="61.51%"
                    radius="8px"
                    :title="item.title"
                />
                <p class="title fz12 lh22 text-ellipsis">
                    {{ item.title }}
                </p>
                <p class="info fz14 lh22 font-bold text-ellipsis">
                    {{ item.summary }}
                </p>
            </router-link>
        </li>
    </ul>
</template>
<script setup>
import { reactive } from 'vue';
import { api } from '@/config/api';
import autoImg from '@/components/AutoImg';
import { ElMessage } from 'element-plus';
import { replacePath } from '@/lang/i18n';

const state = reactive({
    list: [
        {
            link: '',
            img: '',
            title: '--',
            summary: '--',
        },
        {
            link: '',
            img: '',
            title: '--',
            summary: '--',
        },
        {
            link: '',
            img: '',
            title: '--',
            summary: '--',
        },
        {
            link: '',
            img: '',
            title: '--',
            summary: '--',
        },
    ],
});

const methods = {
    // 获取资讯列表
    getNewList() {
        api.getHomeNews().then((res) => {
            if (res.success) {
                if (res.data && res.data.result.length) {
                    state.list = res.data.result.slice(0, 4).map((item) => {
                        item.img = item.img ? item.img : '--';

                        return item;
                    });
                } else {
                    methods.setEmptyList();
                }
            } else {
                ElMessage.error(res.message);

                methods.setEmptyList();
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
};

methods.getNewList();
</script>
<style lang="scss" scoped>
ul {
    margin: -10px -15px;
    min-height: 244px;
    margin-bottom: 30px;

    .card {
        padding: 10px 15px;
        overflow: hidden;
        width: 25%;

        a {
            display: block;
        }

        .title {
            padding-top: 10px;
            color: var(--text-color-9);
        }

        .info {
            color: var(--text-color-3);
        }
    }

    @media screen and (max-width: 700px) {
        .card {
            width: 50%;
        }
    }
}
</style>
