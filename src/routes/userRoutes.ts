import { Request, Response, Router } from "express";
import User from '../models/User';
import bcrypt from "bcryptjs";

const router = Router();

// Ajouter
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

// Login
router.post('/login', async (req: Request, res: Response) => {
    try { 
        const { email, password } = req.body;

        // vérification existance user
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid email or passwword}'});

        // vérification mdp avec bcrypt
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(400).json({ message: 'Invalid email or password' });

        // génère token JWT
        const token = user.generateAuthToken();

        res.status(200).json({ user: { username: user.username, email: user.email }, token });
  } catch (err) {
    res.status(500).json({ error: 'Failed to login user' });
  }

    })

    // supprimer 
    router.delete('/:id', async (req: Request, res: Response) => {
        try {
          const { id } = req.params;
      
          // vérification existance user
          const user = await User.findById(id);
          if (!user) {
            return res.status(404).json({ message: 'User not found' });
          }
      
          // Supprime
          await User.findByIdAndDelete(id);
      
          res.status(200).json({ message: 'User deleted successfully' });
        } catch (err) {
          console.error('Erreur lors de la suppression de l\'utilisateur :', err);
          res.status(500).json({ error: 'Failed to delete user' });
        }
      });

export default router;
