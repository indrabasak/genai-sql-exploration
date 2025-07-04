import { ClientSecretCredential, getBearerTokenProvider } from '@azure/identity';
import { AzureChatOpenAI } from '@langchain/openai';
import { DataSource } from 'typeorm';
import { SqlDatabase } from 'langchain/sql_db';
import { createSqlAgent, SqlToolkit } from 'langchain/agents/toolkits/sql';
import { AgentExecutor } from 'langchain/agents';
import 'dotenv/config';

export class SqlToolkitUtil {
  private readonly model: AzureChatOpenAI;
  private executor!: AgentExecutor;

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
    this.model = new AzureChatOpenAI({
      azureADTokenProvider,
      azureOpenAIApiInstanceName: process.env.AZURE_OPENAI_API_INSTANCE_NAME,
      azureOpenAIApiDeploymentName: process.env.AZURE_OPENAI_API_DEPLOYMENT_NAME,
      azureOpenAIApiVersion: process.env.AZURE_OPENAI_API_VERSION,
      temperature: 0
    });
  }

  public async initialize(): Promise<void> {
    const datasource = new DataSource({
      type: 'mysql',
      ssl: { rejectUnauthorized: false },
      host: process.env.MYSQL_HOST,
      port: process.env.MYSQL_PORT ? parseInt(process.env.MYSQL_PORT, 10) : 3307,
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE
    });
    const db = await SqlDatabase.fromDataSourceParams({
      appDataSource: datasource
    });

    const toolkit = new SqlToolkit(db, this.model);
    this.executor = createSqlAgent(this.model, toolkit);
  }

  public async execute(input: string) {
    const result = await this.executor.invoke({
      input
    });

    return result.output;
  }
}

async function main() {
  const util = new SqlToolkitUtil();
  await util.initialize();
  console.log('🤖 Starting Conversational SQL Agent Demo (Optimized Provider)\n');
  let result = await util.execute(
    'How many discounts do we have in total?, give top 5 with some information'
  );
  console.log(result);

  result = await util.execute(
    'What prices are there for the offering with id OD-000163, direct, BIC;'
  );
  console.log(result);
}

main().catch((error) => {
  console.error('Fatal error in main():', error);
  process.exit(1);
});
