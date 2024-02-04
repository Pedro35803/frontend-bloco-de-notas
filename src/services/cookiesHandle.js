import cookie from "cookiejs";

export const timeToken = (minutesToken) => {
    const milisecondsInSeconds = 1000;
    const secondsInMinute = 60;

    const secondsInMinutes =
        minutesToken * secondsInMinute * milisecondsInSeconds;
    const dateFuture = Date.now() + secondsInMinutes;
    const dateObj = new Date(dateFuture);

    return dateObj;
};

export const getAccessToken = () => {
    return cookie.get("access");
};

export const getRefreshToken = () => {
    return cookie.get("refresh");
};

export const setAccessToken = (newToken) => {
    const minutesAccessToken = Number(
        process.env.REACT_APP_ACCESS_TOKEN_DURATION_MINUTES
    );

    const timeTokenAccess = timeToken(minutesAccessToken);

    cookie.set("access", newToken, {
        expires: timeTokenAccess,
    });
};

export const setRefreshToken = (newToken) => {
    const minutesRefreshToken = Number(
        process.env.REACT_APP_REFRESH_TOKEN_DURATION_MINUTES
    );

    const timeTokenRefresh = timeToken(minutesRefreshToken);

    cookie.set("refresh", newToken, {
        expires: timeTokenRefresh,
    });
};

export const clearCokkies = () => {
    cookie.remove("access");
    cookie.remove("refresh");
};
