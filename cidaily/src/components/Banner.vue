<template>
    <div class="topHead">
        <div class="imageContainer">
            <img :src="currentImage" alt="Current Image Title" class="cimageImage">
            <div class="imageOverlay">
                <span class="imageTitle">{{ currentTitle }}</span>
            </div>
        </div>
    </div>
</template>
  
<script setup>
import { ref, reactive, onMounted, onBeforeUnmount, nextTick } from 'vue';
import axios from 'axios';
import http from '@/utils/http';

let currentIndex = ref(0);
let images = ref([]);
let currentImage = ref('');
let currentTitle = ref('');
let sliderRef = ref(null);
let autoPlayTimer = null;

const fetchData = async () => {
    try {
        const response = await axios.get('https://apis.netstart.cn/zhihudaily/stories/latest');
        images.value = response.data.top_stories.map(topStory => ({
            title: topStory.title,
            image: topStory.image
        })); 3
        await nextTick();
        updateCurrentImage();
        startAutoPlay();
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

const updateCurrentImage = () => {
    if (images.value.length) {
        currentImage.value = images.value[currentIndex.value].image;
        currentTitle.value = images.value[currentIndex.value].title;
    }
};

const startAutoPlay = () => {
    autoPlayTimer = setInterval(() => { // 修改这里的时间间隔为2000毫秒
        currentIndex.value = (currentIndex.value + 1) % images.value.length;
        updateCurrentImage();
    }, 2000);
};

const stopAutoPlay = () => {
    if (autoPlayTimer) {
        clearInterval(autoPlayTimer);
        autoPlayTimer = null;
    }
};

onMounted(() => {
    fetchData();
});

onBeforeUnmount(() => {
    stopAutoPlay();
});
</script>
  
<style scoped lang="scss">
.topHead {
    position: relative;
    width: 100%;

    .imageContainer {
        position: relative;
        width: 100%;
        padding-top: 70.33%;
        /* 使高度约为屏幕高度的1/3，基于宽度的百分比计算，假设图片宽高比为3:1 */
        overflow: hidden;

        .cimageImage {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            /* 保证图片不失真填充容器 */
        }

        .imageOverlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0px;
            display: flex;
            justify-content: center;
            align-items: flex-end;
            color: #fff;
            font-size: 24px;
            text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);

            /* 文字阴影增强可读性 */
            .imageTitle {
                text-align: center;
                width: 100%;
                margin: 0;
                padding: 0;
            }
        }
    }
}
</style>