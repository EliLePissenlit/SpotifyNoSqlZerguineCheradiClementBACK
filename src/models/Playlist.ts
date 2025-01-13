import mongoose, { Schema, Document } from 'mongoose';

// typer le modèle 
export interface IPlaylist extends Document {
  name: string;
  description?: string; // Description optionnelle
  userId: string; // ID de l'utilisateur qui a créé la playlist
  songs: string[]; // Liste des IDs des chansons dans la playlist
}

// Schéma 
const PlaylistSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String }, // Optionnel
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Référence à l'utilisateur
  songs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }], // Références aux chansons
});

// Exporter 
export default mongoose.model<IPlaylist>('Playlist', PlaylistSchema);
