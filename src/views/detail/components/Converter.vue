<!-- 当前币种折合u -->
<template>
    <h3 class="flex-row flex-items-center font-bold fz22 lh22">
        <i class="title-mark mr6" />
        {{ t('to_converter', { coin: detail.symbol ? detail.symbol.toUpperCase() : '--' }) }}
    </h3>

    <div class="translate flex-row flex-wrap">
        <div class="from flex-row flex-items-center pl24">
            <auto-img
                :src="detail.image?.small"
                width="32px"
                height="32px"
                :alt="detail.symbol"
                class="flex-shrink-0"
            />
            <span class="font-bold ml12 flex-1">
                <p class="lh22 color-6 text-uppercase">{{ detail.symbol ?? '--' }}</p>
                <p class="fz16 lh22 color-1 text-capitalize">{{ detail.name ?? '--' }}</p>
            </span>
            <span class="fz20 lh22 font-bold color-1">1</span>
        </div>
        <el-icon
            color="#444"
            size="16"
        >
            <Switch />
        </el-icon>
        <div class="target flex-row flex-items-center pr24">
            <svg-icon name="usd" />
            <span class="font-bold ml12 flex-1">
                <p class="lh22 color-6">USD</p>
                <p class="fz16 lh22 color-1 text-ellipsis">United States Dollar</p>
            </span>
            <span class="fz20 lh22 font-bold color-1">{{ detail.simple_price?.usd ? toFormat(detail.simple_price?.usd) : '--' }}</span>
        </div>
    </div>
</template>
<script setup>
import { defineProps } from 'vue';
import { useI18n } from 'vue-i18n';
import { Switch } from '@element-plus/icons-vue';
import { toFormat } from '@/utils/number';
import autoImg from '@/components/AutoImg';
import svgIcon from '@/components/SvgIcon';

defineProps({
    detail: {
        type: Object,
        default() {
            return {};
        },
    },
});
const { t } = useI18n();
</script>
<style lang="scss" scoped>
h3 {
    margin-bottom: 30px;
}

.translate {
    position: relative;
    border: 2px solid #eaeaea;
    border-radius: 8px;
    overflow: hidden;

    .color-1 {
        color: var(--text-color-1);
    }

    .color-6 {
        color: var(--text-color-6);
    }

    .el-icon {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        z-index: 10;
    }

    .from {
        width: 50%;
        padding-right: 30px;
        height: 90px;
    }

    .target {
        width: 50%;
        background-color: #f9fbff;
        padding-left: 30px;
        height: 90px;
    }

    @media screen and (max-width: 700px) {
        .from,
        .target {
            width: 100%;
        }
    }
}
</style>
