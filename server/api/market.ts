import { defineEventHandler } from 'h3';
import axios from 'axios';
import crypto from 'crypto';
import querystring from 'querystring';

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

  // Define the endpoint and default parameters for ETH and SOL
  const endpoint = '/api/v5/dex/market/candles';
  const paramsEth = {
    chainIndex: '1', // Ethereum
    tokenContractAddress: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', // ETH
    bar: '1m',
    limit: '100',
  };
  const paramsSol = {
    chainIndex: '501', // Solana
    tokenContractAddress: '11111111111111111111111111111111', // SOL
    bar: '1m',
    limit: '100',
  };

  // Function to generate the OK-ACCESS-SIGN signature
  const generateSignature = (timestamp: string, method: string, requestPath: string) => {
    const preHash = timestamp + method + requestPath;
    return crypto.createHmac('sha256', secretKey)
                 .update(preHash)
                 .digest('base64');
  };

  // Function to fetch candlesticks for given parameters
  const getCandlesticks = async (params: {}) => {
    const timestamp = new Date().toISOString();
    const method = 'GET';
    const queryString = querystring.stringify(params);
    const requestPath = endpoint + (queryString ? '?' + queryString : '');

    // Generate the signature
    const sign = generateSignature(timestamp, method, requestPath);

    // Set the headers
    const headers = {
      'OK-ACCESS-KEY': apiKey,
      'OK-ACCESS-SIGN': sign,
      'OK-ACCESS-PASSPHRASE': passphrase,
      'OK-ACCESS-TIMESTAMP': timestamp,
    };

    try {
      // Make the GET request to the OKX DEX API
      const response = await axios.get(`https://web3.okx.com${requestPath}`, 
        {
          headers,
          timeout: 10000
        }
      );
      console.log("Response for get market data is: ", response.data);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching candlesticks:', error);
      throw error;
    }
  };

  // Fetch candlesticks for ETH and SOL
  const ethCandlesticks = await getCandlesticks(paramsEth);
  const solCandlesticks = await getCandlesticks(paramsSol);

  // Return the candlesticks
  return {
    eth: ethCandlesticks,
    sol: solCandlesticks,
  };
});