import dotenv from 'dotenv';
import './src/db/db';
import Http from 'http';
import { ExpressApp } from './src/app';

dotenv.config();

export class Server {
  expressApp = new ExpressApp();
  httpServer;

  constructor() {
    this.httpServer = new Http.Server(this.expressApp.app);
  }

  runServer = () => {
    try {
      return this.serverListen();
    } catch (e) {
      return this.serverErrorHandler(e);
    }
  };

  serverListen = () => {
    const { PORT: port, HOST: host } = process.env;
    return this.httpServer.listen(port, () => {
      console.log(`Server is running on: http://${host}:${port}`);
    });
  };

  serverErrorHandler = (error) => {
    console.log('Server run error: ', error.message);
  };
}

const server = new Server();

server.runServer();
