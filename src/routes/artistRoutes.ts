import { Request, Response, Router } from "express";
import Artist from "../models/Artist";

const router = Router();

// Afficher artists
router.get("/", async (req: Request, res: Response) => {
  try {
    const artists = await Artist.find();
    res.status(200).json(artists);
  } catch (err) {
    console.error("Erreur artistes :", err);
    res.status(500).json({ message: "Failed to fetch artists" });
  }
});

// Afficher artist avec id
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const artist = await Artist.findById(id);
    if (!artist) {
      return res.status(404).json({ message: "Artist not found" });
    }

    res.status(200).json(artist);
  } catch (err) {
    console.error("Erreur artiste :", err);
    res.status(500).json({ message: "Failed to fetch artist" });
  }
});

export default router;
