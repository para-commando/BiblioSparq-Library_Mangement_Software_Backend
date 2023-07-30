  const dueDateUserGroupMapping={
    'due in 5 days users': 5,
    'due in 3 days users': 3,
    'due in 1 day users': 1,
    'due today users' : 0,
  }
  
  const borrowedDateUserGroupMapping = {
    'borrowed today':0,
    'borrowed 1 day ago' :1,
    'borrowed 2 days ago':2,
    'borrowed 3 days ago':3
  }
  const book_management_column_Mapping = {
    authorName: 'authors',
    availabilityStatus: 'status',
    bookSubtitle: 'subtitle',
    genre: 'categories',
    ISBN10: 'isbn10',
    ISBN13: 'isbn13',
    numberOfCopiesLeft: 'numberOfCopiesLeft',
    originalNumberOfCopies: 'originalNumberOfCopies',
    title: 'title',
    yearOfPublication: 'publishedYear',
    bookAddedDate: 'createdAt',
  };
  module.exports = {book_management_column_Mapping, dueDateUserGroupMapping, borrowedDateUserGroupMapping };
  