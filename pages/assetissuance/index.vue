<script lang="ts" setup>
definePageMeta({
  layout: 'home-layout'
})

var mini_pages = ['formpage', 'issuetablehistorypage'];

</script>

<template>
  <main>
    <navbar class="assetissuance-nav-wrapper">
      <NuxtLink to="/assetissuance/issuedassets" class="issuedassethistory-link hostgr-medium" exact-active-class="active-nuxtlink-class">
        Issued assets
      </NuxtLink>
    </navbar>
    <div class="assetissuance-page-wrapper">
      <AssetIssuanceForm />
    </div>
  </main>
</template>

<style lang="scss" scoped>
main {
  height: 100%;
  width: 100%;
  display: flex;
  row-gap: 20px;
  flex-direction: column;
  .assetissuance-nav-wrapper {
    display: flex;
    width: fit-content;
    height: 40px;
    margin-top: 20px;
    margin-left: 40px;
    justify-content: center;
    align-items: center;
    .issuedassethistory-link {
      text-decoration: none;
      color: #FFFFFF;
      height: 38px;
      width: 100px;
      padding-left: 10px;
      padding-right: 10px;
      border: 1px solid #FFFFFF;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 15px;
    }
    .active-nuxtlink-class {
      background: #FFFFFF;
      color: #000000;
    }
  }
  .assetissuance-page-wrapper {
    //margin-left: 40px;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>