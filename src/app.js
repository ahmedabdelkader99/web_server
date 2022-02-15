const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forcaste = require("./utils/forcaste");

const port = 3000;

// حته انه ياخد اوامر من الموقع مش من الكوماند بتتم علي مرحلتين
//+ حته ربط البروجيكت ب ملف html
const app = express();

//عشان تربط الصفحه  الحالية ب اي ملف  انت  عاوزه
const publicPathDirectory = path.join(__dirname, "../public");
const newViewsPath = path.join(__dirname, "../templets/views");
const partialpath = path.join(__dirname, "../templets/partial");
//بعد كدا لازم تعمله set
//defualt
app.set("view engine", "hbs");
app.set("views", newViewsPath);
//partial وبتستخدمها عشان تتحكم في الهيدر
hbs.registerPartials(partialpath);
//defualt
app.use(express.static(publicPathDirectory));

//   عشان يبقي دينامك حته الربط ب hbs
//اول صفحه
app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather App ",
    name: "ahmed abdelkader",
  });
});
// صفحه ال about
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Ahmed Abdelkader",
  });
});
//help صفحه

app.get("/help", (req, res) => {
  // render takes the name of page
  res.render("help", {
    helpText: "Help Page",
    title: "Help",
    name: "Ahmed abdelkader",
  });
});
//

// sending query  to url
//اهم واحده لان دي هي api

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You Must Enter Country Name",
    });
  }
  //taking first arg (address)
  geocode(req.query.address, (error, { lat, long, location } = {}) => {
    if (error) {
      return res.send({
        error: error,
      });
    }

    forcaste(lat, long, (error, forcastData) => {
      if (error) {
        return res.send({
          error: error,
        });
      }

      res.send({
       Temperature : forcastData,
        location: location,
        address: req.query.address,
      });
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Erorr 404 ",
    name: "Ahmed abdelkader",
    errorMessage: "Help Atricle Not Found",
  });
});

//making error 404 لما بتستخدم نجمه معناها اي راوت مش موجوده هنا
app.get("*", (req, res) => {
  res.render("404", {
    title: "Erorr 404 ",
    name: "Ahmed abdelkader",
    errorMessage: "Page Not Found",
  });
});

// listen
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
