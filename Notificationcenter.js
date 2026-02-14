// Notification Center using Observer Pattern with User Tracking
class NotificationCenter {
  constructor() {
    this.observers = [];
    this.notifiedUsers = new Set(); // Track unique users who've been notified
  }

  // Subscribe to notifications
  subscribe(observerFn) {
    this.observers.push(observerFn);
    
    // Return unsubscribe function
    return () => {
      this.observers = this.observers.filter(observer => observer !== observerFn);
    };
  }

  // Notify all observers with optional user tracking
  notify(message, userId = null) {
    // Track user if provided
    if (userId) {
      this.notifiedUsers.add(userId);
    }
    
    this.observers.forEach(observer => observer(message, userId));
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
}

module.exports = NotificationCenter;