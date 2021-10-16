import { HttpStatus, Injectable } from '@nestjs/common';

import { ApiResponse } from '@app/Common/api/ApiResponse';

@Injectable()
export class ApiResponseFactory {
  public create<Payload>(payload: Payload, method: string): ApiResponse {
    return {
      code: method === 'POST' ? HttpStatus.CREATED : HttpStatus.OK,
      payload,
    };
  }
}
