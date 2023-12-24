
export const fromateTime = (time) => {
    const date = new Date(time);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";

    return `${hours}:${minutes} ${ampm}`;
}

export const fromateDate = (time) => {
    const nowDate = new Date();
    const date = new Date(time);

    if (nowDate.getDate() === date.getDate()
        && nowDate.getMonth() === date.getMonth()
        && nowDate.getFullYear() === date.getFullYear()) {
        return `Today`;
    }
    if (nowDate.getDate() - 1 === date.getDate()
        && nowDate.getMonth() === date.getMonth()
        && nowDate.getFullYear() === date.getFullYear()) {
        return `Yesterday`;
    }
    return date.toDateString();
}
