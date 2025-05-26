<script lang="ts" setup>

</script>

<template>
  <div class="connect-wallet-button-container">
    <div class="connect-wallet-button-container-two">
      <button class="connect-button hostgr-medium">Connect your EVM Wallet</button>
      <button class="connect-button hostgr-medium">Connect your Stacks Wallet</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.connect-wallet-button-container {
  border: 1px solid #FFFFFF;
  background: #FFFFFF;
  width: 150px;
  height: 38px;
  position: relative;
  .connect-wallet-button-container-two {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: stretch;
    height: stretch;
    border: 2px solid #121212;
    .connect-button {
      display: flex;
      outline: 0;
      border: 0px;
      align-items: center;
      justify-content: center;
      text-align: center;
      width: 100%;
      height: 34px;
      text-decoration: none;
      color: #000000;
      background: #FFFFFF;
      font-weight: normal;
      font-size: 15px;
      cursor: pointer;
    }
  }
}
.connect-wallet-button-container::before {
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
.connect-wallet-button-container::after {
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

.connect-wallet-button-container-two::before {
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
.connect-wallet-button-container-two::after {
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