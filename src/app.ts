import express, { Request, Response, Express } from "express";
import mongoose from "mongoose"; 
import cors from "cors";
import songRoutes from "./routes/songRoutes";
import userRoutes from "./routes/userRoutes";
import artistRoutes from "./routes/artistRoutes";
import playlistRoutes from "./routes/playlistRoutes";
import searchRoutes from "./routes/searchRoutes";






const app : Express = express();
const port : number = 3000;

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173", 
    methods: ["GET", "POST", "PUT", "DELETE"], 
    credentials: true, 
  })
);

mongoose.connect('mongodb://127.0.0.1:27017/spotiflyy')
.then(() => {
  console.log("Connecté à MongoDB avec succès !");
})
.catch((err) => {
  console.error("Erreur de connexion à MongoDB :", err);
});

// Routes
app.get("/", (req: Request, res: Response) => {
  res.send("coucou");
});

app.use("/api/songs", songRoutes);

app.use("/api/user", userRoutes);

app.use("/api/artists", artistRoutes);

app.use("/api/playlists", playlistRoutes);

app.use("/api/search", searchRoutes);





app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  console.log("To test this API, visit http://localhost:3000/");
});


