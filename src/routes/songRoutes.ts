import { Request, Response, Router } from "express";
import Song, { ISong } from "../models/Songs";
import Artist from "../models/Artist";

const router = Router();

// Ajouter 
router.post("/", async (req: Request, res: Response) => {
  try {
    const { title, duration, artistIds, albumId, genre } = req.body;

    const song: ISong = new Song({ title, duration, artistIds, albumId, genre });
    const savedSong = await song.save(); 

    await Promise.all(
      artistIds.map(async (artistId: string) => {
        await Artist.findByIdAndUpdate(
          artistId,
          { $push: { songs: savedSong._id } },
        );
      })
    );

    res.status(201).json({ message: "Song created successfully", song: savedSong });
  } catch (err) {
    console.error("Erreur lors de la création de la chanson :", err);
    res.status(500).json({ message: "Failed to create song", error: err });
  }
});

// Afficher
router.get("/", async (req: Request, res: Response) => {
    try {
        // `populate` pour inclure les détails des artistes
        const songs = await Song.find().populate("artistIds", "name genre");
    
        res.status(200).json(songs);
      } catch (err) {
        console.error("Erreur lors de la récupération des chansons :", err);
        res.status(500).json({ message: "Failed to fetch songs", error: err });
      }
    });

// Rechercher 
router.get("/:id", async (req: Request, res: Response) => {
    try {
      const song = await Song.findById(req.params.id).populate("artistIds", "name genre");
  
      if (!song) {
        return res.status(404).json({ message: "Song not found" });
      }
  
      res.status(200).json(song);
    } catch (err) {
      console.error("Erreur lors de la récupération de la chanson :", err);
      res.status(500).json({ message: "Failed to fetch song", error: err });
    }
  });
  
export default router;


