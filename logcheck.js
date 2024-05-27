const express = require("express");
const fs = require("fs");
const app = express();
const port = 8080;
const cors = require("cors");
// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Middleware to parse JSON bodies

app.use("/static", express.static("public"));

// Route for getting a user by email
app.get("/users", (req, res) => {
  console.log("sir");
  const { email, password } = req.body; // Get email and password from request body
  const userFilePath = "./databases/users.json";
  fs.readFile(userFilePath, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error reading file.");
    }
    try {
      const userData = JSON.parse(data);
      const user = userData.users.find(
        (u) => u.email === email && u.password === password
      );
      if (!user) {
        return res.status(404).send("User not found");
      }
      res.json({ message: "User authenticated", user });
    } catch (error) {
      console.error(error);
      res.status(500).send("Error parsing JSON.");
    }
  });
});

// Route for getting all users
app.get("/all-users", (req, res) => {
  console.log("sir");
  const userFilePath = "./databases/users.json";
  fs.readFile(userFilePath, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error reading file.");
    }
    try {
      const userData = JSON.parse(data);
      res.json(userData.users);
      console.log(userData.users); // Send all users as JSON
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
  console.log("User found!");
} else {
  console.log("User not found!");
}
