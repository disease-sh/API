<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-4-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->
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
|  https://corona.lmao.ninja/countries/{country-name} | Returns data of a specific country. If an exact name match is desired pass ?strict=true in the query string |
|  https://corona.lmao.ninja/states | Returns all United States of America and their Corona data |
|  https://corona.lmao.ninja/jhucsse | Return data from the Johns Hopkins CSSE Data Repository (Provinces and such) |
| https://corona.lmao.ninja/historical | Get historical data from the start of 2020. (JHU CSSE GISand Data) |
| https://corona.lmao.ninja/historical/{country-name} | Get historical data from the start of 2020 for a specific country. (JHU CSSE GISand Data) |
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
Use either `.getAll()` or `.getCountry()` function to retrieve the given data.

```js
// We define the package
let covid = require('novelcovid');

// In this case we will be using .getAll()
// If you would like a .getCountry() tutorial, feel free to join our support server

let data = covid.getAll();
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
    let data = await covid.getAll();

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

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
        <td align="center"><a href="https://github.com/EliteDaMyth"><img src="https://avatars2.githubusercontent.com/u/28687771?v=4" width="100px;" alt=""/><br /><sub><b>EliteDaMyth</b></sub></a><br /><a href="https://github.com/NovelCOVID/API/commits?author=EliteDaMyth" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/ebwinters"><img src="https://avatars0.githubusercontent.com/u/4297028?v=4" width="100px;" alt=""/><br /><sub><b>Ethan Winters</b></sub></a><br /><a href="https://github.com/NovelCOVID/API/issues?q=author%3Aebwinters" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/dicedtomatoreal"><img src="https://avatars0.githubusercontent.com/u/35403473?v=4" width="100px;" alt=""/><br /><sub><b>dicedtomato</b></sub></a><br /><a href="https://github.com/NovelCOVID/API/commits?author=dicedtomatoreal" title="Code">💻</a></td>
    <td align="center"><a href="https://404discord.xyz/"><img src="https://avatars0.githubusercontent.com/u/41652412?v=4" width="100px;" alt=""/><br /><sub><b>apollyon600</b></sub></a><br /><a href="https://github.com/NovelCOVID/API/commits?author=apollyon600" title="Documentation">📖</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
