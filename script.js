const myLibrary = [];

function Book(title, author, pageCount, read) {
  this.id = crypto.randomUUID()
  this.title = title;
  this.author = author;
  this.pageCount = pageCount;
  this.read = read;
}

function addBookToLibrary(title, author, pageCount, read) {
  const bookObject = new Book(title, author, pageCount, read);
  myLibrary.push(bookObject);
  return bookObject;
}

addBookToLibrary('Lord of the Rings: The Fellowship of the Ring', 'J.R.R. Tolkien', 123, true);
addBookToLibrary('Lord of the Rings: The Two Towers', 'J.R.R. Tolkien', 223, false);

const parentDiv = document.createElement('div');
document.body.appendChild(parentDiv);

const bookList = document.querySelector('#book-list');
parentDiv.appendChild(bookList);

for (const book of myLibrary) {
  let bookDiv = document.createElement('div');

  let bookTitle = document.createElement('p')
  bookTitle.innerText = book.title;

  let bookAuthor = document.createElement('p');
  bookAuthor.innerText = book.author;

  let pageCount = document.createElement('p');
  pageCount.innerText = book.pageCount;

  let isRead = document.createElement('p');
  isRead.innerText = book.read ? 'read' : 'not read';

  let bookButton = document.createElement('button');
  bookButton.innerText = 'x';

  bookDiv.appendChild(bookTitle);
  bookDiv.appendChild(bookAuthor);
  bookDiv.appendChild(pageCount);
  bookDiv.appendChild(isRead);
  bookDiv.appendChild(bookButton);

  bookButton.setAttribute('data-index-number', book.id)

  bookList.appendChild(bookDiv);
}

const newBookButton = document.querySelector('#add-book');
const closeBookModal = document.querySelector('#close-modal');

const newBookDialog = document.querySelector('#new-book')

function closeNewBookDialog() {
  newBookDialog.removeAttribute('open');
}

function openNewBookDialog() {
  newBookDialog.setAttribute('open', true);
}

newBookButton.addEventListener('click', openNewBookDialog);
closeBookModal.addEventListener('click', closeNewBookDialog);

const bookForm = document.querySelector('#book-form');

bookForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const form = e.target;

  const formData = new FormData(form);
  const title = formData.get('title');
  const author = formData.get('author');
  const pageCount = formData.get('pages');
  const read = formData.get('read');

  const id = addBookToLibrary(title, author, pageCount, read).id;

  let bookDiv = document.createElement('div');

  let bookTitle = document.createElement('p')
  bookTitle.innerText = title;

  let bookAuthor = document.createElement('p');
  bookAuthor.innerText = author;

  let pages = document.createElement('p');
  pageCount.innerText = pageCount;

  let isRead = document.createElement('p');
  isRead.innerText = read ? 'read' : 'not read';

  let bookButton = document.createElement('button');
  bookButton.innerText = 'x';

  bookDiv.appendChild(bookTitle);
  bookDiv.appendChild(bookAuthor);
  bookDiv.appendChild(pages);
  bookDiv.appendChild(isRead);
  bookDiv.appendChild(bookButton);

  bookButton.setAttribute('data-index-number', id)
  bookButton.addEventListener("click", (e) => {
    const index = myLibrary.findIndex(book => book.id === id);
    myLibrary.splice(index, 1);
    console.log(myLibrary);

    e.currentTarget.parentElement.remove();
  });

  bookList.appendChild(bookDiv);
});

const books = document.querySelectorAll("[data-index-number]");

for (let bookDivLol of books) {
  const bookId = bookDivLol.dataset.indexNumber;
  bookDivLol.addEventListener("click", (e) => {
    const index = myLibrary.findIndex(book => book.id === bookId);
    myLibrary.splice(index, 1);
    console.log(myLibrary);

    e.currentTarget.parentElement.remove();
  });
}