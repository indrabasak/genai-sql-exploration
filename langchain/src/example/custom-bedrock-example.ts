import 'dotenv/config';
import { BearerTokenProvider } from '../util/bearer-token-provider.js';
import { CustomBedrock } from '../util/custom-bedrock.js';

async function main() {
  const tokenProvider = new BearerTokenProvider(
    process.env.BEDROCK_TOKEN_PROVIDER_HOST as string,
    process.env.BEDROCK_TOKEN_USER as string,
    process.env.BEDROCK_TOKEN_PASSWORD as string
  );

  const bedrock = new CustomBedrock(tokenProvider, {
    model: process.env.BEDROCK_MODEL as string,
    temperature: parseFloat(process.env.BEDROCK_TEMPERATURE || '0.5'),
    maxTokens: parseInt(process.env.BEDROCK_MAX_TOKENS || '100'),
    endpointHost: process.env.BEDROCK_ENDPOINT_HOST as string
  });

  const prompt = 'What is the capital of France?';
  const result = await bedrock.invoke(prompt);
  console.log(result);
}

main().catch((error) => {
  console.error('Fatal error in main():', error);
  process.exit(1);
});
