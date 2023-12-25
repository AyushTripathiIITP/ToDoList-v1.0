const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const date = require(__dirname + "/dateGener.js");

const items = ["food", "milk"];
const workItems = [];

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/", (req, res) => {
    try {
        if (!req.body.item || !req.body.list) {
            throw new Error("Invalid request parameters");
        }

        const newItem = req.body.item;
        const listType = req.body.list;

        if (listType === "Work") {
            workItems.push(newItem);
            res.redirect("/work");
        } else {
            items.push(newItem);
            res.redirect("/");
        }
    } catch (error) {
        console.error(`Error in POST /: ${error.message}`);
        res.status(400).send("Bad Request");
    }
});

app.get("/work", (req, res) => {
    res.render('list', { listType: "Work", newItems: workItems });
});

app.get("/", (req, res) => {
    try {
        const currentDate = date();
        res.render('list', { listType: currentDate, newItems: items });
    } catch (error) {
        console.error(`Error in GET /: ${error.message}`);
        res.status(500).send("Internal Server Error");
    }
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
