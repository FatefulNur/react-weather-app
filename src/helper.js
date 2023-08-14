export function dateFormat(date, setup) {
    return new Date(date).toLocaleString('en-US', {
        ...setup
    })
}

export function splitHour(date) {
    return parseInt(dateFormat(date, { timeStyle: "short" }).split(':')[0], 10)
}

export function hasAmPm(...dates) {
    return dates.every(date => dateFormat(date, { timeStyle: "short" }).match(/AM/i)) ||
    dates.every(date => dateFormat(date, { timeStyle: "short" }).match(/PM/i))
}