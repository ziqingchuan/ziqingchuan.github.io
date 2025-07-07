<template>
  <div class="container">
    <div class="header">
      <div class="head-social">
        <img style="width: 20px" src="/icons/right.svg" alt="right"><router-link to="/blog/" class="head-social-avatar"><img src="/logo.svg" alt="avatar"></router-link><img style="width: 20px" src="/icons/left.svg" alt="left">
      </div>
      <img src="/images/welcome.svg" alt="welcome">
    </div>
    <div class="about-me">

      <div class="card-content grid-row-3-2">
        <AboutMeSkill/>
        <AboutMeLanguage/>
<!--        <AboutMeText>-->
<!--          <template #motto>-->
<!--            <slot name="motto">-->
<!--              <p class="about-me-card-title-normal">编程语言</p>-->
<!--              <img src="/language.svg" alt="motto">-->
<!--            </slot>-->
<!--          </template>-->
<!--        </AboutMeText>-->
      </div>

      <div class="card-content grid-row-2-4">
        <AboutMeText>
          <template #motto>
            <slot name="motto">
              <p class="about-me-card-title-normal">GitHub</p>
              <img src="/profile-night-rainbow.svg" alt="motto">
            </slot>
          </template>
        </AboutMeText>
        <AboutMeText>
          <template #motto>
            <slot name="motto">
              <p class="about-me-card-title-normal">Contribution Graph</p>
              <img src="/graph.svg" alt="motto">
            </slot>
          </template>
        </AboutMeText>
      </div>
      <div class="card-content grid-row-1-1">
        <AboutMeText>
          <template #motto>
            <slot name="motto">
              <p class="about-me-card-title-normal">追求</p>
              <p class="about-me-card-text-big">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;和<span style="color: #3a79cc">有趣的人</span>
              </p>
              <p class="about-me-card-text-big">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;一起做<span style="color: #f84d4d">有意义的事</span></p>
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
.header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
.grid-row-2-4 {
  grid-template-columns: 2fr 4fr;
}
.grid-row-3-2 {
  grid-template-columns: 3fr 2fr;
}

.grid-row-1-1 {
  grid-template-columns: 1fr 1fr;
}

</style>


<script setup lang="ts">
import AboutMeText from "./AboutMeText.vue";
import AboutMeSkill from "./AboutMeSkill.vue";
import AboutMeCharacter from "./AboutMeCharacter.vue";
import AboutMeLanguage from "./AboutMeLanguage.vue";
</script>


