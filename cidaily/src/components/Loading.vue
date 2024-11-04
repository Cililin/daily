
<template>
    <div class="loading-box">
        <div class="circle circle1"></div>
        <div class="circle circle2"></div>
    </div>
</template>



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