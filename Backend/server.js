const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");

const app = express();

app.use(bodyParser.json());
app.use(cors());

// Définition du schéma de l'utilisateur
const userSchema = new mongoose.Schema({
  name: String,
  firstname: String,
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

// Création du modèle User
const User = mongoose.model("User", userSchema);

// Connexion à MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/WebUsers")
  .then(() => {
    console.log("MongoDB Connected")
  }).catch(err => {
    console.error("Failed to connect to MongoDB", err);
  });

// Route pour l'enregistrement d'un nouvel utilisateur
app.post("/api/users/register", async (req, res) => {
  try {
    const { name, firstname, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).send({ message: "Email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      firstname,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res
      .status(201)
      .send({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error("Error during user registration:", error);
    res
      .status(500)
      .send({ message: "Error registering new user", error: error.message });
  }
});

// Route pour la connexion d'un utilisateur
app.post("/api/utilisateurs/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({ message: "Invalid credentials" });
    }
    res.status(200).send({ message: "User logged in successfully", user });
  } catch (error) {
    console.error("Login error:", error);
    res
      .status(500)
      .send({ message: "Server error during login", error: error.message });
  }
});

// Définition de la route pour obtenir tous les utilisateurs
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find(); // Utilisez find() sans paramètres pour récupérer tous les utilisateurs
    res.send(users);
  } catch (error) {
    console.log('Error fetching users:', error); // Log l'erreur dans la console du serveur
    res.status(500).json({ message: 'Error fetching users', error: error }); // Envoie l'erreur au client
  }
});

// Route pour mettre à jour un utilisateur
app.put('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  const { name, firstname, email, password } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(id, {
      name: name,
      firstname: firstname,
      email: email,
      password: password
    }, { new: true }); // L'option { new: true } s'assure que la méthode renvoie l'utilisateur mis à jour

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Error updating user", error: error });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});