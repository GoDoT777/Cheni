const express = require("express");
const fs = require("fs");
const app = express();
const port = 8080;

app.use("/static", express.static("public"));

// Existing route for getting a user by email
app.get("/users/:email", (req, res) => {
  const userFilePath = "./databases/users.json";
  fs.readFile(userFilePath, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error reading file.");
    }
    try {
      const userData = JSON.parse(data);
      const user = userData.users.find((u) => u.email === req.params.email);
      if (!user) {
        return res.send("<h1>User not found</h1>");
      }
      res.send(`<h1>${user.email}</h1><p>${user.password}</p>`);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error parsing JSON.");
    }
  });
});

// New route for getting all users
app.get("/all-users", (req, res) => {
  const userFilePath = "./databases/users.json";
  fs.readFile(userFilePath, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error reading file.");
    }
    try {
      const userData = JSON.parse(data);
      res.json(userData.users); // Send all users as JSON
    } catch (error) {
      console.error(error);
      res.status(500).send("Error parsing JSON.");
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

function checkUserCredentials(email, password) {
  const userFilePath = "./databases/users.json";

  // Synchronously read the file
  const rawData = fs.readFileSync(userFilePath, "utf8");
  const userData = JSON.parse(rawData);

  // Search for a user with the matching email and password
  const userExists = userData.users.some(
    (user) => user.email === email && user.password === password
  );

  return userExists;
}

// Example usage
const email = "admin@gmail.com";
const password = "Admin123";

if (checkUserCredentials(email, password)) {
  app.get("/", (req, res) => {
    res.send("User found!");
  });

  console.log("User found!");
} else {
  if (checkUserCredentials(email, password)) {
    app.get("/", (req, res) => {
      res.send("No user found with the given credentials.");
    });
    console.log("No user found with the given credentials.");
  }
}
