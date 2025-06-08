import * as jwt from 'jsonwebtoken';
import { UserType } from '@prisma/client';
export const generateJwtTokens = (
  userId: number,
  userType: UserType,
  hostelId: number,
) => {
  const accessToken = jwt.sign(
    { sub: userId, userType, hostelId },
    process.env.JWT_SECRET,
    {
      expiresIn: '50m',
    },
  );
  const refreshToken = jwt.sign(
    { sub: userId, userType, hostelId },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: '30d',
    },
  );
  return { accessToken, refreshToken };
};

export const generateUserJwtToken = (userId: number, userType: UserType) => {
  return jwt.sign({ sub: userId, userType }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
};

export const generateHostelGuestJwtToken = (
  userId: number,
  email: string,
  hostelId: number,
) => {
  return jwt.sign({ sub: userId, email, hostelId }, process.env.JWT_SECRET, {
    expiresIn: '3d',
  });
};
