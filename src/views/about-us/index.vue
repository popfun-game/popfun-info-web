<template>
    <layout-default>
        <section class="flex-1">
            <div class="wrapper ">
                <div class="banner">
                    <auto-img
                        height="19.75%"
                        :src="imgBanner"
                        radius="8px"
                    />
                    <h2>{{ t('about_us_title') }}</h2>
                </div>

                <div class="map-wrap flex-row flex-wrap">
                    <div class="map">
                        <auto-img
                            height="50.73%"
                            :src="imgMap"
                        />
                    </div>
                    <div class="flex-1">
                        <h3>{{ t('nav_about_us') }}</h3>
                        <p v-html="t('about_us_desc')" />
                    </div>
                </div>
            </div>

            <products-services />

            <div class="wrapper">
                <media
                    :title="t('au_investors')"
                    :list="state.investors"
                    style="margin-top: 104px;"
                />
                <media
                    :title="t('au_partner')"
                    :list="state.partner"
                    style="margin-top: 104px;"
                />
            </div>

            <div class="footer flex-col flex-items-center">
                <p>{{ t('au_footer_desc') }}</p>
                <button class="btn-primary">
                    {{ t('btn_contact_us') }}
                </button>
            </div>
        </section>
    </layout-default>
</template>
<script setup>
import { reactive } from 'vue';
import { useI18n } from 'vue-i18n';
import layoutDefault from '@/components/layouts/Default';
import autoImg from '@/components/AutoImg';
import imgBanner from '@/assets/images/aboutUs/banner.png';
import imgMap from '@/assets/images/aboutUs/map.png';
import productsServices from './components/ProductsServices';
import Media from './components/Media';

/* eslint-disable global-require */
const { t } = useI18n();
const state = reactive({
    investors: [
        { img: require('@/assets/images/aboutUs/icon-01.png'), href: '' },
        { img: require('@/assets/images/aboutUs/icon-02.png'), href: '' },
        { img: require('@/assets/images/aboutUs/icon-03.png'), href: '' },
        { img: require('@/assets/images/aboutUs/icon-04.png'), href: '' },
        { img: require('@/assets/images/aboutUs/icon-05.png'), href: '' },
        { img: require('@/assets/images/aboutUs/icon-06.png'), href: '' },
        { img: require('@/assets/images/aboutUs/icon-07.png'), href: '' },
        { img: require('@/assets/images/aboutUs/icon-08.png'), href: '' },
        { img: require('@/assets/images/aboutUs/icon-09.png'), href: '' },
        { img: require('@/assets/images/aboutUs/icon-10.png'), href: '' },
        { img: require('@/assets/images/aboutUs/icon-11.png'), href: '' },
        { img: require('@/assets/images/aboutUs/icon-12.png'), href: '' },
    ],
    partner: [
        { img: require('@/assets/images/aboutUs/icon-01.png'), href: '' },
        { img: require('@/assets/images/aboutUs/icon-02.png'), href: '' },
        { img: require('@/assets/images/aboutUs/icon-03.png'), href: '' },
        { img: require('@/assets/images/aboutUs/icon-04.png'), href: '' },
        { img: require('@/assets/images/aboutUs/icon-05.png'), href: '' },
        { img: require('@/assets/images/aboutUs/icon-06.png'), href: '' },
        { img: require('@/assets/images/aboutUs/icon-07.png'), href: '' },
        { img: require('@/assets/images/aboutUs/icon-08.png'), href: '' },
        { img: require('@/assets/images/aboutUs/icon-09.png'), href: '' },
        { img: require('@/assets/images/aboutUs/icon-10.png'), href: '' },
        { img: require('@/assets/images/aboutUs/icon-11.png'), href: '' },
        { img: require('@/assets/images/aboutUs/icon-12.png'), href: '' },
    ],
});
/* eslint-enable global-require */
</script>
<style lang="scss" scoped>
section {
    padding-top: 40px;

    .banner {
        position: relative;

        h2 {
            position: absolute;
            left: 16.66%;
            top: 50%;
            transform: translateY(-50%);
            z-index: 1;
            font-size: 28px;
            line-height: 36px;
            color: #fff;
        }
    }

    .map-wrap {
        margin-top: 88px;

        .map {
            width: 55.24%;
            margin-right: 62px;
        }

        h3 {
            font-weight: bold;
            font-size: 36px;
            line-height: 47px;
            color: var(--text-color-0);
            margin-bottom: 14px;
        }

        p {
            font-size: 16px;
            line-height: 30px;
            color: var(--text-color-6);
        }
    }

    .footer {
        background-color: #f9fbff;
        min-height: 233px;
        margin-top: 91px;
        padding-top: 63px;

        p {
            font-weight: bold;
            font-size: 18px;
            line-height: 23px;
            color: var(--text-colot-0);
            margin-bottom: 38px;
            padding: 0 20px;
        }
    }

    @media screen and (max-width: 700px) {
        .map-wrap .map {
            width: 100%;
            margin-right: 0;
            margin-bottom: 30px;
        }

        .banner {
            h2 {
                font-size: 16px;
            }
        }
    }
}
</style>
