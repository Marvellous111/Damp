<script lang="ts" setup>
import { Send } from 'lucide-vue-next';
import { CircleStop } from 'lucide-vue-next';

definePageMeta({
  layout: 'home-layout'
})

useSeoMeta({
  title: 'AI chat | Damp'
})

enum FIRST_TIME_STATE {
  FIRST,
  NOTFIRST
}  // This should be a persisted state that we can call to.

enum BUTTON_STATE {
  FREE,
  INUSE
}

var first_time_options = [
  'Swap 0.1 sol to eth',
  'Lend 200 sol using my eth as collateral',
  'What will the price of sol be in the next hour'
];
var damp_query = ref('');
var first_time_state = ref(FIRST_TIME_STATE.FIRST);
var button_state = ref(BUTTON_STATE.FREE);

const first_time_query = (query_string: string) => {
  damp_query.value = query_string
  sendMessage()
}

// --------- History --------- //

var history_list = [
  {
    'title': 'Swap sol to eth',
    'date_diff': 2,
    'link_to_chat': 'link-slug'
  },
  {
    'title': 'Lend 0.1 sol using eth',
    'date_diff': 2,
    'link_to_chat': 'link-slug'
  },
  {
    'title': 'Check sol price',
    'date_diff': 2,
    'link_to_chat': 'link-slug'
  }
]; // This list is supposed to be a state that should be persisted. (stored in local storage)


var messages = ref([{role: "bot", content: "I see you're using Damp, your personal AI DeFi buddy! Try 'quote', 'swap 1 SOL for USDC', or 'check balance'."}])
var transaction_history = ref<Array<string>>([])
async function sendMessage() {
  if (!damp_query) return;
  first_time_state.value = FIRST_TIME_STATE.NOTFIRST;
  button_state.value = BUTTON_STATE.INUSE;
  const userMessage = { role: "user", content: damp_query.value };
  messages.value.push(userMessage);

  try {
    // const response: {} = await $fetch('/api/chat', {
    //   method: 'POST',
    //   body: {
    //     message: damp_query.value,
    //     chainId: '501', // Solana
    //     fromToken: 'So11111111111111111111111111111111111111112', // Wrapped SOL
    //     toToken: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', // USDC
    //     amount: '10000000000', // 10 SOL in lamports
    //     slippage: '0.1', // slippage
    //   }
    // })
    // messages.value.push({ role: 'bot', content: response.response || response.error });
    // var bot_reply = '';
    if (damp_query.value == "Swap 0.1 sol to usdc") {
      messages.value.push({ role: 'bot', content: 'To which address' })
    }
    //EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v
    if (damp_query.value == "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v") {
      messages.value.push({role: 'bot', content: `Swapped 0.1 sol to usdc on the address`})
      transaction_history.value.push('Swapped 0.1 sol to USDC')
    }

    if (damp_query.value == "Buy 0.2 sol") {
      messages.value.push({ role: 'bot', content: 'Using LP provider to buy sol coming soon, please try again later' })
    }

    if (damp_query.value == "Lend 0.2 sol using usdc as collateral") {
      messages.value.push({ role: 'bot', content: 'Sending 0.2 sol to your wallet address, using USDC available as collateral'})
      transaction_history.value.push('0.2 sol lent to user. USDC collateral')
    }
  }catch(err) {
    messages.value.push({ role: 'bot', content: 'Error communicating with the server.' });
  }
  button_state.value = BUTTON_STATE.FREE;

  damp_query.value = '';
}

const refresh = async () => {
  return
}

</script>

<template>
  <main>
    <section class="chat-section">
      <div class="chat-first-time-header">
        <h1 class="hostgr-bold" v-if="first_time_state == FIRST_TIME_STATE.FIRST">Start talking to <text>damp</text></h1>
        <div class="first-time-options-container" v-if="first_time_state == FIRST_TIME_STATE.FIRST">
          <button class="first-time-option hostgr-medium" v-for="option in first_time_options" :key="option" @click="first_time_query(option)">
            {{ option }}
          </button>
        </div>
        <div class="message-container" v-else>
          <div v-for="(msg, index) in messages" :key="index" :class="msg.role" class="hostgr-medium">
            {{ msg.content }}
          </div>
        </div>
      </div>
      <div class="textarea-chat">
        <textarea name="" class="hostgr-regular" placeholder="Write a query" autofocus v-model="damp_query" />
        <button class="send-button" @click="sendMessage">
          <Send :size="18" color="black"  v-if="button_state == BUTTON_STATE.FREE"/>
          <CircleStop :size="18" color="black" v-if="button_state == BUTTON_STATE.INUSE"/>
        </button>
      </div>
    </section>
    <section class="history-section">
      <div class="transaction-history-header-button-wrapper">
        <span class="hostgr-medium">Transaction history</span>
        <button @click="refresh">r</button>
      </div>
      <section class="history-section">
        <div class="history hostgr-regular" v-if="transaction_history.length >= 1" v-for="transaction in transaction_history" v-key="transaction">
          {{ transaction }}
        </div>
      </section>
    </section>
  </main>
</template>

<style lang="scss" scoped>
main {
  height: 100%;
  width: 100%;
  display: flex;
  .chat-section {
    position: relative;
    width: 70%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items:center;
    justify-content: space-between;
    overflow: hidden;
    overflow-y: visible;
    .chat-first-time-header {
      font-size: 24px;
      width: 100%;
      position: absolute;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      top: 20%;
      h1 {
        text {
          text-decoration: underline;
        }
      }
      .first-time-options-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        column-gap: 20px;
        .first-time-option {
          border: 1px solid #FFFFFF;
          width: 180px;
          height: 80px;
          padding: 10px;
          outline: 0;
          background: transparent;
          display: flex;
          text-align: left;
          justify-content: left;
          align-items: center;
          color: #FFFFFF;
          font-size: 15px;
          cursor: pointer;
        }
      }
      .message-container {
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 20px;
        height: 100%;
        width: 95%;
        z-index: 0;
        .user {
          align-self: flex-end;
          border: 1px solid rgba(255, 255, 255, 0.7);
          height: fit-content;
          width: fit-content;
          max-width: 300px;
          padding: 10px;
          border-radius: 5px 5px 0px 5px;
          background: #FFFFFF;
          color: #000000;
          display: flex;
          flex-direction: column;
          row-gap: 10px;
          font-size: 15px;
          strong {
            font-size: 13px;
          }
        }
        .bot {
          align-self: flex-start;
          border: 0;
          height: fit-content;
          width: 300px;
          max-width: 300px;
          padding: 10px;
          border-radius: 5px 5px 5px 0px;
          background: #000000;
          color: #FFFFFF;
          display: flex;
          flex-direction: column;
          row-gap: 10px;
          font-size: 15px;
          strong {
            font-size: 13px;
          }
        }
      }
    }
    .textarea-chat {
      z-index: 10;
      display: flex;
      justify-content: space-between;
      border: 1px solid #FFFFFF;
      border-radius: 5px;
      width: 50%;
      position: fixed;
      bottom: 20px;
      min-height: fit-content;
      background: #121212;
      textarea {
        resize: none;
        border: 0;
        //width: 90%;
        flex: 0.95;
        outline: 0;
        background: #121212;
        min-height: 50px;
        padding: 15px;
        overflow: hidden;
        color: #FFFFFF;
        text-align: left;
        font-size: 15px;
      }
      .send-button {
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid #FFFFFF;
        width: 38px;
        height: 38px;
        border-radius: 10px;
        position: absolute;
        right: 5px;
        bottom: 5px;
        background: #FFFFFF;
        cursor: pointer;
      }
    }
  }
  .history-section {
    width: 30%;
    border-left: 1px solid #FFFFFF;
    height: 100%;
    display: flex;
    flex-direction: column;
    row-gap: 20px;
    .transaction-history-header-button-wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 10px;
      width: stretch;
      padding: 0px 10px;
      span {
        font-size: 15px;
      }
      button {
        border: 1px solid rgba(255, 255, 255, 0.4);
        background: transparent;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
      }
    }
    .history-section {
      width: stretch;
      padding: 0px 10px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      row-gap: 10px;
      .history {
        border: 1px solid #FFFFFF;
        height: 38px;
        width: stretch;
        padding: 0px 10px;
        display: flex;
        align-items: center;
        justify-content: left;
        text-align: left;
      }
    }
  }
}
</style>