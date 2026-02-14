const NotificationCenter = require('./NotificationCenter-final');

console.log('=== Notification System Demo ===\n');

// Create notification center
const notifications = new NotificationCenter();

// Set up observers for different notification types
const emailObserver = (msg, userId, type) => {
  if (type === 'email') console.log(`📧 Email to user ${userId}: ${msg}`);
};

const pushObserver = (msg, userId, type) => {
  if (type === 'push') console.log(`🔔 Push to user ${userId}: ${msg}`);
};

const smsObserver = (msg, userId, type) => {
  if (type === 'sms') console.log(`📱 SMS to user ${userId}: ${msg}`);
};

// Subscribe all observers
notifications.subscribe(emailObserver);
notifications.subscribe(pushObserver);
notifications.subscribe(smsObserver);

console.log('--- Setting User Preferences ---');
// User 1 wants all notifications
notifications.setPreferences('user1', { email: true, push: true, sms: true });

// User 2 only wants email
notifications.setPreferences('user2', { email: true, push: false, sms: false });

// User 3 only wants push
notifications.setPreferences('user3', { email: false, push: true, sms: false });

console.log('\n--- Sending Notifications ---');
notifications.notify('Welcome to the app!', 'user1', 'email');
notifications.notify('You have a new message!', 'user1', 'push');
notifications.notify('Security alert!', 'user2', 'email');
notifications.notify('Friend request!', 'user2', 'push'); // Will be skipped
notifications.notify('New follower!', 'user3', 'push');

console.log('\n--- User Statistics ---');
console.log('Total unique users notified:', notifications.getNotifiedCount());
console.log('Notified users:', notifications.getNotifiedUsers());
console.log('Users who want email:', notifications.getUsersByPreference('email'));
console.log('Users who want push:', notifications.getUsersByPreference('push'));

console.log('\n--- Checking Individual Users ---');
console.log('Has user1 been notified?', notifications.hasNotified('user1'));
console.log('Has user4 been notified?', notifications.hasNotified('user4'));