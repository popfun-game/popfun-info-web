<template>
    <ul class="flex-row flex-wrap">
        <li
            v-for="item in 6"
            :key="item"
        >
            <card />
        </li>
    </ul>

    <div class="btn-wrap flex-row-center">
        <button class="btn-info">
            {{ t('btn_see_all') }}
        </button>
    </div>
</template>
<script setup>
import { useI18n } from 'vue-i18n';
import Card from './Card';

const { t } = useI18n();
</script>
<style lang="scss" scoped>
ul {
    margin: -25px -18px;

    li {
        padding: 25px 18px;
        width: 33.3333%;
    }
}

.btn-wrap {
    margin-top: 54px;

    button {
        min-width: 320px;
    }
}

@media screen and (max-width: 600px) {
    ul li {
        min-width: 100%;
    }
}
</style>
