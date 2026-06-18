
import express from "express";
import axios from "axios";
import ejs from "ejs";
import methodOverride from "method-override";
const port = 5000;
const app = express();
app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        const method = req.body._method
        delete req.body._method
        return method
    }
}));

const userKey = "akfddfk-324NKNS-sdsldd";

app.get("/get_User", async (req, res) => {
    try {
        const response = await axios({
            method: 'get',
            baseURL: "http://localhost:3000",
            url: "/get"
        });
        res.render("index.ejs", { userBlogs: response.data });

    } catch (error) {
        res.json({ error: error.message });
    }
});

app.post("/blogForm", (req, res) => {
    res.render("post.ejs");
});

app.post("/post", async (req, res) => {

    const userBlog = req.body;
    const response = await axios({
        method: 'post',
        baseURL: "http://localhost:3000",
        url: "/post",
        data: userBlog
    });
    res.redirect("/get_User");
});

app.patch("/edit/:blogId", async (req, res) => {
    const blogId = req.params.blogId;
    //take data from web-blog via id then pass it to update.ejs
    const response = await axios({
        method: 'get',
        baseURL: "http://localhost:3000",
        url: `/get/${blogId}`
    });
    console.log("Everything fine upto here before rendering update file.")
    console.log(response.data);
    res.render("update.ejs", { userBlogs: response.data });
});

app.patch("/patch/:blogId", async (req, res) => {
    const blogId = req.params.blogId;
    const userChanges = req.body;
    const response = await axios({
        method: 'patch',
        baseURL: "http://localhost:3000",
        url: `/update/${blogId}`,
        data: userChanges
    });
    res.redirect("/get_User");

});

app.delete("/delete/:blogId", async (req, res) => {
    const blogId = req.params.blogId;
    try {
        const response = await axios({
            method: 'delete',
            baseURL: "http://localhost:3000",
            url: `/delete/${blogId}`,
            headers: {
                key: userKey
            }
        });
        res.redirect("/get_User");

    } catch (error) {
        res.json({ error: error.message });
    }


});

app.listen(port, (error) => {
    console.log(`app is listening on port ${port}`);
})