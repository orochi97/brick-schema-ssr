import path from 'node:path';

export const isDev = process.env.NODE_ENV === 'development';

export const clientDir = path.resolve(process.cwd(), '../client/dist');

function sleep(time = 200) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

export const getSchemas = async () => {
  await sleep(200);
  delete require.cache[require.resolve('../schemas')];
  const { schemas } = await import('../schemas');
  return schemas;
};
