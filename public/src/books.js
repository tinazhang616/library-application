function findAuthorById(authors, id) {
  let authorFound = authors.find((author) => author.id === id);
  return authorFound;
}

function findBookById(books, id) {
  const resultFound = books.find((book) => book.id === id);
  return resultFound;
}
function partitionBooksByBorrowedStatus(books) {
    const borrowed = []
    const returned = []
    for(let i = 0; i < books.length; i++) {
      if(books[i].borrows && books[i].borrows[0].returned) {
        returned.push(books[i])
      } else {
        borrowed.push(books[i])
      }
    }
    return [borrowed,returned]
}

function getBorrowersForBook(book, accounts) {
  let borrowersInfo = [];
  //iterate the borrowers information in the book
  const borrows = book.borrows;
  borrows.forEach(borrow=>{
    let idInfo=borrow.id;
    //find out this id information from account
    const accountInfo= accounts.find((account)=>account.id==idInfo)
    const {id, ...others} = accountInfo;
    const accountUpdate = {id,returned:borrow.returned,...others};
    borrowersInfo.push(accountUpdate);
  });
  return borrowersInfo.slice(0,10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
