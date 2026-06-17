import express from "express";
import axios from "axios";

const port = 4000;
const app = express();
app.use(express.urlencoded({ extended: true }));

const userKey = "akfddfk-324NKNS-sdsldd";

app.get("/get_User", async (req, res) => {
    try {
        const response = await axios({
            method: 'get',
            baseURL: "http://localhost:3000",
            url: "/get"
        });
        try {
            res.render("index.ejs", { userBlogs: response.data });
        } catch (error) {
            res.render("index.js", { error: "error in displaying the user Blogs. " });
        }
    } catch (error) {
        res.render("index.js", { error: "error in fetching the user Blogs. " });
    }
});

app.post("/post", async (req, res) => {
    try {
        const userBlog = req.body;
        const response = await axios({
            method: 'post',
            baseURL: "http://localhost:3000",
            url: "/post",
            data: userBlog
        });

    } catch (error) {
        res.send(<h1>Error in fetching the user Blogs.</h1>);
    }
    next('/get_User');
});

app.patch("/patch/:blogId", async (req, res) => {
    const blogId = req.params.blogId;
    res.render("update.ejs")
    const userChanges = req.body;
    const response = await axios({
        method: 'patch',
        baseURL: "http://localhost:3000",
        url: `/patch/${blogId}`,
        data: userBlog
    });
    next('get_User');
});

app.delete("/delete", (req, res) => {

});

