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

//Route to render the edit page
app.get("/new", (req, res) => {
    res.render("modify.ejs", { heading: "New Post", submit: "Create Post "});
});

app.get("/edit/:id", async (req, res) => {
    try {
        const response = await axios.get(`${API_URL}/posts/${req.params.id}`);
        console.log(response.data);
        res.render("modify.ejs", {
            heading: "Edit Post",
            submit: "Update Post",
            post: response.data,
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching post "});
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}....`);
});