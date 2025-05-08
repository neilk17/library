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

function makeBookDiv(book) {
  let bookDiv = document.createElement('div');
  let bookTitle = document.createElement('p')
  let bookAuthor = document.createElement('p');
  let pageCount = document.createElement('p');
  let deleteButton = document.createElement('button');
  let readButton = document.createElement('button');

  bookTitle.innerText = book.title;
  bookAuthor.innerText = book.author;
  pageCount.innerText = book.pageCount;

  deleteButton.innerText = 'delete';
  deleteButton.dataset.action = 'delete'

  readButton.innerText = book.read ? 'mark unread' : 'mark read';
  readButton.dataset.action = 'toggle-read';

  bookDiv.appendChild(bookTitle);
  bookDiv.appendChild(bookAuthor);
  bookDiv.appendChild(pageCount);
  bookDiv.appendChild(deleteButton);
  bookDiv.appendChild(readButton);

  readButton.dataset.indexNumber = book.id;
  deleteButton.dataset.indexNumber = book.id;

  return bookDiv;
}

function renderInitialList() {
  for (const book of myLibrary) {
    bookList.appendChild(makeBookDiv(book));
  }
}

const bookForm = document.querySelector('#book-form');

bookForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const form = e.target;

  const formData = new FormData(form);
  const title = formData.get('title');
  const author = formData.get('author');
  const pageCount = formData.get('pages');
  const read = formData.get('read');

  const book = addBookToLibrary(title, author, pageCount, read);
  let div = makeBookDiv(book);
  bookList.appendChild(div);
});

const books = document.querySelectorAll("[data-index-number]");

bookList.addEventListener('click', (e) => {
  const btn = e.target;
  if (!btn.matches('button[data-action]')) return;

  const id = btn.dataset.indexNumber;
  const index = myLibrary.findIndex(book => book.id === id);
  // console.log(myLibrary, id, index, btn.dataset.action);

  if (btn.dataset.action === 'delete') {
    myLibrary.splice(index, 1);
    btn.parentElement.remove();
  } else if (btn.dataset.action === 'toggle-read') {
    const book = myLibrary[index];
    book.read = !book.read;
    btn.innerText = book.read ? 'mark unread' : 'mark read';
  } else {
    console.log('something else')
  }

})

renderInitialList();