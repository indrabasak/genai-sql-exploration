import { ClientSecretCredential, getBearerTokenProvider } from '@azure/identity';
import { AzureChatOpenAI } from '@langchain/openai';
import 'dotenv/config';
import { AbstractSqLUtil } from './abstract-sql-util.js';

export class AzureOpenAiSqlUtil extends AbstractSqLUtil {
  constructor() {
    const credential = new ClientSecretCredential(
      process.env.AZURE_TENANT_ID as string,
      process.env.AZURE_CLIENT_ID as string,
      process.env.AZURE_CLIENT_SECRET as string,
      {
        authorityHost: process.env.AZURE_AUTHORITY_HOST
      }
    );

    const scope = 'https://cognitiveservices.azure.com/.default';
    const azureADTokenProvider = getBearerTokenProvider(credential, scope);
    const model = new AzureChatOpenAI({
      azureADTokenProvider,
      azureOpenAIApiInstanceName: process.env.AZURE_OPENAI_API_INSTANCE_NAME,
      azureOpenAIApiDeploymentName: process.env.AZURE_OPENAI_API_DEPLOYMENT_NAME,
      azureOpenAIApiVersion: process.env.AZURE_OPENAI_API_VERSION,
      temperature: 0
    });

    super(model);
  }
}
