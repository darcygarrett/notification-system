const NotificationCenter = require('./NotificationCenter-final');

// Simple test runner
let testsPassed = 0;
let testsFailed = 0;

function test(description, fn) {
  try {
    fn();
    console.log(`✅ ${description}`);
    testsPassed++;
  } catch (error) {
    console.log(`❌ ${description}`);
    console.log(`   Error: ${error.message}`);
    testsFailed++;
  }
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message || 'Assertion failed');
  }
}

console.log('🧪 Running Tests...\n');

// Test 1: Observer Pattern - Subscribe and Notify
test('should notify all subscribers', () => {
  const nc = new NotificationCenter();
  let count = 0;
  
  nc.subscribe(() => count++);
  nc.subscribe(() => count++);
  nc.notify('test');
  
  assert(count === 2, `Expected 2 notifications, got ${count}`);
});

// Test 2: Observer Pattern - Unsubscribe
test('should stop notifying after unsubscribe', () => {
  const nc = new NotificationCenter();
  let count = 0;
  
  const observer = () => count++;
  const unsubscribe = nc.subscribe(observer);
  
  nc.notify('test1');
  assert(count === 1, `Expected 1 notification, got ${count}`);
  
  unsubscribe();
  nc.notify('test2');
  assert(count === 1, `Expected count to stay 1, got ${count}`);
});

// Test 3: Set - Track unique users
test('should track unique users with Set', () => {
  const nc = new NotificationCenter();
  
  nc.notify('msg1', 'user1');
  nc.notify('msg2', 'user1'); // Same user
  nc.notify('msg3', 'user2');
  
  assert(nc.getNotifiedCount() === 2, `Expected 2 unique users, got ${nc.getNotifiedCount()}`);
  assert(nc.hasNotified('user1'), 'user1 should be notified');
  assert(nc.hasNotified('user2'), 'user2 should be notified');
  assert(!nc.hasNotified('user3'), 'user3 should not be notified');
});

// Test 4: Set - Get notified users array
test('should return array of notified users', () => {
  const nc = new NotificationCenter();
  
  nc.notify('msg', 'user1');
  nc.notify('msg', 'user2');
  
  const users = nc.getNotifiedUsers();
  assert(Array.isArray(users), 'Should return an array');
  assert(users.length === 2, `Expected 2 users, got ${users.length}`);
  assert(users.includes('user1'), 'Should include user1');
  assert(users.includes('user2'), 'Should include user2');
});

// Test 5: Map - Set and get preferences
test('should store and retrieve user preferences with Map', () => {
  const nc = new NotificationCenter();
  
  nc.setPreferences('user1', { email: true, push: false });
  const prefs = nc.getPreferences('user1');
  
  assert(prefs.email === true, 'Email should be true');
  assert(prefs.push === false, 'Push should be false');
});

// Test 6: Map - Default preferences
test('should return default preferences for unknown user', () => {
  const nc = new NotificationCenter();
  
  const prefs = nc.getPreferences('unknownUser');
  
  assert(prefs.email === true, 'Default email should be true');
  assert(prefs.push === true, 'Default push should be true');
  assert(prefs.sms === true, 'Default sms should be true');
});

// Test 7: Map - Respect user preferences
test('should respect user notification preferences', () => {
  const nc = new NotificationCenter();
  let notificationsSent = 0;
  
  nc.subscribe(() => notificationsSent++);
  nc.setPreferences('user1', { email: true, push: false });
  
  nc.notify('test', 'user1', 'email');
  assert(notificationsSent === 1, 'Email notification should be sent');
  
  nc.notify('test', 'user1', 'push');
  assert(notificationsSent === 1, 'Push notification should be blocked');
});

// Test 8: Map - Get users by preference
test('should filter users by notification preference', () => {
  const nc = new NotificationCenter();
  
  nc.setPreferences('user1', { email: true, push: false });
  nc.setPreferences('user2', { email: false, push: true });
  nc.setPreferences('user3', { email: true, push: true });
  
  const emailUsers = nc.getUsersByPreference('email');
  const pushUsers = nc.getUsersByPreference('push');
  
  assert(emailUsers.length === 2, `Expected 2 email users, got ${emailUsers.length}`);
  assert(pushUsers.length === 2, `Expected 2 push users, got ${pushUsers.length}`);
  assert(emailUsers.includes('user1'), 'user1 should want email');
  assert(emailUsers.includes('user3'), 'user3 should want email');
  assert(pushUsers.includes('user2'), 'user2 should want push');
  assert(pushUsers.includes('user3'), 'user3 should want push');
});

// Test 9: Integration - All features together
test('should work with all features combined', () => {
  const nc = new NotificationCenter();
  let notifications = [];
  
  nc.subscribe((msg, userId, type) => {
    notifications.push({ msg, userId, type });
  });
  
  nc.setPreferences('user1', { email: true, push: false });
  nc.setPreferences('user2', { email: true, push: true });
  
  nc.notify('Welcome', 'user1', 'email');
  nc.notify('Alert', 'user1', 'push'); // Should be blocked
  nc.notify('Hello', 'user2', 'email');
  nc.notify('Update', 'user2', 'push');
  
  assert(notifications.length === 3, `Expected 3 notifications, got ${notifications.length}`);
  assert(nc.getNotifiedCount() === 2, 'Should have 2 unique users');
});

// Summary
console.log('\n' + '='.repeat(50));
console.log(`Tests Passed: ${testsPassed}`);
console.log(`Tests Failed: ${testsFailed}`);
console.log('='.repeat(50));

if (testsFailed === 0) {
  console.log('\n🎉 All tests passed!');
  process.exit(0);
} else {
  console.log('\n❌ Some tests failed');
  process.exit(1);
}