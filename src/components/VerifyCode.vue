<!-- 滑块到右侧验证 方式一 -->
<template>
  <div class="verify-code">
    <div class="code-range" :class="rangeStatus ? 'success' : ''">
      <i @mousedown="rangeMove" :class="rangeStatus ? successIcon : startIcon"></i>
      {{ rangeStatus ? successText : startText }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'VerifyCode',
  props: {
    // 开始图标
    startIcon: {
      type: String,
      default: 'el-icon-d-arrow-right'
    },
    // 开始文字
    startText: {
      type: String,
      default: '拖到滑块到最右边'
    },
    // 成功图标
    successIcon: {
      type: String,
      default: 'el-icon-success'
    },
    // 成功文字
    successText: {
      type: String,
      default: '验证通过'
    },
    // 成功之后的函数
    successFun: {
      type: Function
    },
    // 失败之后的函数
    errorFun: {
      type: Function
    },
    // 或者用值来进行监听
    status: {
      type: String
    }
  },
  data () {
    return {
      rangeStatus: false,
      disX : 0
    }
  },
  methods: {
    // 滑块移动
    rangeMove(e) {
      let ele = e.target
      // console.log(ele)
      let startX = e.clientX // 点击位置距离当前body可视区域的x坐标
      // console.log(startX)
      let eleWidth = ele.offsetWidth // 返回元素的宽度（width + 左右padding + 左右boder）
      // console.log(eleWidth) // 62
      let parentWidth = ele.parentElement.offsetWidth // 定位父级的宽度
      // console.log(ele.parentElement)
      // console.log(parentWidth)
      let MaxX = parentWidth - eleWidth // 滑块滑动区域剩下范围的宽度
      // console.log(MaxX)

      if (this.rangeStatus) { // 不运行
        return false
      }

      document.onmousemove = (e) => {
        let endX = e.clientX
        this.disX = endX - startX
        if (this.disX <= 0) {
          this.disX = 0
        }
        if (this.disX >= MaxX - eleWidth) { // 减去滑块的宽度，体验效果更好
          this.disX = MaxX
        }
        ele.style.transition = '.1s all'
        ele.style.transform = 'translateX(' + this.disX + 'px)'
        e.preventDefault()
      }

      document.onmouseup = () => {
        if (this.disX !== MaxX) {
          ele.style.transition = '.5s all'
          ele.style.transform = 'translateX(0)'
          // 执行失败的函数
          this.errorFun && this.errorFun()
        } else {
          this.rangeStatus = true
          if (this.status) {
            this.$parent[this.status] = true
          }
          // 执行成功的函数
          this.successFun && this.successFun()
        }
        document.onmousemove = null
        document.onmouseup = null
      }
    }
  }
}
</script>

<style scoped>
  .verify-code {
    width: 310px;
  }
  .code-range {
    background-color: #e9e9e9;
    position: relative;
    transition: 1s all;
    user-select: none;
    color: #585858;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 45px; /* no */
  }
  .code-range i {
    position: absolute;
    left: 0;
    width: 60px; /* no */
    height: 100%;
    color: #3fcd26;
    background-color: #fff;
    border: 1px solid #d8d8d8;
    cursor: move;
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .code-range.success {
    background-color: #7AC23C;
    color: #fff;
  }
  .code-range.success i {
    color: #7AC23C;
  }
</style>
