---
typora-root-url: ./public\readmeImage
---

# cidaily

## 项目说明

本项目从2024年6月18日开始，是一个日报的前端页面。由Vue3进行编写。这个文件会帮助你开始该Vue3项目。

#### 一、页面展示

1、首页

<img src="https://gitee.com/Cililin/typoa-bed-no.1/raw/master/Image/202406271838747.jpg" alt="首页" style="zoom:50%;" />



2、详情页

<img src="https://gitee.com/Cililin/typoa-bed-no.1/raw/master/Image/202406271839728.jpg" alt="详情页" style="zoom:50%;" />

3、评论页

<img src="https://gitee.com/Cililin/typoa-bed-no.1/raw/master/Image/202406271841025.jpg" alt="评论页" style="zoom:50%;" />

4、用户设置页

<img src="https://gitee.com/Cililin/typoa-bed-no.1/raw/master/Image/202406271841515.jpg" alt="用户设置页" style="zoom:50%;" />

#### 二、功能展示

##### 1、首页功能

###### 1.1时间展示

![时间](https://gitee.com/Cililin/typoa-bed-no.1/raw/master/Image/202406271901024.jpg)



###### 1.2轮播图

<img src="https://gitee.com/Cililin/typoa-bed-no.1/raw/master/Image/202406271903969.jpg" alt="轮播图" style="zoom:50%;" />



###### 1.3列表刷新

<img src="https://gitee.com/Cililin/typoa-bed-no.1/raw/master/Image/202406271904534.jpg" alt="列表" style="zoom:50%;" />



##### 2、详情页功能

###### 2.1返回功能

###### 2.2进入评论

###### 2.3点赞与收藏

![详情页导航](https://gitee.com/Cililin/typoa-bed-no.1/raw/master/Image/202406271905355.jpg)



##### 3、评论页功能

###### 3.1点赞与评论

![详情页点赞收藏功能](https://gitee.com/Cililin/typoa-bed-no.1/raw/master/Image/202406271905290.png)

##### 4、日夜间模式切换

![日夜间模式切换](https://gitee.com/Cililin/typoa-bed-no.1/raw/master/Image/202406271906829.jpg)



#### 三、项目获取

1、打开网页搜索

```sh
https://gitee.com/Cililin/daily.git
```

2、复制并在本地运行（确保有node.js环境下）

```sh
git clone https://gitee.com/Cililin/daily.git
```



#### 四、环境版本说明

```sh
Windows：Windows10
Vue3：@vue/cli 5.0.8
Nodejs：v16.20.2
VScode：1.78.2
```



#### 五、安装插件说明

```sh
Vue-official——vue3语法（如VScode版本低请安装Vuter——高亮代码提示）
Chinese (Simplified)——中文
JavaScript (ES6) code snippets
```



#### 六、步骤指令

1、下载依赖

```sh
npm install
```

2、启动项目

```sh
npm run dev
```

3、打包项目

```sh
npm run build
```



#### 七、技术说明

##### 1、时间状态

```js
// 计算显示的时间状态（早上好、中午好等）
let timeStatus = computed(() => { //定义一个时间状态 是一个计算属性
    // 获取当前时间
    let timeNow = new Date();
    // 获取当前小时
    let hours = timeNow.getHours();
    // 设置默认文字
    let state = ``;
    // 判断当前时间段
    if (hours >= 0 && hours <= 11) {
        state = `早上好！`;
    } else if (hours > 11 && hours <= 14) {
        state = `中午好！`;
    } else if (hours > 14 && hours <= 18) {
        state = `下午好！`;
    } else if (hours > 18 && hours <= 24) {
        state = `晚上好！`;
    }
    return state;

});
```



##### 2、Swiper轮播图

```js
<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css"
import "swiper/css/pagination";
import "swiper/css/autoplay";
</script>
```

```vue
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
```



##### 3、加载动画

```vue
<template>
    <div class="loading-box">
        <div class="circle circle1"></div>
        <div class="circle circle2"></div>
    </div>
</template>
```

```css
<style lang="scss" scoped>
.loading-box {
    // 设置加载框的高度和相对定位
    // margin: 20px;
    height: 30px;
    margin-bottom: 100px;
    position: relative;

    .circle {
        // 设置圆圈的基本样式
        width: 30px;
        height: 30px;
        border: 3px solid rgba(0, 0, 0, 0.3);
        position: absolute;
        border-radius: 50%;
        left: 50%;
        transform: translateX(-50%);

    }

    .circle2 {
        // 针对第二个圆圈设置特定的边框颜色和动画
        border-color: transparent;
        // border-left-color: rgba(0,0,0,0.5);
        border-right-color: #00000080;
        transform-origin: left;
        animation: rote 0.5s linear infinite; //执行rote关键帧动画 执行1次花费2s 匀速运行 infinite执行

    }

    //定义关键帧动画
    @keyframes rote {
        0% {
            transform: rotate(0deg) translateX(-50%);
        }

        25% {
            transform: rotate(90deg) translateX(-50%);
        }

        50% {
            transform: rotate(180deg) translateX(-50%);
        }

        75% {
            transform: rotate(270deg) translateX(-50%);
        }

        100% {
            transform: rotate(360deg) translateX(-50%);
        }
    }
}
</style>
```

##### 4、详情页点赞收藏

```vue
<template>
    <div class="bar">
        <i class="back" @click="goback"></i>
        <i class="comment" @click="gocomments"><span class="com">{{ props.extra.comments }}</span> </i>
        <i class="up" :class="{ 'liked': isLiked }" @click="incrementPop"><span class="pop">{{ props.extra.popularity
        }}</span></i>
        <i class="collect" :class="{ 'collected': isCollected }" @click="col"></i>
        <i class="forward" @click="share"></i>

    </div>
</template>
```

```js
<script setup>
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';
import { ref, computed } from 'vue';
const props = defineProps({
    extra: {
        type: Object, //设置props属性的类型
        default: () => { //设置props extra属性的默认值
            return {
                comments: 0,
                popularity: 0
            }
        }
    },
    storyid: {
        type: Number,
        default: 0
    }
})

const router = useRouter();
//返回功能
const goback = () => router.back();
//点击进入评论页面
const gocomments = () => {
    router.push(`/comments/${props.storyid}`)  //路由跳转到指定路由
}


const isCollected = ref(false);
//点击收藏
const col = () => {
    isCollected.value = !isCollected.value
    // console.log("收藏",isCollected.value);
}

//点击转发
const share = () => {
    console.log("分享");
}

const isLiked = ref(false);
const incrementPop = () => {
    if (!isLiked.value) {
        isLiked.value = true;
        props.extra.popularity++;
    }
}

</script>
```

```css
<style scoped lang="scss">
.bar {
    display: flex;
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 50px;
    background-color: #eee;
    border-top: 1px solid #ddd;
    justify-content: space-between;

    i {
        width: 50px;
        height: 50px;
        background: url(../assets/images/fanhui.png) center center no-repeat;
        background-size: 28px 28px;
        font-style: normal;
        position: relative;

        .com {
            position: absolute;
            top: 10px;
            left: 41px;
            font-size: 12px;
        }


        .pop {
            position: absolute;
            top: 10px;
            left: 41px;
            font-size: 12px;
        }
    }

    .back {
        background-image: url(../assets/images/fanhui.png);
    }

    .comment {
        background-image: url(../assets/images/pinglun.png);
    }

    .up {
        background-image: url(../assets/images/dianzan.png);
        background-size: 25px 25px;
    }

    .up.liked {
        background-image: url(../assets/images/dianzanActive.png);
        /* 假设有一个红色的点赞图标 */
        // background-color: #ff4d4d; /* 或者直接改变背景色为红色 */
    }

    .collect {
        background-image: url(../assets/images/shoucang.png);
        background-size: 30px 30px;
    }

    .collect.collected {
        background-image: url(../assets/images/shoucangActive.png);
    }

    .forward {
        background-image: url(../assets/images/zhuanfa.png);
    }
}</style>


```

##### 5、日夜间切换

```js
//数据仓库
import {
    defineStore
} from 'pinia';
import {
    ref
} from 'vue';

//defineStore("id名称用来表示这个store"，函数返回可操作的数据或函数)定义一个数据仓库Store
export default defineStore("nightMode", () => {
    let isNight = ref(true); //定义一个响应式数据 对比Vuex的data
    const changeMode = function () { //相当
        isNight.value = !isNight.value;
    }
    return {
        isNight,
        changeMode
    }
})
```

```js
//引入
import useNightMode from "@/stores/nightMode"
//创建对象
const nightModeStore = useNightMode();
```

```vue
<!--绑定tag使用-->
<ul :class="['list', nightModeStore.isNight ? 'night' : '']"></ul>
```



#### 八、后端接口

##### 1、网址

```sh
https://apis.netstart.cn/zhihudaily/
```

##### 2、日报列表

```sh
1、最新日报列表：https://apis.netstart.cn/zhihudaily/stories/latest
2、历史日报列表：https://apis.netstart.cn/zhihudaily/stories/before/20211113
```

##### 3、内容详情

```sh
1、日报内容：https://apis.netstart.cn/zhihudaily/story/9741200
2、日报额外信息：https://apis.netstart.cn/zhihudaily/story/9741200/extra
```

##### 3、评论相关

```
1、短评：https://apis.netstart.cn/zhihudaily/story/9741200/short-comments
2、更多短评：https://apis.netstart.cn/zhihudaily/story/9741200/short-comments
3、长评：https://apis.netstart.cn/zhihudaily/story/9741207/long-comments
4、更多长评：https://apis.netstart.cn/zhihudaily/story/9741207/long-comments/before/33926650
```

##### 4、其他杂项

```
1、合集日报列表：https://apis.netstart.cn/zhihudaily/section/2
2、方程转SVG图：https://apis.netstart.cn/zhihudaily/equation?tex=p=0.4756>>0.05
```

