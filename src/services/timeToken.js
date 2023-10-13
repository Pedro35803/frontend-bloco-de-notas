export const timeToken = (minutesToken) => {
    const milisecondsInSeconds = 1000;
    const secondsInMinute = 60;

    const secondsInMinutes = minutesToken * secondsInMinute * milisecondsInSeconds;
    const dateFuture = Date.now() + secondsInMinutes;
    const dateObj = new Date(dateFuture);

    return dateObj;
}