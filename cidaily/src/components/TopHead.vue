<template>
    <!-- 首页头部组件     -->
    <div class="top">
        <div :class="['tophead', nightMode.isNight ? 'night' : '']">
            <div class="left">
                <!-- 首页顶部的时间 月份和日期 -->
                <div class="date">
                    <span>{{ date }}</span>
                    <span>{{ chineseMonth }}月</span>
                </div>
                <!-- 首页顶部竖线 -->
                <div class="line"></div>
                <!-- 首页顶部的时间状态 -->
                <div class="sayhello">{{ timeStatus }}</div>
            </div>

            <!-- 首页顶部的右侧头像 -->
            <div class="headimg">
                <RouterLink to="/userset">
                    <img class="profile" src="../assets/images/morentouxiang_1.png" />
                </RouterLink>
            </div>
        </div>
    </div>
</template>



<script setup>
// hooks编程 函数式编程
import { ref, computed, onMounted } from 'vue'
import useNightMode from "@/stores/nightMode"

const nightMode = useNightMode()

// 初始化日期和月份的ref
let date = ref(0); //定义一个日期响应式数据
let month = ref(0); //定义一个月份响应式数据

// 初始化Gitee头像URL
let giteeImage = ref('');

// 在组件挂载后设置日期和月份
onMounted(() => {
    let date0 = new Date();
    month.value = date0.getMonth();
    date.value = date0.getDate();
    // giteeImage.value = '../assets/images/morentouxiang_1.png'
})

// 计算显示的中文月份
let chineseMonth = computed(() => { //定义一个中文月份 是一个计算属性
    //定义一个中文月份数组
    let chineseMonths = ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"]
    return chineseMonths[month.value]; //根据阿拉伯数字的月份取到对应中文的月份
});

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

</script>


<style lang="scss" scoped>
.top {
    background-color: black;

    .tophead {
        background-color: #fbfbfb;
        display: flex;
        padding: 6px 0px;
        justify-content: space-between;
        padding: 6px 30px 6px 0px;
        border-radius: 20px 20px 0 0;

        .left {
            display: flex;

            .line {
                border-left: 1px solid #bdbcbc;
                height: 37px;
                padding-right: 20px;

            }

            .date {
                padding: 0px 30px;

                span {
                    display: block;
                    text-align: center;
                }

                span:first-child {
                    font-size: 16px;
                    font-weight: bold;
                }

                span:last-child {
                    font-size: 14px;
                }
            }

            .sayhello {
                line-height: 40px;
                font-size: 28px;
            }
        }

        .headimg {
            width: 40px;
            height: 40px;
            background-color: #fff6f6;
            justify-self: right;
            // align-self: flex-end;
            border-radius: 50%;

            .profile {
                width: 40px;
                height: 40px;
            }
        }
    }

    .night {
        background-color: #656565;
        color: #dedede;
    }
}
</style>