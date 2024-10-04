
const storeInSession = (key,value) => {
    return sessionStorage.setItem(key,value)
}
const lookInSession = (key) => {
    return sessionStorage.setItem(key)
}
const removeFormSession = (key) => {
    return sessionStorage.setItem(key)
}


const logOutUser = () => {
sessionStorage.clear();
}

export {storeInSession, logOutUser, lookInSession, removeFormSession}

