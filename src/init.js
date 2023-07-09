import dotenv from 'dotenv';
import Http from 'http';
import { ExpressApp } from './app';
import sequelize from './db/sequelize';

dotenv.config();

export class Server {
  expressApp = new ExpressApp();
  httpServer;

  constructor() {
    this.httpServer = new Http.Server(this.expressApp.app);
  }

  databaseConnection = () => {
    return this.sequelizeAuthenticate().then(this.sequelizeSync);
  };

  sequelizeAuthenticate = () => {
    // test connection
    return sequelize.authenticate();
  };

  sequelizeSync = () => {
    return sequelize.sync({ force: false });
  };

  runServer = async () => {
    try {
      await this.databaseConnection();
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
