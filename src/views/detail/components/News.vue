<!-- 新闻模块 -->

<template>
    <div class="title flex-row-space-between flex-items-center">
        <h3 class="flex-row flex-items-center font-bold fz22 lh22">
            <i class="title-mark mr6" />
            {{ t('news_title', { fullname: name || '' }) }}
        </h3>
        <router-link
            :to="replacePath(`/information/`)"
            class="flex-row flex-items-center font-bold lh22"
        >
            {{ t('text_btn_read_more') }}
            <el-icon class="ml4">
                <arrow-right />
            </el-icon>
        </router-link>
    </div>
    <div class="flex-row flex-wrap">
        <news-card
            class="col-l flex-1"
            :data="state.list[0]"
            :name="name"
            :icon="icon"
        />
        <div class="flex-1">
            <news-card
                v-for="(item, index) in state.list.slice(1)"
                :key="item"
                :vertical="false"
                :data="item"
                :name="name"
                :icon="icon"
                :style="{'margin-top': index !== 0 ? '44px' : ''}"
            />
        </div>
    </div>
    <div class="flex-row-center">
        <router-link
            :to="replacePath(`/information/`)"
            class="btn-info flex-row-center flex-items-center"
        >
            {{ t('text_btn_read_more') }}
        </router-link>
    </div>
</template>
<script setup>
import { defineProps, reactive } from 'vue';
import { useI18n } from 'vue-i18n';
import { replacePath } from '@/lang/i18n';
import { ArrowRight } from '@element-plus/icons-vue';
import { api } from '@/config/api';
import { ElMessage } from 'element-plus';
import newsCard from './NewsCard';

const props = defineProps({
    coin: {
        type: String,
        default: '',
    },
    name: {
        type: String,
        default: '',
    },
    icon: {
        type: String,
        default: '',
    },
});

const { t } = useI18n();
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
        if (!props.coin) return;

        api.getArticleList({ limit: 4, type: 'news', coin: props.coin }).then((res) => {
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
.title {
    margin-bottom: 60px;
}

.col-l {
    max-width: 540px;
    margin-right: 40px;
}

.btn-info {
    min-width: 320px;
    margin-top: 40px;
}

@media screen and (max-width: 700px) {
    .col-l {
        min-width: 100%;
        margin-bottom: 40px;
    }
}
</style>
