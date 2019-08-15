const WEEKDAYS = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ]

const lastItem = (list) => list[list.length-1]

const findNthDate = (list, nth) => {
    switch(nth) {
    case "1st":
    case "2nd":
    case "3rd":
    case "4th":
    case "5th":
        return list[parseInt(nth) - 1]
    case "last":
        return lastItem(list)
    case "teenth":
        return list.find((day) => day.getDate() >= 13)
    default:
        throw "filter type unknown"
    }
}

const using = (obj, func) => {
    func(obj);
    return obj;
}

const daysInMonth = (year, month) => {
    let date = new Date(year, month, 1);

    let matches = using([], (acc) => {
        while (date.getMonth() == month) {
            acc.push(new Date(date));
            date.setDate(date.getDate() + 1);
        }
    })
    return matches;
}

const daysOfWeekInMonth = (year, month, day_of_week) => {
    return daysInMonth(year, month)
        .filter((day) => WEEKDAYS[day.getDay()] == day_of_week)
}

export const meetupDay = (year, month, day_of_week, nth) => {
    let potentialDates = daysOfWeekInMonth(year,month,day_of_week);
    let day = findNthDate(potentialDates, nth);
    if (!day) { throw "date not found" }

    return day
}