import JsonViewer from './jsonViewer.js';

const requestCache = {};

async function apiFetch(url) {
	document.getElementById('requestUrl').innerText = url;
	document.getElementById('requestUrl').href = url;

	let json;

	if (requestCache[url]) {
		json = requestCache[url];
	} else {
		const response = await fetch(url);
		json = await response.json();
		requestCache[url] = json;
	}

	document.getElementById('response').innerHTML = '';
	// eslint-disable-next-line no-new
	new JsonViewer({
		container: document.getElementById('response'),
		data: JSON.stringify(json, null, 2),
		theme: 'light',
		expand: true
	});

	return json;
}

async function createLineChart(dataset) {
	await loadGoogleCharts();
	const data = new google.visualization.DataTable();

	data.addColumn('datetime', 'Date');
	data.addColumn('number', 'New Cases');
	data.addColumn('number', 'Deaths');

	Object.keys(dataset.cases)
		.filter((_, index) => index % 3 === 0)
		.forEach((date) => {
			data.addRows([
				[
					new Date(date),
					dataset.cases[date],
					dataset.deaths[date]
				]
			]);
		});

	const options = {
		curveType: 'function',
		legend: { position: 'bottom' },
		height: document.body.clientWidth < 768 ? 150 : 400
	};

	const chart = new google.charts.Line(document.getElementById('chart'));

	chart.draw(data, options);
}

async function createBarChart(dataset, name) {
	await loadGoogleCharts();
	const data = new google.visualization.DataTable();

	data.addColumn('string', 'Type');
	data.addColumn('number', name);

	function addKey(key, title) {
		data.addRows([[title, dataset[key]]]);
	}

	addKey('cases', 'Cases');
	addKey('deaths', 'Deaths');
	addKey('recovered', 'Recovered');

	const options = {
		height: document.body.clientWidth < 768 ? 150 : 400,
		pieHole: 0.4
	};

	const chart = new google.visualization.PieChart(
		document.getElementById('chart')
	);

	chart.draw(data, options);
}

async function createGeoChart(dataset) {
	await loadGoogleCharts();
	const data = new google.visualization.DataTable();

	data.addColumn('string', 'Country');
	data.addColumn('number', 'Vaccines rolled out');

	data.addRows(
		dataset.map((row) => [
			row.country
				.replace('USA', 'United States')
				.replace('UK', 'United Kingdom'),
			Object.values(row.timeline)[0]
		])
	);

	const chart = new google.visualization.GeoChart(
		document.getElementById('chart')
	);

	chart.draw(data);
}

function focusTab(name) {
	const tabs = document.getElementsByClassName('tabs')[0].children[0].children;
	for (let i = 0; i < tabs.length; i++) {
		tabs[i].classList.remove('is-active');
	}
	document.getElementById(name).parentElement.classList.add('is-active');
}

async function exampleHistory() {
	focusTab('exampleHistory');
	apiFetch('https://disease.sh/v3/covid-19/historical/all?lastdays=all');
	createLineChart(
		await apiFetch('https://disease.sh/v3/covid-19/historical/all?lastdays=all')
	);
}

async function exampleWorldwide() {
	focusTab('exampleWorldwide');
	createBarChart(
		await apiFetch('https://disease.sh/v3/covid-19/all'),
		'Worldwide'
	);
}

async function exampleUsa() {
	focusTab('exampleUsa');
	createBarChart(
		await apiFetch('https://disease.sh/v3/covid-19/countries/usa'),
		'USA'
	);
}

async function exampleVaccines() {
	focusTab('exampleVaccines');
	createGeoChart(
		await apiFetch(
			'https://disease.sh/v3/covid-19/vaccine/coverage/countries?lastdays=1'
		)
	);
}

document.getElementById('exampleHistory').onclick = exampleHistory;
document.getElementById('exampleWorldwide').onclick = exampleWorldwide;
document.getElementById('exampleUsa').onclick = exampleUsa;
document.getElementById('exampleVaccines').onclick = exampleVaccines;
exampleHistory();

const googleChartsLoaded = false;
function loadGoogleCharts() {
	return new Promise((resolve) => {
		if (googleChartsLoaded) {
			resolve();
		} else {
			google.charts.load('current', {
				packages: ['line', 'corechart', 'geochart'],
				mapsApiKey: 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
			});
			google.charts.setOnLoadCallback(resolve);
		}
	});
}

document.addEventListener('DOMContentLoaded', () => {
	// Get all "navbar-burger" elements
	const $navbarBurgers = Array.prototype.slice.call(
		document.querySelectorAll('.navbar-burger'),
		0
	);

	// Check if there are any navbar burgers
	if ($navbarBurgers.length > 0) {
		// Add a click event on each of them
		$navbarBurgers.forEach((el) => {
			el.addEventListener('click', () => {
				// Get the target from the "data-target" attribute
				const { target } = el.dataset;
				const $target = document.getElementById(target);

				// Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
				el.classList.toggle('is-active');
				$target.classList.toggle('is-active');
			});
		});
	}
});

function checkScroll() {
	if (window.scrollY > 0) {
		document.getElementsByClassName('navbar')[0].classList.add('scrolled');
	} else {
		document.getElementsByClassName('navbar')[0].classList.remove('scrolled');
	}
}

document.addEventListener('scroll', checkScroll);
checkScroll();

if (!localStorage.getItem('hideNewsletter')) {
	document.getElementById('newsletter').classList.remove('is-hidden');
}

document.getElementById('newsletterClose').addEventListener('click', () => {
	document.getElementById('newsletter').classList.add('is-hidden');
	localStorage.setItem('hideNewsletter', true);
});

const captchaToken = document
	.querySelector('meta[name="captcha-token"]')
	.getAttribute('content');
const csrfToken = document
	.querySelector('meta[name="csrf-token"]')
	.getAttribute('content');

document
	.getElementById('newsletterForm')
	.addEventListener('submit', async (event) => {
		event.preventDefault();
		document.getElementById('newsletterFormBtn').classList.add('is-loading');
		document.getElementById('newsletter').classList.remove('is-danger');
		const script = document.createElement('script');
		script.src = `https://www.google.com/recaptcha/api.js?render=${captchaToken}`;
		script.addEventListener('load', () => {
			grecaptcha.ready(() => {
				grecaptcha
					.execute(captchaToken, {
						action: 'submit'
					})
					.then(async (token) => {
						const email = document.getElementById('email').value;
						if (token && token.length > 0) {
							const params = {
								recaptcha: token
							};
							const init = {
								// includes cookies in the request
								credentials: 'same-origin',
								headers: {
									// is the csrf token as a header
									'CSRF-Token': csrfToken,
									'Content-Type': 'application/json'
								},
								body: JSON.stringify(params),
								method: 'POST'
							};
							try {
								const response = await fetch(
									`/private/mailgun?email=${email}`,
									init
								);
								const json = await response.json();
								if (
									!json.message
									|| json.message !== 'Mailing list member has been created'
								) {
									throw new Error();
								}
								document
									.getElementById('newsletterFormBtn')
									.classList.remove('is-loading');
								document
									.getElementById('newsletter')
									.classList.add('is-success');
								document
									.getElementById('newsletterForm')
									.classList.add('is-hidden');
								document.getElementById('newsletterMessage').innerText
									= 'Thank you so much for joining!';
							} catch {
								document
									.getElementById('newsletterFormBtn')
									.classList.remove('is-loading');
								document
									.getElementById('newsletter')
									.classList.add('is-danger');
								document.getElementById('newsletterMessage').innerText
									= 'Oops! Please try again!';
							}
						} else {
							document
								.getElementById('newsletterFormBtn')
								.classList.remove('is-loading');
						}
					});
			});
		});
		document.body.appendChild(script);
	});
