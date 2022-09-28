import app from './application';

const port = 8080;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log('Express server listening on port ' + port);
});
