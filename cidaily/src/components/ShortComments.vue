<script setup>
import { defineProps, ref, defineEmits } from 'vue';
import useNightMode from '@/stores/nightMode'

const useNightModeStore = useNightMode();


const props = defineProps({  //property
    list: Array
});

// 子传父步骤
// 1、先定义一个自定义事件
// 2、触发自定义事件
// 3、父组件接收并做出处理
const emits = defineEmits(["showReply"]); //定义一个自定义事件

// 时间戳：自1970-1-1 0：0：0至今的毫秒数
// js中的毫秒数 1s=100000毫秒
const coverTime = (t) => {
    const date = new Date(t * 1000);

    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    month = month < 10 ? "0" + month : month;
    let day = date.getDate();
    day = day < 10 ? "0" + day : day;
    let hour = date.getHours();
    hour = hour < 10 ? "0" + hour : hour;
    let minute = date.getMinutes();
    minute = minute < 10 ? "0" + minute : minute;
    return `${month}-${day} ${hour}:${minute}`;
    // return date.getMonth()+1+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes();
}

let isLike = false;
const likeComment = (commentid, event) => {
    // console.log(event); //点击的事件对象
    // console.log(event.target);//点击的元素对象
    if (event.target.tagName != "I") return;  //当点击元素不是i标签就不做反应
    let isLike = true;
    if (event.target.className == "upadd") { //获取被点击i元素的类名如果为upadd改成up
        event.target.className = "up";
        isLike = true;
    } else { //当获取被点击i元素的类名class如果为up就改为upadd
        isLike = false;
        event.target.className = "upadd";
    }
    props.list.map(item => { //循环数据
        if (commentid == item.id) { //当被点击元素的id和数组的id相等时
            if (isLike) item.likes--; //如果当前前一次是upadd 就-1
            else item.likes++; //当前不是upadd 就+1
        }
    })
}

const reply = () => {
    //出发自定义事件  反向传值

    emits("showReply", { a: 100, money: 100000 })
}


</script>



<template>
    <div style="height:'100vh';">
    <ul class="comment-list">
        <li v-for="comment in list" :key="comment.id">
            <img class="avatar" :src="comment.avatar" alt="">
            <div class="comment">
                <div class="nickname">
                    <span>{{ comment.author }}</span>
                    <div class="dot"><i></i><i></i><i></i></div>
                </div>
                <div class="content">{{ comment.content }}</div>
                <div class="deteline">
                    <span class="datetime"> {{ coverTime(comment.time) }}</span>
                    <div class="upmore">
                        <!-- 点击事件click如果需要传入事件对象 使用 $event代替 -->
                        <i class="up" @click="likeComment(comment.id, $event)"><span>{{ comment.likes }}</span></i>
                        <!-- 回复 -->
                        <i class="review" @click="reply()"></i>
                    </div>
                </div>
            </div>
        </li>
    </ul>
</div>
</template>


<style scoped lang="scss">
.comment-list {
    li {
        display: flex;
        padding: 10px 20px;
        border-bottom: 1px solid #e4e4e4;

        .avatar {
            width: 50px;
            height: 50px;
            border-radius: 50%;
        }

        .comment {
            margin-left: 13px;
            width: 100%;

            .nickname {
                display: flex;
                justify-content: space-between;

                span {
                    font-size: 17px;
                }

                .dot {
                    display: flex;
                    align-items: center;

                    i {
                        width: 5px;
                        height: 5px;
                        background-color: #ddd;
                        margin-right: 5px;
                        border-radius: 50%;
                    }
                }
            }

            .content {
                font-size: 21px;
                padding: 4px 20px 15px 0px;
            }

            .deteline {
                display: flex;
                justify-content: space-between;

                .datetime {
                    color: #aaa;
                    font-size: 17px;
                }

                .upmore {
                    display: flex;

                    i {
                        width: 30px;
                        height: 30px;
                        // font-style: normal;
                        background: url(../assets/images/dianzan.png) no-repeat center center;
                        background-size: 20px 20px;
                    }

                    .upadd {
                        position: relative;
                        background-image: url(../assets/images/dianzanActive.png);
                        font-style: normal;

                        span {
                            position: absolute;
                            font-size: 17px;
                            color: #aaa;
                            left: -8px;
                            top: 5px;
                        }
                    }

                    .up {
                        position: relative;
                        background-image: url(../assets/images/dianzan.png);
                        font-style: normal;

                        span {
                            position: absolute;
                            font-size: 17px;
                            color: #aaa;
                            left: -8px;
                            top: 5px;
                        }
                    }

                    .review {
                        background: url(../assets/images/pinglun-pinglun-biankuang.png) center center no-repeat;
                        background-size: 25px 25px;
                    }
                }

            }
        }
    }
}

.night {
    background-color: #656565;
    color: white;
    // height: auto;
}
</style>