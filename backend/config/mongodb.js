import mongoose from 'mongoose';

const connectDB = async () => {
    mongoose.connection.on('connected' , () =>{
      console.log("DB connected")
    })
    await mongoose.connect(`${process.env.MONGODB_URI}`);
   
  
};

export default connectDB;


// import mongoose from 'mongoose';

// const connectDB = async () => {
//   try {
//     // Connect to MongoDB
//     await mongoose.connect(`${process.env.MONGODB_URI}`);

//     // Once connected, log success message
//     mongoose.connection.on('connected', () => {
//       console.log('MongoDB connected');
//     });
    
//   } catch (error) {
//     console.error('Error connecting to MongoDB:', error.message);
//     process.exit(1);  // Exit process with failure
//   }
// }

// export default connectDB;
