![GitHub contributors](https://img.shields.io/github/contributors-anon/novelcovid/api?style=for-the-badge)
![ESLint](https://img.shields.io/github/workflow/status/NovelCOVID/API/Eslint?label=ESLint&style=for-the-badge)
![Tests](https://img.shields.io/github/workflow/status/NovelCOVID/API/Unittest?label=Tests&style=for-the-badge)
![GitHub top language](https://img.shields.io/github/languages/top/novelcovid/api?style=for-the-badge)
![GitHub issues](https://img.shields.io/github/issues/novelcovid/api?style=for-the-badge)
![GitHub closed issues](https://img.shields.io/github/issues-closed/novelcovid/api?style=for-the-badge)
![GitHub pull requests](https://img.shields.io/github/issues-pr/novelcovid/api?style=for-the-badge)
![GitHub closed pull requests](https://img.shields.io/github/issues-pr-closed/novelcovid/api?style=for-the-badge)
![Discord](https://img.shields.io/discord/689535536934813823?style=for-the-badge)
# Join our Server!
[![Discord server](https://discordapp.com/api/guilds/689535536934813823/embed.png?style=banner4)](https://discord.gg/EvbMshU)

# API
API for Current cases and more stuff about COVID-19 or the Novel Coronavirus Strain
https://corona.lmao.ninja/

# Recommended by Postman
NovelCovid API is recommended by Postman [here](https://covid-19-apis.postman.com/)

# Documentation
NovelCovid/API Documentation can be found [here](https://corona.lmao.ninja/docs/)

## Installation

#### Redis
1. Download redis from https://redis.io/topics/quickstart
2. Start redis server using `redis-server`

#### Project
1. Fork and clone git repository
2. In root project folder, create a new file called `config.json`
3. Copy contents for `config.example.json` to new `config.json` file
4. Replace password field with `""` and port field to whatever localhost port you want.
5. From root of project, run `npm start`
6. In your browser, go to `localhost:{port}` to test your local changes

## Run with docker-compose.
1. Fork and clone git repository
2. In root project folder, make a new file called `config.json`
3. Copy contents for `config.example.json` to new `config.json` file
4. Replace password field with `"yourpassword"` and port field same within `docker-compose.yml`.
5. Replace redis host "localhost" with "redis".
6. Run command `docker-compose up --build -d`.

## Running in a Kubernetes cluster

The repository contains a very basic setup of the api and redis deployment. HA setups are not considered in the following example.

1. Fork and clone git repository
2. Install kind for a local cluster using `GO111MODULE="on" go get sigs.k8s.io/kind@v0.7.0` (requires go to be installed)
3. Create a cluster using `kind create cluster --config=./kubernetes/config.yaml`. You can modify the cluster according your needs. Make sure the cluster is runing with `kubectl cluster-info`.
4. Create the configfile `config.json` for your app and enter the proper values. Keep track of the services name in [kubernetes/novelcovid-api.yaml](kubernetes/novelcovid-api.yaml) as this is the redis endpoint for the app to connect to. Take a look at the sample `config.k8s.json`.
5. Build the docker image with: `docker build -t novelcovid/api:$(git rev-parse --short HEAD) .`
6. Load the image into the kind cluster with `kind load docker-image novelcovid/api:<TAG>`
7. Apply the redis installation with: `kubectl apply -f kubernetes/redis.yaml`
8. Apply the api with: `kubectl apply -f kubernetes/novelcovid-api.yaml`
9. Forward your ports with: `kubectl port-forward -n novelcovid-api service/api-service 3000:3000`
10. Visit [http://localhost:3000/all](http://localhost:3000/all) in your browser.


## NPM Package
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

We suggest you load the module via `require`, considering ES modules in Node.js are not yet stable.

Executing a method will return a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).
The examples here utilise [async/await](https://javascript.info/async-await) to access the data.

JavaScript:

```js
const { NovelCovid } = require('novelcovid');
```

TypeScript:
```ts
import { NovelCovid } from 'novelcovid';
```
### Methods
 Everything is listed on the [npm](https://www.npmjs.com/package/novelcovid) site.

## **Note**
Since `data.updated` returns milliseconds, you can do `new Date(data.updated)` as it returns an **ISO Date**

You can read more about **new Date()** [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)

> For further support, you can join our discord server! More Tutorials can be found there too!
> https://discord.gg/EvbMshU

### Sources:
> https://www.worldometers.info/coronavirus/

> https://github.com/CSSEGISandData/COVID-19/tree/master/csse_covid_19_data/csse_covid_19_time_series

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
    <td align="center"><a href="https://discord.gg/rk7cVyk"><img src="https://avatars1.githubusercontent.com/u/39545629?v=4" width="100px;" alt=""/><br /><sub><b>MrAugu</b></sub></a><br /><a href="https://github.com/NovelCOVID/API/issues?q=author%3AMrAugu" title="Bug reports">🐛</a></td>
    <td align="center"><a href="http://chroventer.github.io"><img src="https://avatars2.githubusercontent.com/u/34645569?v=4" width="100px;" alt=""/><br /><sub><b>Ayyan Lewis</b></sub></a><br /><a href="https://github.com/NovelCOVID/API/issues?q=author%3Achroventer" title="Bug reports">🐛</a></td>
    <td align="center"><a href="http://bensommer.co.uk"><img src="https://avatars0.githubusercontent.com/u/39101651?v=4" width="100px;" alt=""/><br /><sub><b>Ben Sommer</b></sub></a><br /><a href="https://github.com/NovelCOVID/API/issues?q=author%3Abenjamin-sommer" title="Bug reports">🐛</a> <a href="https://github.com/NovelCOVID/API/commits?author=benjamin-sommer" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/nibble-4bits"><img src="https://avatars1.githubusercontent.com/u/38052706?v=4" width="100px;" alt=""/><br /><sub><b>Luis De Anda</b></sub></a><br /><a href="https://github.com/NovelCOVID/API/commits?author=nibble-4bits" title="Documentation">📖</a></td>
    <td align="center"><a href="https://coviddetail.com"><img src="https://avatars0.githubusercontent.com/u/17516174?v=4" width="100px;" alt=""/><br /><sub><b>puf17640</b></sub></a><br /><a href="https://github.com/NovelCOVID/API/commits?author=puf17640" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

# Donating
<a href="https://www.buymeacoffee.com/covidapi/shop" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-black.png" alt="Buy Me A Coffee" style="height: 51px !important;width: 217px !important;"></a>

# License
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FNovelCOVID%2FAPI.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2FNovelCOVID%2FAPI?ref=badge_large)
