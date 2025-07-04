import { AzureOpenAiSqlUtil } from '../util/azure-open-ai-sql-util.js';

async function main() {
  const util = new AzureOpenAiSqlUtil();
  await util.initialize();
  console.log('🤖 Starting Conversational SQL Agent Demo (Optimized Provider)\n');

  let input = 'How many discounts do we have in total?, give top 5 with some information';
  console.log(input);
  let result = await util.execute(input);
  console.log(result);
  console.log('-------------------');

  input = 'What prices are there for the offering with id OD-000163, direct, BIC;';
  console.log(input);
  result = await util.execute(input);
  console.log(result);
  console.log('-------------------');
  await util.close();
}

main().catch((error) => {
  console.error('Fatal error in main():', error);
  process.exit(1);
});
