# GenAI SQL Exploration

A TypeScript project demonstrating SQL database exploration using LangChain.js with multiple AI providers.
This project creates conversational AI agents that can answer natural language questions about your MySQL database content.

## 🚀 Features

- **Multi-Provider Support**: Azure OpenAI and AWS Bedrock implementations
- **Natural Language SQL Queries**: Ask questions about your database in plain English
- **Modular Architecture**: Abstract base class with provider-specific implementations
- **MySQL Database Support**: Connect to MySQL databases with SSL support
- **TypeORM Integration**: Robust database operations and schema management
- **Conversational Agent**: Interactive AI agents powered by LangChain.js
- **Environment-based Configuration**: Secure credential management

## 📋 Prerequisites

- Node.js (v18 or higher)
- Yarn package manager
- MySQL database access
- **At least one of:**
  - Azure OpenAI service account
  - AWS Bedrock access with custom endpoint

## 🛠️ Installation

**Clone the repository**
```bash
git clone https://github.com/indrabasak/genai-sql-exploration.git
cd genai-sql-exploration
```

## LangChain Examples

**Navigate to the langchain directory**
```bash
cd langchain
```

**Install dependencies**
```bash
yarn install
```

**Set up environment variables**
Create a `.env.local` file in the langchain directory with the following variables:

### Azure OpenAI Configuration
```env
# Azure OpenAI Configuration
AZURE_TENANT_ID=your-tenant-id
AZURE_CLIENT_ID=your-client-id
AZURE_CLIENT_SECRET=your-client-secret
AZURE_AUTHORITY_HOST=https://login.microsoftonline.com
AZURE_OPENAI_API_INSTANCE_NAME=your-openai-instance
AZURE_OPENAI_API_DEPLOYMENT_NAME=your-deployment-name
AZURE_OPENAI_API_VERSION=2024-02-01
```

### AWS Bedrock Configuration
```env
# AWS Bedrock Configuration
BEDROCK_TOKEN_PROVIDER_HOST=your-token-provider-host
BEDROCK_TOKEN_USER=your-username
BEDROCK_TOKEN_PASSWORD=your-password
BEDROCK_MODEL=your-model-name
BEDROCK_TEMPERATURE=0.5
BEDROCK_MAX_TOKENS=100
BEDROCK_ENDPOINT_HOST=your-bedrock-endpoint
```

### MySQL Database Configuration
```env
# MySQL Database Configuration
MYSQL_HOST=your-mysql-host
MYSQL_PORT=3306
MYSQL_USER=your-username
MYSQL_PASSWORD=your-password
MYSQL_DATABASE=your-database-name
```

## 🏃‍♂️ Usage

### Build the Project
```bash
yarn build
```

### Test MySQL Connection
```bash
yarn run:mysql
```

### Run the SQL Agents

**Azure OpenAI Agent**
```bash
yarn run:azure
```

**AWS Bedrock Agent**
```bash
yarn run:bedrock
```


## 📝 Example Usage

The project includes example queries that demonstrate the agents' capabilities:

```typescript
// Example 1: Count and list discounts
const input1 = 'How many discounts do we have in total?, give top 5 with some information';
const result1 = await util.execute(input1);

// Example 2: Query specific offering prices
const input2 = 'What prices are there for the offering with id OD-000163, direct, BIC;';
const result2 = await util.execute(input2);
```

## 🏗️ Architecture

### Core Components

- **`AbstractSqLUtil`**: Abstract base class providing common SQL agent functionality
  - Manages database connections
  - Creates and executes SQL agents
  - Handles agent lifecycle

- **`AzureOpenAiSqlUtil`**: Azure OpenAI implementation
  - Handles Azure AD authentication
  - Integrates with Azure OpenAI services
  - Extends AbstractSqLUtil

- **`BedrockSqlUtil`**: AWS Bedrock implementation
  - Custom token provider authentication
  - Integrates with AWS Bedrock services
  - Extends AbstractSqLUtil

- **`CustomBedrock`**: Custom Bedrock client implementation
- **`BearerTokenProvider`**: Token management for Bedrock authentication
- **`test-mysql.ts`**: Database connectivity testing utility

### Key Technologies

- **LangChain.js**: AI agent framework
- **Azure OpenAI**: Microsoft's AI language model service
- **AWS Bedrock**: Amazon's AI foundation model service
- **TypeORM**: Database ORM
- **MySQL2**: MySQL database driver
- **TypeScript**: Programming language

## 🔧 Development

### Project Structure
```
langchain/
├── src/
│   ├── tool/
│   │   ├── abstract-sql-util.ts           # Abstract base class
│   │   ├── azure-open-ai-sql-util.ts      # Azure OpenAI implementation
│   │   └── bedrock-sql-util.ts            # AWS Bedrock implementation
│   ├── example/
│   │   ├── azure-open-ai-sql-util-example.ts  # Azure OpenAI example
│   │   ├── bedrock-sql-util-example.ts         # Bedrock example
│   │   └── custom-bedrock-example.ts           # Custom Bedrock example
│   ├── util/
│   │   ├── bearer-token-provider.ts            # Token provider utility
│   │   └── custom-bedrock.ts                   # Custom Bedrock client
│   └── misc/
│       └── test-mysql.ts                       # MySQL connection test
├── dist/                                       # Compiled JavaScript output
├── package.json                               # Project dependencies
├── tsconfig.json                              # TypeScript configuration
└── eslint.config.mjs                         # ESLint configuration
```

### Available Scripts

- `yarn build`: Compile TypeScript to JavaScript
- `yarn lint`: Run ESLint checks
- `yarn lint:fix`: Fix ESLint issues automatically
- `yarn run:azure`: Execute Azure OpenAI SQL agent
- `yarn run:bedrock`: Execute AWS Bedrock SQL agent
- `yarn run:custom-bedrock`: Execute custom Bedrock SQL agent
- `yarn run:mysql`: Test MySQL connectivity

## 🔐 Security Considerations

- Environment variables are used for all sensitive configuration
- SSL connections are supported for database connections
- Azure AD authentication is used for Azure OpenAI access
- Custom token providers handle AWS Bedrock authentication
- Database credentials are never hardcoded
- Bearer token authentication for secure API access

## 🚀 Getting Started

1. **Choose your AI provider** (Azure OpenAI or AWS Bedrock)
2. **Set up the appropriate environment variables**
3. **Build the project**: `yarn build`
4. **Test database connection**: `yarn run:mysql`
5. **Run your chosen agent**: `yarn run:azure` or `yarn run:bedrock`

