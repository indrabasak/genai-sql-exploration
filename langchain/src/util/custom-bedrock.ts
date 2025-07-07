import { LLM } from '@langchain/core/language_models/llms';
import { CallbackManagerForLLMRun } from '@langchain/core/callbacks/manager';
import { BearerTokenProvider } from './bearer-token-provider.js';

export interface CustomBaseBedrockInput {
  model: string;
  temperature?: number;
  maxTokens?: number;
  endpointHost: string;
}

export class CustomBedrock extends LLM {
  private readonly tokenProvider: BearerTokenProvider;
  private readonly options: CustomBaseBedrockInput;

  constructor(
    tokenProvider: BearerTokenProvider,
    options: CustomBaseBedrockInput
    // options: { model: string; temperature: number; maxTokens: number; endpointHost: string }
  ) {
    super({});
    this.tokenProvider = tokenProvider;
    this.options = options;
  }

  async _call(
    prompt: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    options: this['ParsedCallOptions'],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    runManager: CallbackManagerForLLMRun | undefined
  ): Promise<string> {
    const formattedMessages = [{ role: 'user', content: prompt }];
    const requestBody: any = {
      anthropic_version: this.options.model ? this.options.model : 'bedrock-2023-05-31',
      max_tokens: this.options.maxTokens ? this.options.maxTokens : 4000,
      temperature: this.options.temperature ? this.options.temperature : 0.5,
      messages: formattedMessages
    };

    const authToken = await this.tokenProvider.getToken();
    const response = await fetch(this.options.endpointHost, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API error: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const data = (await response.json()) as any;

    let responseText: string = '';
    const content = data.content;

    if (Array.isArray(content)) {
      content.forEach((block) => {
        if (block.type === 'text') {
          responseText += block.text;
        }
      });
    } else if (typeof content === 'string') {
      responseText = content;
    }

    return responseText;
  }

  _llmType(): string {
    return 'bedrock';
  }
}
