const express = require("express");
const cors = require("cors");
const { expressjwt: jwt } = require("express-jwt");
const jwks = require("jwks-rsa");
const axios = require("axios");

const app = express();
app.use(cors());

// Check if a JWT is valid.
const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://lakorthus.uk.auth0.com/.well-known/jwks.json",
  }),
  audience: "https://phone-app/api",
  issuer: "https://lakorthus.uk.auth0.com/",
  algorithms: ["RS256"],
}).unless({ path: ["/"] });

app.use(jwtCheck);

app.get("/", (req, res) => {
  res.send("Hello from index route");
});


app.get("/protected", async (req, res) => {
    try{
        const accessToken = req.headers.authorization.split(" ")[1];
        const response = await axios.get("https://lakorthus.uk.auth0.com/userinfo", {
            headers: {
             authorization: `Bearer ${accessToken}`,
            },
        });
        const userInfo = response.data;
        console.log(userInfo);
        res.send(userInfo);

    }catch(err){
        res.send(err.message);
    }
});

// Use the application.
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

// Sends an error to the client.
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).send(message);
});

app.listen(4000, () => {
  console.log("Server listening on port 4000");
});
