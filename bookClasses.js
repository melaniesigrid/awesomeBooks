class Library {
  constructor() {
    this.collection = [];
  }
  saveDataLocally = () => {
    const stringifiedLibrary = JSON.stringify(this.collection);
    localStorage.setItem('library', stringifiedLibrary);
  }
}

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }

  removeBook = (library) => {
    library.collection = library.collection.filter((book) => book.title !== this.title || book.author !== this.author);
  };

  addBook = (library) => {
    library.collection.push(this);
    library.saveDataLocally();
    this.displayBook(library);
  }
    
  displayBook = (library) => {
    const bookCard = document.createElement('div');
    const cardTitle = document.createElement('p');
    const cardAuthor = document.createElement('p');
    const removeButton = document.createElement('button');

    bookCard.classList.add('book-Card');

    cardTitle.textContent = this.title;
    cardAuthor.textContent = this.author;
    removeButton.textContent = 'Remove';

    bookCard.appendChild(cardTitle);
    bookCard.appendChild(cardAuthor);
    bookCard.appendChild(removeButton);

    booksContainer.appendChild(bookCard);

    removeButton.addEventListener('click', () => {
      this.removeBook(library);
      library.saveDataLocally();
      booksContainer.removeChild(bookCard);
    });
  }
}


const inputTitle = document.querySelector('#title');
const inputAuthor = document.querySelector('#author');
const booksContainer = document.querySelector('.book-container');
const myLibrary = new Library();

function checkRepetition(book) {
  for (let i = 0; i < myLibrary.collection.length; i += 1) {
    const currentBook = myLibrary.collection[i];
    if (currentBook.title.toLowerCase() === book.title.toLowerCase()
    && currentBook.author.toLowerCase() === book.author.toLowerCase()) {
      alert('Book already added');
      return false;
    }
  }
  return true;
}

function addBookToLibrary() {
  const inputTitleValue = inputTitle.value;
  const inputAuthorValue = inputAuthor.value;
  const book = new Book(inputTitleValue, inputAuthorValue);
  if (checkRepetition(book)) {
    book.addBook(myLibrary);
  }
}

renderBooks = () => {
  myLibrary.collection.forEach((book) => {
    book.displayBook(myLibrary);
});
}

const addForm = document.querySelector('form');
addForm.addEventListener('submit', (e) => {
  e.preventDefault();
  addBookToLibrary();
  inputTitle.value = '';
  inputAuthor.value = '';
});

window.onload = () => {
  if (localStorage.getItem('library') !== null) {
    const myStorageLibrary = JSON.parse(localStorage.getItem('library'));
    myStorageLibrary.forEach((book) => {
      const newBook = new Book(book.title, book.author);
      myLibrary.collection.push(newBook);
    })
  }
  renderBooks();
};






