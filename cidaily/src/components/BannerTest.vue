<script setup>
import { reactive, ref, onMounted, defineProps } from 'vue'
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, Autoplay } from "swiper/modules"
import "swiper/css"
import "swiper/css/pagination";
import "swiper/css/autoplay";
// import router from '../router';
import { useRouter } from 'vue-router'


// 定义需要使用的Swiper模块
const modules = reactive([Pagination, Autoplay]);

// 定义组件的props，接收一个名为topStories的数组
let props = defineProps({
    topStories: Array
})
// console.log("组件的props数据==>", props.topStories);

// 获取vue-router实例
let router = useRouter();

</script>


<template>
    <div>
        <!-- 使用Swiper组件，配置了分页器和自动播放功能 -->
        <Swiper class="swiper" :modules="modules" :pagination="{ clickable: true }"
            :autoplay="{ delay: 2000, disableOnInteraction: false }">

            <!-- 遍历topStories数组，每个故事对应一个SwiperSlide -->
            <SwiperSlide v-for="item in props.topStories" :key="item.id">
                <div class="banner">
                    <!-- 使用vue-router的动态路由匹配，将用户导向故事的详细页面 -->
                    <RouterLink :to="`/detail/${item.id}`" class="banner-image">
                        <img v-bind:src="item.image" class="slide-image" />
                    </RouterLink>
                    <div class="caption"
                        :style="{ backgroundImage: `linear-gradient(to top,${item.image_hue.replace('0x', '#')},rgba(251,235,253,0.1))` }">
                        <h1 class="slide-title">{{ item.title }}</h1>
                        <p class="slide-hint">{{ item.hint }}</p>
                    </div>
                </div>
            </SwiperSlide>
        </Swiper>
    </div>
</template>




<style scoped lang="scss">
.swiper {
    .banner {
        position: relative;
        height: 100%;
        background-color: rgb(16, 64, 82);
        color: #fff;
        width: auto;

        .banner-image {
            display: block;
            width: 100%;

            .slide-image {
                width: 100%;
                height: auto;
            }
        }

        .caption {
            position: absolute;
            bottom: 0px;
            /* 将caption置于底部 */
            left: 0;
            color: white;
            padding: 10px 10px;
            // width: calc(100%-50px);
            width: 100%;

            .slide-title {
                padding: 10px;
                margin-bottom: 6px;
                font-size: 28px;
                font-family: "微软雅黑";
            }

            .slide-hint {
                text-align: left;
                margin-left: 11px;
                font-size: 15px;
                color: #dbdada;
            }
        }
    }

    :deep(.swiper-pagination-bullet) {
        background-color: rgba(255, 255, 255, 0.8);
        width: 5px;
        height: 5px;
    }

    :deep(.swiper-pagination-horizontal) {
        position: absolute;
        left: auto;
        right: 30px;
        width: auto;

    }

    :deep(.swiper-pagination-bullet-active) {
        width: 20px;
        border-radius: 5px;
        background-color: white;
    }
}
</style>