import mongoose from "mongoose";

const emailSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: (value: string) =>
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(value),
      message: (props: any) => `${props.value} is not a valid email address!`,
    },
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const LogisticsEmail =
  mongoose.models.LogisticsEmail ||
  mongoose.model("LogisticsEmail", emailSchema);

export default LogisticsEmail;
