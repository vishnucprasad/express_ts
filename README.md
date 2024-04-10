# Express TS

Express TS is a robust and scalable web server that harnesses the power of the popular Express.js framework, the flexibility of TypeScript, and the dependency injection capabilities of Inversify.

## Installation

To install Express TS, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/vishnucprasad/express_ts.git
   ```

2. Navigate to the project directory:

   ```bash
   cd express-ts
   ```

3. Install dependencies using pnpm:
   ```bash
   pnpm install
   ```

## Running the Server

To run the server, execute the following command:

```bash
pnpm start
```

This will start the server using TypeScript and automatically transpile the code into JavaScript. The server will then be accessible at `http://localhost:3000`.

### Development Mode

To run the server in development mode, use the following command:

```bash
pnpm start:dev
```

This will start the server using nodemon, which automatically restarts the server when changes are detected in the code.

## Usage

Express TS provides a flexible and scalable architecture for building web applications. Here are some key features:

- **Express.js Framework**: Leveraging the robustness and simplicity of Express.js, Express TS provides a solid foundation for building web servers.
- **TypeScript Support**: With TypeScript, developers can write cleaner and more maintainable code by leveraging static typing and modern ECMAScript features.
- **Dependency Injection with Inversify**: Express TS utilizes Inversify for managing dependencies, making it easy to inject dependencies into controllers, services, and other components.

## Scripts

- `lint`: Runs ESLint to lint TypeScript files.
- `lintfix`: Runs ESLint with the `--fix` flag to automatically fix linting issues.
- `build`: Transpiles TypeScript files into JavaScript using TypeScript compiler.
- `start`: Starts the server by running the main JavaScript file located in the `dist` directory.
- `start:dev`: Starts the server in development mode using nodemon for automatic restarts.
- `test`: Runs tests using Jest with the configuration specified in `jest-e2e.json` file.

## Contributing

Contributions are welcome! Please feel free to submit issues, feature requests, or pull requests to help improve Express TS.

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/vishnucprasad/express_ts/blob/78b414bfe883b92f19495f71e5493427ae3c0afc/LICENSE) file for details.
