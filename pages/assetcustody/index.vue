<script lang="ts" setup>
definePageMeta({
  layout: 'home-layout'
})
</script>

<template>
  <main>
    <div class="no-asset-container">
      <span class="hostgr-medium">No asset in custody at this time</span>
    </div>
  </main>
</template>

<style lang="scss" scoped>
main {
  height: 100%;
  width: 100%;
  display: flex;
  .no-asset-container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    span {
      text-align: center;
    }
  }
}
</style>