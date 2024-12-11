import { User, Event } from '../models/index.js';
import { signToken, AuthenticationError } from '../utils/auth.js';

// Define types for the arguments
interface AddUserArgs {
  input: {
    username: string;
    email: string;
    password: string;
  }
}

interface LoginUserArgs {
  email: string;
  password: string;
}

interface UserArgs {
  username: string;
}

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    user: async (_parent: any, { username }: UserArgs) => {
      return User.findOne({ username });
    },
    // Query to get the authenticated user's information
    // The 'me' query relies on the context to check if the user is authenticated
    me: async (_parent: any, _args: any, context: any) => {
      // If the user is authenticated, find and return the user's information along with their thoughts
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      // If the user is not authenticated, throw an AuthenticationError
      throw new AuthenticationError('Could not authenticate user.');
    },
    events: async () => {
      try {
        // Fetch events from the database
        const events = await Event.find();
        return events;
      } catch (error) {
        console.error('Error fetching events:', error);
        throw new Error('Unable to fetch events');
      }
    }

  },
  Mutation: {
    addUser: async (_parent: any, { input }: AddUserArgs) => {
      // Create a new user with the provided username, email, and password
      const user = await User.create({ ...input });

      // Sign a token with the user's information
      const token = signToken(user.username, user.email, user._id);

      // Return the token and the user
      return { token, user };
    },

    login: async (_parent: any, { email, password }: LoginUserArgs) => {
      // Find a user with the provided email
      const user = await User.findOne({ email });

      // If no user is found, throw an AuthenticationError
      if (!user) {
        throw new AuthenticationError('Could not authenticate user.');
      }

      // Check if the provided password is correct
      const correctPw = await user.isCorrectPassword(password);

      // If the password is incorrect, throw an AuthenticationError
      if (!correctPw) {
        throw new AuthenticationError('Could not authenticate user.');
      }

      // Sign a token with the user's information
      const token = signToken(user.username, user.email, user._id);

      // Return the token and the user
      return { token, user };
    },
    createEvent: async (_parent: any, { id, posterUrl, title, description, price, address, venue, date, time, ticketLink }: any) => {
      const newEvent = new Event({
        id,
        posterUrl,
        title,
        description,
        price,
        address,
        venue,
        date,
        time,
        ticketLink
      });
      await newEvent.save();
      return newEvent;
    },
    updateUser: async (_parent: any, { newEmail }: { newEmail: string }, context: any) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $set: {
              email: newEmail
            }
          },
          { new: true }
        );
      }
      throw AuthenticationError;
    },

    updatePurchaseHistory: async (_parent: any, { purchasedItems }: { purchasedItems: { eventId: number; quantity: number }[] }, context: any): Promise<any> => {
      if (!context.user) {
        throw new Error("User not authenticated");
      }
      try {
        const user = await User.findById(context.user._id);

        if (!user) {
          throw new Error("User not found");
        }

        for (const { eventId, quantity } of purchasedItems) {
          // Try to find an existing purchase in the user's purchase history
          const existingPurchase = await User.findOne({
            _id: user._id,
            "purchaseHistory.eventId": eventId
          });
    
          if (existingPurchase) {
            // If the purchase exists, update the quantity
            await User.updateOne(
              { _id: user._id, "purchaseHistory.eventId": eventId },
              { $inc: { "purchaseHistory.$.quantity": quantity } }
            );
          } else {
            // If the purchase doesn't exist, add it as a new entry
            await User.findOneAndUpdate(
              { _id: user._id },
              {
                $addToSet: {
                  purchaseHistory: { eventId, quantity }
                }
              },
              { new: true }
            );
          }
        }
        return User.findById(user._id); // Return the updated user object
      } catch (error:any) {
        throw new Error("Error updating purchase history: " + error.message);
      }
    },
  },
};
export default resolvers
