<template>
    <article>
        <h3>{{ t('learn_title_crypto') }}</h3>
        <h4>{{ t('learn_subtitle_crypto') }}</h4>

        <div class="list flex-row flex-wrap">
            <a
                v-for="item in 6"
                :key="item"
                href=""
            >
                <h4>Falling Knife</h4>
                <p class="text-ellipsis-3">
                    A falling knife refers to the price dive of an asset and denotes a downward momentum of the financial market.a
                    downward momentum of the financial market.
                </p>

                <span class="fz14 lh22 font-bold flex-row flex-items-center">
                    {{ t('text_btn_full_definition') }}
                    <el-icon
                        size="12"
                        class="ml6"
                    >
                        <arrow-right />
                    </el-icon>
                </span>
            </a>
        </div>
    </article>
</template>
<script setup>
import { useI18n } from 'vue-i18n';
import { ArrowRight } from '@element-plus/icons-vue';

const { t } = useI18n();
</script>
<style lang="scss" scoped>
article {
    margin-top: 80px;
    overflow: hidden;
    word-break: break-word;

    .color-0 {
        color: var(--text-color-0);
    }

    h3 {
        font-weight: bold;
        font-size: 28px;
        line-height: 22px;
        color: var(--text-color-0);
        margin-bottom: 18px;
    }

    .list {
        margin: 50px -18px -25px;

        a {
            padding: 25px 18px;
            width: 33.3333%;

            h4 {
                font-weight: bold;
                font-size: 22px;
                line-height: 28px;
                color: var(--text-color-1);
                margin-bottom: 16;
            }

            p {
                font-size: 16px;
                line-height: 22px;
                color: var(--text-color-6);
                margin-bottom: 20px;
            }

            span {
                i {
                    margin-top: 1px;
                }
            }
        }
    }

    @media screen and (max-width: 600px) {
        .list a {
            min-width: 100%;
        }
    }
}
</style>
