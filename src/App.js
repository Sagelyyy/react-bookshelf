import './App.css';
import React, { useState } from "react";
import Card from './components/Card';
import Modal from './components/Modal';


function App() {

  const [modalState, setModalState] = useState({
    isOpen: false
  })

  const [bookshelf, setBookShelf] = useState(
    [{
      title: 'The Lord of The Rings',
      author: 'J.R.R. Tolkien',
      pageCount: '1178',
      bookStatus: ''
    },
    {
      title: '1984',
      author: 'George Orwell',
      pageCount: '328',
      bookStatus: ''
    }
    ]
  )

  const modalHandler = () => {
    setModalState({ isOpen: true })
  }

  const onSubmit = (e, data) => {
    e.preventDefault()
    setBookShelf(old => [...old, data])
    console.log(bookshelf)
  }

  const removeBook = (item) => {
    const itemIndex = bookshelf.findIndex((i) => i.product === item.product);
    if (itemIndex > -1) {
        const newShelf = bookshelf.slice();
        newShelf.splice(itemIndex, 1)
        setBookShelf(newShelf);
    }
  }

  const cardElements = bookshelf.map((book,index )=> {
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
      <div className='App--title'><h1>Your Personal Library <span className='App--book--icon'>📖</span></h1></div>
      <span onClick={modalHandler} className="material-icons App--menu">
        add
      </span>
      <Modal onSubmit={((e, data) => onSubmit(e, data))} bookshelf={bookshelf} modalState={modalState} setModalState={setModalState} />
      <div className='App--book'>
        {cardElements.length > 0 ? cardElements : <h1>Click the <span className='material-icons app--menu--small'>add</span> to add some books!</h1>}
      </div>

    </div>
  );
}

export default App;
