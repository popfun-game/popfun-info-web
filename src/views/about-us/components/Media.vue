<template>
    <article>
        <h3>{{ title }}</h3>
        <div class="list flex-row flex-wrap">
            <a
                v-for="(item,index) in list"
                :key="index"
                href="javascript::"
                :style="{'background-image': `url(${item.img})`}"
            />
        </div>
    </article>
</template>
<script setup>
import { defineProps } from 'vue';

defineProps({
    title: {
        type: String,
        default: '',
    },
    list: {
        type: Array,
        default() {
            return [];
        },
    },
});
</script>
<style lang="scss" scoped>
article {
    h3 {
        font-weight: 600;
        font-size: 36px;
        line-height: 47px;
        color: var(--text-color-0);
        text-align: center;
        margin-bottom: 60px;
    }

    .list {
        margin: -25px -24px;

        a {
            margin: 25px 24px;
            width: 200px;
            height: 45px;
            background: center/contain no-repeat;
        }
    }
}
</style>
