const express = require('express');
const { searchFriendtoAdd, addFriend, respondToFriendReq, getFriendList } = require('../controllers/friendsController');
const requireAuth = require('../middleware/requireAuth');

const sharedExpenseRouter = express.Router();

sharedExpenseRouter.use(requireAuth);

sharedExpenseRouter.post('/search-user', searchFriendtoAdd);
sharedExpenseRouter.post('/sendreq', addFriend);
sharedExpenseRouter.post('/respond', respondToFriendReq);
sharedExpenseRouter.get('/friends', getFriendList);


module.exports = sharedExpenseRouter
