<script lang="ts" setup>
import { useAppKit } from '@reown/appkit/vue';
import { useAccount } from 'wagmi';

const { open, close } = useAppKit();
// const account = useAccount();

const router = useRouter();

const connectevmwallet = async () => {
  try {
    await open();
    router.push('/aichat/');
  }catch (err) {
    console.error(err)
  }
  //const modal = open()
  // console.log('pushed to chat');
};

</script>

<template>
  <body>
    <div class="page-container">
      <div class="page-container-two">
        <div class="connect-wallet-container">
          <h3 class="hostgr-medium">Connect your wallet to use damp</h3>
          <button class="connect-wallet-button" @click="connectevmwallet">
            <SvgoLogo class="logo-size" :fontControlled="false" />
            <span class="hostgr-medium">Connect to your wallet</span>
          </button>
          <!-- <appkit-button label="Connect using reown" /> -->
        </div>
      </div>
    </div>
  </body>
</template>

<style lang="scss" scoped>
body {
  height: 100vh;
  width: 100vw;
  display: flex;
  //border: 1px solid blue;
  align-items: center;
  justify-content: center;
  .page-container {
    position: relative;
    border: 1px solid #FFFFFF;
    height: 80vh;
    width: 90%;
    .page-container-two {
      position: relative;
      // border: 1px solid #FFFFFF;
      height: 80vh;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .connect-wallet-container {
        border: 1px solid white;
        width: 350px;
        height: fit-content;
        padding-top: 20px;
        padding-bottom: 20px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        row-gap: 20px;
        h3 {
          font-weight: normal;
          margin-top: 0;
        }
        .connect-wallet-button {
          width: 250px;
          height: 38px;
          font-size: 15px;
          font-weight: normal;
          display: flex;
          column-gap: 10px;
          justify-content: center;
          align-items: center;
          outline: 0;
          border: 0;
          background: #FFFFFF;
          cursor: pointer;
          .logo-size {
            width: 28px;
            height: 28px;
          }
        }
      }
    }
  }
  .page-container::before {
      content: '';
      position: absolute;
      top: -51px;
      left: -51px;
      height: 50px;
      width: 50px;
      background-color: transparent;
      border: 1px solid #FFFFFF;
      border-left: 0;
      border-top: 0;
    }
    .page-container-two::before {
      content: '';
      position: absolute;
      bottom: -51px;
      left: -51px;
      height: 50px;
      width: 50px;
      background-color: transparent;
      border: 1px solid #FFFFFF;
      border-bottom: 0;
      border-left: 0;
    }
    .page-container::after {
      content: '';
      position: absolute;
      top: -51px;
      right: -51px;
      height: 50px;
      width: 50px;
      background-color: transparent;
      border: 1px solid #FFFFFF;
      border-right: 0;
      border-top: 0;
    }
    .page-container-two::after {
      content: '';
      position: absolute;
      bottom: -51px;
      right: -51px;
      height: 50px;
      width: 50px;
      background-color: transparent;
      border: 1px solid #FFFFFF;
      border-bottom: 0;
      border-right: 0;
    }
}
</style>