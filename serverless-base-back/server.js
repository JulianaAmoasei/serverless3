import "dotenv/config";
import app from "./servidor/app.js";

const port = process.env.PORT || 5000;


app.listen(port, () => {
  console.log(`Servidor escutando na porta:${port}`);
});