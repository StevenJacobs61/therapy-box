import { initializeApp } from "firebase/app";
import{ getAuth} from 'firebase/auth'
import {getStorage,  uploadBytes, ref, getDownloadURL, listAll, deleteObject} from 'firebase/storage'
import { getFirestore, collection, doc, updateDoc, arrayUnion, getDoc, getDocs } from "firebase/firestore"
import {v4} from 'uuid';


const firebaseConfig = {
  apiKey: `${process.env.REACT_APP_FIRE_API_KEY}`,
  authDomain: "therapy-box-task.firebaseapp.com",
  projectId: "therapy-box-task",
  storageBucket: "therapy-box-task.appspot.com",
  messagingSenderId: "134263139462",
  appId: "1:134263139462:web:1a6fdabc8725ede7abb507"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app)

// Get profile picture
export async function getProfilePic(currentUser, setLoading){
  const profilePictureRef = ref(storage, `/ProfilePics/${currentUser?.uid}.png`);
  const profilePictureUrl = await getDownloadURL(profilePictureRef)
  setLoading(false)
  return profilePictureUrl
}

// Set profile picture
export async function setProfilePicture(file, currentUser){
  await upload(file, `/ProfilePics/${currentUser?.uid}.png`)
};

// Get all user images
export async function getPics(uid){
  const imageRef = ref(storage, `/Images/${uid}/`)
  const list = await listAll(imageRef);
  const urlList = await Promise.all(list.items.map(async (item) => {
    let url = await getDownloadURL(item);
    return url;
  }));
  return urlList;
}

// Upload user image to collection
export async function uploadPic(file, uid){
  const location = `/Images/${uid}/${v4()}${file?.name}`;
  upload(file, location)
}

// Delete image from storage
export async function deleteImage(url, uid){
  const storage = getStorage();
  const imagesRef = ref(storage, `Images/${uid}/`);
  try {
    const res = await listAll(imagesRef);
    res.items.forEach(async (itemRef) => {
        const imageUrl = await getDownloadURL(itemRef);
        if (imageUrl === url) {
          await deleteObject(itemRef);
          console.log("Image deleted successfully!");
        }
    });
  } catch (error) {
    console.error(error);
  }
}

// Upload 
export async function upload(file, location){
  const fileRef = ref(storage, location);
  const snapshot = await uploadBytes(fileRef, file);
};

// Get user's tasks

export async function getUserTasks(uid){
  try {
    const userDoc = await getDoc(doc(db, 'Users', uid));
    if (!userDoc.exists()) {
      throw new Error('User document does not exist');
    }
    const userData = userDoc.data();
    const tasks = userData.tasks;
    return tasks;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Update Task

export async function addTaskToUser(uid, taskData){
  const userRef = doc(db, 'Users', uid);
const docSnap = await getDoc(userRef);
if (docSnap.exists()) {
  await updateDoc(userRef, {
    tasks: arrayUnion({
      id: taskData.id,
      taskQuestion: taskData.taskQuestion,
      complete: taskData.complete,
    })
  });
} else {
  console.error('Error: no user document found for uid', uid);
}
}

// Update task true or false

export async function toggleTaskComplete(uid, taskId){
  const userRef = doc(db, "Users", uid);
  const userDoc = await getDoc(userRef);
  if (userDoc.exists()) {
    const user = userDoc.data();
    const updatedTasks = user.tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          complete: !task.complete
        };
      } else {
        return task;
      }
    });
    await updateDoc(userRef, { tasks: updatedTasks });
  } else {
    throw new Error("User not found");
  }
}

// Delete task

export async function deleteTask(uid, task) {
  const userRef = doc(db, "Users", uid);
  const userDoc = await getDoc(userRef);
  const tasksList = userDoc.data()?.tasks || [];
  const updatedTasksList = tasksList.filter((item) => item.id !== task.id);
  await updateDoc(userRef, {
    tasks: updatedTasksList,
  });
}


// Get user email

export async function getUserEmail(username){
  try {
    const querySnapshot = await getDocs(collection(db, 'Users'));
    const userDoc = querySnapshot.docs.find((doc) => doc.data().username === username);
    if (!userDoc) {
      throw new Error(`User with username ${username} does not exist`);
    }
    const { email } = userDoc.data();
    return email;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
