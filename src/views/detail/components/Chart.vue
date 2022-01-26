<!-- 图表 -->
<template>
    <div class="coin-chart flex-1 pt20">
        <h3 class="font-bold fz22 lh22 flex-row flex-items-center">
            <i class="title-mark mr6" />
            {{ t('chart_usd_title', { fullname: detail.name }) }}
        </h3>

        <chart />

        <el-checkbox-group
            v-model="state.checked_list"
            class="mt10"
            :min="1"
        >
            <el-checkbox
                v-for="city in state.coins"
                :key="city"
                :label="city"
            >
                {{ city }}
            </el-checkbox>
        </el-checkbox-group>
    </div>
</template>
<script setup>
import { defineProps, reactive } from 'vue';
import { useI18n } from 'vue-i18n';
import Chart from '@/components/Chart';

defineProps({
    detail: {
        type: Object,
        default() {
            return {};
        },
    },
});

const { t } = useI18n();
const state = reactive({
    checked_list: ['USD'],
    coins: ['USD', 'BTC'],
});
</script>
<style lang="scss" scoped>
.coin-chart {
    h3 {
        color: var(--text-color-1);
        padding-bottom: 32px;
    }
}

.chart {
    height: 398px;
}
</style>
