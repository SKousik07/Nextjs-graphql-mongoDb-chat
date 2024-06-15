import mongooose from "mongoose";

const connect = () => {
    try {
        mongooose.connect(process.env.MONGO_URL!)
        const connection = mongooose.connection

        connection.on("connected", () => {
            console.log("MongoDB connected")
        })
        connection.on("error", (err) => {
            console.log(err)
        })
        
    } catch (error) {
        console.log(error)   
    }
}

export default connect