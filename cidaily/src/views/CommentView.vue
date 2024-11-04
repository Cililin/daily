<script setup>
import CommentTop from '@/components/CommentTop.vue'
import ShortComments from '@/components/ShortComments.vue'

import { useRoute, useRouter } from 'vue-router';
import http from "@/utils/http"
import { reactive, ref } from 'vue';

import useNightMode from "@/stores/nightMode"

const nightModeStore = useNightMode();

const comments = reactive({ //定义一个响应式数据来存储评论 默认空数组
    comments: [], commentsnum: null
})

const route = useRoute();
const router = useRouter();
http.get(`/story/${route.params.storyid}/short-comments`)
    .then(res => {
        // console.log(res);
        comments.comments = res.data.comments;

    })
http.get(`/story/${route.params.storyid}/extra`).then(res => {
    comments.commentsnum = res.data;
    // console.log(comments);
})

const list = reactive({
    list: []
})

const isShowReply = ref(false)  //定义响应式数据是否显示评论框
const reactReply = (event) => { //监听子组件事件的函数
    isShowReply.value = !isShowReply.value //点击子组件按钮，父组件的响应式数据改变  主要是显示评论框
    // console.log("父组件用来处理子组件事件的函数", event);

}


const inputContent = ref(''); // 新增：用于存储输入框的值
const send = () => {

    if (inputContent.value.trim() !== '') {
        const newComment = {
            author: '匿名',
            content: inputContent.value,
            time: new Date().toLocaleString(),
            likes: 0
        }

        // 将新评论添加到现有评论列表
        // comments.value.push(newComment);  不可使用
        //清空输入框
        inputContent.value = '';
    }
}


</script>


<template>
    <div class="all" :class="['alln', nightModeStore.isNight ? 'alln' : '']">
        <div class="main" :class="['main1', nightModeStore.isNight ? 'night' : '']">
            <div class="blackGro">
                <div :class="['commentBar', nightModeStore.isNight ? 'nightTop' : '']" v-if="comments.commentsnum"><i
                        class="back" @click="router.back()"></i>{{
                            comments.commentsnum.comments }}条评论</div>
            </div>
            <!-- <CommentTop /> -->
            <!-- 评论列表 -->
            <div :class="['short-comment', nightModeStore.isNight ? 'night' : '']" v-if="comments.commentsnum">{{
                comments.commentsnum.short_comments }}条短评</div>
            <ShortComments :list="comments.comments" @show-reply="reactReply" style="height: 100vh;" />


            <div class="reply" :style="{ display: isShowReply ? 'flex' : 'none' }">
                <img class="avatar" src="../assets/images/morentouxiang.png" alt="">
                <input type="text" placeholder="说说你的看法..." v-model="inputContent">
                <button class="bot" @click="send()">发送</button>
            </div>

            <!-- 获取到的页面id是：{{ route.params.storyid }} -->
        </div>
    </div>
</template>


<style scoped lang="scss">
.all {
    // background-color: #000;

    // color:white;
    height: 100vh;
    width: 100%;


    .alln {
        background-color: #656565;
        color: white;
    }

    .main {
        // background-color: black;
        // position: relative;

        border-radius: 25px 25px 0 0;

        .blackGro {
            background-color: black;
        }

        .commentBar {
            border-radius: 25px 25px 0 0;
            width: 100%;
            line-height: 50px;
            background-color: white;
            border-bottom: 1px solid #ddd;
            text-align: center;
            font-size: 25px;
            border-radius: 25px 25px 0 0;
            font-weight: 549;
            letter-spacing: 2px;

            i {
                float: left;
                width: 50px;
                height: 50px;
                background: url(../assets/images/fanhui.png) no-repeat center center;
                background-size: 35px 35px;

                //    padding-top: 10px;

            }
        }

        .commentBar.nightTop {
            background-color: #656565;
            color: white;
        }

        .short-comment {
            padding: 13px;
            font-size: 20px;
            padding: 20px;
            letter-spacing: 2px;
        }

        .reply {
            width: 100%;
            height: 70px;
            background-color: #f2f2f2;
            position: fixed;
            bottom: 0px;
            display: flex;
            align-items: center;
            padding: 0px 20px;
            display: none;

            .avatar {
                width: 50px;
                height: 50px;

            }

            input {
                height: 40px;
                background-color: transparent;
                border: none;
                outline: none;
                margin-left: 10px;
                font-size: 18px;
            }

            .bot {
                width: 80px;
                height: 40px;
                margin-left: 20px;
                background-color: #cbcbcb;
                border: none;
                outline: none;
                cursor: pointer;
                font-size: 18px;
                transition: all 0.2 ease;
                border-radius: 5px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                // background-image: linear-gradient(to right, #9df4ff, #6cd5ff); /* 渐变背景 */
            }

            button:hover {
                background-color: #f1f1f1;
                color: #000;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            }

            button:active {
                background-color: #ddd;
                transform: scale(0.98);
            }

        }

    }

    .night {
        background-color: #656565;
        color: white;
        height: auto;
    }
}
</style>