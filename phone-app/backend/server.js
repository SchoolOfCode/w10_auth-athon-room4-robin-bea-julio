import express from "express";
import { auth, requiredScopes } from "express-oauth2-jwt-bearer";
import  cors from "cors";

const app = express();
app.use(cors());

// Authorization middleware. When used, the Access Token must
// exist and be verified against the Auth0 JSON Web Key Set.
const checkJwt = auth({
  audience: "backend-phonebook",
  issuerBaseURL: `https://dev-4seovngdgycg75bu.uk.auth0.com/`,
});

// This route doesn't need authentication
app.get("/api/public", function (req, res) {
  res.json({
    message:
      "Hello from a public endpoint! You don't need to be authenticated to see this.",
  });
});

// This route needs authentication
app.get("/api/private", checkJwt, function (req, res) {
  res.json({
    message:
      "Hello from a private endpoint! You need to be authenticated to see this.",
  });
});

const checkScopes = requiredScopes("read: messages");

app.get("/api/private-scoped", checkJwt, checkScopes, function (req, res) {
  res.json({
    message:
      "Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this.",
  });
}); 

app.listen(4000, function () {
  console.log("Listening on http://localhost:4000");
});
