var express = require("express");
var app = express();
var request = require("request");
var axios = require("axios");
var cheerio = require("cheerio");
var db = require("quick.db");
// The functions are minified cuz they look very messy and i dont want you to look at my shitty code
var getall=setInterval(async()=>{let e;try{200!==(e=await axios.get("https://www.worldometers.info/coronavirus/")).status&&console.log("ERROR")}catch(e){return null}const t={};cheerio.load(e.data)(".maincounter-number").filter((e,a)=>{let l=a.children[0].next.children[0].data||"0";l=parseInt(l.replace(/,/g,"")||"0",10),0===e?t.cases=l:1===e?t.deaths=l:t.recovered=l}),db.set("all",t),console.log("Updated The Cases",t)},6e5);
var getcountries=setInterval(async()=>{let e;try{200!==(e=await axios.get("https://www.worldometers.info/coronavirus/")).status&&console.log("Error",e.status)}catch(e){return null}const t=[],r=cheerio.load(e.data)("table#main_table_countries").children("tbody").children("tr").children("td");for(let e=0;e<r.length-8;e+=1){const a=r[e];if(e%8==0){let e=a.children[0].data||a.children[0].children[0].data||a.children[0].children[0].children[0].data||a.children[0].children[0].children[0].children[0].data||"";0===(e=e.trim()).length&&(e=a.children[0].next.children[0].data||""),t.push({country:e.trim()||""})}if(e%8==1){let e=a.children[0].data||"";t[t.length-1].cases=parseInt(e.trim().replace(/,/g,"")||"0",10)}if(e%8==2){let e=a.children[0].data||"";t[t.length-1].todayCases=parseInt(e.trim().replace(/,/g,"")||"0",10)}if(e%8==3){let e=a.children[0].data||"";t[t.length-1].deaths=parseInt(e.trim().replace(/,/g,"")||"0",10)}if(e%8==4){let e=a.children[0].data||"";t[t.length-1].todayDeaths=parseInt(e.trim().replace(/,/g,"")||"0",10)}if(e%8==5){let e=a.children[0].data||"";t[t.length-1].recovered=parseInt(e.trim().replace(/,/g,"")||"0",10)}if(e%8==6){let e=a.children[0].data||"";t[t.length-1].critical=parseInt(e.trim().replace(/,/g,"")||"0",10)}if(e%8==7){let e=a.children[0].data||a.children[0].children[0].data||a.children[0].children[0].children[0].data||"";t[t.length-1].region=e.trim()||""}}db.set("countries",t),console.log("Updated The Countries",t)},6e4);

app.get("/",async function(e,r){let a=await db.fetch("all");r.send(`${a.cases} cases are reported of the COVID-19 Novel Coronavirus strain<br> ${a.deaths} have died from it <br>\n${a.recovered} have recovered from it <br> Get the endpoint /all to get information for all cases <br> get the endpoint /countries for getting the data sorted country wise`)});

var listener=app.listen(process.env.PORT,function(){console.log("Your app is listening on port "+listener.address().port)});

app.get("/all/", async function(req, res) {
  let all = await db.fetch("all");
  res.send(all);
});

app.get("/countries/", async function(req, res) {
  let countries = await db.fetch("countries");
  res.send(countries);
});
