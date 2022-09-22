import express from 'express';
const app = express();

app.get('', async (req: express.Request, res: express.Response) => {
  res.status(200).send();
});

app.head('/csrf-token', async (req: express.Request, res: express.Response) => {
  res
    .status(200)
    .header('x-csrf-token', 'abc')
    .header('set-cookie', 'foo=bar')
    .send();
});

app.post('/csrf-token', async (req: express.Request, res: express.Response) => {
  if (req.headers['x-csrf-token'] === 'abc') {
    res.send('Request with token');
  } else {
    res.send('Request without token');
  }
});

app.post('/post-without-csrf-token', async (req: express.Request, res: express.Response) => {
  res.send();
});

app.get('/encoding', async (req: express.Request, res: express.Response) => {
  res.send(req.url);
});

app.get('/origin', async (req: express.Request, res: express.Response) => {
  const result = req.headers;
  result['requestUrl'] = req.url;
  res.send(JSON.stringify(result));
});

app.get('/ping', async (req: express.Request, res: express.Response) => {
  res.send('pong');
});

export default app;
