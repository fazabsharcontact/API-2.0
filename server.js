import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "http://localhost:4000";

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Route to render the main page
app.get("/", async (req, res) => {
    try {
        const response = await axios.get(`${API_URL}/posts`);
        console.log(response);
        res.render("index.ejs", { posts: response.data });
    } catch (error) {
        res.status(500).json({ message: "error fetching posts" });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}....`);
});