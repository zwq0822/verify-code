<template>
  <div id="app">
    <!-- VerifyCode -->
    <h3>滑动到右侧 方式一</h3>
    <verify-code status="status" :successFun="successFun" :errorFun="errorFun"/>
    <br />
    <!-- SliderValidate -->
    <h3>滑动到右侧 方式二</h3>
    <slider-validate ref="sliderValidate" :status="validate_status" @update-status="getNewStatus"></slider-validate>
    <br />
    <!-- SlideVerify -->
    <h3>滑动图形验证码（插件）</h3>
    <image-verify></image-verify>
  </div>
</template>

<script>
import VerifyCode from './components/VerifyCode'
import SliderValidate from './components/SliderValidate'
import ImageVerify from './components/ImageVerify'

export default {
  name: 'App',
  components: {
    VerifyCode,
    SliderValidate,
    ImageVerify
  },
  data() {
    return {
      // VerifyCode
      status: false,
      // SliderValidate
      validate_status: false
    }
  },
  methods: {
    /**
     * VerifyCode
     */
    successFun() {
      console.log('验证成功')
    },
    errorFun() {
      console.log('验证失败')
    },
    /**
     * SliderValidate
     */
    //获取子组件滑块状态
    getNewStatus(val) {
      console.log(val)
      // this.temp.validate_status = val
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
h3 {
  text-align: left;
}
</style>
