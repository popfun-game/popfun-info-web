<template>
    <article class="flex-row flex-wrap">
        <div class="title flex-1">
            {{ t('learn_our_mission') }}
        </div>
        <div class="detail">
            <ul class="flex-row-space-between">
                <li>
                    <strong>2154</strong>
                    <p class="lh22 font-bold">
                        {{ t('learn_articles') }}
                    </p>
                </li>
                <li>
                    <strong>2154</strong>
                    <p class="lh22 font-bold">
                        {{ t('learn_terms') }}
                    </p>
                </li>
                <li>
                    <strong>2154</strong>
                    <p class="lh22 font-bold">
                        {{ t('learn_auth') }}
                    </p>
                </li>
            </ul>
            <div
                class="fz16 lh22 font-bold"
                v-html="t('learn_our_desc')"
            />
        </div>
    </article>
</template>
<script setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>
<style lang="scss" scoped>
article {
    margin-top: 90px;
    padding-bottom: 100px;

    .title {
        font-weight: bold;
        font-size: 28px;
        line-height: 22px;
        color: var(--text-color-0);
        padding-bottom: 40px;
    }

    .detail {
        color: var(--text-color-3);
        word-break: break-word;
        max-width: 66.66%;

        ul {
            margin-bottom: 40px;
        }

        li {
            width: 33.33%;
        }

        strong {
            font-weight: bold;
            font-size: 28px;
            line-height: 36px;
            color: var(--main-color);
        }
    }

    @media screen and (max-width: 700px) {
        .detail {
            min-width: 100%;
        }
    }
}
</style>
