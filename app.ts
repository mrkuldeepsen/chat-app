import express, { Request, Response } from "express";
const app = express();
const PORT = 4000;







app.get("*", (req: Request, res: Response): void => {
  res.send({ message: "Hunn Smart!" });
});




app.listen(PORT || process.env.PORT, (): void => {
  console.log(`Server running port on ${PORT}`);
});
