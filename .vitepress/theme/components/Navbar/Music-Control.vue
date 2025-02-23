<template>
  <div class="music-control-wrapper">
    <span class="music-control" @click="toggleMusic">
      <i :class="isPlaying ? 'iconfont icon-continue continue' : 'iconfont icon-stop stop'"></i>
    </span>
    <input
      type="range"
      class="music-progress"
      :value="musicProgress"
      @input="seekMusic"
      min="0"
      :max="musicDuration"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

const isPlaying = ref(false) // 音乐播放状态
const music = ref<HTMLAudioElement | null>(null)
const musicProgress = ref(0) // 音乐当前进度
const musicDuration = ref(0) // 音乐总时长

const toggleMusic = () => {
  if (music.value) {
    if (isPlaying.value) {
      music.value.pause()
    } else {
      music.value.play().catch((err) => console.log('播放失败: ', err))
    }
    isPlaying.value = !isPlaying.value
  }
}

const seekMusic = (event: Event) => {
  const target = event.target as HTMLInputElement
  const seekTime = parseFloat(target.value)
  if (music.value) {
    music.value.currentTime = seekTime
  }
}

onMounted(() => {
  music.value = document.getElementById('background-music') as HTMLAudioElement
  if (music.value) {
    music.value.volume = 0.3 // 设置音量为30%
    music.value.pause() // 初始状态为暂停
    musicDuration.value = music.value.duration

    // 监听音乐播放时间更新
    music.value.addEventListener('timeupdate', () => {
      if (music.value) {
        musicProgress.value = music.value.currentTime
      }
    })

    // 监听音乐加载完成，更新总时长
    music.value.addEventListener('loadedmetadata', () => {
      if (music.value) {
        musicDuration.value = music.value.duration
      }
    })
  }
})
</script>

<style scoped lang="less">
.music-control-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.iconfont {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2vw;
  color: var(--font-color-grey);
  cursor: pointer;
  transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1);
  &:hover {
    transform: translateY(-3px);
  }
}

.music-progress {
  width: 200px;
  margin-top: 10px;
}

@media (max-width: 768px) {
  .iconfont {
    font-size: 4vh;
  }
}
</style>