# API
API for Current cases and more stuff about COVID-19 or the Novel Coronavirus Strain
https://corona.lmao.ninja/

# Endpoints
|  GET Request  | Output  |
| ------------ | ------------ |
|  https://corona.lmao.ninja/all | Returns all total cases, recovery, and deaths. |
|  https://corona.lmao.ninja/countries | Returns data of all countries that has COVID-19 |
|  https://corona.lmao.ninja/countries?sort={parameter} | Returns data of each country sorted by the parameter |
|  https://corona.lmao.ninja/countries/{country-name} | Returns data of a specific country |

# Tutorial
*Tutorial Made By Apollo#6000*
> Dependencies
> [node-fetch](https://www.npmjs.com/package/node-fetch)

**Step 1**:
Install [node=fetch](https://www.npmjs.com/package/node-fetch)
> npm i node-fetch

**Step 2**:
Call the API using node-fetch!
```js
// We Require node-fetch
let fetch = require('node-fetch');

// We then call the API using node-fetch
let data = fetch('https://corona.lmao.ninja/all');
console.log(data);

/* Returns 
{ cases: 220877,
  deaths: 8988,
  recovered: 85782,
  updated: 1584612112774 }
*/
```

**Step 3**:
Once we have called the API, we can access the data that was given!
```js
let fetch = require('node-fetch');
let data = fetch('https://corona.lmao.ninja/all');

console.log(`
Total Cases: ${data.cases}
Total Deaths: ${data.deaths}
Total Recovered: ${data.recovered}
Last Updated on: ${data.updated}`);
```
Since `data.updated` returns milliseconds, you can do `new Date(data.updated)` and it returns an ISO Date 

You can read more about **new Date** [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)

#### Enjoy your new COVID-19 TRACKER!

### Source: 
> https://www.worldometers.info/coronavirus/ 

[![Discord server](https://discordapp.com/api/guilds/689535536934813823/embed.png?style=banner4)](https://discord.gg/EvbMshU)
