import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from '@app/AppModule';
import { CommonModule } from '@app/Common/CommonModule';
import { FormatResponseInterceptor } from '@app/Common/interceptors/FormatResponseInterceptor';
import { ConfigModule } from '@app/Config/ConfigModule';
import { ConfigService } from '@app/Config/services/ConfigService';
import { ConfigName } from '@app/Config/enums/ConfigName';
import { WsAdapter } from '@app/Common/adapters/WsAdapter';

(async () => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const formatResponseInterceptor = app
    .select(CommonModule)
    .get(FormatResponseInterceptor);
  const configService = app.select(ConfigModule).get(ConfigService);

  app.useGlobalInterceptors(formatResponseInterceptor);
  app.useWebSocketAdapter(new WsAdapter(app));

  await app.listen(configService.get(ConfigName.PORT));
})();
