// Firebase Authentication Module
// Handles login, logout, and user management with Firestore

import { auth, db } from './firebase-config.js';

// Sign Up User
export const signUpUser = async (email, password, role = 'staff') => {
  try {
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    const user = userCredential.user;

    // Create user document in Firestore
    await db.collection('users').doc(user.uid).set({
      uid: user.uid,
      email: email,
      role: role,
      created_at: new Date(),
      status: 'active'
    });

    return { success: true, uid: user.uid, message: 'User created successfully' };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Login User
export const loginUser = async (email, password) => {
  try {
    const userCredential = await auth.signInWithEmailAndPassword(email, password);
    const user = userCredential.user;

    // Get user role from Firestore
    const userDoc = await db.collection('users').doc(user.uid).get();
    const userData = userDoc.data();

    return { 
      success: true, 
      user: {
        uid: user.uid,
        email: user.email,
        role: userData?.role || 'staff'
      }
    };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Logout User
export const logoutUser = async () => {
  try {
    await auth.signOut();
    return { success: true, message: 'Logged out successfully' };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Get Current User
export const getCurrentUser = async () => {
  return new Promise((resolve) => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userDoc = await db.collection('users').doc(user.uid).get();
        const userData = userDoc.data();
        resolve({ authenticated: true, user: { ...userData } });
      } else {
        resolve({ authenticated: false, user: null });
      }
    });
  });
};

// Delete User (Admin only)
export const deleteUser = async (userId) => {
  try {
    // Delete from Firestore
    await db.collection('users').doc(userId).delete();

    // Delete from Firebase Auth (requires admin SDK)
    // This should be called from backend with admin credentials
    return { success: true, message: 'User deleted successfully' };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
