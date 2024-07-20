import { Group } from "../models"

const findGroup = async (combinedId: string) => {
    return Group.findOne({combinedId})
}

const createGroup = async (combinedId: string) => {
    return new Group({combinedId,messages: []})
}

export { 
    findGroup,
    createGroup
}