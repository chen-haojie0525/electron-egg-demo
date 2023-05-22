<template>
  <div class="p-5">
    <div id="app-hw-bluetooth">
        <div class="one-block-1">
        <span>
          1. 打印机设备
        </span>
      </div>  
      <div class="one-block-2">
        <a-button @click="getPrinter()"> 获取打印机列表 </a-button>
      </div>
      <div class="one-block-2">
        <div>
            设备列表
          </div>
        <div v-for="item, index in printerList" :key="index">{{ item.displayName }} {{ defaultDevice(item) }}</div>
      </div>
      <div class="one-block-1">
        <span>
          2. 打印内容
        </span>
      </div>  
      <div class="one-block-2">
        <a-button @click="doPrint(0)"> 打印一个页面 </a-button>
      </div>      
    </div>                    
  </div>
</template>
<script lang="ts">
  import { defineComponent, inject, reactive, toRefs, onMounted } from 'vue';
  import { Input } from 'ant-design-vue';
  import { ipcApiRoute } from '@/api/main'
  export default defineComponent({
    name: 'Menu2Demo',
    components: { Input },
    setup() {
      console.log('setup')
      const $ipc = inject('$ipc')
      console.log($ipc, '$ipc')
      const dataMap = reactive({
        defaultDeviceName: '',
        printerList: [],
        views: [
          {
            type: 'html',
            content: '/public/html/view_example.html'
          },        
        ],
      })
      const methods = {
        init () {
          // 避免重复监听，或者将 on 功能写到一个统一的地方，只加载一次
          $ipc.removeAllListeners(ipcApiRoute.printStatus);
          $ipc.on(ipcApiRoute.printStatus, (event, result) => {
            console.log('result', result);
          })
        },    
        getPrinter () {
          $ipc.invoke(ipcApiRoute.getPrinterList, {}).then(res => {
            dataMap.printerList = res;
          }) 
        },
        doPrint (index) {
          console.log('defaultDeviceName:', dataMap.defaultDeviceName)
          console.log(index, dataMap.views[index])
          const params = {
            view: dataMap.views[index],
            deviceName: dataMap.defaultDeviceName
          };
          $ipc.send(ipcApiRoute.print, JSON.stringify(params))
        },
        defaultDevice (item) {
          let desc = "";
          if (item.isDefault) {
            desc = "- 默认";
            dataMap.defaultDeviceName = item.name;
          }
          
          return desc;
        } 
      }
      onMounted(() => {
        methods.init()
      })
      return {
        ...toRefs(dataMap),
        ...methods
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
