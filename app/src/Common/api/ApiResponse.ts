import { TAnyObject } from '@app/Common/types/TAnyObject';

export class ApiResponse<Payload extends TAnyObject = TAnyObject> {
  public code!: number;

  public error?: Record<string, unknown>;

  public payload!: Payload;
}
