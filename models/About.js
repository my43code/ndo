import mongoose from "mongoose";
import { createDefaultContact } from "@/lib/siteDefaults";

const MediaSchema = new mongoose.Schema(
  {
    text: String,
    image: String,
    video: String,
  },
  { _id: false }
);

const TeamMemberSchema = new mongoose.Schema(
  {
    name: String,
    role: String,
    bio: String,
    image: String,
    video: String,
  },
  { _id: true }
);

const AboutProjectSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    image: String,
    video: String,
    link: String,
  },
  { _id: true }
);

const ContactSchema = new mongoose.Schema(
  {
    companyName: String,
    tagline: String,
    address: String,
    email: String,
    phone: String,
    whatsapp: String,
    hours: String,
    mapUrl: String,
    facebook: String,
    linkedin: String,
    x: String,
  },
  { _id: false }
);

const AboutSchema = new mongoose.Schema(
  {
    history: MediaSchema,
    mission: String,
    vision: String,
    values: [String],
    mvv: MediaSchema,
    team: [TeamMemberSchema],
    projects: [AboutProjectSchema],
    contact: {
      type: ContactSchema,
      default: createDefaultContact,
    },
  },
  { timestamps: true }
);

export default mongoose.models.About || mongoose.model("About", AboutSchema);
