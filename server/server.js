const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Calling occupants of interplanetary craft");
});

app.listen(8000);
