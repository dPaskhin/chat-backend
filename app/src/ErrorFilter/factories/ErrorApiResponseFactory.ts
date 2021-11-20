import { HttpStatus, Injectable } from '@nestjs/common';
import { serializeError } from 'serialize-error';
import { omit } from 'lodash';

import { ApiResponse } from '@app/Common/api/ApiResponse';
import { TAnyObject } from '@app/Common/types/TAnyObject';
import { ConfigService } from '@app/Config/services/ConfigService';

@Injectable()
export class ErrorApiResponseFactory {
  public constructor(private readonly configService: ConfigService) {}

  public create(
    error: Error,
    code: HttpStatus,
    payload: TAnyObject = {},
  ): ApiResponse {
    const serializedError = serializeError(error);

    return {
      code,
      error: this.configService.getIsResponseDetailError()
        ? serializedError
        : omit(serializedError, 'stack'),
      payload,
    };
  }
}
