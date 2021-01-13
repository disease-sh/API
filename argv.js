const fileNameToTestMap = {
	'print.yml': 'correctTest.js'
};

const tests = new Set();

process.argv.splice(2).forEach(fl => {
	var fileName = fl.replace(/^.*[\\/]/, '');
	var test = fileNameToTestMap[fileName];
	if (test) tests.add(test);
});

tests.forEach(test => console.log(test));
