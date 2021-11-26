import { Socket } from 'socket.io';

import { UserEntity } from '@app/UserManagement/entities/UserEntity';

export type ISocketWithUser = Socket & { user: UserEntity };
