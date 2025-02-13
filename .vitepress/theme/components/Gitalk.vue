<template>
  <div class="gitalk-container">
    <div ref="gitalkContainer"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useData } from 'vitepress'
import md5 from 'md5'

// 获取 VitePress 配置
const themeConfig = useData().theme.value
const env = import.meta.env  // 获取环境变量

declare global {
  interface Window {
    Gitalk: any
  }
}

// 引用 DOM 元素
const gitalkContainer = ref<HTMLElement | null>(null)

onMounted(() => {
  if (gitalkContainer.value && gitalkContainer.value.children.length === 0) {
    // 配置 Gitalk 参数
    const commentConfig = {
      clientID: env.VITE_CLIENT_ID,  // 从环境变量中获取 Client ID
      clientSecret: env.VITE_CLIENT_SECRET,  // 从环境变量中获取 Client Secret
      repo: themeConfig.repo,  // 使用从配置中获取的仓库名称
      owner: themeConfig.owner,  // 使用从配置中获取的仓库拥有者
      admin: themeConfig.admin,  // 使用从配置中获取的管理员列表
      id: md5(location.pathname),  // 使用 MD5 对页面路径进行哈希生成唯一 ID
      distractionFreeMode: false,  // 启用干扰自由模式
    }

    try {
      const gitalk = new window.Gitalk(commentConfig)
      gitalk.render(gitalkContainer.value)  // 渲染评论区到指定容器
    } catch (error) {
      console.error("Gitalk 渲染失败: ", error)
    }
  }
})
</script>

<style scoped>
.gitalk-container {
  margin-top: 20px;
  padding: 20px;
  border-top: 2px solid #f1f1f1;
}

.gt-container .gt-header-textarea {
  color: var(--font-color-grey);  /* 自定义字体颜色 */
  background-color: var(--general-background-color) !important; /* 自定义背景色 */
  transition: background-color 0.5s, color 0.5s !important; /* 平滑过渡 */
}

.gt-container .gt-comment-content {
  background-color: var(--foreground-color) !important; /* 自定义评论内容区域背景色 */
}

.gt-container .gt-comment-content p {
  color: var(--font-color-grey); /* 自定义评论内容字体颜色 */
}
</style>
