<template>
    <layout-default>
        <div
            class="flex-1 body-bg pt20"
            style="margin-bottom: 40px;"
        >
            <a
                :href="replacePath('/igo/')"
                class="banner wrapper flex-row"
                style="margin-bottom: 30px;"
            >
                <auto-img
                    :src="bannerImg"
                    width="100%"
                    height="22.83%"
                    radius="8px"
                />
                <div class="banner-title">
                    <h1>STARRYNIFT</h1>
                    <p>Collect play earn</p>
                </div>
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

                <!-- igo -->
                <i-igo />

                <!--nft -->
                <!-- <i-nft /> -->
                <div style="margin-top: 44px;">
                    <auto-img
                        :src="nftComingSoonImg"
                        width="100%"
                        height="26.666%"
                        radius="8px"
                    />
                </div>

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
import { replacePath } from '@/lang/i18n';
import nftComingSoonImg from '@/assets/images/index/nft-coming-soon.png';
import iTable from './components/Table';
import iNews from './components/News';
import workInfo from './components/WorkInfo';
import iLearn from './components/Learn';
import iIgo from './components/Igo';
// import iNft from './components/Nft';
import ContactUs from './components/ContactUs';
</script>
<style lang="scss" scoped>
.banner {
    position: relative;

    .banner-title {
        text-align: center;
        color: #fff;
        position: absolute;
        bottom: 0;
        left: 50%;
        z-index: 1;
        transform: translateX(-50%);

        h1 {
            font-size: 48px;
            font-weight: bold;
            line-height: 58px;
            margin-bottom: 4px;
        }

        p {
            font-size: 18px;
            padding-bottom: 25px;
        }
    }

    @media screen and (max-width: 700px) {
        .banner-title {
            h1 {
                font-size: 24px;
                line-height: 30px;
            }

            p {
                font-size: 12px;
                padding-bottom: 10px;
            }
        }
    }
}
</style>
