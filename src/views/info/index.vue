<template>
    <layout-default>
        <section class="flex-1">
            <div class="wrapper">
                <ul class="flex-row flex-wrap">
                    <li
                        v-for="item in 20"
                        :key="item"
                    >
                        <card />
                    </li>
                </ul>

                <div class="btn-wrap flex-row-center">
                    <button class="btn-info">
                        {{ t('btn_load_more') }}
                    </button>
                </div>
            </div>
        </section>
    </layout-default>
</template>
<script setup>
import { useI18n } from 'vue-i18n';
import layoutDefault from '@/components/layouts/Default';
import card from '@/components/Card';

const { t } = useI18n();
</script>
<style lang="scss" scoped>
section {
    position: relative;

    .wrapper {
        position: relative;
        z-index: 2;
        overflow: hidden;
    }

    ul {
        padding-top: 40px;
        padding-bottom: 60px;
        margin: -29px -18px;

        li {
            padding: 29px 18px;
            width: 33.3333%;
        }
    }

    &::before {
        content: '';
        position: absolute;
        width: 100%;
        height: 462px;
        left: 0;
        top: 0;
        z-index: 1;
        background: linear-gradient(180deg, #f9fbff 0%, #fff 100%);
    }

    .btn-wrap {
        padding-bottom: 40px;

        button {
            width: 320px;
        }
    }

    @media screen and (max-width: 600px) {
        ul li {
            min-width: 100%;
        }
    }
}
</style>
