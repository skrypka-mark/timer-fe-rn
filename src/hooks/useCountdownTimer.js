import moment from 'moment';

export const useCountdownTimer = timer => {
    const displayUnits = timer?.displayUnits;
    const eventDate = timer?.date ? moment(JSON.parse(timer.date)) : moment();
    const eventTime = timer?.time ? moment(JSON.parse(timer.time)) : moment();
    const now = moment();

    eventDate.set({
        hours: eventTime.get('hours'),
        minutes: eventTime.get('minutes'),
        seconds: eventTime.get('seconds')
    });

    // const filterTimerUnits = duration => {
    //     const timerDateFiltered = {};
    //     Object.keys(displayUnits).forEach(key => {
    //         // const isShown = displayUnits[key] && !!timerDate[key];
    //         const isShown = displayUnits[key];
    //         if(!isShown) return;

    //         timerDateFiltered[key] = duration[key]();
    //     });

    //     return timerDateFiltered;
    // };

    const diff = eventDate.diff(now);

    // const [timerDate, setTimerDate] = useState(filterTimerUnits({
    //     years: diff.years(),
    //     months: diff.months(),
    //     weeks: diff.weeks(),
    //     days: diff.days(),
    //     hours: diff.hours(),
    //     minutes: diff.minutes(),
    //     seconds: diff.seconds()
    // }));

    const duration = moment.duration(diff);
    const durationInSeconds = moment.duration(diff).asSeconds();

    // if(duration.asSeconds() <= 0) return clearInterval(interval);

    const remainingTime = {};

    Object.keys(displayUnits).forEach(unit => {
        const value = Math.floor(duration.as(unit));

        // const isShown = displayUnits[key] && !!timerDate[key];
        const isShown = displayUnits[unit];
        if(!isShown) return;

        if(value < 0) return remainingTime[unit] = 0;
        remainingTime[unit] = value;

        duration.subtract(value, unit);
    });

    return { timeLeft: remainingTime, duration: durationInSeconds > 0 ? +durationInSeconds.toFixed() : 0 };
};
