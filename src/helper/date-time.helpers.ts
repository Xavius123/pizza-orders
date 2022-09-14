import dayjs from 'dayjs';

export const getDateTime = (timeStamp: string): string => {
    const datetime = new Date(timeStamp);
    const formatDateTime = dayjs(datetime).format('MM D, YYYY h:mm A');
    return formatDateTime;
};
