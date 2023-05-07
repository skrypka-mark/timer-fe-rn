import moment from 'moment';

export const parseTimerValues = timer => {
    const displayUnits = timer?.displayUnits;
    const convertedDate = timer?.date ? moment(JSON.parse(timer.date)) : moment();
    const convertedTime = timer?.time ? moment(JSON.parse(timer.time)) : moment();

    const now = moment();

    const timerObject = {
        years: convertedDate.diff(now, 'years'),
        months: convertedDate.diff(now, 'months'),
        weeks: convertedDate.diff(now, 'weeks'),
        days: convertedDate.diff(now, 'days'),
    };

    const hours = convertedTime;
    const minutes = hours.clone().subtract(hours.diff(now, 'hours'), 'hours');
    const seconds = minutes.clone().subtract(minutes.diff(now, 'minutes'), 'minutes');

    timerObject.hours = hours.diff(now, 'hours');
    timerObject.minutes = minutes.diff(now, 'minutes');
    timerObject.seconds = seconds.diff(now, 'seconds');

    // if(Object.values(timerObject).reduce((prev, cur) => prev + cur, 0) <= 0) return null;

    const timerFiltered = {};
    Object.keys(displayUnits).forEach(key => {
        // const isShown = displayUnits[key] && !!timerObject[key];
        const isShown = displayUnits[key];
        if(isShown) {
            timerFiltered[key] = timerObject[key];
        }
    });

    return timerFiltered;
};
