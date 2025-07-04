import { ChatOpenAI } from '@langchain/openai';
import { DataSource } from 'typeorm';
import { SqlDatabase } from 'langchain/sql_db';
import { createSqlAgent, SqlToolkit } from 'langchain/agents/toolkits/sql';
import { AgentExecutor } from 'langchain/agents';

export abstract class AbstractSqLUtil {
  private readonly model: ChatOpenAI;
  private datasource!: DataSource;
  private executor!: AgentExecutor;

  protected constructor(model: ChatOpenAI) {
    this.model = model;
  }

  async initialize(): Promise<void> {
    this.datasource = new DataSource({
      type: 'mysql',
      ssl: { rejectUnauthorized: false },
      host: process.env.MYSQL_HOST,
      port: process.env.MYSQL_PORT ? parseInt(process.env.MYSQL_PORT, 10) : 3307,
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE
    });
    const db = await SqlDatabase.fromDataSourceParams({
      appDataSource: this.datasource
    });

    const toolkit = new SqlToolkit(db, this.model);
    this.executor = createSqlAgent(this.model, toolkit);
  }

  public async close() {
    await this.datasource.destroy();
  }

  public async execute(input: string) {
    const result = await this.executor.invoke({
      input
    });

    return result.output;
  }
}
