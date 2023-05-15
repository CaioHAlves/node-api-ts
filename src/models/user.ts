import mongoose from '../db/conn'

const { Schema } = mongoose

export const User = mongoose.model(
  "Users",
  new Schema({
    name: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    }
  },
  { timestamps: false }
  )
)