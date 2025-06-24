import { registerUser, loginUser } from '../services/auth.service.js';
import { generateToken } from '../utils/jwt.js';

export const register = async (req, res, next) => {
  try {
    const user = await registerUser(req.body);
    const token = generateToken({ id: user.id });
    res.status(201).json({ user, token });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { mobileNumber, password } = req.body;
    const user = await loginUser(mobileNumber, password);
    const token = generateToken({ id: user.id });
    res.status(200).json({ user, token });
  } catch (err) {
    next(err);
  }
};
