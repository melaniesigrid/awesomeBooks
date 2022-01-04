class Library {
  constructor() {
    this.collection = [];
  }
  saveDataLocally = () => {
    const stringifiedLibrary = JSON.stringify(this.collection);
    localStorage.setItem('library', stringifiedLibrary);
  }
  renderBooks = () => {
    this.collection.forEach((book) => {
    displayBook(library);
  });
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
  
  booksContainer = document.querySelector('.book-container');
  
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
const myLibrary = new Library();

function checkRepetition(book) {
  for (let i = 0; i < library.length; i += 1) {
    const currentBook = library[i];
    if (currentBook.title.toLowerCase() === book.title.toLowerCase()
    && currentBook.author.toLowerCase() === book.author.toLowerCase()) {
      alert('Book already added');
      return false;
    }
  }
  return true;
}





