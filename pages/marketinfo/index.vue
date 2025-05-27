<script lang="ts" setup>
import { Expand } from 'lucide-vue-next';
import { Chart, LineController, PointElement, LineElement, Tooltip, Legend } from 'chart.js';
import { CandlestickElement } from 'chartjs-chart-financial';
import { gsap } from 'gsap';

definePageMeta({
  layout: 'home-layout'
})
useSeoMeta({
  title: 'Market info | Damp'
})

Chart.register(LineController, PointElement, LineElement, Tooltip, Legend, CandlestickElement);

const toggleFullScreen = (network: string) => {}


var solanaData = ref([]);
var ethData = ref([]);

const refresh = async() => {
  const response: {} = await $fetch('/api/market');
  solanaData.value = response.sol;
  ethData.value = response.eth;
}

var responseData: {} = {};
onMounted(async () => {
  const response: {} = await useFetch('/api/market');
  responseData = response;
  solanaData.value = responseData.sol;
  ethData.value = responseData.eth;

  console.log("Solana data is:", solanaData);
  console.log("Eth data is: ", ethData);
})
;
var isSolanaFullScreen = true;
var isethereumFullScreen = true;

</script>

<template>
  <main>
    <section class="graph-power-wrapper">
      <div class="graph-container" :class="{ 'full-screen': isSolanaFullScreen }">
        <div class="title-magnify-button-container">
          <span class="hostgr-medium">SOL/USDC</span>
          <button @click="toggleFullScreen('solana')">
            <Expand :size="16" />
          </button>
        </div>
        <canvas ref="solanaChartCanvas"></canvas>
      </div>
      <div class="graph-container" :class="{ 'full-screen': isEthereumFullScreen }">
        <div class="title-magnify-button-container">
          <span class="hostgr-medium">ETH/USDC</span>
          <button @click="toggleFullScreen('ethereum')">
            <Expand :size="16" />
          </button>
        </div>
        <canvas ref="ethereumChartCanvas"></canvas>
      </div>
    </section>
    <section class="volatility-volume-fees-wrapper">
      <div class="vvf-container volatility">
        <span class="hostgr-medium">Volatility</span>
      </div>
      <div class="vvf-container volumne">
        <span class="hostgr-medium">Volume</span>
      </div>
      <div class="vvf-container fees">
        <span class="hostgr-medium">Fees</span>
      </div>
    </section>
  </main>
</template>

<style lang="scss" scoped>
main {
  //border: 1px solid white;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  .graph-power-wrapper {
    margin: 20px 40px;
    display: flex;
    justify-content: space-between;
    .graph-container {
      border: 1px solid #FFFFFF;
      flex: 0.49;
      height: 330px;
      padding: 10px;
      display: flex;
      flex-direction: column;
      row-gap: 10px;
      canvas {
        border: 1px solid white;
      }
      .title-magnify-button-container {
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: center;
        button {
          background: transparent;
          outline: 0;
          border: 1px solid rgba(255, 255, 255, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          height: 28px;
          width: fit-content;
          padding: 5px;
          color: #FFFFFF;
        }
      }
    }
    .full-screen {
      background: transparent;
      border-radius: 0;
      box-shadow: none;
    }
    .power-container {
      width: 380px;
      height: 330px;
      padding: 10px;
      border: 1px solid #FFFFFF;
    }
  }
  .volatility-volume-fees-wrapper {
    margin: 0px 40px;
    display: flex;
    justify-content: space-between;
    .vvf-container {
      border: 1px solid #FFFFFF;
      display: flex;
      flex-direction: column;
      row-gap: 10px;
      width: 280px;
      height: 80px;
      padding: 10px;
    }
  }
}
</style>