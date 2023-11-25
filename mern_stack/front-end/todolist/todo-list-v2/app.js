const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin-mikaela:BIVpMLc21Lp3lyUJ@cluster0.p6fma.mongodb.net/todolistDB?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });

//// ITEM SCHEMA////
const itemsSchema = {
  name: String
};

const Item = mongoose.model("Item", itemsSchema);

////DEFAULT ITEMS////
const item1 = new Item({
  name: "Type a new item below"
});

const item2 = new Item({
  name: "Click the + button to add the new item"
});

const item3 = new Item({
  name: "<--Click this to delete an item"
});

const defaultItems = [item1, item2, item3];

////CUSTOM LIST ITEM SCHEMA////
const listSchema = {
  name: String,
  items: [itemsSchema]
};

const List = mongoose.model("List", listSchema);

//////HOME ROUTE/////
app.get("/", async function (req, res) {
  try {
    const foundItems = await Item.find({});

    if (foundItems.length === 0) {
      await Item.insertMany(defaultItems);
      console.log("Successfully saved default items to DB");
      res.redirect("/");
    } else {
      res.render("list", { listTitle: "Today", newListItems: foundItems });
    }
  } catch (err) {
    console.error("Error:", err);
  }
});

/////ADD NEW ITEM/////
app.post("/", async function (req, res) {
  const itemName = req.body.newItem;
  const listName = req.body.list;

  const item = new Item({
    name: itemName
  });

  if (itemName !== "") {
    try {
      if (listName === "Today") {
        await item.save();
        res.redirect("/");
      } else {
        const foundList = await List.findOne({ name: listName });
        foundList.items.push(item);
        await foundList.save();
        res.redirect("/" + listName);
      }
    } catch (err) {
      console.error("Error:", err);
    }
  }
});

/////CUSTOM LIST//////
app.get("/:customListName", async function (req, res) {
  const customListName = _.capitalize(req.params.customListName);

  try {
    const foundList = await List.findOne({ name: customListName });
    if (!foundList) {
      const list = new List({
        name: customListName,
        items: defaultItems
      });
      await list.save();
      res.redirect("/" + customListName);
    } else {
      res.render("list", { listTitle: foundList.name, newListItems: foundList.items });
    }
  } catch (err) {
    console.error("Error:", err);
  }
});

////DELETE ITEM/////
app.post("/delete", async function (req, res) {
  const checkedItemId = req.body.checkbox;
  const listName = req.body.listName;

  try {
    if (listName === "Today") {
      await Item.findByIdAndRemove(checkedItemId);
      console.log("Successfully deleted item");
      res.redirect("/");
    } else {
      await List.findOneAndUpdate({ name: listName }, { $pull: { items: { _id: checkedItemId } } });
      res.redirect("/" + listName);
    }
  } catch (err) {
    console.error("Error:", err);
  }
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function () {
  console.log("Server has started successfully!");
});
