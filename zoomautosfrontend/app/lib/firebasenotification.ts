import admin from 'firebase-admin';
import path from 'path';
import fs from 'fs';

// Initialize Firebase Admin synchronously
if (!admin.apps.length) {
  try {
    const serviceAccountPath = path.resolve(process.cwd(), 'app/lib/serviceaccount.json');

    const credentials = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf-8'));

    admin.initializeApp({
      credential: admin.credential.cert(credentials),
      databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    });

    console.log('✅ Firebase Admin initialized');
  } catch (err) {
    console.error('❌ Failed to load Firebase service account:', err);
  }
}

const db = admin.database();

export const sendJobUpdateToUser = async (userId: string, jobData: any) => {
  try {
    await db.ref(`jobs/${userId}/${jobData.jobId}`).set(jobData);
    console.log(`📦 Job update queued for user ${userId}`);
  } catch (err) {
    console.error('❌ Error updating job for user:', err);
  }
};

export const sendJobUpdateToAdmins = async (jobData: any) => {
  try {
    await db.ref(`jobs/admins/${jobData.jobId}`).set(jobData);
    console.log('📢 Job update queued for admins');
  } catch (err) {
    console.error('❌ Error updating job for admins:', err);
  }
};
