<script lang="ts" setup>
import { createAppKit } from '@reown/appkit/vue';
import { cookieStorage as cStorage, createStorage as crStorage, useDisconnect } from 'wagmi';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi/';
import { solana, mainnet, type AppKitNetwork } from '@reown/appkit/networks';

useSeoMeta({
  title: 'Connect Wallet | Damp'
})

const config = useRuntimeConfig().public;
const router = useRouter();

// const config = useRuntimeConfig();
const project_id: string = config.reown_project_id;
if (!project_id) {
  throw new Error('PROJECT ID IS NOT FOUND, PLEASE INCLUDE PROJECT ID.');
}
const networks: [AppKitNetwork, ...AppKitNetwork[]] = [mainnet, solana];
const wagmiAdapter = new WagmiAdapter({
  storage: crStorage({
    storage: cStorage
  }),
  ssr: true,
  networks,
  projectId: project_id
})

const wagmi_config = wagmiAdapter.wagmiConfig;

const metadata = {
  name: 'Damp',
  description: 'Your AI DeFi buddy',
  url: 'http://localhost:3000/connectwallet/',
  icons: []
};


createAppKit({
  adapters: [wagmiAdapter],
  networks: networks,
  metadata: metadata,
  projectId: project_id,
  features: {
    analytics: true // Optional - defaults to your Cloud configuration
  }
});

</script>



<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>