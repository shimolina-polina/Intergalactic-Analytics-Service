export const daysToDate = (days: number): string => {
    const start = new Date(new Date().getFullYear(), 0, 1);
    start.setDate(start.getDate() + days - 1);

    const formatter = new Intl.DateTimeFormat('ru-RU', {
        day: 'numeric',
        month: 'long',
    });

    return formatter.format(start);
};
