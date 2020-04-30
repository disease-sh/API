const stringToDate = function (data, format) {
    const regex = format.toLocaleLowerCase()
        .replace(/\bd+\b/, '(?<day>\\d+)')
        .replace(/\bm+\b/, '(?<month>\\d+)')
        .replace(/\by+\b/, '(?<year>\\d+)');
    const parts = new RegExp(regex).exec(data) || {};
    const { year, month, day } = parts.groups || {};
    return parts.length === 4 ?
        new Date(year < 100 ? 2000 + Number(year) : year, month - 1, day) :
        undefined;
}
am4core.ready(function () {
    am4core.useTheme(am4themes_animated);
    var chart = am4core.create("chartInfectionCurve", am4charts.XYChart);
    var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    axios({
        method: 'GET',
        url: 'v2/historical/all?lastdays=all'
    }).then(res => {
        Object.keys(res.data).forEach(item => {
            createSeries(`${item.toUpperCase()}`, `value_${item}`, res.data[item]);
        });
    });

    // Create series
    var colors = { "CASES": "blue", "DEATHS": "red", "RECOVERED": "green" }
    function createSeries(name, valueTag, data) {
        var series = chart.series.push(new am4charts.LineSeries());
        series.name = name;
        series.stroke = am4core.color(colors[name]);
        series.strokeWidth = 2;
        series.dataFields.valueY = "value" + valueTag;
        series.dataFields.dateX = "date";

        // Drop-shaped tooltips
        series.tooltipText = "{value}";
        series.tooltip.background.cornerRadius = 20;
        series.tooltip.background.strokeOpacity = 0;
        series.tooltip.pointerOrientation = "vertical";
        series.tooltip.label.minWidth = 40;
        series.tooltip.label.minHeight = 40;
        series.tooltip.label.textAlign = "middle";
        series.tooltip.label.textValign = "middle";

        var bullet = series.bullets.push(new am4charts.CircleBullet());
        bullet.circle.strokeWidth = 2;
        bullet.circle.radius = 2;
        bullet.circle.fill = am4core.color("#fff");
        var bullethover = bullet.states.create("hover");
        bullethover.properties.scale = 2.5;

        var newData = [];
        var keys = Object.keys(data);
        for (let index = 0; index < keys.length; index++) {
            const item = keys[index];
            var dataItem = { date: stringToDate(item, 'm/d/Y') }
            dataItem["value" + valueTag] = data[item];
            newData.push(dataItem);
        }

        // Make a panning cursor
        chart.cursor = new am4charts.XYCursor();
        chart.cursor.behavior = "panXY";
        chart.cursor.xAxis = dateAxis;
        chart.cursor.yAxis = valueAxis;
        // chart.cursor.snapToSeries = series;

        // Create vertical scrollbar and place it before the value axis
        chart.scrollbarY = new am4core.Scrollbar();
        chart.scrollbarY.parent = chart.leftAxesContainer;
        chart.scrollbarY.toBack();

        // Create a horizontal scrollbar with previe and place it underneath the date axis
        chart.scrollbarX = new am4charts.XYChartScrollbar();
        chart.scrollbarX.series.push(series);
        chart.scrollbarX.parent = chart.bottomAxesContainer;

        series.data = newData;
        return series;
    }

    chart.legend = new am4charts.Legend();
    chart.legend.position = "right";
    chart.legend.scrollable = true;
});