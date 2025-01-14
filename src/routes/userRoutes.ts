import express, { Request, Response } from "express";
import User from '../models/User';

const router = express.Router();

router.post('/register', async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already in use' });

    const user = new User({ username, email, password });
    await user.save();

    const token = user.generateAuthToken();
    res.status(201).json({ user: { username, email }, token });
  } catch (err) {
    res.status(500).json({ error: 'Failed to register user' });
  }
});

router.post("/register", async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body;

      console.log(req.body);
      res.status(200).send("Log OK");
    } catch (err) {
      res.status(500).send("Error");
    }
  });
  

export default router;
