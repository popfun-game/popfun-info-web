<template>
    <layout-default>
        <div class="index flex-1">
            <a
                href="javascript:;"
                class="wrapper banner flex-row cursor-default"
            >
                <img
                    src="@/assets/images/index/banner.jpg"
                    alt="banner"
                >
            </a>
            <div class="wrapper">
                <!-- 滑动模块 -->
                <i-splide class="splide" />
                <!-- 类型table -->
                <i-table active="token" />
                <!-- 工作内容介绍 -->
                <work-info />
                <!-- 学习 -->
                <i-learn />
            </div>
        </div>
    </layout-default>
</template>
<script setup>
import layoutDefault from '@/components/layouts/Default';
import iTable from './components/Table';
import iSplide from './components/Splide';
import workInfo from './components/WorkInfo';
import iLearn from './components/Learn';
</script>
<style lang="scss" scoped>
.index {
    margin-bottom: 40px;

    .banner {
        margin-bottom: 30px;

        img {
            width: 100%;
        }
    }

    .splide {
        margin-bottom: 40px;
    }
}
</style>
