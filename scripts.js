let library = [];

function Book(title, author) {
  this.title = title;
  this.author = author;
}

const removeBook = (title, author) => {
  library = library.filter((book) => book.title !== title || book.author !== author);
};

const booksContainer = document.querySelector('.book-container');

const saveDataLocally = (library) => {
  const stringifiedLibrary = JSON.stringify(library);
  localStorage.setItem('library', stringifiedLibrary);
};

function displayBook(book) {
  const bookCard = document.createElement('div');
  const cardTitle = document.createElement('p');
  const cardAuthor = document.createElement('p');
  const removeButton = document.createElement('button');

  bookCard.classList.add('book-Card');

  cardTitle.textContent = book.title;
  cardAuthor.textContent = book.author;
  removeButton.textContent = 'Remove';

  bookCard.appendChild(cardTitle);
  bookCard.appendChild(cardAuthor);
  bookCard.appendChild(removeButton);

  booksContainer.appendChild(bookCard);

  removeButton.addEventListener('click', () => {
    removeBook(book.title, book.author);
    saveDataLocally(library);
    booksContainer.removeChild(bookCard);
  });
}

function renderBooks() {
  library.forEach((book) => {
    displayBook(book);
  });
}

const inputTitle = document.querySelector('#title');
const inputAuthor = document.querySelector('#author');

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

function addBookToLibrary() {
  const inputTitleValue = inputTitle.value;
  const inputAuthorValue = inputAuthor.value;
  const book = new Book(inputTitleValue, inputAuthorValue);
  if (checkRepetition(book)) {
    library.push(book);
    saveDataLocally(library);
    displayBook(book);
  }
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
    const myLibrary = JSON.parse(localStorage.getItem('library'));
    library = myLibrary;
  }
  renderBooks();
};
