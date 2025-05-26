<script lang="ts" setup>

</script>

<template>
  <form action="" method="post" class="form">
    <div class="input-form">
      <label for="asset-name" class="hostgr-regular">Asset name</label>
      <input type="text" placeholder="Asset name" class="hostgr-medium">
    </div>
    <div class="input-form">
      <label for="symbol" class="hostgr-regular">Asset symbol</label>
      <input type="text" placeholder="Asset symbol" class="hostgr-medium" style="text-transform:uppercase">
    </div>
    <div class="input-form">
      <label for="Total supply" class="hostgr-regular">Total supply</label>
      <input type="number" placeholder="Total supply" class="hostgr-medium">
    </div>
    <div class="input-form">
      <label for="decimals" class="hostgr-regular">Decimals</label>
      <input type="number" placeholder="Decimals" min="0" max="18" class="hostgr-medium">
    </div>
    <div class="input-form">
      <label for="description" class="hostgr-regular">Short description</label>
      <input type="text" placeholder="Short description" class="hostgr-medium">
    </div>
    <div class="input-form">
      <label for="decimals" class="hostgr-regular">Decimals</label>
      <input type="text" placeholder="Decimals" class="hostgr-medium">
    </div>
    <button class="issue-asset-button hostgr-medium">Issue Asset</button>
  </form>
</template>

<style lang="scss" scoped>
form {
  border: 1px solid #FFFFFF;
  padding: 15px;
  width: 250px;
  height: fit-content;
  display: flex;
  flex-direction: column;
  row-gap: 15px;
  .input-form {
    display: flex;
    flex-direction: column;
    row-gap: 5px;
    label {
      font-size: 13px;
    }
    input {
      background: transparent;
      height: 28px;
      width: 245px;
      outline: 0;
      border: 1px solid #FFFFFF;
      color: #FFFFFF;
      // padding-left: 5px;
      // padding-right: 5px;
      display: flex;
      align-items: center;
    }
  }
  button {
    height: 38px;
    background: #FFFFFF;
    border: 0;
    outline: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 15px;
  }
}
</style>