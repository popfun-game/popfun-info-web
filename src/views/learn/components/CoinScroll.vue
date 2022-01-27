<template>
    <div class="auto-scroll">
        <Splide
            :options="state.options"
            :extensions="{AutoScroll}"
        >
            <SplideSlide
                v-for="(item) in state.list"
                :key="item._id"
            >
                <router-link
                    class="flex-row flex-items-center"
                    :to="replacePath(`/currency/${item.id}`)"
                >
                    <img
                        class="flex-shrink-0 mr10"
                        :src="item.image"
                        :alt="item.symbol"
                        width="24"
                        height="24"
                    >

                    <div class="flex-1 flex-col">
                        <p class="coin">
                            {{ item.name || '--' }}
                        </p>
                        <p class="currency text-uppercase">
                            {{ item.symbol }}
                        </p>
                    </div>
                    <span class="price">
                        {{ toFormat(item.current_price, getPrecision(item.current_price)) }}
                    </span>
                </router-link>
            </SplideSlide>
        </Splide>
    </div>
</template>
<script setup>
import { reactive } from 'vue';
import { replacePath } from '@/lang/i18n';
import { Splide, SplideSlide } from '@splidejs/vue-splide';
import { api } from '@/config/api';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll/dist/js/splide-extension-auto-scroll.cjs';
// eslint-disable-next-line
import '@splidejs/splide/dist/css/splide.min.css';
import { getPrecision } from '@/utils/tool';
import { toFormat } from '@/utils/number';

const state = reactive({
    list: [],
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

// 获取列表
const getList = () => {
    const params = {
        page: 1,
        limit: 20,
        // cat: 'gaming',
    };

    api.getCoinRank(params).then((res) => {
        if (res.success && res.data?.result) {
            state.list = res.data.result;
        }
    });
};

getList();
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
