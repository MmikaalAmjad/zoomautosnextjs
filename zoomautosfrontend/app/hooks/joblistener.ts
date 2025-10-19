import { useEffect } from "react";
import { ref, onValue, remove, getDatabase, onChildAdded } from "firebase/database";
import { database } from "../lib/firebase";


// 🔹 Dealer / User job listener
export const useJobListener = (userId:any, fetchRecords:any) => {
  useEffect(() => {
    console.log("👂 Listening for jobs at path:", `jobs/${userId}`);

    if (!userId) return;

    const jobsRef = ref(database, `jobs/${userId}`);

    const handleChildAdded = async (snapshot:any) => {
      console.log("📦 New job update for user:", snapshot.val());

      // ✅ Trigger fetchRecords whenever a new job arrives
      await fetchRecords();

      // 🧹 Remove this job from Firebase after processing
      await remove(ref(database, `jobs/${userId}/${snapshot.key}`));
    };

    const unsubscribe = onChildAdded(jobsRef, handleChildAdded);

    return () => unsubscribe();
  }, [userId, fetchRecords]);
};

export const useAdminJobListener = (refreshJobs:any) => {
  useEffect(() => {
    const db = getDatabase();
    const jobsRef = ref(db, "jobs/admins");

    const handleChildAdded = async (snapshot:any) => {
      console.log("📢 New job update for admins:", snapshot.val());
      await refreshJobs();
      await remove(ref(db, `jobs/admins/${snapshot.key}`));
    };

    const unsubscribe = onChildAdded(jobsRef, handleChildAdded);

    return () => unsubscribe();
  }, [refreshJobs]);
};
