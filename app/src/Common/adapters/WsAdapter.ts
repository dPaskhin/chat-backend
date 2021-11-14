import { NestExpressApplication } from '@nestjs/platform-express';
import { IoAdapter } from '@nestjs/platform-socket.io';

import { ConfigName } from '@app/Config/enums/ConfigName';
import { TAnyObject } from '@app/Common/types/TAnyObject';
import { ConfigService } from '@app/Config/services/ConfigService';
import { CommonModule } from '@app/Common/CommonModule';

export class WsAdapter extends IoAdapter {
  private readonly configService!: ConfigService;

  public constructor(app: NestExpressApplication) {
    super(app);

    this.configService = app.select(CommonModule).get(ConfigService);
  }

  private get port(): number {
    return Number.parseInt(this.configService.get(ConfigName.WS_PORT), 10);
  }

  public createIOServer(port: number, options?: TAnyObject): unknown {
    return super.createIOServer(this.port, options);
  }
}
