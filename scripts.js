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
  for (let index = 0; index < library.length; index += 1) {
    const book = library[index];
    displayBook(book);
  }
}

function displayBook(book) {
  const bookCard = document.createElement('div');
  const cardTitle = document.createElement('p');
  const cardAuthor = document.createElement('p');
  const removeButton = document.createElement('button');

  bookCard.classList.add('book-Card')
  // book.id = index;

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

function addBookToLibrary(title, author) {
  const inputTitle = document.querySelector('#title').value;
  const inputAuthor = document.querySelector('#author').value;
  const book = new Book(inputTitle, inputAuthor);
  library.push(book);
  saveDataLocally(library);
  displayBook(book);
}

const addButton = document.querySelector('.add');
addButton.addEventListener('click', () => addBookToLibrary(library));

window.onload = () => {
  if (localStorage.getItem('library') !== null) {
  let myLibrary = JSON.parse(localStorage.getItem('library'));
  library = myLibrary;
  renderBooks();
} else {
  renderBooks();
}
}
