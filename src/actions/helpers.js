import moment from "moment";

export function FormatAsTime(value) {
    if (!value) return "";

    const d = new Date(value);
    d.setHours(d.getHours() + 5);
    const m = d.getMinutes();

    return `${d.getHours()}:${m < 10 ? "0" : ""}${m}`;
}

export function FormatAsDate(d) {
    if (!d) return "";

    return `${d.getUTCMonth()+1}/${d.getUTCDate()}/${d.getUTCFullYear()}`;
}

export function FormatDateDiff(value1, value2) {
    if (!value1 || !value2) return "";

    const d1 = new Date(value1);
    d1.setHours(d1.getHours() + 5);

    const d2 = new Date(value2);
    d2.setHours(d2.getHours() + 5);

    let diff = Math.round((d1.getTime() - d2.getTime()) / 1000);

    const h = Math.floor(diff / 3600);
    diff -= (h * 3600);
    const m = Math.floor(diff / 60);
    const s = diff - (m * 60);
    
    return `${h}h ${m}m ${s}s`;
}

export function RMDate(date) {
    const d = new Date(date);
    return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
}

export function DateRange(start, end) {
    const s = moment(start).utc();
    const e = moment(end).utc();
    let d = moment(start).utc();

    if (s > e) return [];
    else if (s === e) return [s];

    let range = [];
    while (d <= e) {
        range.push(d);
        d = moment(d).utc().add(1, "days");
    }

    return range;
}