import { createServer, Server as HTTPServer } from 'http';

// Server.
import { Server } from './server';

(() => {
  const server: Server = new Server();
  const httpServer: HTTPServer = createServer(server.app);

  httpServer.listen(process.env.PORT || 8080, () => {
    console.log('Server started');
    console.dir(httpServer.address());
  });
})();
