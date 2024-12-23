import { Schema, model, Document } from "mongoose";

// Define an interface for the Event document
interface IEvent extends Document {
  id: number;
  posterUrl: string;
  title: string;
  description: string;
  price: number;
  address: string;
  venue: string;
  date: string;
  time: string;
  ticketLink: string;
}

// Define the schema for the Event document
const eventSchema = new Schema<IEvent>({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  posterUrl: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
    description: {
      type: String,
      required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  venue: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  ticketLink: {
    type: String,
    required: true,
  },
});

const Event = model<IEvent>("Event", eventSchema);

export default Event;
