const axios = require('axios');
const logger = require('../../utils/logger');
const csvUtils = require('../../utils/csvUtils');

const url = 'https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-regioni/dpc-covid19-ita-regioni-latest.csv';

const italyData = async () => {
	let italyResponse;
	try {
		italyResponse = await axios.get(url);
		const parsedItalyData = await csvUtils.parseCsvData(italyResponse.data);
		return parsedItalyData.map((row) => {
			const regionData = { updated: Date.now() };
			regionData.region = row.denominazione_regione;
			regionData.lat = row.lat;
			regionData.long = row.long;
			regionData.hospitalizedWithSymptoms = parseInt(row.ricoverati_con_sintomi);
			regionData.intensiveCare = parseInt(row.terapia_intensiva);
			regionData.totalHospitalized = parseInt(row.totale_ospedalizzati);
			regionData.homeIsolation = parseInt(row.isolamento_domiciliare);
			regionData.newCases = parseInt(row.nuovi_positivi);
			regionData.totalCases = parseInt(row.totale_casi)
			regionData.recovered = parseInt(row.dimessi_guariti);
			regionData.deaths = parseInt(row.deceduti);
			return regionData;
		});
	} catch (err) {
		logger.err(err, 'Error: Requesting Italy Gov Data failed!');
		return null;
	}
};

module.exports = italyData;
