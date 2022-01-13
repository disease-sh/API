const axios = require("axios");
const logger = require("../../utils/logger");
const csvUtils = require("../../utils/csvUtils");

const PATH =
    "https://opendata.ecdc.europa.eu/covid19/virusvariant/csv/data.csv";

/**
 * Requests and parses csv data that is used to populate the data table on the European Centre for Disease Prevention and Control (ECDPC) site
 */
const europeanCountriesData = async () => {
    try {
        const europeRes = (await axios.get(PATH)).data;
        const parsedEuropeanCountriesData = await csvUtils.parseCsvData(
            europeRes
        );
        return parsedEuropeanCountriesData.map((country) => ({
            updated: Date.now(),
            country: country.country,
            yearWeek: country.year_week,
            source: country.source,
            newCases: parseInt(country.new_cases) || null,
            numberSequenced: parseInt(country.number_sequenced) || null,
            percentSequenced: parseFloat(country.percent_sequenced) || null,
            validDenominator: country.valid_denominator,
            variant: country.variant,
            numberDetectionsVariant:
                parseInt(country.number_detections_variant) || null,
            numberSequencedKnownVariant:
                parseInt(country.number_sequenced_known_variant) || null,
            percentVariant: parseFloat(country.percent_variant) || null,
        }));
    } catch (err) {
        logger.err("Error: Requesting ECDPC Data failed!", err);
        return null;
    }
};

const variantsData = async (keys, redis) => {
    try {
        const countryData = await europeanCountriesData();

        if (countryData) {
            const standardizedCountryName = nameUtils.getCountryData(
                countryData.country.trim()
            ).country;
            await redis.hset(
                keys.variants,
                standardizedCountryName,
                JSON.stringify(countryData)
            );
        } else {
            logger.info(`${countryData.country} scraper has failed.`);
        }

        logger.info(
            `Updated ECDC data: ${(await redis.hkeys(keys.variants)).length}`
        );
    } catch (err) {
        logger.err("Error: Requesting ECDC data failed!", err);
    }
};

module.exports = variantsData;
