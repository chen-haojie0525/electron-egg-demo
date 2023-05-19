import { createRouter, createWebHashHistory } from 'vue-router'
import { constantRouterMap } from '@/config/router.config'

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRouterMap
})

// 重写router.push方法
router.originalPush = router.push
router.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return router.originalPush.call(this, location, onResolve, onReject)
  return router.originalPush.call(this, location).catch(err => err)
}

export default router
