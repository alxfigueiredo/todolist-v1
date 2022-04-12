const express = require('express')
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));

var items = [];
var workItems = [];
app.get("/", function(req, res) {

  let day = date.getDate();
  res.render("list", {
    listTitle: day,
    newListItems : items
  });

});

app.get("/work", function(req, res)
{
  res.render("list", {listTitle: "Work List", newListItems: workItems});
})

app.post("/", function(req, res)
{
  var item = req.body.newItem1;
  console.log(req.body.list);
  if(req.body.list === "Work")
  {
    workItems.push(item);
    res.redirect("/work");
    console.log("work")
  }
  else
  {
    items.push(item);
    res.redirect("/");
    console.log("else")
  }
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
