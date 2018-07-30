import { authenticate } from '../services/auth';
import { Users } from '../models';

const login = async (req, res) => {
  try {
    const {
      token,
      payload,
    } = await authenticate(Users)(req.body);

    res.json({
      success: true,
      token,
      payload,
    });
  } catch (e) {
    res.status(401).json({
      success: false,
      message: e.message,
    });
  }
};

export default {
  login,
};
