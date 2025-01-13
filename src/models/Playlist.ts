import mongoose, { Schema, Document } from 'mongoose';

// typer le modèle 
export interface IPlaylist extends Document {
  name: string;
  description?: string; // je met ? quand je veux que ca soit optionelle 
  userId: string; 
  songs: string[]; 
}

// Schéma 
const PlaylistSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String }, 
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Référence à l'utilisateur
  songs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }], // Références aux chansons
});

// Exporter 
export default mongoose.model<IPlaylist>('Playlist', PlaylistSchema);
