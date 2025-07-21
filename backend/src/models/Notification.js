import mongoose from "mongoose";

const notifictionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
})

const Notification = mongoose.model('Notification', notifictionSchema);

export default Notification;