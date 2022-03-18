import mongoose from "mongoose";
import { mongoConfig } from "./config"

const mongoConn = async () => {
  const property = {
    dbName: mongoConfig.database,
    user: mongoConfig.username,
    pass: mongoConfig.password,
    autoCreate: true,
  }

  await mongoose.connect(mongoConfig.url, property)
      
  //Get the default connection
  const db = mongoose.connection;

  //Bind connection to error event (to get notification of connection errors)
  db.on('error', function() {
    console.error.bind(console, `MongoDB ${mongoConfig.url} connection error:`)
  });

  db.once("open", function() {
    console.log(`Mongo ${mongoConfig.url}${mongoConfig.database} connection established successfully`);
  });

  return db
}

export default mongoConn