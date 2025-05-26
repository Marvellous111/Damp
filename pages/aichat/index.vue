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
var button_state = ref(BUTTON_STATE.FREE)

const first_time_query = (query_string: string) => {
  damp_query.value = query_string
  query()
}

const query = () => {  
  if (button_state.value == BUTTON_STATE.FREE) {
    button_state.value = BUTTON_STATE.INUSE
  } else if (button_state.value == BUTTON_STATE.INUSE) {
    button_state.value = BUTTON_STATE.FREE
  }
};

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


</script>

<template>
  <main>
    <section class="chat-section">
      <div class="chat-first-time-header">
        <h1 class="hostgr-bold">Start talking to <text>damp</text></h1>
        <div class="first-time-options-container">
          <button class="first-time-option hostgr-medium" v-for="option in first_time_options" :key="option" @click="first_time_query(option)">
            {{ option }}
          </button>
          <!-- <button class="first-time-option hostgr-medium">
            Lend 200 sol using my eth as collateral
          </button>
          <button class="first-time-option hostgr-medium">
            What will the price of sol be in the next hour
          </button> -->
        </div>
      </div>
      <div class="textarea-chat">
        <textarea name="" class="hostgr-regular" placeholder="Write a query" autofocus v-model="damp_query" />
        <button class="send-button" @click="query">
          <Send :size="18" color="black"  v-if="button_state == BUTTON_STATE.FREE"/>
          <CircleStop :size="18" color="black" v-if="button_state == BUTTON_STATE.INUSE"/>
        </button>
      </div>
    </section>
    <section class="history-section">History section</section>
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
    .chat-first-time-header {
      font-size: 24px;
      width: fit-content;
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
    }
    .textarea-chat {
      display: flex;
      justify-content: space-between;
      border: 1px solid #FFFFFF;
      border-radius: 5px;
      width: 50%;
      position: fixed;
      bottom: 20px;
      min-height: fit-content;
      textarea {
        resize: none;
        border: 0;
        //width: 90%;
        flex: 0.95;
        outline: 0;
        background: transparent;
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
  }
}
</style>