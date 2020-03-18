# COVID API
API for live information about COVID-19

GET https://coronavirus-19-api.herokuapp.com/all -> global info

GET https://coronavirus-19-api.herokuapp.com/countries -> all countries info

GET https://coronavirus-19-api.herokuapp.com/countries/{countryName} -> country specific information

**The api part is a fork from https://github.com/NovelCOVID/API + some fixes (due to CORS and outdated code was not working)

an ionic frontend is showing the info nicely at https://coronavirus-19-api.herokuapp.com/ 
![Global info](https://raw.githubusercontent.com/javieraviles/covidAPI/master/screenshots/tab1.png)
![Cases by country](https://raw.githubusercontent.com/javieraviles/covidAPI/master/screenshots/tab2.png)