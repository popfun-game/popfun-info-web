<!-- 市值列表 -->
<template>
    <ul class="flex-row flex-wrap">
        <li
            v-for="item in state.list"
            :key="item.label"
            class="flex-1 pt14 pr6 pl16"
        >
            <el-tooltip
                ref="tooltip"
                placement="bottom"
                effect="light"
                popper-class="reset-tooltip"
                :disabled="!item.tip"
            >
                <template #content>
                    <div
                        class="tooltip-con"
                        v-html="t(item.tip)"
                    />
                </template>
                <span
                    class="label lh22 font-bold fz12"
                    :class="{'has-tip': item.tip}"
                >
                    {{ t(item.label) }}
                </span>
            </el-tooltip>

            <p class="num font-bold lh22 color-1 mt8">
                $810,736,593,254
            </p>
            <el-progress
                v-if="item.progress"
                :percentage="30"
                color="#ccc"
                class="lh22 font-bold mt8"
            />
            <p
                v-else
                class="flex-row flex-items-center color-up lh22 font-bold mt8"
            >
                <i class="icon-up fz12" />0.15%
            </p>
        </li>
        <li class="flex-1 pt14 pr6 pl16">
            <div class="flex-row-space-between flex-items-center">
                <el-tooltip
                    ref="tooltip"
                    placement="bottom"
                    effect="light"
                    popper-class="reset-tooltip"
                >
                    <template #content>
                        <div
                            class="tooltip-con"
                            v-html="t('max_supply_tip')"
                        />
                    </template>
                    <span class="label has-tip lh22 font-bold fz12">{{ t('max_supply') }}</span>
                </el-tooltip>
                <span class="num">21,000,000</span>
            </div>
            <div class="flex-row-space-between flex-items-center mt8">
                <el-tooltip
                    ref="tooltip"
                    placement="bottom"
                    effect="light"
                    popper-class="reset-tooltip"
                >
                    <template #content>
                        <div
                            class="tooltip-con"
                            v-html="t('total_supply_tip')"
                        />
                    </template>
                    <span class="label has-tip lh22 font-bold fz12">{{ t('total_supply') }}</span>
                </el-tooltip>
                <span class="num">21,000,000</span>
            </div>
        </li>
    </ul>
</template>
<script setup>
import { reactive } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const state = reactive({
    list: [
        { value: '', label: 'market_cap', tip: 'market_cap_tip' },
        { value: '', label: 'fd_market_cap', tip: 'fd_market_cap_tip' },
        { value: '', label: 'volume', tip: 'volume_tip' },
        { value: '', label: 'vol_market_cap' },
        {
            value: '',
            label: 'circulating_supply',
            tip: 'circulating_supply_tip',
            progress: true,
        },
    ],
});
</script>
<style lang="scss" scoped>
.color-1 {
    color: var(--text-color-1);
}

ul {
    li {
        width: 200px;
        background-color: #f9fbff;
        height: 116px;
        position: relative;
        border-top: 1px solid rgba(0, 0, 0, 0.05);

        .label {
            color: var(--text-color-6);
            display: inline-block;

            &.has-tip {
                border-bottom: 1px dashed var(--text-color-6);
                cursor: pointer;
            }
        }

        &:not(:first-child)::before {
            content: "";
            position: absolute;
            width: 1px;
            background-color: rgba(0, 0, 0, 0.05);
            top: 0;
            left: 0;
            bottom: 11px;
        }
    }
}

.tooltip-con {
    max-width: 300px;
    color: var(--text-color-6);
    line-height: 16px;
}

:deep(.el-progress) {
    height: 22px;

    .el-progress__text {
        font-size: 12px !important;
        font-weight: bold;
        color: var(--text-color-6);
        margin-left: 12px;
    }
}
</style>
