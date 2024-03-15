// Import necessary modules
const express = require("express");
// Initialize Express app
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

// User Data
let users = [
  { id: 1, username: "user1", password: "password1" },
  { id: 2, username: "user2", password: "password2" },
  { id: 3, username: "user3", password: "password3" },
];

// Routes

// Get all users
app.get("/user", (req, res) => {
  res.json(users);
});

// get a single user by there ID
app.get("/user/:id", (req, res) => {
  const user_id = parseInt(req.params.id);
  const user = users.find((user) => user.id === user_id);
  if (!user) {
    res.status(404).json({ message: "User Not Found", success: false });
  }
  res.json(user);
});

// post a user

app.post("/user", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(500).json({ message: "insert user Fail !", success: false });
  }
  const insertedUser = { id: users.length + 1, username, password };
  users.push(insertedUser);
  res.json({ insertedUser, success: true });
});

//Update user profile information

app.put("/user/:id", (req, res) => {
  const user_id = parseInt(req.params.id);

  const { username, password } = req.body;
  const userIndex = users.findIndex((user) => user.id === user_id);

  if (userIndex === -1) {
    return res.status(404).json({ message: "User Not Found", success: false });
  }
  const updatedUser = { ...users[userIndex], username, password };
  users[userIndex] = updatedUser;
  res.json({ updatedUser, success: true });
});

// delete a user

app.delete("/user/:id", (req, res) => {
  const user_id = parseInt(req.params.id);
  const userIndex = users.findIndex((user) => user.id === user_id);
  if (userIndex === -1) {
    return res.status(404).json({ message: "User Not Found", success: false });
  }
  users.splice(userIndex, 1);
  res.json({ message: "user Is Deleted SuccessFull", success: true });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
