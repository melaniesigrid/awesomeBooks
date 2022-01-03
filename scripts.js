const library = [];

function Book(title, author) {
  this.title = title;
  this.author = author;
}

function addBookToLibrary(title,author){
  const book = new Book(title, author);
  library.push(book);
}

const booksContainer = document.querySelector('.book-container');

function renderBooks(){
  for (let index = 0; index < library.length; index += 1){
    const bookCard = document.createElement('div');
    const cardTitle = document.createElement('p');
    const cardAuthor = document.createElement('p'); 
    const removeButton = document.createElement('button'); 
    
    bookCard.classList.add('book-Card')

    const book = library[index];
    book.id = index;

    cardTitle.textContent = book.title;
    cardAuthor.textContent = book.author; 
    removeButton.textContent = 'Remove';

    bookCard.appendChild(cardTitle);
    bookCard.appendChild(cardAuthor);
    bookCard.appendChild(removeButton);

    booksContainer.appendChild(bookCard);
  }
}

addBookToLibrary('Sample title', 'Sample Author');
addBookToLibrary('Sample title', 'Sample Author');
addBookToLibrary('Sample title', 'Sample Author');
addBookToLibrary('Sample title', 'Sample Author');

renderBooks();