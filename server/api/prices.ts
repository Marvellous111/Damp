import { defineEventHandler } from 'h3';
import axios from 'axios';
import crypto from 'crypto';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig().server;

  console.log('Runtime config init');
  // Retrieve OKX API credentials from environment variables
  const apiKey = config.okxApiKey;
  const secretKey = config.okxSecretKey;
  const passphrase = config.okxPassphrase;

  // Check if credentials are provided
  if (!apiKey || !secretKey || !passphrase) {
    throw new Error('Missing OKX API credentials. Ensure OKX_API_KEY, OKX_SECRET_KEY, and OKX_PASSPHRASE are set.');
  }

  // Function to generate the OK-ACCESS-SIGN signature
  const generateSignature = (timestamp: string, method: string, requestPath: string, body: string) => {
    const preHash = timestamp + method + requestPath + body;
    return crypto.createHmac('sha256', secretKey)
                 .update(preHash)
                 .digest('base64');
  };

  // Function to fetch the price for a given chain and token
  const getPrice = async (chainIndex: string, tokenAddress: string) => {
    const timestamp = new Date().toISOString();
    const method = 'POST';
    const requestPath = '/api/v5/dex/market/price';
    const body = JSON.stringify({ chainIndex, tokenContractAddress: tokenAddress });

    // Generate the signature
    const sign = generateSignature(timestamp, method, requestPath, body);

    // Set the headers
    const headers = {
      'OK-ACCESS-KEY': apiKey,
      'OK-ACCESS-SIGN': sign,
      'OK-ACCESS-PASSPHRASE': passphrase,
      'OK-ACCESS-TIMESTAMP': timestamp,
      'Content-Type': 'application/json',
    };

    try {
      // Make the POST request to the OKX DEX API
      const response = await axios.post('https://web3.okx.com/api/v5/dex/market/price',
        body,
        { headers, timeout: 10000 }
      );
      console.log(response.data)
      return response.data.data.price;
    } catch (error) {
      console.error('Error fetching price:', error);
      throw error;
    }
  };

  // Fetch prices for ETH and SOL
  const ethPrice = await getPrice('1', '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');
  const solPrice = await getPrice('66', '0x382bb369d343125bfb2117af9c149795c6c65c50');


  // Return the prices
  return {
    eth: ethPrice,
    sol: solPrice,
  };
});