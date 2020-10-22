![Logo](./public/assets/img/icon-long.png)
<br><br>

![DockerHub Downloads](https://img.shields.io/docker/pulls/novelcovid/novelcovid-api?style=for-the-badge)
![GitHub contributors](https://img.shields.io/github/contributors-anon/disease-sh/api?style=for-the-badge)
![ESLint](https://img.shields.io/github/workflow/status/disease-sh/API/Eslint?label=ESLint&style=for-the-badge)
![Tests](https://img.shields.io/github/workflow/status/disease-sh/API/Unittest?label=Tests&style=for-the-badge)
![GitHub top language](https://img.shields.io/github/languages/top/disease-sh/api?style=for-the-badge)
![GitHub issues](https://img.shields.io/github/issues/disease-sh/api?style=for-the-badge)
![GitHub closed issues](https://img.shields.io/github/issues-closed/disease-sh/api?style=for-the-badge)
![GitHub pull requests](https://img.shields.io/github/issues-pr/disease-sh/api?style=for-the-badge)
![GitHub closed pull requests](https://img.shields.io/github/issues-pr-closed/disease-sh/api?style=for-the-badge)
![Visits](https://badges.pufler.dev/visits/disease-sh/api?style=for-the-badge)

# Welcome to disease.sh - An open API for disease-related statistics

| Information | Discord | Donate |
|:------------|:---------|:-------|
| This API provides a big range of detailed information about multiple viruses. From COVID19 global data overviews to city/region specific mobility data, and data on the current outbreak of Influenza. We also provide official government data for some countries, more to be added soon.<br><br>The core-team currently consists of 4 people from 4 different countries working hard to keep this up and running, but it's an open-source project, so if you want, come help us!| [![Discord server](https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimg.icons8.com%2Fcolor%2F2x%2Fdiscord-logo.png&f=1&nofb=1)](https://discord.gg/cEDxzfW) | [![BuyMeACoffee](https://www.buymeacoffee.com/assets/img/guidelines/logo-mark-1.svg)](https://www.buymeacoffee.com/covidapi/shop) |

**Check out** our homepage and **sign up** for our newsletter [here](https://disease.sh/)

## Recommended by Postman
Disease.sh is recommended by Postman [here](https://covid-19-apis.postman.com/)

[![Run in Postman](https://run-beta.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/11144369-e27366d6-7699-46f4-b58e-2b2b2e637be5-Szf6Z9B3)

## Documentation
Disease.sh Documentation can be found [here](https://disease.sh/docs/)

# Installation

## Without Docker

### Redis
1. Download redis from https://redis.io/topics/quickstart
2. Start redis server using `redis-server`

### Project
1. Fork and clone the git repository
2. In the new folder you will find a `example.env` file, duplicate it and rename it to `.env` only.
3. in the new `.env` file, change `REDIS_HOST` to localhost
4. Change the env variables to fit your environment (leave them blank for default values)
6. In one window run `redis-server`
7. Run `npm ci` to install the packages
8. In another window run `npm run start:dev`
9. Open your browser and navigate to `localhost:{PORT}` (PORT being the port specified in your `.env` file)
10. You should now see the APIs landing page

## With docker-compose
1. Fork and clone the git repository
2. In the new folder you will find a `example.env` file, duplicate it and rename it to `.env` only.
3. Change the env variables to fit your environment (leave them blank for default values)
4. Run `npm run docker-start-dev` to run the local version of the API with Docker
5. Run `npm run docker-start` to run the published version of the API with Docker

# Recommended Javascript Wrapper
<dir align ="center">
<a href="https://www.npmjs.com/package/novelcovid">
    <img src="https://img.shields.io/npm/v/novelcovid?logo=npm&style=for-the-badge" alt="Version">
</a>
<a href="https://www.npmjs.com/package/novelcovid">
	<img src="https://img.shields.io/bundlephobia/min/novelcovid?color=red&label=SIZE&logo=npm&style=for-the-badge", alt="Size">
</a>
<a href="https://www.npmjs.com/package/novelcovid">
<img src="https://img.shields.io/npm/dw/novelcovid?logo=npm&style=for-the-badge", alt="Downloads">
</a>
</dir>

- [Github](https://github.com/disease-sh/node-api)
- [NPM](https://npmjs.com/novelcovid)

> For further support, you can join our discord server! More Tutorials can be found there too!
> https://discord.gg/cEDxzfW

# Showcases (Awesome-NovelCOVID)

Did you build a project with our API? We now offer an "awesome-list" for you to add your projects into so people can find out about them!

#### You can find it <a href="https://github.com/disease-sh/awesome-novelcovid">here</a>.

# Sources:
> https://www.worldometers.info/coronavirus/

> https://github.com/CSSEGISandData/COVID-19/tree/master/csse_covid_19_data/csse_covid_19_time_series

> https://github.com/nytimes/covid-19-data

> https://github.com/ActiveConclusion/COVID19_mobility

> https://www.canada.ca/en/public-health/services/diseases/2019-novel-coronavirus-infection.html

> https://github.com/pcm-dpc/COVID-19

> https://www.rki.de/DE/Content/InfAZ/N/Neuartiges_Coronavirus/Situationsberichte/Gesamt.html

> https://info.gesundheitsministerium.at/

> https://www.mohfw.gov.in/

> https://covid19.ncdc.gov.ng/

> https://github.com/openZH/covid_19/

> https://coronavirus.data.gov.uk

> https://covid19.go.id

# Contributing
- [How to Contribute](./CONTRIBUTING.md)

# Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/EliteDaMyth"><img src="https://avatars2.githubusercontent.com/u/28687771?v=4" width="100px;" alt=""/><br /><sub><b>EliteDaMyth</b></sub></a><br /><a href="https://github.com/disease-sh/API/commits?author=EliteDaMyth" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/ebwinters"><img src="https://avatars0.githubusercontent.com/u/4297028?v=4" width="100px;" alt=""/><br /><sub><b>Ethan Winters</b></sub></a><br /><a href="https://github.com/disease-sh/API/issues?q=author%3Aebwinters" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/himanshu2406"><img src="https://avatars2.githubusercontent.com/u/37951606?v=4" width="100px;" alt=""/><br /><sub><b>Himanshu Rathore</b></sub></a><br /><a href="https://github.com/disease-sh/API/commits?author=himanshu2406" title="Code">💻</a></td>
    <td align="center"><a href="https://404discord.xyz/"><img src="https://avatars0.githubusercontent.com/u/41652412?v=4" width="100px;" alt=""/><br /><sub><b>apollyon600</b></sub></a><br /><a href="https://github.com/disease-sh/API/commits?author=apollyon600" title="Documentation">📖</a></td>
    <td align="center"><a href="https://jshelley.uk"><img src="https://avatars0.githubusercontent.com/u/22616014?v=4" width="100px;" alt=""/><br /><sub><b>James Shelley</b></sub></a><br /><a href="https://github.com/disease-sh/API/pulls?q=is%3Apr+reviewed-by%3AJamesShelley" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="http://RyanHarlow.com"><img src="https://avatars2.githubusercontent.com/u/42226213?v=4" width="100px;" alt=""/><br /><sub><b>Ryan Harlow</b></sub></a><br /><a href="https://github.com/disease-sh/API/issues?q=author%3ARyanHarlow" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/alitas"><img src="https://avatars1.githubusercontent.com/u/1144691?v=4" width="100px;" alt=""/><br /><sub><b>Ali Tas</b></sub></a><br /><a href="https://github.com/disease-sh/API/issues?q=author%3Aalitas" title="Bug reports">🐛</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/buster95"><img src="https://avatars0.githubusercontent.com/u/15637669?v=4" width="100px;" alt=""/><br /><sub><b>Walter Corrales</b></sub></a><br /><a href="https://github.com/disease-sh/API/commits?author=buster95" title="Code">💻</a></td>
    <td align="center"><a href="https://AhmadAwais.com"><img src="https://avatars1.githubusercontent.com/u/960133?v=4" width="100px;" alt=""/><br /><sub><b>Ahmad Awais ⚡️</b></sub></a><br /><a href="https://github.com/disease-sh/API/commits?author=ahmadawais" title="Documentation">📖</a></td>
    <td align="center"><a href="https://discord.gg/rk7cVyk"><img src="https://avatars1.githubusercontent.com/u/39545629?v=4" width="100px;" alt=""/><br /><sub><b>MrAugu</b></sub></a><br /><a href="https://github.com/disease-sh/API/issues?q=author%3AMrAugu" title="Bug reports">🐛</a></td>
    <td align="center"><a href="http://chroventer.github.io"><img src="https://avatars2.githubusercontent.com/u/34645569?v=4" width="100px;" alt=""/><br /><sub><b>Ayyan Lewis</b></sub></a><br /><a href="https://github.com/disease-sh/API/issues?q=author%3Achroventer" title="Bug reports">🐛</a></td>
    <td align="center"><a href="http://bensommer.co.uk"><img src="https://avatars0.githubusercontent.com/u/39101651?v=4" width="100px;" alt=""/><br /><sub><b>Ben Sommer</b></sub></a><br /><a href="https://github.com/disease-sh/API/issues?q=author%3Abenjamin-sommer" title="Bug reports">🐛</a> <a href="https://github.com/disease-sh/API/commits?author=benjamin-sommer" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/nibble-4bits"><img src="https://avatars1.githubusercontent.com/u/38052706?v=4" width="100px;" alt=""/><br /><sub><b>Luis De Anda</b></sub></a><br /><a href="https://github.com/disease-sh/API/commits?author=nibble-4bits" title="Documentation">📖</a></td>
    <td align="center"><a href="https://coviddetail.com"><img src="https://avatars0.githubusercontent.com/u/17516174?v=4" width="100px;" alt=""/><br /><sub><b>puf17640</b></sub></a><br /><a href="https://github.com/disease-sh/API/commits?author=puf17640" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="http://olukadeno@gmail.com"><img src="https://avatars1.githubusercontent.com/u/37341054?v=4" width="100px;" alt=""/><br /><sub><b>Oluka Denis</b></sub></a><br /><a href="https://github.com/disease-sh/API/issues?q=author%3AOlukaDenis" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://lioncoding.com"><img src="https://avatars0.githubusercontent.com/u/26142591?v=4" width="100px;" alt=""/><br /><sub><b>Kodjo Laurent Egbakou</b></sub></a><br /><a href="https://github.com/disease-sh/API/commits?author=egbakou" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/jsebastianms1"><img src="https://avatars3.githubusercontent.com/u/22509688?v=4" width="100px;" alt=""/><br /><sub><b>Juan Sebastián Marulanda Sánchez</b></sub></a><br /><a href="https://github.com/disease-sh/API/commits?author=jsebastianms1" title="Code">💻</a></td>
    <td align="center"><a href="https://www.linkedin.com/in/collin-street/"><img src="https://avatars3.githubusercontent.com/u/30121540?v=4" width="100px;" alt=""/><br /><sub><b>Collin-St</b></sub></a><br /><a href="https://github.com/disease-sh/API/commits?author=Collin-St" title="Code">💻</a></td>
    <td align="center"><a href="http://marveldc.me"><img src="https://avatars2.githubusercontent.com/u/24299563?v=4" width="100px;" alt=""/><br /><sub><b>MarvelDC</b></sub></a><br /><a href="https://github.com/disease-sh/API/commits?author=MarvelDC" title="Documentation">📖</a></td>
    <td align="center"><a href="https://zentreax.dev/"><img src="https://avatars3.githubusercontent.com/u/36458019?v=4" width="100px;" alt=""/><br /><sub><b>Zentreaxᴰᵉᵛ</b></sub></a><br /><a href="https://github.com/disease-sh/API/commits?author=Zentreax" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

# License
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FNovelCOVID%2FAPI.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2FNovelCOVID%2FAPI?ref=badge_large)
