// Notification Center with Observer Pattern, User Tracking (Set), and Preferences (Map)
class NotificationCenter {
  constructor() {
    this.observers = [];
    this.notifiedUsers = new Set(); // Track unique users who've been notified
    this.userPreferences = new Map(); // Store notification preferences per user
  }

  // Subscribe to notifications
  subscribe(observerFn) {
    this.observers.push(observerFn);
    
    // Return unsubscribe function
    return () => {
      this.observers = this.observers.filter(observer => observer !== observerFn);
    };
  }

  // Set user notification preferences
  setPreferences(userId, preferences) {
    this.userPreferences.set(userId, preferences);
  }

  // Get user preferences
  getPreferences(userId) {
    return this.userPreferences.get(userId) || { email: true, push: true, sms: true };
  }

  // Check if user wants a specific notification type
  wantsNotification(userId, type) {
    const prefs = this.getPreferences(userId);
    return prefs[type] !== false;
  }

  // Notify all observers with user tracking and preference checking
  notify(message, userId = null, type = 'email') {
    // Check user preferences if userId provided
    if (userId && !this.wantsNotification(userId, type)) {
      console.log(`⏭️  User ${userId} has disabled ${type} notifications`);
      return;
    }

    // Track user if provided
    if (userId) {
      this.notifiedUsers.add(userId);
    }
    
    this.observers.forEach(observer => observer(message, userId, type));
  }

  // Check if user has been notified
  hasNotified(userId) {
    return this.notifiedUsers.has(userId);
  }

  // Get count of unique notified users
  getNotifiedCount() {
    return this.notifiedUsers.size;
  }

  // Get all notified user IDs
  getNotifiedUsers() {
    return [...this.notifiedUsers];
  }

  // Get users who prefer a specific notification type
  getUsersByPreference(type) {
    return [...this.userPreferences]
      .filter(([userId, prefs]) => prefs[type] === true)
      .map(([userId, prefs]) => userId);
  }
}

module.exports = NotificationCenter;