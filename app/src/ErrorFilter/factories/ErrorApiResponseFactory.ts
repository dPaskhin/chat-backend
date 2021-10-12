import { HttpStatus, Injectable } from '@nestjs/common';
import { serializeError } from 'serialize-error';

import { ApiResponse } from '@app/Common/api/ApiResponse';
import { TAnyObject } from '@app/Common/types/TAnyObject';

@Injectable()
export class ErrorApiResponseFactory {
  public create(
    error: Error,
    code: HttpStatus,
    payload: TAnyObject = {},
  ): ApiResponse {
    return {
      code,
      error: serializeError(error),
      payload,
    };
  }
}
