import { ConfigName } from '@app/Config/enums/ConfigName';

declare global {
  namespace NodeJS {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    interface ProcessEnv {
      [ConfigName.PORT]: string;
      [ConfigName.JWT_SECRET]: string;
      [ConfigName.WS_PORT]: string;
      [ConfigName.RESPONSE_DETAIL_ERROR]: '0' | '1';
    }
  }
}
