<!-- 实时行情 -->
<template>
    <section class="flex-row flex-items-center">
        <div class="wrapper">
            <div class="scroller">
                <ul class="flex-shrink-0 flex-row">
                    <li
                        v-for="item in state.list"
                        :key="item.label"
                        class="flex-row flex-items-center"
                    >
                        <span class="label">{{ item.label }}:</span>

                        <i-gwei v-if="item.value && item.tooltip">
                            <a
                                href="javascript:;"
                                class="ml4 flex-row flex-items-center"
                            >
                                {{ item.value }} <el-icon class="ml4"><caret-bottom /></el-icon>
                            </a>
                        </i-gwei>

                        <span
                            v-else-if="item.value"
                            class="value ml4"
                        >
                            {{ item.value }}
                        </span>
                        <span
                            v-else
                            class="ml4"
                        >
                            --
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    </section>
</template>
<script setup>
import { reactive } from 'vue';
import { useI18n } from 'vue-i18n';
import { CaretBottom } from '@element-plus/icons-vue';
import iGwei from './Gwei';

const { t } = useI18n();

const state = reactive({
    list: [
        { label: t('game_fi_crptos'), value: '' },
        { label: t('exchanges'), value: '' },
        { label: t('market_cap'), value: '$2,395,282,218,685' },
        { label: t('24vol'), value: '$73,105,696,693' },
        { label: t('dominance'), value: 'BTC: 40.1% ETH: 20.2%' },
        {
            label: t('gas'),
            value: '41 Gwei',
            tooltip: true,
        },
    ],
});
</script>
<style lang="scss" scoped>
section {
    border-bottom: 1px solid #f2f2f2;
    height: 40px;
    padding-top: 2px;

    li {
        font-size: 12px;
        line-height: 16px;
    }

    li + li {
        margin-left: 24px;
    }

    .label {
        color: var(--text-color-6);
    }

    .value {
        color: var(--main-color);
    }
}
</style>
