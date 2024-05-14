const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();

app.use(bodyParser.json());
app.use(cors());

const uploadFolder = "Stockage";

// Création du dossier si il n'existe pas
if (!fs.existsSync(uploadFolder)){
  fs.mkdirSync(uploadFolder, { recursive: true });
}

// Définition du schéma de l'utilisateur
const userSchema = new mongoose.Schema({
  name: String,
  firstname: String,
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

// Création du modèle User
const User = mongoose.model("User", userSchema);

// Définition du schéma du document
const documentSchema = new mongoose.Schema({
  type: { type: String, required: false },
  name: { type: String, required: true },
  description: { type: String, required: false },
  date: { type: Date, default: Date.now },
  size: { type: Number, required: true },
  filePath: { type: String, required: true }
});

// Création du modèle Document
const Document = mongoose.model("Document", documentSchema);

// Connexion à MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/WebUsers")
  .then(() => {
    console.log("MongoDB Connected")
  }).catch(err => {
    console.error("Failed to connect to MongoDB", err);
  });

// Configuration de Multer pour le stockage des fichiers
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadFolder);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

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

// Route pour supprimer un utilisateur spécifique par son ID
app.delete('/api/users/:id', async (req, res) => {
  const { id } = req.params; // L'ID de l'utilisateur à supprimer

  try {
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" }); // Si aucun utilisateur n'est trouvé avec cet ID, renvoyer une erreur 404
    }

    res.status(200).json({ message: "User deleted successfully" }); // Confirmer la suppression
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Error deleting user", error: error }); // Gérer les erreurs éventuelles
  }
});

// Route pour télécharger un fichier
app.post('/api/documents', upload.single('file'), (req, res) => {
  res.status(201).send({ message: "File uploaded successfully" });
});

// Route pour obtenir la liste des fichiers
app.get('/api/documents', (req, res) => {
  fs.readdir(uploadFolder, (err, files) => {
    if (err) {
      return res.status(500).send({ message: "Unable to scan files" });
    }
    const fileList = files.map(file => {
      const filePath = path.join(uploadFolder, file);
      const stats = fs.statSync(filePath);
      return {
        name: file,
        size: stats.size,
        path: filePath,
        date: stats.mtime
      };
    });
    res.send(fileList);
  });
});

// Route pour rechercher des documents par nom
app.get('/api/documents/search', async (req, res) => {
  const { name } = req.query;
  try {
    const documents = await Document.find({ name: { $regex: name, $options: 'i' } });
    res.send(documents);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Route pour télécharger un fichier spécifique
app.get('/api/documents/download/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(uploadFolder, filename);
  res.download(filePath, filename, (err) => {
    if (err) {
      console.error("Error downloading file:", err);
      res.status(500).send({ message: "Error downloading file" });
    }
  });
});

// Route pour supprimer un fichier spécifique
app.delete('/api/documents/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(uploadFolder, filename);
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error("Error deleting file:", err);
      return res.status(500).send({ message: "Error deleting file" });
    }
    res.send({ message: "File deleted successfully" });
  });
});

// Route pour créer un nouveau document dans la BDD
app.post('/api/documents/add', upload.single('file'), async (req, res) => {
  try {
    const { type, name, description, size, filePath } = req.body;

    const newDocument = new Document({
      type,
      name,
      description,
      size,
      filePath
    });

    await newDocument.save();
    res.status(201).send(newDocument);
  } catch (error) {
    console.error("Error saving document metadata:", error);
    res.status(400).send(error);
  }
});

// Route pour obtenir tous les documents dans la BDD
app.get('/api/documents', async (req, res) => {
  try {
    const documents = await Document.find();
    res.send(documents);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Route pour supprimer un fichier spécifique et son document
app.delete('/api/documents/delete/:filename', async (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(uploadFolder, filename);

  try {
    // Supprimer le fichier du système de fichiers
    fs.unlinkSync(filePath);

    // Supprimer le document de la base de données
    const deletedDocument = await Document.findOneAndDelete({ name: filename });
    if (!deletedDocument) {
      return res.status(404).send({ message: "Document not found in database" });
    }

    res.send({ message: "File and document deleted successfully" });
  } catch (error) {
    console.error("Error deleting file or document:", error);
    res.status(500).send({ message: "Error deleting file or document" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});