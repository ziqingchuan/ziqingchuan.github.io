<template>
  <div class="container">
    <canvas ref="canvasRef"></canvas>
    <div class="head-social">
      <img style="width: 20px" src="/icons/right.svg" alt="right"><router-link to="/blog/" class="head-social-avatar"><img src="/logo.svg" alt="avatar"></router-link><img style="width: 20px" src="/icons/left.svg" alt="left">
    </div>
    <div class="about-me">
      <div class="card-content grid-row-3-2">
<!--        <AboutMeName/>-->
<!--        <AboutMeText>-->
<!--          <template #motto>-->
<!--            <slot name="motto">-->
<!--              <p class="about-me-card-title-normal">座右铭</p>-->
<!--              <p class="about-me-card-text-big">&nbsp;&nbsp;&nbsp;&nbsp;莫听穿林打叶声，</p>-->
<!--              <p class="about-me-card-text-big about-me-card-text-color">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;何妨吟啸且徐行！</p>-->
<!--            </slot>-->
<!--          </template>-->
<!--        </AboutMeText>-->
      </div>
      <div class="card-content grid-row-3-2">
        <AboutMeSkill/>
        <AboutMeText>
          <template #motto>
            <slot name="motto">
              <img src="/profile-night-rainbow.svg" alt="motto">
            </slot>
          </template>
        </AboutMeText>
<!--        <AboutMeLife/>-->
      </div>
      <div class="card-content grid-row-1-1">
        <AboutMeText>
          <template #motto>
            <slot name="motto">
              <p class="about-me-card-title-normal">追求</p>
              <p class="about-me-card-text-big about-me-card-text-soft">&nbsp;&nbsp;&nbsp;&nbsp;用心去<span style="color: #3a5ccc">感受</span>
              </p>
              <p class="about-me-card-text-big">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;用热爱去<span style="color: #d53737">创造</span></p>
            </slot>
          </template>
        </AboutMeText>
        <AboutMeCharacter/>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  z-index: 1;
  width: 100%;
  height: 100%;
  overflow-x: hidden !important;
  overflow-y: hidden !important;
}

canvas {
  z-index: -1;
  position: fixed;
  top: -1px;
  left: -1px;
  pointer-events: none; /* 允许鼠标事件穿透 */
  overflow: hidden;
}

.head-social {
  display: flex;
  width: fit-content;
  margin: 0 auto;
  align-items: center;

  .head-social-avatar {
    margin: 10px;
    border-radius: 50%;
    width: 50px;
    overflow: hidden;
    transition: transform 0.2s;

    &:hover {
      transform: scale(1.1);
    }
  }
}

.about-me {
  max-width: 1380px;
  margin: 0 auto;
  width: 90%;
  @media screen and (max-width: 770px) {
    width: 94%;
  }
}

.card-content{
  margin-top: 20px;
  display: grid;
  gap: 20px;
  @media screen and (max-width: 770px) {
    display: flex;
    flex-direction: column;
  }
}
.grid-row-3-2 {
  grid-template-columns: 3fr 2fr;
}

.grid-row-1-1 {
  grid-template-columns: 1fr 1fr;
}

</style>


<script setup lang="ts">
import {ref, onMounted, onUnmounted} from 'vue'
import AboutMeText from "./AboutMeText.vue";
import AboutMeSkill from "./AboutMeSkill.vue";
import AboutMeCharacter from "./AboutMeCharacter.vue";
import AboutMeLife from "./AboutMeLife.vue";
import AboutMeName from "./AboutMeName.vue";

interface Comet {
  direction: 'horizontal' | 'vertical'
  position: number
  progress: number
  speed: number
}

const canvasRef = ref<HTMLCanvasElement | null>(null)
const ctx = ref<CanvasRenderingContext2D | null>(null)
const linesGap = 100
const comets = ref<Comet[]>([])
const mouseX = ref(-1)
const mouseY = ref(-1)
let animationFrameId: number

const initCanvas = () => {
  const canvas = canvasRef.value
  if (!canvas) return

  ctx.value = canvas.getContext('2d')
  resizeCanvas()
  window.addEventListener('resize', resizeCanvas)
}

const resizeCanvas = () => {
  const canvas = canvasRef.value
  if (!canvas || !ctx.value) return

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
}

const drawGrid = () => {
  const canvas = canvasRef.value
  const context = ctx.value
  if (!canvas || !context) return

  context.clearRect(0, 0, canvas.width, canvas.height)
  context.lineWidth = 2

  // 绘制带渐变效果的网格
  const radius = 100 // 颜色影响半径
  const hasMouse = mouseX.value >= 0 && mouseY.value >= 0

  // 水平线
  for (let y = 0; y < canvas.height; y += linesGap) {
    context.beginPath()
    context.moveTo(0, y)
    context.lineTo(canvas.width, y)

    let alpha = 0.1
    if (hasMouse) {
      const dy = Math.abs(y - mouseY.value)
      if (dy < radius) {
        alpha = 0.1 + (1 - dy / radius) * 0.9
      }
    }
    context.strokeStyle = `rgba(80, 134, 161, ${alpha})`
    context.stroke()
  }

  // 垂直线
  for (let x = 0; x < canvas.width; x += linesGap) {
    context.beginPath()
    context.moveTo(x, 0)
    context.lineTo(x, canvas.height)

    let alpha = 0.1
    if (hasMouse) {
      const dx = Math.abs(x - mouseX.value)
      if (dx < radius) {
        alpha = 0.1 + (1 - dx / radius) * 0.9
      }
    }
    context.strokeStyle = `rgba(80, 134, 161, ${alpha})`
    context.stroke()
  }
}

// 彗星函数
const createComet = () => {
  const direction = Math.random() > 0.5 ? 'horizontal' : 'vertical'
  const maxPosition = direction === 'horizontal'
      ? Math.floor(window.innerHeight / linesGap)
      : Math.floor(window.innerWidth / linesGap)

  const position = Math.floor(Math.random() * maxPosition) * linesGap

  comets.value.push({
    direction,
    position,
    progress: 0,
    speed: Math.random() * 0.005 + 0.002,
  })
}

const drawComet = (comet: Comet) => {
  const context = ctx.value
  const canvas = canvasRef.value
  if (!context || !canvas) return

  const length = 80
  const {direction, position, progress} = comet

  if (direction === 'horizontal') {
    const x = progress * canvas.width
    const y = position

    const gradient = context.createLinearGradient(x - length, y, x, y)
    gradient.addColorStop(0, 'rgba(80, 134, 161, 0)')
    gradient.addColorStop(0.4, 'rgba(80,134,161,0.3)')
    gradient.addColorStop(1, '#4483a2')

    context.strokeStyle = gradient
    context.beginPath()
    context.moveTo(x - length, y)
    context.lineTo(x, y)
    context.stroke()
  } else {
    const x = position
    const y = progress * canvas.height

    const gradient = context.createLinearGradient(x, y - length, x, y)
    gradient.addColorStop(0, 'rgba(80, 134, 161, 0)')
    gradient.addColorStop(0.4, 'rgba(80,134,161,0.3)')
    gradient.addColorStop(1, '#4483a2')

    context.strokeStyle = gradient
    context.beginPath()
    context.moveTo(x, y - length)
    context.lineTo(x, y)
    context.stroke()
  }
}

const animate = () => {
  const canvas = canvasRef.value
  const context = ctx.value
  if (!canvas || !context) return

  context.clearRect(0, 0, canvas.width, canvas.height)
  drawGrid()

  comets.value = comets.value.filter(comet => {
    comet.progress += comet.speed
    drawComet(comet)
    return comet.progress < 1.2
  })

  animationFrameId = requestAnimationFrame(animate)
}

onMounted(() => {
  initCanvas()
  animate()
  setInterval(createComet, 1000)
})

onUnmounted(() => {
  window.removeEventListener('resize', resizeCanvas)
  cancelAnimationFrame(animationFrameId)
})
</script>


