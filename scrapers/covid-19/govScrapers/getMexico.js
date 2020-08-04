const axios = require('axios');
const logger = require('../../../utils/logger');
const querystring = require('querystring');

// a map of Mexican states with the corresponding IDs gob.mx uses server-side
const stateIDs = [
	{ state: 'aguascalientes', id: '01' },
	{ state: 'baja california', id: '02' },
	{ state: 'baja california sur', id: '03' },
	{ state: 'campeche', id: '04' },
	{ state: 'coahuila', id: '05' },
	{ state: 'colima', id: '06' },
	{ state: 'chiapas', id: '07' },
	{ state: 'chihuahua', id: '08' },
	{ state: 'ciudad de mexico', id: '09' },
	{ state: 'durango', id: '10' },
	{ state: 'guanajuato', id: '11' },
	{ state: 'guerrero', id: '12' },
	{ state: 'hidalgo', id: '13' },
	{ state: 'jalisco', id: '14' },
	{ state: 'estado de mexico', id: '15' },
	{ state: 'michoacan', id: '16' },
	{ state: 'morelos', id: '17' },
	{ state: 'nayarit', id: '18' },
	{ state: 'nuevo leon', id: '19' },
	{ state: 'oaxaca', id: '20' },
	{ state: 'puebla', id: '21' },
	{ state: 'queretaro', id: '22' },
	{ state: 'quintana roo', id: '23' },
	{ state: 'san luis potosi', id: '24' },
	{ state: 'sinaloa', id: '25' },
	{ state: 'sonora', id: '26' },
	{ state: 'tabasco', id: '27' },
	{ state: 'tamaulipas', id: '28' },
	{ state: 'tlaxcala', id: '29' },
	{ state: 'veracruz', id: '30' },
	{ state: 'yucatan', id: '31' },
	{ state: 'zacatecas', id: '32' }
];

// an object to initialize the FormData object that must be sent with the requests
const formData = {
	nationalCases: querystring.stringify({ cve: '000', nom: 'nacional', sPatType: 'Confirmados' }),
	nationalDeaths: querystring.stringify({ cve: '000', nom: 'nacional', sPatType: 'Defunciones' }),
	stateCases: querystring.stringify({ cve: '', nom: '', sPatType: 'Confirmados' }),
	stateDeaths: querystring.stringify({ cve: '', nom: '', sPatType: 'Defunciones' })
};

const filterByDate = (data) => {
	const date = new Date();
	date.setDate(date.getDate() - 1);
	return data.filter(item => item.date === `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`);
};

/**
 * Returns an object containing a number (recovered) and an array (data) containing national data
 * @param 	{String} 	res		The response body string to extract data from
 * @returns {Object}				National data for Mexico
 */
const getNational = (res) => {
	const recovered = parseInt(res.substring(res.indexOf('gsRecDIV'), res.indexOf('gsRecDIV') + 35).split('(')[1].split(')')[0]);
	const data = filterByDate(JSON.parse(res.substring(res.lastIndexOf('['), res.lastIndexOf(']') + 1)))[0];
	return { recovered, data };
};

/**
 * Creates and returns an object containing data for each tracked Mexican state
 * @param 	{String} 	res		The response body string to extract data from
 * @returns {Object}				Individual state data for Mexico
 */
const getState = (res) => {
	const stateValues = {};
	stateIDs.forEach(state => {
		const target = `Total['${state.id}']`;
		const value = parseInt(res.substring(res.indexOf(target), res.indexOf(target) + 18).split(';')[0].split('=')[1]);
		stateValues[state.state] = value;
	});
	return stateValues;
};

const mexicoData = async () => {
	try {
		const nationalCases = getNational((await axios.post('https://coronavirus.gob.mx/datos/Overview/info/getInfo.php', formData.nationalCases)).data);
		const nationalDeaths = getNational((await axios.post('https://coronavirus.gob.mx/datos/Overview/info/getInfo.php', formData.nationalDeaths)).data);
		const stateCases = getState((await axios.post('https://coronavirus.gob.mx/datos/Overview/info/getInfo.php', formData.stateCases)).data);
		const stateDeaths = getState((await axios.post('https://coronavirus.gob.mx/datos/Overview/info/getInfo.php', formData.stateDeaths)).data);

		// merge the two State objects together for a cleaner response body
		const states = stateIDs.map(state => ({ [state.state]: { cases: stateCases[state.state], deaths: stateDeaths[state.state] } }));

		return {
			updated: Date.now(),
			national: {
				newCases: nationalCases.data.total,
				newDeaths: nationalDeaths.data.total,
				cases: nationalCases.data.acumulado,
				deaths: nationalDeaths.data.acumulado,
				recovered: nationalCases.recovered

			},
			states,
			source: 'https://coronavirus.gob.mx/datos/'
		};
	} catch (err) {
		logger.err('Error: Requesting Mexico Gov Data failed!', err);
		return null;
	}
};

module.exports = mexicoData;
