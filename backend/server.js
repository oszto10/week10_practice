const express = require("express");
const app = express();
const port = 3000;

const path = require("path");

const fs = require("fs");

app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(`${__dirname}/../frontend/index.html`));
});

app.use("/public", express.static(`${__dirname}/../frontend/public`));

app.post("/upload", (request, response) => {
  console.log(request.body);
  fs.writeFile(
    `${__dirname}/data/userdata.json`,
    JSON.stringify(request.body, null, 4),
    (error) => {
      if (error) {
        console.log(error);
        return response.status(500).send(error);
      } else {
        response.status(200).send("ok");
      }
    }
  );
});

/*app.get("/style.css", (req, res) => {
  res.sendFile(path.join(`${__dirname}/../frontend/style.css`));
});

app.get("/script.js", (req, res) => {
  res.sendFile(path.join(`${__dirname}/../frontend/script.js`));
});*/

app.listen(port, () => {
  console.log(`server is running @: http://127.0.0.1:${port}`);
});
