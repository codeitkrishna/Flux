const mongoose = require("mongoose");

const pendingrequestsSubschema = mongoose.Schema(
    {
        senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        status: {type: String, enum: ['accepted','rejected','pending'], default: 'pending'},
    },
    {timestamps: true}
);

const UserSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    mobilenumber: { type: Number, required: true, unique: true},
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    token: { type: String, default: null},
    currentbalance: {type: Number, default: null},
    friendlist: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    pendingrequests: {type: [pendingrequestsSubschema], default:[]}
});

module.exports = mongoose.model('User', UserSchema);


// "_id": "664f3754b03398e9d79c17ae",
//         "firstname": "Mario",
//         "lastname": "forever",
//         "mobilenumber": 1234567890,
//         "username": "mr.mario",
//         "email": "mr.mario@gmail.com",
//         "password": "abc123",
//         "token": null,
//         "__v": 0

// it's getting stored in test -> users
// i want it to be in a seperate table named users under db named

// kg12345
// xyz123

// test5
// xxxx