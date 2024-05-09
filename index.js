//imports
const express = require("express");
const { connectToMongodb } = require("./connection");
const URL = require("./models/url");
const urlRoute = require("./routes/url");

const app = express();
const PORT = 8000;

//connection to MongoDB
connectToMongodb("mongodb://localhost:27017/url-shortener")
.then(() => console.log("MongoDb connected successfully"));

//middleware
app.use(express.json()); // this is used to avoid cannot read properties of read null for body

app.use("/url", urlRoute);

// app.use("/:shortenedURL", urlRoute);

app.get("/:shortenedURL", urlRoute);

app.listen(PORT, () => console.log(`Server connected successfully at PORT : ${PORT}`));