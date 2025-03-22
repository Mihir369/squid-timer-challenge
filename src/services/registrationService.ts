
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { db, storage } from '@/lib/firebase';

export interface TeamMember {
  name: string;
  email: string;
  mobile: string;
  role: string;
  year: string;
}

export interface RegistrationData {
  teamName: string;
  projectTitle: string;
  category: string;
  abstract: string;
  members: TeamMember[];
  registrationTime: any;
  videoUrl?: string;
}

export const registerTeam = async (
  formData: {
    teamName: string;
    projectTitle: string;
    category: string;
    abstract: string;
    members: TeamMember[];
  }, 
  videoFile: File,
  onProgress?: (progress: number) => void
): Promise<string> => {
  try {
    // 1. Upload the video to Firebase Storage with progress tracking
    const videoRef = ref(storage, `videos/${formData.teamName}_${Date.now()}`);
    
    // Use uploadBytesResumable instead of uploadBytes to track progress
    const uploadTask = uploadBytesResumable(videoRef, videoFile);
    
    // Create a promise that resolves when upload is complete and tracks progress
    const uploadPromise = new Promise<string>((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          if (onProgress) {
            onProgress(progress);
          }
        },
        (error) => {
          console.error('Upload error:', error);
          reject(error);
        },
        async () => {
          // Upload completed successfully, get download URL
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL);
        }
      );
    });
    
    // Wait for the upload to complete and get the video URL
    const videoUrl = await uploadPromise;

    // 2. Save the team data to Firestore
    const registrationData: RegistrationData = {
      ...formData,
      registrationTime: Timestamp.now(),
      videoUrl
    };

    const docRef = await addDoc(collection(db, 'registrations'), registrationData);
    
    return docRef.id;
  } catch (error) {
    console.error('Error registering team:', error);
    throw error;
  }
};
