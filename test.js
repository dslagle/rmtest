const moment = require("moment");

function RMDate(date) {
    const d = new Date(date);
    return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
}

function DateRange(start, end) {
    const s = moment(start);
    const e = moment(end);
    let d = moment(start);

    if (s > e) return [];
    else if (s === e) return [s];

    let range = [];
    while (d <= e) {
        range.push(d);
        d = moment(d).add(1, "days");
    }

    return range;
}

const d1 = moment("2017-02-15T00:00:00.000Z").utc();
const d2 = moment("2017-02-15").utc(true);

console.log(d1);
console.log(d2);

const h = moment(1487134800000);
const j = moment(1487116800000);
const d = moment(Date.now()).valueOf();

//console.log(d);

//console.log(j.format("MM/DD/YYYY hh:mm:ss"));

//console.log(DateRange("2017-01-31", "2017-02-15"));
