<template>
    <Splide
        :options="state.options"
        @splide:move="handleChange"
    >
        <SplideSlide
            v-for="(item, index) in state.list"
            :key="index"
        >
            <a
                :href="item.href"
                rel="noreferrer nofollow noopener"
                target="_blank"
                class="card"
            >
                <div class="card-con flex-col-space-between">
                    <img
                        src="@/assets/images/index/banner.jpg"
                        alt="Sample 1"
                    >
                    <p class="title fz12 text-ellipsis">{{ item.title }}</p>
                    <p class="info fz14 font-bold text-ellipsis">{{ item.sub }}</p>
                </div>
            </a>
        </SplideSlide>
    </Splide>
</template>
<script setup>
import { reactive } from 'vue';
import { Splide, SplideSlide } from '@splidejs/vue-splide';
// eslint-disable-next-line
import '@splidejs/splide/dist/css/splide.min.css';

const state = reactive({
    options: {
        perPage: 4,
        gap: 20,
        pagination: false,
        padding: {
            right: '15%',
        },
        classes: {
            arrow: 'splide__arrow splide-arrow',
        },
    },
    list: [
        {
            href: 'http://www.baidu.com',
            img: '',
            title: '1111sldfjsdlfjsdalfjsdalfjsd',
            sub: '111sadlfjsalkdfjsadlfjsdalfjsadlfjsdalfj',
        },
        {
            href: 'http://www.baidu.com',
            img: '',
            title: '2sldfjsdlfjsdalfjsdalfjsd',
            sub: '2sadlfjsalkdfjsadlfjsdalfjsadlfjsdalfj',
        },
        {
            href: 'http://www.baidu.com',
            img: '',
            title: '3sldfjsdlfjsdalfjsdalfjsd',
            sub: '4sadlfjsalkdfjsadlfjsdalfjsadlfjsdalfj',
        },
        {
            href: 'http://www.baidu.com',
            img: '',
            title: '4sldfjsdlfjsdalfjsdalfjsd',
            sub: '4sadlfjsalkdfjsadlfjsdalfjsadlfjsdalfj',
        },
        {
            href: 'http://www.baidu.com',
            img: '',
            title: '5sldfjsdlfjsdalfjsdalfjsd',
            sub: '5sadlfjsalkdfjsadlfjsdalfjsadlfjsdalfj',
        },
        {
            href: 'http://www.baidu.com',
            img: '',
            title: '6sldfjsdlfjsdalfjsdalfjsd',
            sub: '6sadlfjsalkdfjsadlfjsdalfjsadlfjsdalfj',
        },
        {
            href: 'http://www.baidu.com',
            img: '',
            title: '6sldfjsdlfjsdalfjsdalfjsd',
            sub: '6sadlfjsalkdfjsadlfjsdalfjsadlfjsdalfj',
        },
        {
            href: 'http://www.baidu.com',
            img: '',
            title: '6sldfjsdlfjsdalfjsdalfjsd',
            sub: '6sadlfjsalkdfjsadlfjsdalfjsadlfjsdalfj',
        },
        {
            href: 'http://www.baidu.com',
            img: '',
            title: '6sldfjsdlfjsdalfjsdalfjsd',
            sub: '6sadlfjsalkdfjsadlfjsdalfjsadlfjsdalfj',
        },
    ],
});

// 监听切换卡片
const handleChange = (splide, newIndex) => {
    state.options.padding.right = newIndex ? '' : '15%';
    state.options.padding.left = newIndex ? '15%' : '';
};

</script>
<style lang="scss" scoped>
:deep(.splide-arrow) {
    background-color: rgba(0, 0, 0, 0.4);
    margin-top: -26px;

    &[disabled] {
        display: none;
    }

    svg {
        fill: #fff;
        width: 1em;
        height: 1em;
    }
}

.card {
    width: 100%;
    display: block;
    padding-bottom: 84.17%;
    position: relative;

    .card-con {
        position: absolute;
        width: 100%;
        top: 0;
        bottom: 0;

        img {
            border-radius: 8px;
            width: 100%;
            height: 73.3%;
            max-height: 148px;
            object-fit: cover;
        }

        .title {
            padding-top: 4%;
            color: var(--text-color-9);
            min-height: 12px;
        }

        .info {
            color: var(--text-color-3);
            min-height: 14px;
        }

        @media screen and (max-width: 400px) {
            .title,
            .info {
                transform: scale(0.8);
            }
        }
    }
}
</style>
