<template>
  <main>
    <!-- 头部-->
    <TopHead></TopHead>

    <!-- 展示轮播图 -->
    <!-- <Banner></Banner> -->
    <!-- <HelloWorld></HelloWorld> -->
    <BannerTest :top-stories="stories.topStories"></BannerTest>

    <!-- 列表展示 -->
    <Footer :story-list="stories.storyList"></Footer>
    <!-- 底部加载组件 -->
    <Loading v-show="isShowLoading"></Loading>
  </main>
</template>


<script setup>
import { ref, reactive } from 'vue'
import http from "@/utils/http";
import TopHead from "@/components/TopHead.vue";
import HelloWorld from "@/components/HelloWorld.vue";
import Banner from "@/components/Banner.vue";
import BannerTest from '@/components/BannerTest.vue';
import Footer from '@/components/Footer.vue'
import Loading from '@/components/Loading.vue';
import { parse } from 'vue/compiler-sfc';

// 初始化后台数据状态
let stories = reactive({ topStories: [], storyList: [] });
// 从后台获取数据
http.get("/stories/latest").then(res => {
  stories.topStories = res.data.top_stories;//topStories数据
  stories.storyList = res.data.stories;//stories数据
  // console.log("首页得到服务器的结果==>",res);
  // console.log("首页得到topStrorise==>",stories.topStories);

})

let isShowLoading = ref(false);  //定义一个响应数据 记录是否显示加载中
let isStop = false;
let showtime = false;

// 获取当前日期信息，用于加载历史数据
let date = new Date();
let year = date.getFullYear();
let month = date.getMonth() + 1;
month = month < 10 ? "0" + month : month;
let day = date.getDate();
day = day > 9 ? day : "0" + day;

// 监听页面滚动，加载更多数据
window.onscroll = () => {
  let scrollHeight = document.documentElement.scrollHeight; //可滚动高度
  let clickHeight = document.documentElement.clientHeight;  //可视高度
  let scrollTop = document.documentElement.scrollTop; //滚动距离
  // console.log("scrollHeight==>",scrollHeight,"clickHeight==>",clickHeight,"scrollTop==>",scrollTop);
  if (scrollHeight <= clickHeight + parseInt(scrollTop) + 1 && !isShowLoading.value && !isStop) {  //parseInt(scrollTop)+1
    // console.log("到底部了");
    isShowLoading.value = true;
    http.get(`stories/before/${year}${month}${day}`).then((result) => {
      // console.log(result.data.stories);
      //加一个日期分割线数据
      stories.storyList.push({
        id: Date.now(),
        timeline: `${year}-${month}-${day}`,
        showtime: true
      })
      stories.storyList = stories.storyList.concat(result.data.stories); //合并数组 把拿到的数据和原来的数据列表合并
      isShowLoading.value = false;
      day = parseInt(day) - 1; //如果当前获取数据成功把日期-1 改成前一天的数据
      if (day < 1) isStop = true; //如果下一次获取的日期“日”小于1就停止加载
      day = day > 9 ? day : "0" + day;
    })
  }
}


</script>

<style lang="scss"></style>

