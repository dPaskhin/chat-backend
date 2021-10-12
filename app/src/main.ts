import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from '@app/AppModule';

(async () => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  await app.listen(process.env.PORT || 8_080);
})();