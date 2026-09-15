import express from "express";

const app = express();

app.get("/", async (req, res) => {
  res.send("BEM VINDO " + process.env.USER_NAME);
});
app.get("/pega-produto-hoje", async (req, res) => {
  res.send(
    "vou pegar a minha magica porta: " +
      process.env.USER_NAME +
      " que fica atualizando muito legal...",
  );
});

app.listen(3000, async () => {
  console.log("Servidor rodando na porta: http://localhost:3000");
});
