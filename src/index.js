import { initializeApp } from 'firebase/app'
import {
    getFirestore, collection, onSnapshot,
    addDoc, deleteDoc, doc,
    query, where, orderBy
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDCV1I4owNQ7JtWD2kj4Bb0wO9YphMs-10",
    authDomain: "fir-tutorial-3c857.firebaseapp.com",
    projectId: "fir-tutorial-3c857",
    storageBucket: "fir-tutorial-3c857.appspot.com",
    messagingSenderId: "494627447310",
    appId: "1:494627447310:web:a0e9df19e2501c18a7525f"
}


// initialize firebase App
initializeApp(firebaseConfig)

// initialize services
const db = getFirestore()

// collection ref
const colRef = collection(db, 'goals')

//get collection data
// getDocs(colRef)

//     .then((snapshot) => {
//         let goals = []
//         snapshot.docs.forEach((doc) => {
//             goals.push({ ...doc.data(), id: doc.id })
//         })
//         console.log(goals)
//     })
//     .catch(err => {
//         console.log(err.message)
//     })

const q = query(colRef, where("author", "==", "technologist"))

// Realtime Database
onSnapshot(q, (snapshot) => {
    let goals = []
    snapshot.docs.forEach((doc) => {
        goals.push({ ...doc.data(), id: doc.id })
    })
    console.log(goals)
})

// adding documents 
const addGoalForm = document.querySelector('.add')
addGoalForm.addEventListener('submit', (e) => {
    e.preventDefault()

    addDoc(colRef, {
        objective: addGoalForm.objective.value,
        author: addGoalForm.author.value,
    })
        .then(() => {
            addGoalForm.reset()
        })

})

// deleting documents 
const deleteGoalForm = document.querySelector('.delete')
deleteGoalForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const docRef = doc(db, 'goals', deleteGoalForm.id.value)

    deleteDoc(docRef)
        .then(() => {
            deleteGoalForm.reset()
        })
})