
/**
 * Retrieves the username and accountType of user
 * @param responseCallback: (returns the response object)
 * 
 *
 * @returns data
 * {
 * username: string,
 * accountType: string
 * }
 */
export const getUserInfo = async (responseCallback) => {
    const res = await fetch("/api/user/", {
        method: "GET",
        credentials: "include",
    });

    if (res.status === 401) {
        responseCallback();
    }
    const data = await res.json();
    return data;
}

