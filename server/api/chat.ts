import { SolanaAgentKit, createVercelAITools } from 'solana-agent-kit';
import { HumanMessage } from '@langchain/core/messages';
import { ChatAnthropic } from '@langchain/anthropic';
import { createReactAgent } from '@langchain/langgraph/prebuilt';
import { MemorySaver } from '@langchain/langgraph';
import bs58 from 'bs58';
import getDexQuote from '../../utils/okx';

export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig().server;
  const body = await readBody(event);
  const { message, chainId, fromToken, toToken, amount, slippage } = body;

  if (!message) {
    return { error: 'Message is required' };
  }

  // Initialize LangChain and Solana Agent Kit
  const privateKeyArray = JSON.parse(runtimeConfig.solanaSecretPrivateKey);
  const privateKeyBase58 = bs58.encode(new Uint8Array(privateKeyArray));

  const llm = new ChatAnthropic({
    modelName: 'claude-3-5-sonnet-20241022',
    temperature: 0.7,
    apiKey: runtimeConfig.antropicApiKey,
  });

  const solanaKit = new SolanaAgentKit(
    privateKeyBase58,
    runtimeConfig.solanaRpc,
    { ANTHROPIC_API_KEY: runtimeConfig.antropicApiKey }
  );

  const tools = createVercelAITools(solanaKit, []);
  const memory = new MemorySaver();
  const agent = createReactAgent({ llm, tools, checkpointSaver: memory });
  const config = { configurable: { thread_id: 'solana-agent-kit' } };

  // Command parsing
  try {
    if (message.toLowerCase().startsWith('quote')) {
      // OKX DEX quote
      const quote = await getDexQuote(
        chainId || '501', // Solana
        fromToken || 'So11111111111111111111111111111111111111112', // Wrapped SOL
        toToken || 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', // USDC
        amount || '10000000000', // 10 SOL in lamports
        slippage || '0.1'
      );
      return {
        response: `Quote for ${amount} ${fromToken} to ${toToken}: ${quote.data[0].toTokenAmount} ${quote.data[0].toToken.tokenSymbol}`,
        data: quote.data,
      };
    }

    // Solana Agent Kit commands (e.g., swap, mint NFT, check balance)
    const stream = await agent.stream(
      { messages: [new HumanMessage(message)] },
      config
    );

    let responseText = '';
    for await (const chunk of stream) {
      if ('agent' in chunk) {
        responseText += chunk.agent.messages[0].content;
      } else if ('tools' in chunk) {
        responseText += chunk.tools.messages[0].content;
      }
    }

    return { response: responseText || 'Action completed', data: null };
  } catch (error) {
    console.error('Agent Error:', error);
    return { error: 'Failed to process request' };
  }
});