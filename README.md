# Join our Server!
[![Discord server](https://discordapp.com/api/guilds/689535536934813823/embed.png?style=banner4)](https://discord.gg/EvbMshU)

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
|  https://corona.lmao.ninja/states | Returns all United States of America and their Corona data |
|  https://corona.lmao.ninja/jhucsse | Return data from the John Hopkins CSSE Data Repository (Provinces and such) |

# API Tutorial
*Tutorial Made By [Apollo#6000](https://discord.gg/EvbMshU)*
> Packages Needed
> [novelcovid](https://www.npmjs.com/package/novelcovid)

**Step 1**:
Install [novelcovid](https://www.npmjs.com/package/novelcovid)
```
npm i novelcovid
```

**Step 2**:
Use either `.all()` or `.countries()` function to retrieve the given data.

```js
// We define the package
let covid = require('novelcovid');

// In this case we will be using .all()
// If you would like a .countries() tutorial, feel free to join our support server

let data = covid.all();
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
let covid = require('novelcovid');

// IMPORTANT: Inorder to access the data, we will need to create an async function.

(async () => {
    let data = await covid.all();

    // Since we are using an async function, we need to return the data.
    return console.log(`
    Total Cases: ${data.cases}
    Total Deaths: ${data.deaths}
    Total Recovered: ${data.recovered}
    Last Updated on: ${data.updated}`);
})();
```

**Note**
Since `data.updated` returns milliseconds, you can do `new Date(data.updated)` as it returns an **ISO Date**

You can read more about **new Date()** [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)

> For further support, you can join our discord server! More Tutorials can be found there too!
> https://discord.gg/EvbMshU

### Source: 
> https://www.worldometers.info/coronavirus/ 
