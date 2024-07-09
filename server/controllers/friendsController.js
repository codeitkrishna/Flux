// let the user search for users using username, email
// add them to their friend list 
// and maintian consistent friendlist for all users
const User = require ("../models/User");
//routes to these functions are in sharedExpense.js

const searchFriendtoAdd = async(req,res) => {
    try {
        const username = req.body.submittedUserSearch
        // console.log(req.body)
        // console.log(username)

        const recipient = await User.find({username}).select('-password');
        if(!recipient){
            return res.status(401).json({error:"User not found"});
        }

        return res.status(200).json({recipient})

    } catch (error) {
        console.log('Error in searching Friend: ', error);
        return res.status(500).json({error: 'Something went wrong in searching user, please try again'})
    }
};

const pendingFriendRequests = async(req, res) => {

}

const addFriend = async(req, res) => {
    try {
        const {userId: senderId, userSearch: recipientUsername} = req.body
        console.log(req.body)
        console.log(senderId, recipientUsername)

        const recipient = await User.findOne({username: recipientUsername});
        console.log(recipient)
        if(!recipient){
            return res.status(401).json({error:"User not found"});
        }

        if (!recipient.pendingrequests) {
            recipient.pendingrequests = [];
        }

        const requestExists = recipient.pendingrequests.some(val => val.senderId = senderId);
        if (requestExists) {
            return res.status(400).json({ error: "Friend request already sent" });
        }

        // console.log(recipient.pendingrequests)
        recipient.pendingrequests.push({senderId, status: 'pending'});
        await recipient.save()
        console.log(recipient)
        res.status(200).json({ message: 'Friend request sent' });

    } catch (error) {
        console.log('Error in addFriend: ', error);
        return res.status(500).json({error: 'Something went wrong in adding friend, please try again'})
    }
};

const respondToFriendReq = async(req, res) => {
    try {
        const {senderId, recipientUsername, response} = req.body

        const recipient = await User.findOne(recipientUsername);

        if(!recipient){
            return res.status(401).json({error:"User not found"});
        }

        const requestSenderId = recipient.pendingrequests.find(senderId)

        if(senderId != requestSenderId){
            return res.status(404).json({ error: 'Friend request not found' });
        }

        if(response == 'ACCEPT'){
            recipient.friendlist.push(senderId);

            const sender = User.findOne(senderId);
            sender.friendlist.push(recipient._id);
            await sender.save()
        }
        await recipient.save()

        return res.status(200).json({message: 'Friend request accepted'})

    } catch (error) {
        console.log('Error in respondToFriendReq ', error)
        return res.status(500).json({error: 'Something went wrong in responding to friend req, please try again'})
    }
};

const getFriendList = async(req, res) => {
    try {
        const {userId} = req.body

        const user = await User.find(userId)
        console.log('friendList response from mongodb: ', user)

        const friends = user.friendlist
        console.log('friends response from mongodb: ', friends)

        return res.status(200).json(friends)
    } catch (error) {
        console.log('Error in getFriendList ', error)
        return res.status(500).json({error: 'Something went wrong in getting friends list, please try again'})
    }
};

module.exports = {searchFriendtoAdd, addFriend, respondToFriendReq, getFriendList, pendingFriendRequests}