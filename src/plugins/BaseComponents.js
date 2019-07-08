import Vue from "vue";
import BaseNav from "../components/BaseNav";
import BaseList from "../components/BaseList";
import BaseButton from "../components/BaseButton";
import BaseForm from "../components/BaseForm";
import BasePhoto from "../components/BasePhoto";
import BasePlaySound from "../components/BasePlaySound";
import BaseRecordSound from "../components/BaseRecordSound";

Vue.component("BaseNav", BaseNav); // 顶部导航
Vue.component("BaseList", BaseList); // 上下滑动list
Vue.component("BaseButton", BaseButton); // 基础button
Vue.component("BaseForm", BaseForm); // 基础输入框
Vue.component("BasePhoto", BasePhoto); // 基础拍照
Vue.component("BasePlaySound", BasePlaySound); // 播放语音
Vue.component("BaseRecordSound", BaseRecordSound); // 收集语音
