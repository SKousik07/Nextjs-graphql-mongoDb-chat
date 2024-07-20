import { createGroup, findGroup } from "../services/groupService";

const groupResolver = { 
    Query: {
        getGroup: async (root: any, args: any, context: any) => {
            try {
                if(!context.user){
                    throw new Error("Unauthorized user")
                }
                const { combinedId } = args;
                let group = await findGroup(combinedId)
                if(!group){
                    group = await createGroup(combinedId)
                }
                await group.save()
                group = await group.populate({
                    path: 'messages.from',
                    select: 'id username email' 
                });
                console.log("getGroup-group",group)
                return group
                
            } catch (error) {
                console.error('Error fetching group:', error);
                throw new Error('Failed to fetch group');
            }
        }
    },
    Mutation: {
        addMessage : async (root: any, args: any, {user,pubSub}: any) => {
            try {
                if(!user){
                    throw new Error("Unauthorized user")
                }
                const { content, combinedId, userId, type } = args;
                const newMessage = {
                    content,
                    combinedId,
                    from: userId,
                    userId,
                    type
                };
                console.log("newMessage",newMessage)
                let group = await findGroup(combinedId)
                if(!group){
                    group = await createGroup(combinedId)
                }
                group.messages.push(newMessage)
                await group.save()
                pubSub.publish(`GROUP_UPDATED_${combinedId}`, { groupUpdated: group });
                console.log("group",group)
                return group
                
            } catch (error) {
                console.error('Error adding message to group:', error);
                throw new Error('Failed to add message to group');
            }
        }
    },
    Subscription: {
        groupUpdated: {
            subscribe: (root: any, {combinedId}: any, {pubSub}: any) => {
                return pubSub.asyncIterator(`GROUP_UPDATED_${combinedId}`)
            }
        }
    }
}

export default groupResolver
