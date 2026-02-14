const NotificationCenter = require('./NotificationCenter');

// Create notification center
const notifications = new NotificationCenter();

// Add observers
const emailHandler = (msg) => console.log('📧 Email:', msg);
const pushHandler = (msg) => console.log('🔔 Push:', msg);

const unsubEmail = notifications.subscribe(emailHandler);
const unsubPush = notifications.subscribe(pushHandler);

// Send notification
console.log('--- Sending first notification ---');
notifications.notify('Welcome to the app!');

// Unsubscribe push notifications
console.log('\n--- Unsubscribing push notifications ---');
unsubPush();

// Send another notification
console.log('\n--- Sending second notification ---');
notifications.notify('You have a new message!');