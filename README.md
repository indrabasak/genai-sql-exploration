# GenAI SQL Exploration

A TypeScript project demonstrating SQL database exploration using LangChain.js and Azure OpenAI. 
This project creates a conversational AI agent that can answer natural language questions about your MySQL database content.

## 🚀 Features

- **Natural Language SQL Queries**: Ask questions about your database in plain English
- **Azure OpenAI Integration**: Leverages Azure OpenAI for intelligent query processing
- **MySQL Database Support**: Connect to MySQL databases with SSL support
- **TypeORM Integration**: Robust database operations and schema management
- **Conversational Agent**: Interactive AI agent powered by LangChain.js
- **Environment-based Configuration**: Secure credential management

## 📋 Prerequisites

- Node.js (v18 or higher)
- Yarn package manager
- MySQL database access
- Azure OpenAI service account

## 🛠️ Installation

**Clone the repository**
   ```bash
   git clone <repository-url>
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
   ```env
   # Azure OpenAI Configuration
   AZURE_TENANT_ID=your-tenant-id
   AZURE_CLIENT_ID=your-client-id
   AZURE_CLIENT_SECRET=your-client-secret
   AZURE_AUTHORITY_HOST=https://login.microsoftonline.com
   AZURE_OPENAI_API_INSTANCE_NAME=your-openai-instance
   AZURE_OPENAI_API_DEPLOYMENT_NAME=your-deployment-name
   AZURE_OPENAI_API_VERSION=2024-02-01

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

### Run the SQL Agent
```bash
yarn run:local
```

## 📝 Example Usage

The project includes example queries that demonstrate the agent's capabilities:

```typescript
// Example 1: Count and list discounts
const result1 = await util.execute(
  'How many discounts do we have in total?, give top 5 with some information'
);

// Example 2: Query specific offering prices
const result2 = await util.execute(
  'What prices are there for the offering with id OD-000163, direct, BIC;'
);
```

### Core Components

- **`AzureOpenAiSqlUtil`**: Main class that orchestrates the AI agent
  - Handles Azure OpenAI authentication
  - Manages database connections
  - Creates and executes the SQL agent

- **`test-mysql.ts`**: Database connectivity testing utility

### Key Technologies

- **LangChain.js**: AI agent framework
- **Azure OpenAI**: Language model provider
- **TypeORM**: Database ORM
- **MySQL2**: MySQL database driver
- **TypeScript**: Programming language

## 🔧 Development

### Project Structure
```
langchain/
├── src/
│   ├── azure-open-ai-sql-util.ts    # Main SQL agent utility
│   └── test-mysql.ts          # MySQL connection test
├── dist/                      # Compiled JavaScript output
├── package.json              # Project dependencies
├── tsconfig.json             # TypeScript configuration
└── eslint.config.mjs         # ESLint configuration
```

### Available Scripts

- `yarn build`: Compile TypeScript to JavaScript
- `yarn lint`: Run ESLint checks
- `yarn lint:fix`: Fix ESLint issues automatically
- `yarn run:local`: Execute the main SQL agent
- `yarn run:mysql`: Test MySQL connectivity




