<template>
  <div id="app-hw-bluetooth">
    <div class="one-block-1">
      <span>
        1. 当前设备: {{currentCamera ? currentCamera.label : '--'}}
      </span>
    </div>  
    <div class="one-block-2">
      <a-button @click="getCamera()"> 获取摄像头 </a-button>
      <a-button @click="close()"> 关闭 </a-button>
    </div>
    <div class="one-block-2">
      <video ref="video" width="350" height="225" autoplay></video>
    </div>
    <div class="one-block-1">
      <span>
        2. 保存路径: {{savePath || '--'}}
      </span>
    </div>  
    <div class="one-block-2">
      <a-button @click="doShot(0)"> 抓拍 </a-button>
    </div>
    <div class="one-block-2">
      <canvas ref="canvas" width="350" height="225"></canvas>
    </div>      
  </div>
</template>
<script>
import { ipcApiRoute } from '@/api/main'

export default {
  data() {
    return {
      currentCamera: '',
      savePath: '',
      cameraList: []
    };
  },
  mounted () {
    this.init();
  },  
  methods: {
    init () {
      // 避免重复监听，或者将 on 功能写到一个统一的地方，只加载一次
      this.$ipc.removeAllListeners(ipcApiRoute.cameraStatus);
      this.$ipc.on(ipcApiRoute.cameraStatus, (event, result) => {
        const { phototakePath } = result
        this.savePath = phototakePath
      })
    },    
    async getCamera () {
      const devices = await navigator.mediaDevices.enumerateDevices()
      this.cameraList = devices.filter(i => i.kind === 'videoinput')
      if (this.cameraList.length > 0) { this.currentCamera = this.cameraList[0] }

      const constraints = {
        video: { deviceId: this.currentCamera ? { exact: this.currentCamera.deviceId } : undefined }
      }
      const success = await navigator.mediaDevices.getUserMedia(constraints)
      // await navigator.mediaDevices.getUserMedia(constraints)
      this.$refs.video.srcObject = success
      this.$refs.video.play()
    },
    doShot () {
      const ctx = this.$refs.canvas.getContext('2d')
      ctx.drawImage(this.$refs.video, 0, 0, 350, 225)
      // 转base64格式、图片格式转换、图片质量压缩
      const imgBase64 = this.$refs.canvas.toDataURL('image/png', 0.7) // 由字节转换为KB 判断大小
      this.$ipc.send(ipcApiRoute.saveImg, {imgBase64})
    },
    close() {
      if (!this.$refs.video.srcObject) return
      const stream = this.$refs.video.srcObject
      const tracks = stream.getTracks()
      tracks.forEach(track => {
        track.stop()
      })
      this.$refs.video.srcObject = null
      this.currentCamera = ''
    }
  }
};
</script>
<style lang="less" scoped>
#app-hw-bluetooth {
  padding: 0px 10px;
  text-align: left;
  width: 100%;
  .one-block-1 {
    font-size: 16px;
    padding-top: 10px;
  }
  .one-block-2 {
    padding-top: 10px;
  }
}
</style>
