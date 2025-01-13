import express, { Request, Response, Express } from "express";
import mongoose from "mongoose"; 


const app : Express = express();
const port : number = 3000;

mongoose.connect('mongodb://localhost:2707/')
.then(() => {
  console.log("Connecté à MongoDB avec succès !");
})
.catch((err) => {
  console.error("Erreur de connexion à MongoDB :", err);
});

app.get("/", (req: Request, res: Response) => {
  res.send("coucou");
});



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  console.log("To test this API, visit http://localhost:3000/");
});


