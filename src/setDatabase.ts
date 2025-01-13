import mongoose from "mongoose";
import User from "./models/User";
import Artist from "./models/Artist";
import Song from "./models/Songs";
import Playlist from "./models/Playlist";

const seedDatabase = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/spotiflyy'); 
    console.log("Connecté à MongoDB avec succès pour le seed !");

    // utilisateur
    const user = await User.create({
      username: "johndoe",
      email: "johndoe@example.com",
      password: "password123", 
    });
    console.log("Utilisateur ajouté :", user);

    // artistes
    const artist1 = await Artist.create({
      name: "Ariana Grande",
      genre: "Pop",
      bio: "American singer-songwriter.",
    });

    const artist2 = await Artist.create({
      name: "Artemas",
      genre: "Pop-Rock",
      bio: "British singer-songwriter.(très bg)",
    });
    console.log("Artistes ajoutés :", artist1, artist2);

    // musique
    const song1 = await Song.create({
      title: "Break up with your girlfriend",
      duration: 231, 
      artistIds: [artist1._id], // ref à ariana 
      genre: "Pop",
    });

    const song2 = await Song.create({
      title: "Please don't humble me",
      duration: 240, 
      artistIds: [artist2._id], // ref à artemas
      genre: "Pop-Rock",
    });
    console.log("Chansons ajoutées :", song1, song2);

    // playlist
    const playlist = await Playlist.create({
      name: "My Favorites",
      description: "A collection of my favorite songs",
      userId: user._id, // Référence à l'utilisateur johndoe
      songs: [song1._id, song2._id], // Références aux chansons
    });
    console.log("Playlist ajoutée :", playlist);

    console.log("Base de données remplie avec succès !");
    process.exit(); 
  } catch (err) {
    console.error("Erreur lors du remplissage de la base de données :", err);
    process.exit(1); 
  }
};

seedDatabase();
