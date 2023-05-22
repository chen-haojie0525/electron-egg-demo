<template>
  <div class="p-5">
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
        <video ref="videoRef" width="350" height="225" autoplay></video>
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
        <canvas ref="canvasRef" width="350" height="225"></canvas>
      </div>      
    </div>                    
  </div>
</template>
<script lang="ts">
  import { defineComponent, inject, reactive, toRefs, onMounted, ref } from 'vue';
  import { ipcApiRoute } from '@/api/main'

  interface cameraState {
    currentCamera: any;
    savePath: String,
    cameraList: any[]
  }

  export default defineComponent({
    name: 'Menu3Demo',
    setup() {
      const $ipc = inject('$ipc')
      console.log($ipc, '$ipc')
      const videoRef = ref()
      const canvasRef = ref()
      const dataMap = reactive<cameraState>({
        currentCamera: {},
        savePath: '',
        cameraList: []
      })
      const methods = {
        init () {
          // 避免重复监听，或者将 on 功能写到一个统一的地方，只加载一次
          $ipc.removeAllListeners(ipcApiRoute.cameraStatus);
          $ipc.on(ipcApiRoute.cameraStatus, (event, result) => {
            const { phototakePath } = result
            dataMap.savePath = phototakePath
          })
        },    
        async getCamera () {
          const devices = await navigator.mediaDevices.enumerateDevices()
          this.cameraList = devices.filter(i => i.kind === 'videoinput')
          if (dataMap.cameraList.length > 0) { dataMap.currentCamera = dataMap.cameraList[0] }

          const constraints = {
            video: { deviceId: dataMap.currentCamera ? { exact: dataMap.currentCamera.deviceId } : undefined }
          }
          const success = await navigator.mediaDevices.getUserMedia(constraints)
          // await navigator.mediaDevices.getUserMedia(constraints)
          videoRef.value.srcObject = success
          videoRef.value.play()
        },
        doShot () {
          const ctx = canvasRef.value.getContext('2d')
          ctx.drawImage(videoRef.value, 0, 0, 350, 225)
          // 转base64格式、图片格式转换、图片质量压缩
          const imgBase64 = canvasRef.value.toDataURL('image/png', 0.7) // 由字节转换为KB 判断大小
          $ipc.send(ipcApiRoute.saveImg, {imgBase64})
        },
        close() {
          if (!videoRef.value.srcObject) return
          const stream = videoRef.value.srcObject
          const tracks = stream.getTracks()
          tracks.forEach(track => {
            track.stop()
          })
          videoRef.value.srcObject = null
          dataMap.currentCamera = ''
        }
      }
      onMounted(() => {
        methods.init()
      })
      return {
        ...toRefs(dataMap),
        ...methods,
        videoRef,
        canvasRef
      }
    }
  });
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
