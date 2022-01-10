const inputTitle = document.querySelector('#title');
const inputAuthor = document.querySelector('#author');
const booksContainer = document.querySelector('.book-container');
const indicator = document.querySelector('#indicator');

class Book {
  static collection = [];

  constructor(title, author) {
    this.title = title;
    this.author = author;
  }

  static saveDataLocally = () => {
    const stringifiedLibrary = JSON.stringify(Book.collection);
    localStorage.setItem('library', stringifiedLibrary);
  }

  removeBook = () => {
    Book.collection = Book.collection.filter((book) => book.title !== this.title
    || book.author !== this.author);
    Book.saveDataLocally();
  };

  addBook = () => {
    Book.collection.push(this);
    Book.saveDataLocally();
    this.displayBook();
  }

  displayBook = () => {
    const bookCard = document.createElement('div');
    const cardTitle = document.createElement('p');
    const removeButton = document.createElement('button');

    bookCard.classList.add('book-Card');

    cardTitle.textContent = `"${this.title}"   by   ${this.author}`;
    removeButton.textContent = 'Remove';
    removeButton.classList.add('remove');

    bookCard.appendChild(cardTitle);
    bookCard.appendChild(removeButton);

    booksContainer.appendChild(bookCard);

    removeButton.addEventListener('click', () => {
      this.removeBook();
      Book.saveDataLocally();
      booksContainer.removeChild(bookCard);
    });
  }
}

function checkRepetition(book) {
  for (let i = 0; i < Book.collection.length; i += 1) {
    const currentBook = Book.collection[i];
    if (currentBook.title.toLowerCase() === book.title.toLowerCase()
    && currentBook.author.toLowerCase() === book.author.toLowerCase()) {
      indicator.textContent = 'Book already added';
      return false;
    }
  }
  return true;
}

function addBookToLibrary() {
  const inputTitleValue = inputTitle.value;
  const inputAuthorValue = inputAuthor.value;
  const book = new Book(inputTitleValue.trim(), inputAuthorValue.trim());
  if (checkRepetition(book)) {
    book.addBook();
    indicator.textContent = 'Book added succesfully';
  }
}

const renderBooks = () => {
  Book.collection.forEach((book) => {
    book.displayBook();
  });
};

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
      Book.collection.push(newBook);
    });
  }
  renderBooks();
};

const aTags = document.querySelectorAll('a');
const sections = document.querySelectorAll('section');
const reGex = /#[\w-]+/g;

aTags.forEach((a) => {
  a.addEventListener('click', (event) => {
    const currentId = event.target.href.match(reGex)[0];
    const currentSection = document.querySelector(currentId);
    indicator.textContent = '';

    let currentLink = document.querySelector('.selected');
    currentLink.classList.remove('selected');

    currentLink = event.target;

    sections.forEach((section) => {
      if (section === currentSection) {
        section.classList.remove('d-none');
        currentLink.classList.add('selected');
      } else {
        section.classList.add('d-none');
      }
    });
  });
});