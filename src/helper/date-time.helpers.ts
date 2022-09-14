export const getDateTime = (timeStamp: string): string => {
    let newTime = '';
    const time = new Date(timeStamp);
    const minutes = (time.getMinutes() < 10 ? '0' : '') + time.getMinutes();
    const month = time.getMonth() + 1;
    const day = time.getUTCDate();
    const seconds = time.getUTCSeconds();
    let hours = time.getHours();
    hours = hours + 7;
    const ampm = hours >= 12 ? 'pm' : 'am';
    newTime = `${month}/${day} ${hours}:${minutes}:${seconds} ${ampm}`;

    return newTime;
};
