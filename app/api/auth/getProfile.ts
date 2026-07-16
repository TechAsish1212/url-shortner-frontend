export const getProfile = async (token:string) => {
    return fetch("/api/auth/me", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        credentials: "include",
    });
}