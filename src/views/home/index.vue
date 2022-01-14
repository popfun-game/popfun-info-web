<template>
    <layout-default>
        <div class="index flex-1">
            <div class="wrapper banner flex-row">
                <img
                    src="@/assets/images/index/banner.jpg"
                    alt="banner"
                >
            </div>
            <div class="wrapper">
                <!-- 滑动模块 -->
                <i-splide class="splide" />
                <!-- 类型table -->
                <category-table active="token" />
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
import categoryTable from '@/components/CategoryTable';
import iSplide from './components/Splide';
import workInfo from './components/WorkInfo';
import iLearn from './components/Learn';
</script>
<style lang="scss" scoped>
.index {
    margin-bottom: 40px;

    .banner {
        margin-bottom: 20px;

        img {
            width: 100%;
        }
    }

    .splide {
        margin-bottom: 45px;
    }
}
</style>
