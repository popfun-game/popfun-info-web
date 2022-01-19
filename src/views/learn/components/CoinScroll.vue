<template>
    <div class="auto-scroll">
        <Splide
            :options="state.options"
            :extensions="{AutoScroll}"
        >
            <SplideSlide
                v-for="(item) in list"
                :key="item.coin"
            >
                <router-link
                    class="flex-row flex-items-center"
                    :to="replacePath(`/currency/${item.coin}`)"
                >
                    <img
                        class="flex-shrink-0 mr10"
                        :src="item.icon"
                        alt=""
                        width="24"
                        height="24"
                    >
                    <div class="flex-1 flex-col">
                        <p class="coin">
                            {{ item.coin }}
                        </p>
                        <p class="currency">
                            {{ item.currency }}
                        </p>
                    </div>
                    <span class="price">
                        {{ item.price }}
                    </span>
                </router-link>
            </SplideSlide>
        </Splide>
    </div>
</template>
<script setup>
import { defineProps, reactive } from 'vue';
import { replacePath } from '@/lang/i18n';
import { Splide, SplideSlide } from '@splidejs/vue-splide';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll/dist/js/splide-extension-auto-scroll.cjs';
// eslint-disable-next-line
import '@splidejs/splide/dist/css/splide.min.css';

defineProps({
    list: {
        type: Array,
        required: true,
    },
});

const state = reactive({
    options: {
        type: 'loop',
        autoWidth: true,
        pagination: false,
        arrows: false,
        autoplay: false,
        drag: 'free',
        autoScroll: {
            speed: 1.2,
        },
    },
});
</script>
<style lang="scss" scoped>
.auto-scroll {
    background-color: #f9fcff;
    overflow: hidden;

    a {
        height: 80px;
        margin-right: 40px;
    }

    .coin {
        font-weight: bold;
        font-size: 14px;
        line-height: 18px;
        color: var(--text-color-1);
    }

    .currency {
        font-size: 14px;
        line-height: 18px;
        color: var(--text-color-9);
    }

    .price {
        font-weight: bold;
        font-size: 14px;
        line-height: 22px;
        color: var(--text-color-1);
        margin-left: 18px;
    }
}
</style>
