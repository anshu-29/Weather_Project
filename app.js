const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
    const query = req.body.cityName;
    const apiKey = "ca7c312b1af4511855cc6c0fb1bd8e8e";
    const units = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + units;

    https.get(url,function (response) {
            console.log(response.statusCode);
            response.on("data",function (data) {

                const weatherData = JSON.parse(data);
                console.log(weatherData);

                const temp = weatherData.main.temp
                console.log(temp);

                const desc = weatherData.weather[0].description
                console.log(desc);

                const icon = weatherData.weather[0].icon;
                const imageURL = "https://openweathermap.org/img/wn/" + icon +"@2x.png";




// const object = {
//     name: "Aakansh",
//     Age: "24",
//
// }
//     console.log(JSON.stringify(object));

                res.write("<h1> The temperature in" +" " +query+ "is"+ " " + temp +  " " + "Degree Celcius</h1>");
                res.write("<p> The weather is"+ " " + desc + " " +  "</p>")
                res.write("<img src=" +imageURL+">");
                res.send();
            })

        });


});




app.listen(port,function () {
    console.log("Server is running on port 3000")

})