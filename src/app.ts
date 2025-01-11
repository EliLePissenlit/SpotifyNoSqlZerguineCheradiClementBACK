import express, { Request, Response, Express } from "express";

const app : Express = express();
const port : number = 3000;


app.get("/", (req: Request, res: Response) => {
  res.send("coucou");
});



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  console.log("To test this API, visit http://localhost:3000/");
});


