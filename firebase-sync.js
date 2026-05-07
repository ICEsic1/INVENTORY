// Real-time Firebase Sync Module
// Handles real-time updates for inventory, tasks, and audit logs

import { db } from './firebase-config.js';

// Real-time Inventory Sync
export const syncInventory = (callback) => {
  const unsubscribe = db.collection('inventory')
    .where('id', '!=', null)
    .orderBy('id')
    .onSnapshot((snapshot) => {
      const items = [];
      snapshot.forEach((doc) => {
        items.push({ docId: doc.id, ...doc.data() });
      });
      callback(items);
    }, (error) => {
      console.error('Inventory sync error:', error);
    });

  return unsubscribe;
};

// Real-time Tasks Sync
export const syncTasks = (callback) => {
  const unsubscribe = db.collection('tasks')
    .where('id', '!=', null)
    .orderBy('id')
    .onSnapshot((snapshot) => {
      const tasks = [];
      snapshot.forEach((doc) => {
        tasks.push({ docId: doc.id, ...doc.data() });
      });
      callback(tasks);
    }, (error) => {
      console.error('Tasks sync error:', error);
    });

  return unsubscribe;
};

// Real-time Audit Logs Sync
export const syncAuditLogs = (callback) => {
  const unsubscribe = db.collection('audit_logs')
    .orderBy('timestamp', 'desc')
    .limit(100)
    .onSnapshot((snapshot) => {
      const logs = [];
      snapshot.forEach((doc) => {
        logs.push({ docId: doc.id, ...doc.data() });
      });
      callback(logs);
    }, (error) => {
      console.error('Audit logs sync error:', error);
    });

  return unsubscribe;
};

// Add Inventory Item
export const addInventoryItem = async (item) => {
  try {
    const newId = Date.now().toString();
    await db.collection('inventory').doc(newId).set({
      id: parseInt(newId),
      item_name: item.item_name,
      item_size: item.item_size,
      quantity: item.quantity,
      price: item.price,
      color_tag: item.color_tag,
      created_at: new Date(),
      updated_at: new Date()
    });

    // Log action
    await logAction('CREATE', parseInt(newId), `Added item: ${item.item_name}`, item);

    return { success: true, id: newId };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Update Inventory Item
export const updateInventoryItem = async (docId, updates) => {
  try {
    await db.collection('inventory').doc(docId).update({
      ...updates,
      updated_at: new Date()
    });

    // Log action
    await logAction('UPDATE', parseInt(docId), 'Updated item', updates);

    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Delete Inventory Item
export const deleteInventoryItem = async (docId) => {
  try {
    const doc = await db.collection('inventory').doc(docId).get();
    const itemData = doc.data();

    await db.collection('inventory').doc(docId).delete();

    // Log action
    await logAction('DELETE', parseInt(docId), `Deleted item: ${itemData?.item_name}`, itemData);

    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Log Action to Audit Trail
export const logAction = async (action, itemId, description, details = {}) => {
  try {
    const currentUser = auth.currentUser;
    await db.collection('audit_logs').add({
      action: action,
      item_id: itemId,
      user: currentUser?.email || 'system',
      timestamp: new Date(),
      details: description
    });
  } catch (error) {
    console.error('Error logging action:', error);
  }
};

// Add Task
export const addTask = async (task) => {
  try {
    const newId = Date.now().toString();
    await db.collection('tasks').doc(newId).set({
      id: parseInt(newId),
      title: task.title,
      description: task.description,
      status: task.status,
      assigned_to: task.assigned_to,
      created_at: new Date(),
      updated_at: new Date()
    });

    await logAction('CREATE_TASK', 0, `Created task: ${task.title}`);

    return { success: true, id: newId };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Update Task
export const updateTask = async (docId, updates) => {
  try {
    await db.collection('tasks').doc(docId).update({
      ...updates,
      updated_at: new Date()
    });

    await logAction('UPDATE_TASK', 0, 'Updated task');

    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
