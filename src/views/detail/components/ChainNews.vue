<template>
    <div class="list">
        <h3 class="flex-row-space-between flex-items-center font-bold lh24">
            <span class="fz24">{{ t('information') }}</span>
            <router-link
                :to="replacePath('/information/')"
                class="flex-row flex-items-center fz16"
            >
                {{ t('btn_text_more') }}
                <el-icon
                    class="ml4 flex-shrink-0"
                    size="12"
                    color="var(--main-color)"
                >
                    <arrow-right />
                </el-icon>
            </router-link>
        </h3>
        <ul class="flex-row flex-wrap">
            <li
                v-for="(item,index) in state.list"
                :key="index"
                class="flex-1"
            >
                <card :data="item" />
            </li>
        </ul>
    </div>
</template>
<script setup>
import { defineProps, reactive } from 'vue';
import card from '@/components/Card';
import { api } from '@/config/api';
import { ElMessage } from 'element-plus';
import { useI18n } from 'vue-i18n';
import { ArrowRight } from '@element-plus/icons-vue';
import { replacePath } from '@/lang/i18n';

defineProps({
    detail: {
        type: Object,
        default() {
            return {};
        },
    },
});

const { t } = useI18n();
const state = reactive({
    list: [
        {
            link: '',
            img: '',
            title: '--',
            type: 'news',
        },
        {
            link: '',
            img: '',
            title: '--',
            type: 'news',
        },
        {
            link: '',
            img: '',
            title: '--',
            type: 'news',
        },
        {
            link: '',
            img: '',
            title: '--',
            type: 'news',
        },
    ],
});

const methods = {
    // 获取资讯列表
    getNewList() {
        api.getArticleList({ limit: 4, type: 'news', page: 1 }).then((res) => {
            if (res.success) {
                if (res.data && res.data.result.length) {
                    const cache = res.data.result.slice(0, 4).map((item) => {
                        item.img = item.img ? item.img : '--';

                        return item;
                    });

                    state.list = cache;
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
.list {
    margin-bottom: 48px;

    h3 {
        height: 38px;
        margin-bottom: 20px;

        .el-icon {
            margin-top: 2px;
        }
    }

    ul {
        margin: -15px;

        li {
            padding: 15px;
        }
    }
}

@media screen and (max-width: 700px) {
    ul li {
        min-width: 50%;
    }
}
</style>
