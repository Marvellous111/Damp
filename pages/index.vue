<script lang="ts" setup>
useSeoMeta({
  title: 'Damp | Your AI DeFi sidekick'
})
</script>


<template>
  <body>
    <main class="hero-section">
      <div class="hero-container-box">
        <div class="hero-container-second-box">
          <section class="hero-section-texts">
            <h3 class="hostgr-medium">
              Leveraging <text>Artificial intelligence</text> to create a <text>gasless</text> DeFi platform
            </h3>
            <h1 class="hostgr-bold">
              Your AI DeFi sidekick
            </h1>
            <section class="button-section">
              <LinkButton buttontext="Get started" />
              <DemoButton buttontext="Get started" />
            </section>
          </section>
        </div>
      </div>
    </main>
  </body>
</template>

<style lang="scss" scoped>
body {
  main {
    height: 100vh;
    width: 100%;
    display: flex;
    //border: 1px solid blue;
    align-items: center;
    justify-content: center;
    .hero-container-box {
      position: relative;
      border: 1px solid #FFFFFF;
      height: 80vh;
      width: 90%;
    }
    .hero-container-second-box {
      position: relative;
      // border: 1px solid #FFFFFF;
      height: 80vh;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .hero-container-box::before {
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
    .hero-container-second-box::before {
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
    .hero-container-box::after {
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
    .hero-container-second-box::after {
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
    .hero-section-texts {
      //border: 1px solid white;
      display: flex;
      flex-direction: column;
      align-items: center;
      height: fit-content;
      justify-content: center;
      //row-gap: 20px;
      .button-section {
        display: flex;
        column-gap: 40px;
      }
      h3 {
        margin-top: 0px;
        font-weight: normal;
        text-align: center;
        text {
          text-decoration: underline;
        }
      }
      h1 {
        margin-top: 0px;
        font-weight: normal;
        font-size: 48px;
        //border: 1px solid white;
        width: 600px;
        text-align: center;
      }
    }
  }
}
</style>