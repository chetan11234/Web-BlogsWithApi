import express from "express";

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
const masterKey = "akfddfk-324NKNS-sdsldd";

function exactTimestamp() {
    const date = new Date();
    const d = Date(date);
    return d;
}

app.get("/get", (req, res) => {
    res.json(web_blogs);
});

app.post("/post", (req, res) => {
    console.log(req.body);
    const userResponse = req.body;
    console.log(userResponse);
    userResponse.id = web_blogs.length + 1;// create id property if didn't exist.
    userResponse.postedAt = exactTimestamp();
    userResponse.editedAt = "";
    web_blogs.push(userResponse);
    res.status(200).json(userResponse);
});

app.patch("/update/:blogId", (req, res) => {
    console.log("patch is working");
    const blogId = req.params.blogId;
    const blogIndex = web_blogs.findIndex((blog) => blog.id == blogId);
    if (blogIndex != -1) {
        if (req.body.title) web_blogs[blogIndex].title = req.body.title;
        if (req.body.description) web_blogs[blogIndex].description = req.body.description;
        web_blogs[blogIndex].editedAt = exactTimestamp();
        res.status(200).json(web_blogs[blogIndex]);
    } else {
        res.status(400).json({ error: `No blog with this ${blogId} id found.` });
    }
});

app.delete("/delete/:blogId", (req, res) => {
    const userKey = req.get('key');
    if (userKey === masterKey) {
        const blogId = req.params.blogId;
        if (blogId != -1) {
            const blogIndex = web_blogs.findIndex((blogs) => blogs.id == blogId);
            web_blogs.splice(blogIndex, 1);
            res.status(200).json({ success: "Deleted Successfully." });
        } else {
            res.status(400).json({ error: `No blogs with this ${blogId} id found.` });
        }
    }
    else {
        res.status(400).json({ error: `You have entered the wrong API key ` });
    }
});

app.listen(port, (error) => {
    if (error) throw error;
    console.log(`app is listening on port ${port}`);
})

/* consist of these properties
    id, postedAt, editedAt, title, description
*/
let web_blogs = [];