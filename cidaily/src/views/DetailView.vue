<script setup>
import { useRoute } from "vue-router"  //引入路由
import { reactive } from "vue"
import http from "@/utils/http"
import DetailBar from "@/components/DetailBar.vue"
import Loading from "@/components/Loading.vue"

import useNightMode from "@/stores/nightMode"

const nightModeStore = useNightMode();

// 使用useRoute钩子获取当前路由信息
const route = useRoute()// 获取当前路由对象
let storyid = route.params.storyid  //获取路对象的由参数  storyid是路由设置的占位参数
// console.log(storyid) // 打印路由参数

// 初始化故事对象
let story = reactive({
  story: null, storyextra: {
    conmment: 0, popularity: 0
  }
});  //定义一个响应式数据储存内容详情
// 根据id请求详情
http.get(`/story/${storyid}`).then(res => {//ajax获取后台数据，是一个异步过程，
  // console.log(res);
  // 将请求到的详情赋值给story对象
  story.story = res.data.story;
})

http.get(`/story/${storyid}/extra`).then(res => {//ajax获取后台数据，是一个异步过程，
  // console.log(res);
  story.storyextra = res.data;
})

// const onLike=(id)=>handleLike(id)



</script>

<template>
  <div v-if="story.story">
    <div class="top">
      <!-- 顶部照片 -->
      <img :src="story.story.image" class="topimg">

      <!-- 标题  -->
      <div class="title"
        :style="{ background: `linear-gradient(to top,${story.story.imageHue.replace('0x', '#')},rgba(251,235,253,0.1))` }">
        <h1>{{ story.story.title }}</h1>
      </div>
    </div>

    <!-- 内容 -->
    <div v-if="story.story && story.story.body" :class="['content-wrap', nightModeStore.isNight ? 'night' : '']"
      v-html="story.story.body"></div>
    <DetailBar :extra="story.storyextra" :storyid="parseInt(storyid)"></DetailBar>
  </div>

  <div class="loadingclass" v-else>
    <Loading />
  </div>
</template>

<style scoped lang="scss">
.top {
  position: relative;
  background-color: black;

  img {
    width: 100%;
    height: auto;
    border-radius: 25px 25px 0 0;
  }

  .title {
    position: absolute;
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
    bottom: 0px;

    h1 {
      padding: 0px 20px;
      font-size: 20px;
      line-height: 30px;
      color: white;
      font-family: "微软雅黑", "宋体", "正楷";
      font-style: normal;
    }
  }
}

.night {
  background-color: #656565;
  color: white;
}

:deep(.meta) {
  padding: 30px 20px;
  font-size: 18px;
}

:deep(.meta .avatar) {
  display: none;
}

:deep(.meta .bio) {
  display: none;
}

:deep(.meta .originUrl) {
  display: inline;
  color: rgb(15, 164, 232);
  font-weight: bold;
  padding-left: 10px;
}

:deep(.content) {
  padding: 0px 20px;
  font-size: 16px;
  font-family: "微软雅黑";
  line-height: 30px;
  overflow: hidden; //隐藏超出部分
  margin-bottom: 50px;
}

:deep(.content img) {
  width: 100%;
  height: auto;
}

:deep(.content p) {
  text-indent: 2em;
}

:deep(.content .view-more) {
  text-align: center;
}

:deep(.view-more a) {
  display: none;
}

.loadingclass {
  margin-top: 50%;
}
</style>
