import { Global, Module } from '@nestjs/common';

import { ApiResponseFactory } from '@app/Common/factories/ApiResponseFactory';
import { FormatResponseInterceptor } from '@app/Common/interceptors/FormatResponseInterceptor';

@Global()
@Module({
  providers: [ApiResponseFactory, FormatResponseInterceptor],
  exports: [ApiResponseFactory, FormatResponseInterceptor],
})
export class CommonModule {}
