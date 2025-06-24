import prisma from '../config/db.js';
import { hashPassword, comparePasswords } from '../utils/password.js';

export const registerUser = async (data) => {
  const existing = await prisma.user.findUnique({
    where: { mobileNumber: data.mobileNumber },
  });
  if (existing) throw new Error('User already exists');

  const hashedPassword = await hashPassword(data.password);

  return prisma.user.create({
    data: {
      ...data,
      password: hashedPassword,
    },
  });
};

export const loginUser = async (mobileNumber, password) => {
  const user = await prisma.user.findUnique({ where: { mobileNumber } });
  if (!user) throw new Error('User not found');

  const valid = await comparePasswords(password, user.password);
  if (!valid) throw new Error('Invalid credentials');

  return user;
};
