# Notification System

A demonstration of core JavaScript data structures and design patterns:
- **Observer Pattern** for event-driven notifications
- **Set** for tracking unique users
- **Map** for storing user preferences

## Features

- Subscribe/unsubscribe to notifications
- Track unique users who've been notified
- Store and respect user notification preferences
- Filter notifications by user preferences

## Installation

```bash
# Clone the repository
git clone git@github.com:darcygarrett/notification-system.git
cd notification-system

# No dependencies needed - pure JavaScript!
```

## Usage

```javascript
const NotificationCenter = require('./NotificationCenter-final');

const notifications = new NotificationCenter();

// Subscribe to notifications
const unsubscribe = notifications.subscribe((msg, userId, type) => {
  console.log(`${type}: ${msg}`);
});

// Set user preferences
notifications.setPreferences('user123', { 
  email: true, 
  push: false, 
  sms: true 
});

// Send notifications
notifications.notify('Hello!', 'user123', 'email'); // ✅ Sent
notifications.notify('Alert!', 'user123', 'push');  // ⏭️  Skipped (user disabled)

// Unsubscribe
unsubscribe();
```

## Run Example

```bash
node example.js
```

## Key Concepts Demonstrated

### Observer Pattern
Allows objects to subscribe to events and be notified when those events occur. Enables loose coupling between components.

### Set
Automatically maintains a collection of unique values. Used here to track which users have been notified without duplicates.

### Map
Key-value storage that preserves insertion order and allows any type as keys. Used here to store user notification preferences.

## API Reference

### `subscribe(observerFn)`
Subscribe to notifications. Returns an unsubscribe function.

### `notify(message, userId, type)`
Send a notification to all subscribers.

### `setPreferences(userId, preferences)`
Set notification preferences for a user.

### `getPreferences(userId)`
Get notification preferences for a user.

### `hasNotified(userId)`
Check if a user has been notified.

### `getNotifiedUsers()`
Get array of all notified user IDs.

### `getUsersByPreference(type)`
Get users who have enabled a specific notification type.

## License

MIT