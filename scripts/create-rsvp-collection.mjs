import { initializeApp } from 'firebase/app'
import { doc, getDoc, getFirestore, serverTimestamp, setDoc } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDrxQumodCrEjCLQVYvT2gbh7Xa5vO6XbM',
  authDomain: 'wedding-invite-d0ce0.firebaseapp.com',
  projectId: 'wedding-invite-d0ce0',
  storageBucket: 'wedding-invite-d0ce0.firebasestorage.app',
  messagingSenderId: '257576731878',
  appId: '1:257576731878:web:ae125da8a61ee21ac4e727',
  measurementId: 'G-HJT6ETMDHQ'
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

async function createRsvpCollection() {
  const ref = doc(db, 'rsvp', '_meta')
  const snap = await getDoc(ref)

  if (snap.exists()) {
    console.log('rsvp collection already initialized.')
    return
  }

  await setDoc(ref, {
    type: 'system',
    note: 'Collection initializer document',
    createdAt: serverTimestamp()
  })

  console.log('Created rsvp collection with _meta document.')
}

createRsvpCollection().catch((error) => {
  console.error('Failed to create rsvp collection:', error?.message ?? error)
  process.exitCode = 1
})
