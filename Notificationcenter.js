// Notification Center using Observer Pattern
class NotificationCenter {
  constructor() {
    this.observers = [];
  }

  // Subscribe to notifications
  subscribe(observerFn) {
    this.observers.push(observerFn);
    
    // Return unsubscribe function
    return () => {
      this.observers = this.observers.filter(observer => observer !== observerFn);
    };
  }

  // Notify all observers
  notify(message) {
    this.observers.forEach(observer => observer(message));
  }
}

module.exports = NotificationCenter;