
export const fromateTime = (time) => {
    const nowDate = new Date();
    const date = new Date(time);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";

    if (nowDate.getDate() === date.getDate()) {
        return `${hours}:${minutes} ${ampm}`;
    }
    if (nowDate.getDate() - 1 === date.getDate()) {
        return `Yesterday`;
    }
    if (nowDate.getFullYear() === date.getFullYear()) {
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    }
    return `${hours}:${minutes} ${ampm}`;
}
