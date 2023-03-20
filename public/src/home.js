function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  const borrowed = [];
  const returned = [];
  for (let i = 0; i < books.length; i++) {
    if (books[i].borrows && books[i].borrows[0].returned) {
      returned.push(books[i]);
    } else {
      borrowed.push(books[i]);
    }
  }
  return borrowed.length;
}

function getMostCommonGenres(books) {
  let commonBooks = [];
  console.log(typeof books);
  books.forEach((book) => {
    let genre = book.genre;
    const findBookGenre = commonBooks.find((item) => item.name === genre);
    if (!findBookGenre) {
      const name = genre;
      let count = 1;
      const thisGenre = { name, count };
      commonBooks.push(thisGenre);
    } else {
      findBookGenre.count++;
    }
  });
  commonBooks.sort((itemA, itemB) => itemB.count - itemA.count);
  return commonBooks.slice(0, 5);
}

function getMostPopularBooks(books) {
  let result = [];
  books.forEach((book) => {
    let name = book.title;
    if (book.borrows) {
      const count = book.borrows.length;
      result.push({ name, count });
    }
  });
  result.sort((itemA, itemB) => itemB.count - itemA.count);
  return result.slice(0, 5);
}

function getMostPopularAuthors(books, authors) {
  const borrowed = [];
  for (let i = 0; i < books.length; i++) {
    if (books[i].borrows && !books[i].borrows[0].returned) {
      borrowed.push(books[i]);
    } 
  }
  let popularAuthors = [];
  borrowed.forEach((book) => {
    const authorId = book.authorId;
    let count = 0;
    const author = authors.find((author) => author.id === authorId);
    let name = author.name.first + " " + author.name.last;
    //if the book's borrows is not empty
    if (book.borrows) {
      count = book.borrows.length;
      if (!popularAuthors.length) {
        popularAuthors.push({ name, count });
      }
      if (popularAuthors.length) {
        for (let i = 0; i < popularAuthors.length; i++) {
          if (popularAuthors[i].name != name) {
            popularAuthors.push({ name, count });
          } else {
            count += book.borrows.length;
          }
        }
      }
    } else {//if the book's borrows is empty
      popularAuthors.push({ name, count });
    }
  });
  popularAuthors.sort((itemA, itemB) => itemB.count - itemA.count);
  return popularAuthors.slice(0, 5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
