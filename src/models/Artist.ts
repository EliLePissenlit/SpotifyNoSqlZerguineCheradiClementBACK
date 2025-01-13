import mongoose, { Schema, Document } from 'mongoose';

//  typer Artist
export interface IArtist extends Document {
  name: string;
  genre?: string;
  bio?: string; 
  songs: string[]; 
}

// Schéma de l'artiste
const ArtistSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  genre: { type: String, required: true },
  bio: { type: String }, 
  songs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }], // Références aux chansons
});

// Exporter 
export default mongoose.model<IArtist>('Artist', ArtistSchema);
