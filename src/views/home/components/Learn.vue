<template>
    <card-title
        :url="replacePath('/learn/')"
        title="nav_learn"
    />
    <div class="list-wrap">
        <ul class="flex-row">
            <li
                v-for="(item, index) in state.list"
                :key="index"
                class="flex-1"
            >
                <a

                    :href="item._key ? replacePath(`/detail/${item._key}?from=home`) : 'javascript:;'"
                    rel="noreferrer nofollow noopener"
                >
                    <auto-img
                        :src="item.img"
                        width="100%"
                        height="61.4754%"
                        radius="8px"
                    />
                    <p class="title fz16 lh22 mt10 text-ellipsis-2">{{ item.title }}</p>
                    <p class="info fz12 lh18 mt6 text-ellipsis">{{ item.summary }}</p>
                </a>
            </li>
        </ul>
    </div>
</template>
<script setup>
import { reactive } from 'vue';
import { replacePath } from '@/lang/i18n';
import { api } from '@/config/api';
import autoImg from '@/components/AutoImg';
import { ElMessage } from 'element-plus';
import cardTitle from './CardTitle';

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
    ],
});

const methods = {
    // 获取资讯列表
    getNewList() {
        api.getArticleList({ limit: 3, type: 'learn' }).then((res) => {
            if (res.success) {
                if (res.data && res.data.result.length) {
                    state.list = res.data.result.slice(0, 3).map((item) => {
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
.list-wrap {
    width: 100%;
    overflow: hidden;

    ul {
        margin-bottom: 40px;

        li {
            width: 20%;

            .title {
                height: 44px;
                color: var(--text-color-3);
            }

            .info {
                color: #5d6c80;
            }
        }

        li:nth-child(2) {
            margin: 0 50px;
        }
    }

    @media screen and (max-width: 700px) {
        ul li:nth-child(2) {
            margin: 0 10px;
        }
    }
}
</style>
