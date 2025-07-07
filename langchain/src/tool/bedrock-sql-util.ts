import 'dotenv/config';
import { BearerTokenProvider } from '../util/bearer-token-provider.js';
import { CustomBedrock } from '../util/custom-bedrock.js';
import { AbstractSqLUtil } from './abstract-sql-util.js';

export class BedrockSqlUtil extends AbstractSqLUtil {
  constructor() {
    const tokenProvider = new BearerTokenProvider(
      process.env.BEDROCK_TOKEN_PROVIDER_HOST as string,
      process.env.BEDROCK_TOKEN_USER as string,
      process.env.BEDROCK_TOKEN_PASSWORD as string
    );

    const model = new CustomBedrock(tokenProvider, {
      model: process.env.BEDROCK_MODEL as string,
      temperature: parseFloat(process.env.BEDROCK_TEMPERATURE || '0.5'),
      maxTokens: parseInt(process.env.BEDROCK_MAX_TOKENS || '100'),
      endpointHost: process.env.BEDROCK_ENDPOINT_HOST as string
    });

    super(model);
  }
}
