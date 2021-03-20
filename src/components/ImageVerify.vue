<!-- 滑动验证码插件 -->
<template>
  <div class="image-verify">
    <slide-verify
      class="image-slide"
      :l="42"
      :r="10"
      :w="310"
      :h="155"
      :slider-text="text"
      @success="onSuccess"
      @fail="onFail"
      @refresh="onRefresh"
    />
    <div class="success-box" v-if="isVisible">
      <p>{{ msg }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ImageVerify',
  data () {
    return {
      msg: '',
      text: '向右滑动',
      isVisible: false
    }
  },
  methods: {
    onSuccess(){
      this.msg = '验证成功'
      this.isVisible = true
    },
    onFail(){
      this.msg = '验证失败'
      this.isVisible = false
    },
    onRefresh(){
      this.msg = ''
      this.isVisible = false
    }
  }
}
</script>

<style scoped>
  .image-verify {
    position: relative;
  }
  .image-slide {
    position: absolute;
    left: 0px;
  }
  .success-box {
    position: absolute;
    left: 0px;
    top: 0px;
    background: rgba(255,255,255,0.9);
    width: 310px;
    height: 155px;
    transition: 1s all;
  }
  .success-box p {
    width: 100%;
    height: 30px;
    line-height: 30px;
    background: #fff;
    text-align: center;
    margin-top: 125px;
  }
</style>
