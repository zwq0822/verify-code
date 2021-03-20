<!-- 滑块到右侧验证 方式二 -->
<template>
  <div ref="dragDiv" class="drag">
    <div class="drag-bg"
      :style="{'width': siderDistance + 'px'}">
    </div>
    <div class="drag-text"
      :style="{'color': confirmSuccess ? '#fff' : ''}">
      {{ confirmWords }}
    </div>
    <div ref="moveDiv" class="handler"
      :class="confirmSuccess ? successIcon : startIcon"
      :style="{'left': siderDistance + 'px'}"
      @mousedown="mouseDownFun">
    </div>
  </div>
</template>

<script>
export default {
  name: 'SliderValidate',
  props: ['status'],
  data () {
    return {
      startClientX: 0, // 距离当前body可视区域的左端距离
      mouseMoveState: false, // 触发拖到状态 判断
      maxwidth: '', // 拖动最大宽度，依据滑块宽度计算出来的
      siderDistance: 0, //滑动距离
      confirmWords: '拖动滑块到最右边', // 滑块文字
      confirmSuccess: false, // 验证成功判断
      startIcon: 'el-icon-d-arrow-right', // 开始图标
      successIcon: 'el-icon-success' // 成功图标
    }
  },
  mounted() {
    this.maxwidth = this.$refs.dragDiv.clientWidth - this.$refs.moveDiv.clientWidth
    document.getElementsByTagName('html')[0].addEventListener('mousemove', this.mouseMoveFun)
    document.getElementsByTagName('html')[0].addEventListener('mouseup', this.mouseUpFun)
  },
  watch:{
    confirmSuccess(now, old){
      console.log(now,old)
      this.$emit('update-status', now)
      if (now) {
        this.$emit('validata-status', now)
      }
    }
  },
  methods: {
    // mousedown事件
    mouseDownFun(e) {
      if (!this.confirmSuccess) {
        e.preventDefault && e.preventDefault() // 阻止文字选中等 浏览器默认事件
        this.mouseMoveState = true
        this.startClientX = e.clientX
      }
    },
    // 验证成功函数
    successFun() {
      this.confirmSuccess = true
      this.confirmWords = '验证通过'
      if (window.addEventListener) {
        document.getElementsByTagName('html')[0].removeEventListener('mousemove', this.mouseMoveFun)
        document.getElementsByTagName('html')[0].removeEventListener('mouseup', this.mouseUpFun)
      } else {
        document.getElementsByTagName('html')[0].removeEventListener('mouseup',()=>{})
      }
      this.siderDistance = this.maxwidth
    },
    // mousemove事件
    mouseMoveFun(e) {
      if (this.mouseMoveState) {
        let width = e.clientX - this.startClientX
        if (width > 0 && width <= this.maxwidth) {
          this.siderDistance = width
        } else if (width > this.maxwidth) {
          this.successFun()
        }
      }
    },
    // mouseup事件
    mouseUpFun(e) {
      this.mouseMoveState = false
      let width = e.clientX - this.startClientX
      if (width < this.maxwidth) {
        this.siderDistance = 0
      }
    }
  }
}
</script>

<style scoped>
  .drag {
    position: relative;
    background-color: #e9e9e9;
    width: 310px;
    height: 45px;
    line-height: 45px;
    text-align: center;
  }
  .drag-bg {
    background-color: #7ac23c;
    height: 45px;
    width: 0px;
  }
  .drag-text {
    position: absolute;
    top: 0px;
    width: 100%;
    color: #585858;
    text-align: center;
    -moz-user-select: none;
    -webkit-user-select: none;
    -o-user-select:none;
    -ms-user-select:none;
    user-select: none;
  }
  .handler {
    width: 60px;
    height: 43px;
    line-height: 43px;
    font-size: 20px;
    color: #7AC23C;
    background-color: #fff;
    border: 1px solid #d8d8d8;
    cursor: move;
    position: absolute;
    top: 0px;
  }
</style>
