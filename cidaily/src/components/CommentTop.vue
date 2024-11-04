<script setup>
import { useRouter } from 'vue-router';


const router = useRouter();
//返回功能
const goback = () => router.back();
</script>


<template>
    <div class="main">
        <div class="top">
            <i class="back" @click="goback"></i>
            <p>条评论</p>
        </div>

    </div>
</template>


<style lang="scss" scoped>
.main {
    background-color: black;

    .top {
        display: flex;
        width: 100%;
        height: 70px;
        background-color: #fefefe;
        border-bottom: 1px solid #f6f6f6;
        justify-content: space-between;
        border-radius: 25px 25px 0 0;

        .back {
            width: 70px;
            height: 70px;
            background: url(../assets/images/fanhui.png) center center no-repeat;
            background-size: 28px 28px;
            font-style: normal;
        }

        p {}
    }
}
</style>