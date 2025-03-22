
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
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

export const registerTeam = async (formData: {
  teamName: string;
  projectTitle: string;
  category: string;
  abstract: string;
  members: TeamMember[];
}, videoFile: File): Promise<string> => {
  try {
    // 1. Upload the video to Firebase Storage
    const videoRef = ref(storage, `videos/${formData.teamName}_${Date.now()}`);
    await uploadBytes(videoRef, videoFile);
    const videoUrl = await getDownloadURL(videoRef);

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
