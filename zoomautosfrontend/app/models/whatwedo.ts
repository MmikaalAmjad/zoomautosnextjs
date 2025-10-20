import mongoose, { Schema, models, model } from "mongoose";

const WhatWeDoSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

// Hot reload safe
const WhatWeDo = models.WhatWeDo || model("WhatWeDo", WhatWeDoSchema);

export default WhatWeDo;
