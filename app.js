const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const date = require(__dirname + "/dateGener.js");

//starting portion done

var items = ["food", "milk"];
var workItem = [];

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/", function (req, res) {
    var item = req.body.item;

    var index = req.body.list;

    if (index === "Work") {
        workItem.push(item);
        res.redirect("/work");
    }
    else {
        items.push(item)
        res.redirect("/")
    }
});


app.get("/work", function (req, res) {
    res.render('list', { foo: "Work", newitem: workItem });
})

app.get("/", function (req, res) {
    var FOO = date();

    res.render('list', { foo: FOO, newitem: items });
})

app.get("*", (req, res) => {
    res.status(404).render('404-page');
});

app.listen(3000, function () {
    console.log("Server is running on 3000");
})