<script lang="ts" setup>
var buttontext: String;

props: {
  buttontext: String
}

</script>

<template>
  <div class="nuxt-link-container">
    <div class="nuxt-link-container-two">
      <NuxtLink to="/connectwallet/" class="nuxt-link hostgr-medium">Get started</NuxtLink>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.nuxt-link-container {
  border: 1px solid #FFFFFF;
  background: #FFFFFF;
  width: 120px;
  height: 38px;
  position: relative;
  .nuxt-link-container-two {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: stretch;
    height: stretch;
    border: 2px solid #121212;
    .nuxt-link {
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      width: 100%;
      height: 100%;
      text-decoration: none;
      color: #000000;
      font-weight: normal;
    }
  }
}
.nuxt-link-container::before {
  content: '';
  position: absolute;
  top: -12px;
  left: -12px;
  border: 2px solid rgb(255, 255, 255);
  border-left: 0;
  border-top: 0;
  width: 12px;
  height: 12px;
  z-index: 2;
}
.nuxt-link-container::after {
  content: '';
  position: absolute;
  top: -12px;
  right: -12px;
  border: 2px solid rgb(255, 255, 255);
  border-right: 0;
  border-top: 0;
  width: 12px;
  height: 12px;
  z-index: 2;
}

.nuxt-link-container-two::before {
  content: '';
  position: absolute;
  bottom: -14px;
  left: -14px;
  border: 2px solid #FFFFFF;
  border-bottom: 0;
  border-left: 0;
  width: 12px;
  height: 12px;
  z-index: 2;
}
.nuxt-link-container-two::after {
  content: '';
  position: absolute;
  bottom: -14px;
  right: -14px;
  border: 2px solid #FFFFFF;
  border-bottom: 0;
  border-right: 0;
  width: 12px;
  height: 12px;
  z-index: 2;
}
</style>