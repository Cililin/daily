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