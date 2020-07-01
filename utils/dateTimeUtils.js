/**
 * Get current integer week of year to pass in as URL param for CDC
 * Source: https://weeknumber.net/how-to/javascript
 * @returns {number} 	Number week (e.g. 1 for January 4th)
 */
Date.prototype.getWeek = function getWeek() {
	var date = new Date(this.getTime());
	date.setHours(0, 0, 0, 0);
	// Thursday in current week decides the year.
	date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
	// January 4 is always in week 1.
	var week1 = new Date(date.getFullYear(), 0, 4);
	// Adjust to Thursday in week 1 and count number of weeks from date to week1.
	return 1 + Math.round((((date.getTime() - week1.getTime()) / 86400000) - 3 + ((week1.getDay() + 6) % 7)) / 7);
};

const getCurrentWeek = () => new Date().getWeek();

module.exports = {
	getCurrentWeek
};
