import { defineEventHandler } from 'h3';

export default defineEventHandler(async () => {
  const config = useRuntimeConfig().server;
  const timestamp = new Date().toISOString();
  const requestPath = '';
  const params = {instType: 'SPOT'};
  const queryString = '?' + new URLSearchParams(params).toString();
  const stringToSign = timestamp + 'GET' + requestPath + queryString;
  const signature = '';

  const headers = {
    'Content-Type': 'application/json',
    'OK-ACCESS-KEY': config.okxApiKey,
    'OK-ACCESS-SIGN': signature,
    'OK-ACCESS-TIMESTAMP': timestamp,
    'OK-ACCESS-PASSPHRASE': config.okxPassphrase,
  };

  try {
    const response: any = await $fetch(`https://www.okx.com${requestPath}${queryString}`, {
      method: 'GET',
      headers
    });
    const solUsdc = response.data.find((item: any) => item.instId === "SOL") || {
      last: '150.25',
      vol24h: '1000000',
      change: '2.5',
    };

    return [{
      price: parseFloat(solUsdc.last).toFixed(2),
      volume: parseFloat(solUsdc.vol).toFixed(2),
      change: parseFloat(solUsdc.change).toFixed(2),
    }];
  } catch (err) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch market data'
    })
  }
})