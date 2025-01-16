import { Request, Response, Router } from "express";
import Artist from "../models/Artist";
import Song from "../models/Songs";
import Playlist from "../models/Playlist";

const router = Router();

// Route de recherche
router.get("/", async (req: Request, res: Response) => {
  try {
    const { q } = req.query;

    if (!q || typeof q !== "string") {
      return res.status(400).json({ message: "Search query (q) is required" });
    }

    const searchQuery = { $regex: q, $options: "i" };

    const artists = await Artist.find({ name: searchQuery });
    const songs = await Song.find({ title: searchQuery });
    const playlists = await Playlist.find({ name: searchQuery });

    res.status(200).json({ artists, songs, playlists });
  } catch (err) {
    console.error("Erreur lors de la recherche :", err);
    res.status(500).json({ message: "Failed to perform search" });
  }
});

export default router; // Important : on exporte le router
