import { createApp } from './lib/createApp';
const PORT = process.env.PORT || 5000;
async function main() {
  try {
    const app = await createApp();
    await app.listen(PORT, async () => {
      console.log(
        `NodeJs backend api listening on port: http://localhost:${PORT}`
      );
    });
    return app;
  } catch (error) {
    console.error(error);
    process.exit(1);
    return null;
  }
}

export default main();
