import { Request, Response, Router } from "express";
import Playlist from "../models/Playlist";

const router = Router();

// afficher playlists
router.get("/", async (req: Request, res: Response) => {
  try {
    const playlists = await Playlist.find().populate("userId", "username").populate("songs", "title genre");
    res.status(200).json(playlists);
  } catch (err) {
    console.error("Erreur lors de la récupération des playlists :", err);
    res.status(500).json({ message: "Failed to fetch playlists" });
  }
});

// afficher playlist id 
router.get("/:id", async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
  
      const playlist = await Playlist.findById(id).populate("userId", "username").populate("songs", "title genre");
      if (!playlist) {
        return res.status(404).json({ message: "Playlist not found" });
      }
  
      res.status(200).json(playlist);
    } catch (err) {
      console.error("Erreur lors de la récupération de la playlist :", err);
      res.status(500).json({ message: "Failed to fetch playlist" });
    }
  });

  // ajouter playlist 
  router.post("/", async (req: Request, res: Response) => {
    try {
      const { name, description, userId, songs } = req.body;
  
      const playlist = new Playlist({ name, description, userId, songs });
      const savedPlaylist = await playlist.save();
  
      res.status(201).json(savedPlaylist);
    } catch (err) {
      console.error("Erreur lors de la création de la playlist :", err);
      res.status(500).json({ message: "Failed to create playlist" });
    }
  });

  // MAJ playlist 
  router.put("/:id", async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { name, description, songs } = req.body;
  
      const updatedPlaylist = await Playlist.findByIdAndUpdate(
        id,
        { name, description, songs },
        { new: true } 
      );
  
      if (!updatedPlaylist) {
        return res.status(404).json({ message: "Playlist not found" });
      }
  
      res.status(200).json(updatedPlaylist);
    } catch (err) {
      console.error("Erreur lors de la mise à jour de la playlist :", err);
      res.status(500).json({ message: "Failed to update playlist" });
    }
  });


  // Supp
  router.delete("/:id", async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
  
      const deletedPlaylist = await Playlist.findByIdAndDelete(id);
  
      if (!deletedPlaylist) {
        return res.status(404).json({ message: "Playlist not found" });
      }
  
      res.status(200).json({ message: "Playlist deleted successfully" });
    } catch (err) {
      console.error("Erreur lors de la suppression de la playlist :", err);
      res.status(500).json({ message: "Failed to delete playlist" });
    }
  });


export default router;