import mongoose from "mongoose";
import bcrypt from "bcryptjs";


function generateUMI() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const umiLength = 10;

  let umi = '';
  for (let i = 0; i < umiLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    umi += characters.charAt(randomIndex);
  }

  return umi;
}

const userSchema = mongoose.Schema({
  umi: { type: String, unique: true, required: false, default: generateUMI }, // Update here
  username: { type: String, required: [true, 'Username is required'], unique: true },
  email: { type: String, lowercase: true, required: [true, 'Email is required'], unique: true },
  phoneNumber: { type: String, required: [true, 'Phone number is required'], unique: true },
  password: { type: String, required: [true, 'Password is required'], minlength: 8 },
  token: { type: String, required: false }
}, { timestamps: true });

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
  
}

const User = mongoose.model('User', userSchema)

export default User;