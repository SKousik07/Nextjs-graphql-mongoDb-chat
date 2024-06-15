const authResolver = { 
    Query: {
        login : () => {
            return "Hello, user!"
        }
    }
}

export default authResolver