<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import useNightModeStore from '../stores/nightMode' //引入pinia的store

const router = useRouter();

const nightModeStore = useNightModeStore();
const changeMode = () => {
    nightModeStore.changeMode();
    // isNight.value = !isNight.value;
}


</script>



<template>
    <div
        :style="{ width: '100%', height: '100vh', backgroundColor: nightModeStore.isNight ? '#DCDCDC' : 'white', color: nightModeStore.isNight ? 'white' : 'black' }">

        <div class="login">
            <h2>登录知乎日报</h2>
            <span>选择登录方式</span>
            <p>我同意<span class="doucment">《知乎协议》</span>和<span class="personal">《个人信息保护指引》</span></p>
        </div>


        <div class="set">
            <i @click="changeMode()" :class="nightModeStore.isNight ? 'light' : ''"><span>{{ nightModeStore.isNight ? "白天模式"
                : "夜间模式" }}</span></i>
            <i class="userset" @click="router.back()"><span>设置</span></i>
        </div>
    </div>
</template>




<style lang="scss" scoped>
.login {
    text-align: center;
    color: black;
    padding-top: 190px;
    line-height: 3em;

    .personal {
        color: blue;
    }

    .doucment {
        color: blue;
    }

    span {
        color: gray;
        font-size: 18px;
    }

    h2 {
        font-style: normal;
        font-size: 30px;
    }

    p {
        color: gray;
    }
}

.set {
    position: fixed;
    width: 100%;
    height: 50px;
    bottom: 70px;
    display: flex;
    justify-content: space-evenly;

    i {
        font-style: normal;
        height: 70px;
        background: url(../assets/images//yejianmoshi.png) no-repeat center top;
        background-size: 40px 40px;
        display: flex;
        align-items: flex-end;
        font-size: 20px;
        letter-spacing: 2px;
    }

    .light {
        background-image: url(../assets/images/baitianmoshi.png);
    }

    .userset {
        background-image: url(../assets/images/shezhi.png);
        // background-size: 50px 50px;
    }
}
</style>