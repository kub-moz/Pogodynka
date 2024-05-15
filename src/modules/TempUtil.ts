function convertF(celcius: number) {
    return (celcius * 9 / 5) + 32;
}

export function tempWrap(temp: number | undefined, isCelcius: boolean) {
    if (temp === undefined) {
        return;
    }

    if (isCelcius) {
        return `${(temp).toFixed(2)} C°`;
    } else {
        return `${(convertF(temp)).toFixed(2)} F°`;
    }
}

export function TimeStampToHour(TimeStamp: number | undefined): string {
    if (TimeStamp) {
        const date = new Date(TimeStamp * 1000);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    } else {
        return "";
    }
}

export function getCurrentTimeWithOffset(offsetInSeconds: number | undefined): string {
    if (offsetInSeconds) {
        const now = new Date();
        const utcTimestamp = now.getTime() + (now.getTimezoneOffset() * 60000);
        const offsetTime = new Date(utcTimestamp + (offsetInSeconds * 1000));
        const hours = offsetTime.getHours().toString().padStart(2, '0');
        const minutes = offsetTime.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    } else {
        return "";
    }
}

export function timestampToFullDateTime(timestamp: number | undefined): string {
    if (timestamp) {
        const date = new Date(timestamp * 1000);
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric', month: 'long', day: 'numeric',
            hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
            timeZoneName:'longGeneric'
        };
        const formattedDateTime = new Intl.DateTimeFormat(navigator.language, options).format(date);
        return formattedDateTime;
    } else {
        return "";
    }
}
