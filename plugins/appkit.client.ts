// import { createAppKit } from '@reown/appkit/vue';
// import { WagmiProvider } from 'wagmi';
// import { reconnect } from '@wagmi/core';
// import { solana, mainnet, type AppKitNetwork } from '@reown/appkit/networks';
// import { WagmiAdapter } from '@reown/appkit-adapter-wagmi/';

// export default defineNuxtPlugin((nuxtApp) => {
//   console.log("AppKit plugin initialized");
//   const config = useRuntimeConfig();
//   var project_id: string = config.public.reown_project_id; // || 'f4cf4a7340fdd3603fd23c310ec95225';
//   if (!project_id) {
//     console.error('Project ID is not found, switching to raw value')
//     project_id = 'f4cf4a7340fdd3603fd23c310ec95225'
//   }

//   const metadata = {
//     name: 'Damp',
//     description: 'Your AI DeFi buddy',
//     url: 'http://localhost:3000/connectwallet/',
//     icons: []
//   };

//   const networks: [AppKitNetwork, ...AppKitNetwork[]] = [mainnet, solana];

//   const wagmiAdapter = new WagmiAdapter({
//     ssr: true,
//     projectId: project_id,
//     networks
//   })

//   const createdAppKit = createAppKit({
//     adapters: [wagmiAdapter],
//     networks,
//     projectId: project_id,
//     metadata,
//     features: {
//       analytics: true
//     }
//   })

//   console.log('createAppKit has been initialized')

//   reconnect(wagmiAdapter.wagmiConfig);
  
//   return {
//     provide: {
//       metadata,
//       networks,
//       project_id,
//       wagmiAdapter,
//       createdAppKit
//     }
//   }

// })