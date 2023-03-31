function findAuthorById(authors, id) {
  let authorFound = authors.find((author) => author.id === id);
  return authorFound;
}

function findBookById(books, id) {
  const resultFound = books.find((book) => book.id === id);
  return resultFound;
}

function partitionBooksByBorrowedStatus(books) {
  let bookReturned = books.filter(
    (book) => book.borrows && book.borrows[0].returned
  );
  let bookBorrowed = books.filter(
    (book) => !book.borrows || !book.borrows[0].returned
  );
  return [bookBorrowed, bookReturned];
}

function getBorrowersForBook(book, accounts) {
  //iterate the borrowers information in the book
  const borrows = book.borrows;
  const borrowsInfo=borrows.reduce((accumulator,borrow)=>{
    let idInfo = borrow.id;
    //find out this id information from account
    const accountInfo = accounts.find((account) => account.id == idInfo);
    const { id, ...others } = accountInfo;
    const accountUpdate = { id, returned: borrow.returned, ...others };
    accumulator.push(accountUpdate);
    return accumulator;
  },[])

  return borrowsInfo.slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
