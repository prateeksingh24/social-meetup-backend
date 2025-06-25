import prisma from "../config/db.js";
import { hashPassword, comparePasswords } from "../utils/password.js";
import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

export const registerUser = async (data) => {
  const existing = await prisma.user.findFirst({
    where: { OR: [{ mobileNumber: {equals: data.mobileNumber} }, { email: {equals:data.email} }] },
  });
  if (existing) throw new Error("User already exists");

  const hashedPassword = await hashPassword(data.password);

  return prisma.user.create({
     data: {
      name: data.name,
      email: data.email,
      mobileNumber: data.mobileNumber,
      password: hashedPassword,
      isVerified: false,
    },
  });
};

export const sendUserOtp = async (mobileNumber) => {
  const user = await prisma.user.findUnique({ where: { mobileNumber } });
  if (!user) throw new Error('User not found');

const verification = await client.verify.v2.services("VA33b9fa3718abc705479e5ddcd909bdfc")
      .verifications
      .create({to: `${mobileNumber}`, channel: 'sms'})
      console.log(verification.sid);
      
  return verification.sid;
};

export const verifyUserOtp = async (mobileNumber, otp) => {
      
const verification_check = await client.verify.v2.services("VA33b9fa3718abc705479e5ddcd909bdfc")
      .verificationChecks
      .create({to: `${mobileNumber}`, code: `${otp}`})

      console.log(verification_check.status);

  return prisma.user.update({
    where: { mobileNumber },
    data: { isVerified: true },
  });
};

export const loginUser = async (mobileNumber, password) => {
  const user = await prisma.user.findUnique({ where: { mobileNumber } });
  if (!user) throw new Error("User not found");

  const valid = await comparePasswords(password, user.password);
  if (!valid) throw new Error("Invalid credentials");

  return user;
};

export const completeUserProfile = async (userId, profileData) => {
  return prisma.user.update({
    where: { id: userId },
    data: {
      ...profileData,
    },
  });
};
