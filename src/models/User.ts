import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


// typé modèle user
export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    generateAuthToken(): string; 

    isModified(path: string): boolean;
  }

// schema user
  const UserSchema: Schema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  });

// hachage mdp
  UserSchema.pre<IUser>('save', async function (next) {
    if (!this.isModified('password')) return next(); 
  
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });

// générer token
  UserSchema.methods.generateAuthToken = function (): string {
    const token = jwt.sign(
      { _id: this._id, username: this.username },
      'secretKey', // on peut remplacer secretkey par une autre clé 
      { expiresIn: '1h' }
    );
    return token;
  };
  // et on exporte le modèle 
  export default mongoose.model<IUser>('User', UserSchema);
