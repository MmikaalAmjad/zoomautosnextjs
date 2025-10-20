import admin from 'firebase-admin';
import path from 'path';
import { promises as fs } from 'fs';

// Ensure Firebase Admin SDK initializes only once
if (!admin.apps.length) {
  const serviceAccountPath = path.resolve(process.cwd(), 'serviceAccount.json'); // ✅ filename example

  // Lazy load JSON securely
  const loadServiceAccount = async () => {
    try {
      const data = await fs.readFile(serviceAccountPath, 'utf-8');
      const credentials = JSON.parse(data);

      admin.initializeApp({
        credential: admin.credential.cert(credentials),
        databaseURL: process.env.FIREBASE_DATABASE_URL, // ✅ use env variable for safety
      });

      console.log('✅ Firebase Admin initialized');
    } catch (err) {
      console.error('❌ Failed to load Firebase service account:', err);
    }
  };

  // Run the async init
  loadServiceAccount();
}

const db = admin.database();

/** Send job update to specific user */
export const sendJobUpdateToUser = async (userId: string, jobData: any) => {
  try {
    await db.ref(`jobs/${userId}/${jobData.jobId}`).set(jobData);
    console.log(`📦 Job update queued for user ${userId}`);
  } catch (err) {
    console.error('❌ Error updating job for user:', err);
  }
};

/** Send job update to all admins */
export const sendJobUpdateToAdmins = async (jobData: any) => {
  try {
    await db.ref(`jobs/admins/${jobData.jobId}`).set(jobData);
    console.log('📢 Job update queued for admins');
  } catch (err) {
    console.error('❌ Error updating job for admins:', err);
  }
};
