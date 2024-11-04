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

