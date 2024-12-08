import { Schema, model, Document } from 'mongoose';

// Define an interface for the Event document
interface IEvent extends Document {
  posterUrl: string;
  title: string;
  price: number;
  address: string;
  venue: string;
  date: string;
  time: string;
  ticketLink: string;
}

// Define the schema for the Event document
const eventSchema = new Schema<IEvent>(
  {
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
  }
);

const Event = model<IEvent>('Event', eventSchema);

export default Event;
