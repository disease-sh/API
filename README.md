<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-9-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->
<!-- Read The Docs Badge -->

[![Documentation Status](https://readthedocs.org/projects/novelcovid/badge/?version=latest)](https://novelcovid.readthedocs.io/en/latest/?badge=latest)

<!-- Read The Docs Badge End -->

# Join our Server!

[![Discord server](https://discordapp.com/api/guilds/689535536934813823/embed.png?style=banner4)](https://discord.gg/EvbMshU)

# Partners with PrimedHosting

Great and affordable prices! Starting at \$0.75. Get started [here](https://primedhosting.com/NovelCovid)
Join the [Discord server](https://primedhosting.com/discord)

# Resources

- [NovelCOVID on npm](https://www.npmjs.com/package/covidtracker#methods)
- [Documentation][https://www.novelcovid.io]

# Endpoints

## Endpoints v2

| **GET Request**                                        | **Output**                                                                                                |
| ------------------------------------------------------ | --------------------------------------------------------------------------------------------------------- |
| https://corona.lmao.ninja/v2/historical                | Gets historical data from the start of 2020. (JHU CSSE GISand Data)                                       |
| https://corona.lmao.ninja/v2/historical/{country-name} | Gets historical data from the start of 2020 for a specific country. (JHU CSSE GISand Data)                |
| https://corona.lmao.ninja/v2/jhucsse                   | Returns data from the Johns Hopkins CSSE Data Repository (Country, province, confirmed, death, recovered) |

## Endpoints v1

| **GET Request**                                      | **Output**                                                                                                           |
| ---------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| https://corona.lmao.ninja/all                        | Returns total data (`deaths`, `cases`, `recovered`)                                                                  |
| https://corona.lmao.ninja/countries                  | Returns data of all countries that have COVID-19 (`deaths`, `cases`, `recovered`)                                    |
| https://corona.lmao.ninja/countries?sort={parameter} | Returns data of each country sorted by the parameter (`deaths`, `cases`, `recovered`)                                |
| https://corona.lmao.ninja/countries/{country-name}   | Returns data of a specific country. If an exact name match is desired pass ?strict=true in the query string          |
| https://corona.lmao.ninja/states                     | Returns all United States of America and their Corona data (`deaths`, `cases`, `recovered`)                          |
| https://corona.lmao.ninja/jhucsse                    | **DEPRECATED USE V2 ENDPOINT** Return data from the Johns Hopkins CSSE Data Repository (Provinces and such)              |
| https://corona.lmao.ninja/historical                 | **DEPRECATED USE V2 ENDPOINT** Get historical data from the start of 2020. (JHU CSSE GISand Data)                        |
| https://corona.lmao.ninja/historical/{country-name}  | **DEPRECATED USE V2 ENDPOINT** Get historical data from the start of 2020 for a specific country. (JHU CSSE GISand Data) |

**Note**
Since `data.updated` returns milliseconds, you can do `new Date(data.updated)` to create an **ISO Date**

You can read more about **new Date()** [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)

> For further support, you can join our discord server! More Tutorials can be found there too!
> https://discord.gg/EvbMshU

### Sources:

> https://www.worldometers.info/coronavirus/ > https://github.com/CSSEGISandData/COVID-19/tree/master/csse_covid_19_data/csse_covid_19_time_series

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
    <td align="center"><a href="https://jshelley.uk"><img src="https://avatars0.githubusercontent.com/u/22616014?v=4" width="100px;" alt=""/><br /><sub><b>James Shelley</b></sub></a><br /><a href="https://github.com/NovelCOVID/API/pulls?q=is%3Apr+reviewed-by%3AJamesShelley" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="http://RyanHarlow.com"><img src="https://avatars2.githubusercontent.com/u/42226213?v=4" width="100px;" alt=""/><br /><sub><b>Ryan Harlow</b></sub></a><br /><a href="https://github.com/NovelCOVID/API/issues?q=author%3ARyanHarlow" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/alitas"><img src="https://avatars1.githubusercontent.com/u/1144691?v=4" width="100px;" alt=""/><br /><sub><b>Ali Tas</b></sub></a><br /><a href="https://github.com/NovelCOVID/API/issues?q=author%3Aalitas" title="Bug reports">🐛</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/buster95"><img src="https://avatars0.githubusercontent.com/u/15637669?v=4" width="100px;" alt=""/><br /><sub><b>Walter Corrales</b></sub></a><br /><a href="https://github.com/NovelCOVID/API/commits?author=buster95" title="Code">💻</a></td>
    <td align="center"><a href="https://AhmadAwais.com"><img src="https://avatars1.githubusercontent.com/u/960133?v=4" width="100px;" alt=""/><br /><sub><b>Ahmad Awais ⚡️</b></sub></a><br /><a href="https://github.com/NovelCOVID/API/commits?author=ahmadawais" title="Documentation">📖</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
