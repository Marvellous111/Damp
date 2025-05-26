<script lang="ts" setup>
import {
  useAppKitState,
  useAppKitTheme,
  useAppKitEvents,
  useAppKitAccount,
  useWalletInfo,
  useDisconnect,
  useAppKit
} from "@reown/appkit/vue";

const kitTheme = useAppKitTheme();
const state = useAppKitState();
const accountInfo = useAppKitAccount();
const events = useAppKitEvents();
const walletInfo = useWalletInfo();
console.log("Account info is: ", accountInfo.value);

// const { data: balance, refetch } = useBalance({
//   address: address as `0x${string}`
// })

var wallet_balance = "Wallet bal";
// console.log(wallet_info)
var connected_status = ref(true);

const { open } = useAppKit();
const { disconnect } = useDisconnect();

const connectwallet = async() => {
  await open();
}

const disconnectwallet = async() => {
  try {
    await disconnect();
  } catch (error) {
    console.error("Error during disconnect:", error);
  }
}
var eth_price_data = "";
var sol_price_data = "";
onMounted(async () => {
  const { data } = await useFetch('/api/prices');
  console.log("Data is: ", data)
  const response = data?.value;
  eth_price_data = response?.eth;
  sol_price_data = response?.sol
})

const getprices = async () => {
  const response = await $fetch('/api/market');
  console.log("response is: ", response);
  // eth_price_data = response?.eth;
  // sol_price_data = response?.sol;
}

</script>

<template>
  <section>
    <navbar>
      <div class="nav-space"></div>
      <NuxtLink to="/aichat/" class="hostgr-medium link" exact-active-class="active-nuxtlink-class">
        AI chat
      </NuxtLink>
      <NuxtLink to="/transactionhistory/" class="hostgr-medium link" exact-active-class="active-nuxtlink-class">
        Transaction history
      </NuxtLink>
      <NuxtLink to="/marketinfo/" class="hostgr-medium link" exact-active-class="active-nuxtlink-class">
        Market info
      </NuxtLink>

      <div class="network-price-indicator-wrapper">
        <div class="network-price-indicator">
          <span class="hostgr-regular network-name">ETH</span>
          <span class="hostgr-medium network-price">${{ eth_price_data }}</span>
        </div>
        <div class="network-price-indicator">
          <span class="hostgr-regular network-name">SOL</span>
          <span class="hostgr-medium network-price">${{ sol_price_data }}</span>
        </div>
        <button class="get-prices hostgr-medium" @click="getprices">Get current prices</button>
      </div>
      <!-- <NuxtLink to="/assetcustody/" class="hostgr-medium link" exact-active-class="active-nuxtlink-class">
        Asset custody
      </NuxtLink>
      <NuxtLink to="/assetissuance/" class="hostgr-medium link" exact-active-class="active-nuxtlink-class">
        Assets issuance
      </NuxtLink>
      <NuxtLink to="/defi/" class="hostgr-medium link" exact-active-class="active-nuxtlink-class">
        DeFi
      </NuxtLink> -->
    </navbar>
    <div class="wallet-addbal-body-wrapper">
      <div class="wallet-balance-address-container">
        <div class="wallet-balance-container">
          <span class="hostgr-medium wallet-balance-text-title">Wallet details</span>
          <!-- <span class="hostgr-bold wallet-balance-text">${{ walletInfo.balance }}</span> -->
        </div>
        <div class="wallet-address-connect-button-wrapper">
          <div class="wallet-address-container">
            <!-- <span class="hostgr-medium wallet-address-text-title">{{ accountInfo.isConnected }}</span> -->
            <div class="wallet-address-wrapper">
              <span class="hostgr-bold wallet-address-text" v-if="accountInfo.isConnected">{{ accountInfo.address }}</span>
              <span class="hostgr-bold wallet-address-text" v-else>No address</span>
            </div>
          </div>
          <div class="wallet-connect-button-wrapper">
            <button class="connected connect-button hostgr-medium" @click="disconnectwallet" v-if="accountInfo.isConnected">Disconnect</button>
            <button class="disconnected connect-button hostgr-medium" @click="connectwallet" v-else>Connect</button>
          </div>
        </div>
      </div>
      <main>
        <slot />
      </main>
    </div>
  </section>
</template>

<style lang="scss" scoped>
section {
  display: flex;
  height: 100vh;
  width: 100vw;
  position: relative;
  navbar {
    display: flex;
    flex-direction: column;
    row-gap: 15px;
    justify-content: start;
    align-items: left;
    border-right: 1px solid #FFFFFF;
    width: 30vw;
    height: 100vh;
    position: relative;
    .nav-space {
      height: 85px;
      //border: 1px solid #FFFFFF;
    }
    .link {
      display: flex;
      width: 200px;
      padding: 0px 10px;
      height: 38px;
      justify-content: left;
      align-items: center;
      font-size: 15px;
      outline: 0;
      border: 0px;
      margin-left: 30px;
      text-decoration: none;
      color: #FFFFFF;
    }
    .active-nuxtlink-class {
      background: #FFFFFF;
      width: 200px;
      color: #000000;
    }
    .network-price-indicator-wrapper {
      position: absolute;
      bottom: 20px;
      display: flex;
      flex-direction: column;
      row-gap: 10px;
      left: 30px;
      .network-price-indicator {
        border: 1px solid #FFFFFF;
        width: 200px;
        height: 38px;
        padding: 0px 10px;
        background: transparent;
        color: #FFFFFF;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .network-name {
          font-size: 15px;
        }
        .network-price {
          font-size: 16px;
        }
      }
      .get-prices {
        border: 1px solid #FFFFFF;
        width: 200px;
        height: 38px;
        background: transparent;
        outline: 0;
        padding: 0px 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #FFFFFF;
        font-size: 15px;
        transition: 0.1s ease-in;
      }
      .get-prices:active {
        background: #FFFFFF;
        color: #000000;
      }
    }
  }
  .wallet-addbal-body-wrapper {
    display: flex;
    flex-direction: column;
    //row-gap: 10px;
    align-items: start;
    justify-content: left;
    //ow-gap: 20px;
    width: 100%;
    height: 100%;
    //border: 1px solid white;
    .wallet-balance-address-container {
      position: relative;
      border-bottom: 1px solid #FFFFFF;
      width: 100%;
      height: 100px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .wallet-balance-container {
        margin-left: 40px;
        display: flex;
        flex-direction: column;
        row-gap: 10px;
        .wallet-balance-text {
          font-size: 18px;
        }
      }
      .wallet-address-connect-button-wrapper {
        display: flex;
        column-gap: 10px;
        align-items: center;
        margin-right: 40px;
        .wallet-address-container {
          display: flex;
          .wallet-address-wrapper {
            border: 1px solid #FFFFFF;
            min-width: 150px;
            width: fit-content;
            height: 38px;
            padding: 0px 5px;
            display: flex;
            align-items: center;
            justify-content: left;
            text-align: left;
            background: transparent;
            .wallet-address-text {
              font-size: 16px;
            }
          }
        }
        .wallet-connect-button-wrapper {
          button {
            border: 1px solid #FFFFFF;
            width: 100px;
            height: 38px;
            background: transparent;
            outline: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #FFFFFF;
            font-size: 15px;
            transition: 0.1s ease-in;
          }
          button:active {
            background: #FFFFFF;
            color: #000000;
          }
        }
      }
    }
    .wallet-balance-address-container::before {
      content: '';
      position:absolute;
      width: 30vw;
      border-bottom: 1px solid #FFFFFF;
      left: -30vw;
      bottom: -1px;
    }
  }
  main {
    //border: 1px solid white;
    width: 100%;
    height: 100%;
  }
}
</style>