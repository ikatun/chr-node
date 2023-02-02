const express = require('express');

module.exports.createServer = function createServer(publicDir, publicPath, jsFileName) {
  const app = express();

  app.use(`/${publicDir}`, express.static(`${publicPath}/${publicDir}`));

  app.get('/', (req, res) => {
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    res.send(`
      <!DOCTYPE html>
      <html>
      <head>
        <link rel="icon" href="data:;base64,iVBORw0KGgo=" />
        <script type="text/javascript">window.process = ({ exit(){ window.terminated = true; }})</script>
        <script type="text/javascript" src="${publicDir}/${jsFileName}" defer="defer"></script>
      </head>
      <body></body>
      </html>
    `);
  });

  return new Promise((resolve) => {
    const listener = app.listen(0, () => {
      const port = listener.address()?.port;
      const close = () => listener.close();
      resolve({ port, close });
    });
  });
};
