## AI Research Newsletter - Demo

This project is an advanced AI-based paper summarizer that leverages the power of Next.js and Vercel for seamless deployment and scalability. It automatically fetches AI-related papers, processes them using the Mixtral AI model, and provides concise summaries.

### Tech Stack

The project is built using the following technologies:

- **Next.js**: A React framework for production, which enables server-side rendering and generating static websites for React based web applications.
- **Vercel**: A platform for frontend frameworks and static sites, optimized for Next.js, which provides features like serverless functions and edge caching.
- **Mixtral AI**: A sophisticated AI model that enhances the summarization process, ensuring high-quality, context-aware summaries of academic papers.

### Dependencies

Key dependencies include:

- `autoprefixer`: Parses CSS and adds vendor prefixes to CSS rules.
- `axios`: Promise-based HTTP client for the browser and Node.js.
- `cors`: Middleware to enable CORS with various options.
- `dotenv`: Loads environment variables from a .env file into `process.env`.
- `express`: Fast, unopinionated, minimalist web framework for Node.js.
- `langchain`: A language chain library for processing natural language.
- `node-cron`: Schedules cron-like jobs.
- `openai`: Official OpenAI API library.
- `pdf-parse`: Parses PDF files to extract text data.
- `postcss`: Transforms styles with JS plugins.
- `tailwindcss`: Utility-first CSS framework for rapid UI development.
- `xml2js`: Converts XML to JavaScript objects.

### Setup

Ensure you have Node.js installed. Clone the repository, navigate to the project directory, and run `npm install` to install dependencies.

Copy `.env.template` to `.env` and populate it with your API keys (`.env` is included in `.gitignore`).

### Running the Project

Execute `npm run dev` to start the development server with Next.js. By default, the server listens on port 3000, or you can specify a different port in the `.env` file.

### Deployment

The project is ready for deployment on Vercel, which provides a simple git integration for automatic deployments and CI/CD.

### License

This project is open-sourced under the MIT License. See the `LICENSE` file for more information.

### Connect with Me

For inquiries or suggestions, connect with me at [my portfolio](https://bio.blaisep.com).
