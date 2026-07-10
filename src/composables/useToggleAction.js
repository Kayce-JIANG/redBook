import { ref } from 'vue'
import { ElMessage } from 'element-plus'

/**
 * 通用的「乐观更新 + 失败回滚 + 防抖锁」组合式函数
 * 适用于点赞、收藏、关注等 toggle 类操作
 *
 * @param {import('vue').Ref} target   - 被操作对象的响应式引用
 * @param {Object}             config   - 配置项
 * @param {string}             config.statusKey  - 状态字段名（如 'isLiked'）
 * @param {string}             config.countKey   - 计数字段名（如 'likes'）
 * @param {Function}           config.apiFn      - API 调用函数
 * @param {string}             config.successMsg - 成功提示文案
 * @param {string}             config.errorMsg   - 失败提示文案
 * @returns {{ isPending: import('vue').Ref<boolean>, toggle: (newStatus: boolean) => Promise<void> }}
 */
export function useToggleAction(target, config) {
  const isPending = ref(false)

  const toggle = async (newStatus) => {
    if (isPending.value || !target.value) return

    // 1. 记录旧状态，用于失败回滚
    const previousStatus = target.value[config.statusKey]
    const previousCount = target.value[config.countKey] || 0

    // 2. 乐观更新
    target.value[config.statusKey] = newStatus
    target.value[config.countKey] = newStatus
      ? previousCount + 1
      : Math.max(0, previousCount - 1)

    // 3. 加锁 → 调接口
    isPending.value = true
    try {
      const res = await config.apiFn({
        note_id: target.value.id,
        status: newStatus,
      })
      if (res.code !== 200) throw new Error(res.msg)
      if (config.successMsg) ElMessage.success(config.successMsg)
    } catch (error) {
      // 4. 失败回滚
      target.value[config.statusKey] = previousStatus
      target.value[config.countKey] = previousCount
      ElMessage.error(error.message || config.errorMsg)
    } finally {
      isPending.value = false
    }
  }

  return { isPending, toggle }
}
