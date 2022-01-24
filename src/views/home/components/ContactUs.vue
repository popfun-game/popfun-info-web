<!-- 联系我们 -->
<template>
    <article class="flex-row flex-items-center">
        <div class="info">
            <h3>{{ t('contact_us_t') }}</h3>
            <p>{{ t('contact_us_desc') }}</p>
            <a
                href="https://www.baidu.com"
                target="_blank"
                class="btn-primary flex-row-center flex-items-center"
            >
                {{ t('btn_contact_us') }}
            </a>
        </div>
        <div class="img">
            <auto-img
                :src="img"
                width="100%"
                height="67.713%"
            />
        </div>
    </article>
</template>
<script setup>
import { useI18n } from 'vue-i18n';
import autoImg from '@/components/AutoImg';
import img from '@/assets/images/index/contact-us.png';

const { t } = useI18n();
</script>
<style lang="scss" scoped>
article {
    background-color: #f8fafd;
    min-height: 399px;
    position: relative;

    .info {
        padding-left: 53px;
        position: relative;
        z-index: 2;
        max-width: 774px;

        h3 {
            font-size: 32px;
            color: var(--text-color-0);
            margin-bottom: 25px;
            font-weight: bold;
        }

        p {
            font-size: 16px;
            line-height: 28px;
            color: var(--text-color-6);
            margin-bottom: 25px;
        }

        .btn-primary {
            color: #fff;
            display: inline-flex;
        }
    }

    .img {
        width: 37.16%;
        position: absolute;
        right: 11px;
    }
}
</style>
