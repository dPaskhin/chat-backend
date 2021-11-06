import { Request } from 'express';

import { UserEntity } from '@app/UserManagement/entities/UserEntity';

export type IRequestWithUser = Request & { user: UserEntity };
