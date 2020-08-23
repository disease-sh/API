module.exports = {
	months: {
		January: '01',
		February: '02',
		March: '03',
		Arpril: '04',
		May: '05',
		June: '06',
		July: '07',
		August: '08',
		September: '09',
		October: '10',
		November: '11',
		December: '12'
	},
	phaseData: (data) => {
		const result = {};
		for (var i = 0; i < data.length; i++) {
			if (!result[data[i]['Trial Phase']]) {
				result[data[i]['Trial Phase']] = 0;
			}
			++result[data[i]['Trial Phase']];
		}
		return Object.keys(result).map((key) => ({
			phase: key,
			candidates: result[key].toString()
		}));
	}
};
