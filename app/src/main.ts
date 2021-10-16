import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from '@app/AppModule';
import { CommonModule } from '@app/Common/CommonModule';
import { FormatResponseInterceptor } from '@app/Common/interceptors/FormatResponseInterceptor';

(async () => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const formatResponseInterceptor = app
    .select(CommonModule)
    .get(FormatResponseInterceptor);

  app.useGlobalInterceptors(formatResponseInterceptor);

  await app.listen(process.env.PORT || 8_080);
})();
