const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp();
const fcm = admin.messaging();

exports.sendNewWallpaperNotification = functions.firestore
.document("wallpapers/{wallpaperId}").onCreate(snapshot=>{
    const data = snapshot.data();
    
    var payload = {
        notification: {
            title: "WallyApp",
            body: "New wallpaper is here",
            icon: "https://firebasestorage.googleapis.com/v0/b/wallyapp-bb6cb.appspot.com/o/logo_circle.png?alt=media&token=19f3e2ad-1500-4d68-8669-f8186c6e4e6c",
            image: data.url
        }
    };

    const topic = "promotion";

    return fcm.sendToTopic(topic, payload);
})