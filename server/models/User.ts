import { Schema, model } from "mongoose"

const schema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  ava: {
    type: String,
    required: true,
    default:
      "https://restaurant-complex-bucket.s3.eu-central-1.amazonaws.com/user.png",
  },
  firstname: { type: String, default: "" },
  lastname: { type: String, default: "" },
  phone: { type: String, default: "" },
  bio: { type: String, default: "" },
  birth: { type: Date, default: "" },
  role: {
    type: String,
    required: true,
    default: "user",
    enum: ["user", "admin"],
  },
  date: { type: Date, required: true },
})

export default model("User", schema)
