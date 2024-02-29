// user.enum.ts

import { registerEnumType } from '@nestjs/graphql';

export enum UserType {
  STUDENT = 'student',
  HOSTEL_OWNER = 'hostelOwner',
  ADMIN = 'admin',
}

registerEnumType(UserType, {
  name: 'UserType',
});
