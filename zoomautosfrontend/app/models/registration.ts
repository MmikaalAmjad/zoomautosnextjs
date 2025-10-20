import mongoose from "mongoose";

// Define schema
const RegistrationSchema =new mongoose.Schema({
    Id:{type: String, required:true},
    username:{ type: String, required: true },
    name:{ type: String, required: true },
    email:{ type: String, required: true },
    contactNumber:{ type: String, required: true },
    password:{ type: String, required: true },
    companyName:{ type: String, required: true },
    Address:{ type: String, required: true },
    PostCode:{ type: String, required: true },
    city:{ type: String, required: true },
    resetToken: { type: String }, // Add this field
  resetTokenExpiry: { type: Date },
   fcmToken: { type: String, default: null }
}, { timestamps: true })

// Avoid recompiling model during hot reload in Next.js
export default mongoose.models.Registration || mongoose.model("Registration", RegistrationSchema, "Registration");
