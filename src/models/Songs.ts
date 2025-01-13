import mongoose, { Schema, Document } from 'mongoose';

// typer 
export interface ISong extends Document {
  title: string;
  duration?: number; 
  artistIds: string[]; 
  albumId?: string; 
  genre: string;
}

// Schéma 
const SongSchema: Schema = new Schema({
  title: { type: String, required: true },
  duration: { type: Number, required: true }, 
  artistIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Artist' }], // Références aux artistes
  albumId: { type: mongoose.Schema.Types.ObjectId, ref: 'Album' }, // Optionnel : référence à un album
  genre: { type: String, required: true },
});

export default mongoose.model<ISong>('Song', SongSchema);
