//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const mongoose = require("mongoose");
const _ = require("lodash");

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
mongoose.connect("mongodb://127.0.0.1:27017/todolistDB");

const itemsSchema = {
  name : String
};
const listSchema = {
  name : String ,
  list : [itemsSchema]
};

const Item = mongoose.model("item" , itemsSchema);
const List = mongoose.model("List" , listSchema);

const milk = new Item({
  name : "Milk"
});

const bread = new Item({
  name : "Bread"
});

const egg = new Item({
  name : "Egg"
});

var defaultArr = [milk , bread , egg] ;

app.get("/", function(req, res) {

  Item.find().then(function(itemsFound){

    if(itemsFound.length === 0){

      Item.insertMany(defaultArr)
      .then(function(){

        console.log("Inserted Succesfully");

      })
      .catch(function(err){

        console.log(err);

      });
      res.redirect("/");
    }
    else{
      res.render("list", {listTitle: day, listType : "Home Route" , newListItems: itemsFound});
    }
  })
  .catch(function(err){
    console.log(err);
  });

});

const day = date.getDate();

app.post("/", function(req, res){

  const itemName = req.body.newItem;
  const listName = req.body.list;

  const item = new Item({
    name : itemName 
  });

  if(listName === 'Home'){
    item.save();
  
    res.redirect("/");
  }
  else{
    List.findOne({name : listName}).then(function(foundList){

      foundList.list.push(item);

      foundList.save();

      res.redirect("/" + listName) ;
    })
    .catch(function(err){
      console.log(err);
    })
  }

});

app.post("/delete" , function(req , res){
  const deleteItemid = req.body.checkbox;
  const listName = req.body.listName ;

  if(listName === 'Home'){
    Item.findByIdAndRemove(deleteItemid).then(function(){
  
      res.redirect("/");
  
    })
  
    .catch(function(err){
  
      console.log(err);
  
    })
  }
  else{
    List.findOneAndUpdate({name : listName} , {$pull : {list : {_id : deleteItemid }}}).then(function(){

      res.redirect("/" + listName);

    })
    .catch(function(err){

      console.log(err);

    })
  }

})

app.get("/:id", function(req,res){
  const dynamicName = _.capitalize(req.params.id);

  List.findOne({name : dynamicName}).then(function(foundItem){

    if(foundItem){
      //show the already existing list
      res.render("list", {listTitle: day, listType : dynamicName , newListItems: foundItem.list});
    }
    else{
      //create new list as it doesn't already exists
      const newList = List({
        name : dynamicName ,
        list : defaultArr 
      });
    
      newList.save() ;

      res.redirect("/" + dynamicName);
    }
    
  })
  .catch(function(err){
    console.log(err);
  })
  

});

app.get("/about", function(req, res){
  res.render("about");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT , function() {
  console.log("Server started on port 3000");
});
