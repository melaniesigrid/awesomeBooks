let library = [];

function Book(title, author) {
  this.title = title;
  this.author = author;
}

const removeBook = (index) => {
  library = library.filter((element, ind) => ind !== index);
}

const booksContainer = document.querySelector('.book-container');

function renderBooks() {
  library.forEach((book) => {
    displayBook(book);
  })
}

function displayBook(book) {
  const bookCard = document.createElement('div');
  const cardTitle = document.createElement('p');
  const cardAuthor = document.createElement('p');
  const removeButton = document.createElement('button');

  bookCard.classList.add('book-Card')

  cardTitle.textContent = book.title;
  cardAuthor.textContent = book.author;
  removeButton.textContent = 'Remove';

  removeButton.addEventListener('click', () => {
    removeBook(index);
    saveDataLocally(library);
  });

  bookCard.appendChild(cardTitle);
  bookCard.appendChild(cardAuthor);
  bookCard.appendChild(removeButton);

  booksContainer.appendChild(bookCard);
}

const saveDataLocally = (library) => {
  const stringifiedLibrary = JSON.stringify(library);
  localStorage.setItem('library', stringifiedLibrary);
}

function addBookToLibrary() {
  const inputTitle = document.querySelector('#title').value;
  const inputAuthor = document.querySelector('#author').value;
  const book = new Book(inputTitle, inputAuthor);
  library.push(book);
  saveDataLocally(library);
  displayBook(book);
}

const addButton = document.querySelector('.add');
addButton.addEventListener('click', () => addBookToLibrary());

window.onload = () => {
  if (localStorage.getItem('library') !== null) {
  let myLibrary = JSON.parse(localStorage.getItem('library'));
  library = myLibrary;
  } 
  renderBooks();
}
