<template>
    <layout-default>
        <div
            class="flex-1"
            style="margin-bottom: 40px;"
        >
            <a
                href="javascript:;"
                class="wrapper flex-row cursor-default"
                style="margin-bottom: 30px;"
            >
                <auto-img
                    :src="bannerImg"
                    width="100%"
                    height="22.83%"
                    radius="8px"
                />
            </a>
            <div class="wrapper">
                <chart-line />
                <!-- 新闻 -->
                <i-news />
            </div>
            <!-- 类型table -->
            <i-table active="gaming" />
            <div class="wrapper">
                <!-- 工作内容介绍 -->
                <work-info />
                <!-- 学习 -->
                <i-learn />
                <!-- 联系我们 -->
                <contact-us />
            </div>
        </div>
    </layout-default>
</template>
<script setup>
import layoutDefault from '@/components/layouts/Default';
import autoImg from '@/components/AutoImg';
import bannerImg from '@/assets/images/index/banner.jpg';
import ChartLine from '@/components/ChartLine';
import iTable from './components/Table';
import iNews from './components/News';
import workInfo from './components/WorkInfo';
import iLearn from './components/Learn';
import ContactUs from './components/ContactUs';
</script>
