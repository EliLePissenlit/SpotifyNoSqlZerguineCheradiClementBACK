import express, { Request, Response, Express } from "express";
import mongoose from "mongoose"; 
import songRoutes from "./routes/songRoutes";



const app : Express = express();
const port : number = 3000;

app.use(express.json());


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



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  console.log("To test this API, visit http://localhost:3000/");
});


