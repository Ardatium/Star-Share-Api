import mongoose from "mongoose";

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.z3oyafq.mongodb.net/?retryWrites=true&w=majority`)
.then(() => console.log("Successfuly connected to the database"))
.catch((error) => console.log(`Error during connection : ${error}`))