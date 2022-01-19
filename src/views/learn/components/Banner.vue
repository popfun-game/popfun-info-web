<template>
    <div class="wrap">
        <div class="banner wrapper flex-row-space-between">
            <div class="main flex-1">
                <h2>{{ t('nav_learn') }}</h2>
                <h3 class="font-bold lh22 fz16">
                    {{ t('learn_sub_title') }}
                </h3>
                <div class="flex-row mt20">
                    <el-input
                        v-model="state.input"
                        :placeholder="t('learn_email_ph')"
                        clearable
                    />
                    <button class="btn-primary ml10">
                        {{ t('btn_subscribe') }}
                    </button>
                </div>
            </div>
            <div class="flex-row-center flex-1 img-box">
                <img
                    src="@/assets/images/learn/strategy.png"
                    alt=""
                    width="217"
                    height="280"
                >
            </div>
        </div>
    </div>
</template>
<script setup>
import { reactive } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const state = reactive({
    input: '',
});
</script>
<style lang="scss" scoped>
.wrap {
    background-color: #05105d;
    height: 350px;

    .banner {
        .main {
            padding-top: 79px;

            h2 {
                font-weight: bold;
                font-size: 56px;
                line-height: 73px;
                color: #fff;
                margin-bottom: 12px;
            }

            h3 {
                color: #fff;
            }
        }

        img {
            margin-top: 40px;
        }
    }

    .el-input {
        max-width: 328px;

        :deep(.el-input__inner) {
            height: 46px;
            font-weight: bold;
            color: var(--text-color-9);
        }
    }

    @media screen and (max-width: 700px) {
        .banner {
            .img-box {
                display: none;
            }
        }
    }
}
</style>
