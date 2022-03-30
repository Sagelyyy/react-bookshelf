import './App.css';
import React, { useState } from "react";
import Card from './components/Card';
import Modal from './components/Modal';
import { getFirestore, getDocs, collection, doc, setDoc, addDoc, deleteDoc, query, where } from "firebase/firestore";
import firebaseApp from "./firebase"
import Login from './components/Login';
import UserInfo from './components/UserInfo';


function App() {

  const [user, setUser] = useState(null);

  const [modalState, setModalState] = useState({
    isOpen: false
  })

  const [bookshelf, setBookShelf] = useState([])

  const db = getFirestore(firebaseApp)

  const getUser = async () => {
    firebaseApp.auth().onAuthStateChanged(user => {
      setUser(user);
    })
  }

  const writeUserData = async (userId, name, email) => {
    const docRef = await setDoc(doc(db, "users", userId), {
      name: name,
      email: email

    })
  }

  const writeBookData = async (userid, book) => {
    const docRef = await addDoc(collection(db, "users", userid, "books"), book);
  }

  const getData = async () => {
    const querySnapshot = await getDocs(collection(db, `users/${user.uid}/books`));
    const dbBooks = []
    querySnapshot.forEach((doc) => {
      dbBooks.push(doc.data())
    });
    setBookShelf(dbBooks)
  }

  React.useEffect(() => {
    getUser()
    if (user) {
      getData()
      writeUserData(user.uid, user.displayName, user.email)
    }
    if (!user) {
      setBookShelf([])
    }
  }, [user])

  const modalHandler = () => {
    setModalState({ isOpen: true })
  }

  const onSubmit = (e, data) => {
    e.preventDefault()
    setBookShelf(old => [...old, data])
    if (user) {
      writeBookData(user.uid, data)
    }

    setModalState({ isOpen: false })
  }

  const removeBook = (item) => {
    if (user) {
      deleteBookData(user.uid, item)
    }
    const itemIndex = bookshelf.findIndex((i) => i.title === item.title);
    if (itemIndex > -1) {
      const newShelf = bookshelf.slice();
      newShelf.splice(itemIndex, 1)
      setBookShelf(newShelf);
    }
  }

  const deleteBookData = async (userID, item) => {
    const querySnapshot = await getDocs(collection(db, "users", userID, "books"));
    querySnapshot.forEach((docItem) => {
      if (item.title === docItem.data().title) {
        deleteDoc(doc(db, "users", userID, "books", docItem.id))
      }
    });
  }

  const cardElements = bookshelf.map((book, index) => {
    return (
      <Card
        title={book.title}
        author={book.author}
        pageCount={book.pageCount}
        bookStatus={book.bookStatus}
        onDelete={(() => removeBook(book))}
        key={index}
      />
    )
  })

  return (
    <div className="App">
      <div className='App--title'>
        <h1>Your Personal Library <span className='App--book--icon'>📖</span></h1>
        <div className='App--login'>
          {user ? <UserInfo user={user} /> : <Login />}
        </div>
      </div>
      <span onClick={modalHandler} className="material-icons App--menu">
        add
      </span>
      <Modal onSubmit={((e, data) => onSubmit(e, data))} bookshelf={bookshelf} modalState={modalState} setModalState={setModalState} />
      {user ? '' : <h1 style={{textAlign: 'center', marginLeft: '5rem', fontWeight: '300'}}>Please login to save your books.</h1> }
      <br></br>
      <div className='App--book'>
        {cardElements.length > 0 ? cardElements : <h1>Click the <span className='material-icons app--menu--small'>add</span> to add some books!</h1>}
      </div>

    </div>
  );
}

export default App;
