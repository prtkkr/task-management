import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const URI = process.env.MONGODB_URI;
    if (!URI) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }
    await mongoose.connect(URI, {
      autoIndex: true,
      serverSelectionTimeoutMS: 5000,
    });
    console.log('MongoDB Connected successfully');

    // Event listeners
    mongoose.connection.on('connected', () => {
      console.log('Mongoose connected to DB');
    });

    mongoose.connection.on('error', (err) => {
      console.error('Mongoose connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('Mongoose disconnected');
    });
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};
