<script setup>
import { reactive, ref, onMounted, defineProps } from 'vue'
import router from '../router';
import { useRouter } from 'vue-router';
import useNightMode from "@/stores/nightMode"

const nightModeStore = useNightMode();

// 定义组件接收的props
let props = defineProps({
    storyList: Array
})
// console.log("组件的props数据==>", props.storyList);

// let router=useRouter();

</script>

<template>
    <ul :class="['list', nightModeStore.isNight ? 'night' : '']">
        <li v-for="item in  props.storyList " :key="item.id">
            <!-- 根据item的showtime属性决定显示时间线还是文章链接 -->
            <template v-if="item.showtime">
                <div class="timeline">
                    <span>{{ item.timeline }}</span>
                </div>
            </template>

            <template v-else>
                <!-- 显示文章标题和摘要，点击跳转到文章详情页 -->
                <RouterLink class="left" :to="`/detail/${item.id}`">
                    <h2 class="title">{{ item.title }}</h2>
                    <span class="hint">{{ item.hint }}</span>
                </RouterLink>
                <!-- 显示文章的封面图片，点击跳转到文章详情页 -->
                <RouterLink :to="`/detail / ${item.id}`">
                    <img class="listImg" :src="item.images && item.images.length > 0 ? item.images[0] : ''" alt="" />
                </RouterLink>
            </template>
        </li>
    </ul>
</template>

<style scoped>
.timeline {
    color: gray;
    position: relative;
    width: 100%;
}

.timeline::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 1px;
    border-top: 1px solid #aaa;

}

.timeline>span {
    position: absolute;
    left: 50%;
    top: -10px;
    padding: 0px 5px;
    background-color: #fff;
    transform: translateX(-50%);
}

.list>li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 20px;
}

.listImg {
    max-width: 100px;
    margin-left: 25px;
    border-radius: 5%;
    /* height: auto; */
}

.title {
    font-family: "微软雅黑";
    font-weight: normal;
    align-items: flex-start;
    padding-bottom: 10px;
    font-size: 20px;
    color: black;
}


.left {
    flex: 1;
}

.left .hint {
    font-family: "微软雅黑";
    color: gray;
    align-items: flex-end;
    font-size: 16px;
    letter-spacing: 1px;
}

.list.night {
    background-color: #656565;
}

.list.night .left h2 {
    color: #dedede;
}

.list.night .left span {
    color: #9a9a9a;
}
</style>