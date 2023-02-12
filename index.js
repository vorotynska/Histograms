var height = 600;
const width = 600;
const margin = 30;
const padding = 2;
const data = [{
        x: 1,
        y: 55
    },
    {
        x: 2,
        y: 67
    }, {
        x: 3,
        y: 74
    }, {
        x: 4,
        y: 63
    },
    {
        x: 5,
        y: 56
    }, {
        x: 6,
        y: 24
    }, {
        x: 7,
        y: 26
    },
    {
        x: 8,
        y: 19
    }, {
        x: 9,
        y: 42
    }, {
        x: 10,
        y: 88
    },
    {
        x: 11,
        y: 80
    }, {
        x: 12,
        y: 77
    }
];

const svg = d3.select('body').append('svg')
    .attr('class', 'axis')
    .attr('width', width)
    .attr('height', height)
    .data(data)

const xAxisLength = width - 2 * margin;
const yAxisLength = height - 2 * margin;

const xScale = d3.scaleLinear()
    .domain([1, d3.max(data, (d) => d.x) + 1])
    .range([0, xAxisLength]);

const yScale = d3.scaleLinear()
    .domain([d3.max(data, (d) => d.y) + 20, 0])
    .range([0, yAxisLength]);

const xAxis = d3.axisBottom(xScale);

const yAxis = d3.axisLeft(yScale);

svg.append("g")
    .attr("class", "x-axis")
    .attr("transform", // сдвиг оси вниз и вправо
        "translate(" + margin + "," + (height - margin) + ")")
    .call(xAxis);

svg.append("g")
    .attr("class", "y-axis")
    .attr("transform", // сдвиг оси вниз и вправо на margin
        "translate(" + margin + "," + margin + ")")
    .call(yAxis);


d3.selectAll("g.y-axis g.tick")
    .append("line")
    .classed("grid-line", true)
    .attr("x1", 0)
    .attr("y1", 0)
    .attr("x2", xAxisLength)
    .attr("y2", 0);

// create g object for rectangles
var g = svg.append("g")
    .attr("class", "body")
    .attr("transform", // сдвиг объекта вправо
        "translate(" + margin + ", 0 )");
// связываем данные с прямоугольниками
g.selectAll("rect.bar")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar");
// устанавливаем параметры прямоугольников
g.selectAll("rect.bar")
    .data(data)
    .attr("x", function (d) {
        return xScale(d.x);
    })
    .attr("y", function (d) {
        return yScale(d.y) + margin;
    })
    .attr("height", function (d) {
        return yAxisLength - yScale(d.y);
    })
    .attr("width", function (d) {

        return Math.floor(xAxisLength / data.length) - padding;
    });

// text
g.append("text")
    .attr("x", (width / 2))
    .attr("y", margin + 10)
    .attr("text-anchor", "middle")
    .style("font-size", "22px")
    .text("Bar Chat");