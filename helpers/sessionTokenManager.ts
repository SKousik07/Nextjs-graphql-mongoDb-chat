const storeSessionToken = (token: string) => {
    sessionStorage.setItem("auth-token",token)
}

const getSessionToken = () => {
    return sessionStorage.getItem("auth-token")
}

const removeSessionToken = () => {
    sessionStorage.removeItem("auth-token")
}

export { storeSessionToken, getSessionToken, removeSessionToken }