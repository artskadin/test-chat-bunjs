import ky from 'ky';
import { generateApi } from 'swagger-typescript-api';
import { unlink } from 'node:fs/promises';
import * as path from 'node:path';

async function generateApiFromServer() {
  const swaggerSpec = await ky
    .get(`${process.env.BASE_BACK_URL}/swagger/json`, {
      credentials: 'include',
    })
    .text();
  const tempSwaggerSpecJsonFilePath = 'temp-swagger-spec.json';

  await Bun.write(tempSwaggerSpecJsonFilePath, swaggerSpec);

  try {
    await generateApi({
      input: path.resolve(process.cwd(), tempSwaggerSpecJsonFilePath),
      output: path.resolve(process.cwd(), './src/api/__generated__'),
      httpClientType: 'fetch',
      modular: true,
      generateResponses: true,
      moduleNameFirstTag: false,
      singleHttpClient: true,
    });
  } catch (e) {
    console.error('Failed to generate swagger api', e);
  } finally {
    await unlink(tempSwaggerSpecJsonFilePath);
  }
}

generateApiFromServer();
