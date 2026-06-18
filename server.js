



import express from "express";
import axios from "axios";

const port = 5000;
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
        //res.render("index.ejs", { userBlogs: response.data });
        console.log(response.data);
        res.json(response.data);
    } catch (error) {
        res.json({ error: error.message });
    }
});


app.post("/post", async (req, res) => {

    const userBlog = req.body;
    console.log(userBlog);
    const response = await axios({
        method: 'post',
        baseURL: "http://localhost:3000",
        url: "/post",
        data: userBlog
    });

    res.status(200).send("Successfull");
});

app.patch("/patch/:blogId", async (req, res) => {
    const blogId = req.params.blogId;
    //res.render("update.ejs");
    const userChanges = req.body;
    console.log(userChanges);
    const response = await axios({
        method: 'patch',
        baseURL: "http://localhost:3000",
        url: `/update/${blogId}`,
        data: userChanges
    });
    res.status(200).send("Successfull in updating blog");
    //next('get_User');
});

app.patch("/delete/:blogId", async (req, res) => {
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
        res.status(200).send(`Successfull in deleting blog with id ${blogId}`);
        //next('get_User');

    } catch (error) {
        res.json({ error: error.message });
    }

});

app.listen(port, (error) => {
    console.log(`app is listening on port ${port}`);
})