// Add a variable to keep track of the current page or table being displayed
let currentPageIndex = 0;
// Pagination prev and next current page
let currentPage = 1;
// Show entries books per page and 5 is default show entries 
let booksPerPage = 5;
// Show all total of tables
let totalResults = 0;
// Default sorting order is ascending
let ascendingSort = true;
// Local storage variable
var bookList;
// For set/showing table
var html = "";

// Validate form inputs
function validateForm() {
    const form = document.getElementById('form');

    if (!form.checkValidity()) {
        form.classList.add('was-validated');

        // Set timeout to remove validation classes and error messages after 3 seconds
        setTimeout(function() {
            form.classList.remove('was-validated');
            const invalidFeedbackElements = form.querySelectorAll('.invalid-feedback');
            invalidFeedbackElements.forEach(element => element.style.display = 'none');
        }, 3000);

        return false;
    }
    form.classList.remove('was-validated');
    return true;
}

// Function to Show Data from local storage
function showBook() {
    // Checks if there's a booklist in local storage in JSON format otherwise null/empty
    if (localStorage.getItem("bookList") == null) {
        bookList = [];
    }
    else {
        bookList = JSON.parse(localStorage.getItem("bookList"));
    }

    // Show all data in the table with buttons (edit, delete, and view)
    bookList.forEach(function (element, index) {
        // Generate the HTML for each book row
        html += "<tr>";
        html += "<td>" + element.bookTitle + "</td>";
        html += "<td>" + element.bookAuthor + "</td>";
        html += "<td>" + element.bookEdition + "</td>";
        html += "<td>" + element.bookBarcode + "</td>";
        html += "<td>" + element.bookCategory + "</td>";
        html += "<td>" + element.bookStatus + "</td>";
        html +=
            '<td style="text-align: center"><button type="button" onclick="viewBook(' + 
            index +
            ')" class="btn btn-info m-2" data-bs-toggle="modal" data-bs-target="#staticBackdrop"><i class="bi bi-eye"></i></button><button onclick="deleteBook(' + 
            index +
            ')" class="btn btn-danger" id="Delete"><i class="bi bi-trash"></i></button><button onclick="updateBook(' + 
            index +
            ')" class="btn btn-warning m-2"><i class="bi bi-pencil-square"></i></button></td>'
        html += "</tr>";
    });
    
    // Get table id to show data in the table in html
    document.querySelector("#bookTable tbody").innerHTML = html;

    // Call ShowBooksOnPage function 
    showBooksOnPage(bookList)
    updatePaginationInfo();
}

// Close the modal when clicking outside the modal content
// window.addEventListener('click', function(event) {
//     const modal = document.getElementById('myModal');
//     if (event.target === modal) {
//         closeModal();
//     }
// });

// Close the modal when the Escape key is pressed
window.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});

// Function to open modal
function openModal() {
    const modal = document.getElementById("myModal");
    modal.style.display = "block";
}

// Function to close modal
function closeModal() {
    const modal = document.getElementById("myModal");
    modal.style.display = "none";
}

// Function to View Data from local storage
function viewBook(indexOnPage) {
    // Function to display all data in the modal
    const modalData = document.getElementById('modalData');
    modalData.innerHTML = ''; // Clear previous data

    // Retrieve the data for the clicked book
    const indexInList = (currentPage - 1) * booksPerPage + indexOnPage;
    // Get the book to update
    const bookToView = bookList[indexInList];

    // Create and append elements to display the book data in the modal
    const bookTitle = document.createElement('h5');
    bookTitle.innerHTML = `<strong>Title:</strong> ${bookToView.bookTitle}`;
    modalData.appendChild(bookTitle);

    const bookAuthor = document.createElement('h5');
    bookAuthor.innerHTML = `<strong>Author:</strong> ${bookToView.bookAuthor}`;
    modalData.appendChild(bookAuthor);

    const bookDescription = document.createElement('h5');
    bookDescription.innerHTML = `<strong>Description:</strong> ${bookToView.bookDescription}`;
    modalData.appendChild(bookDescription);

    const bookEdition = document.createElement('h5');
    bookEdition.innerHTML = `<strong>Edition:</strong> ${bookToView.bookEdition}`;
    modalData.appendChild(bookEdition);

    const bookBarcode = document.createElement('h5');
    bookBarcode.innerHTML = `<strong>ISBN:</strong> ${bookToView.bookBarcode}`;
    modalData.appendChild(bookBarcode);

    const bookPublication = document.createElement('h5');
    bookPublication.innerHTML = `<strong>Publication:</strong> ${bookToView.bookPublication}`;
    modalData.appendChild(bookPublication);

    const datePub = document.createElement('h5');
    datePub.innerHTML = `<strong>Date of Published:</strong> ${bookToView.datePub}`;
    modalData.appendChild(datePub);

    const bookCategory = document.createElement('h5');
    bookCategory.innerHTML = `<strong>Category:</strong> ${bookToView.bookCategory}`;
    modalData.appendChild(bookCategory);

    const bookStatus = document.createElement('h5');
    bookStatus.innerHTML = `<strong>Status:</strong> ${bookToView.bookStatus}`;
    modalData.appendChild(bookStatus);

    const comment = document.createElement('h5');
    comment.innerHTML = `<strong>Comment:</strong> ${bookToView.comment}`;
    modalData.appendChild(comment);

    // Open the modal
    openModal();
}

closeModal();

// Function to Add Data to local storage
function AddBook() {
    // If form is validated
    if (validateForm()) {
        var bookTitle = document.getElementById("title").value;
        var bookAuthor = document.getElementById("author").value;
        var bookDescription = document.getElementById("description").value;
        var bookEdition = document.getElementById("edition").value;
        var bookBarcode = document.getElementById("barcode").value;
        var bookPublication = document.getElementById("publication").value;
        var datePub = document.getElementById("date-publish").value;
        var bookCategory = document.getElementById("category").value;
        var bookStatus = document.getElementById("status").value;
        var comment = document.getElementById("comment").value;

        if (localStorage.getItem("bookList") == null) {
            bookList = [];
        }
        else {
            bookList = JSON.parse(localStorage.getItem("bookList"));
        }

        // Booklist to push to store in local storage
        bookList.push({
            bookTitle: bookTitle,
            bookAuthor: bookAuthor,
            bookDescription: bookDescription,
            bookEdition: bookEdition,
            bookBarcode: bookBarcode,
            bookPublication: bookPublication,
            datePub: datePub,
            bookCategory: bookCategory,
            bookStatus: bookStatus,
            comment: comment,
        });
        
        // Set data to booklist and convert from JSON  to Javascript
        localStorage.setItem("bookList", JSON.stringify(bookList));
        
        // Show the alert-success message
        var successAlert = document.querySelector(".alert-success");
        successAlert.style.display = "block";

        // Hide the alert-success message after 3 seconds
        setTimeout(function () {
            successAlert.style.display = "none";
        }, 3000);

        // Clear forms fields
        document.getElementById("title").value = "";
        document.getElementById("author").value = "";
        document.getElementById("description").value = "";
        document.getElementById("edition").value = "";
        document.getElementById("barcode").value = "";
        document.getElementById("publication").value = "";
        document.getElementById("date-publish").value = "";
        document.getElementById("category").value = "";
        document.getElementById("status").value = "";
        document.getElementById("comment").value = "";
        
        // Show update books immediately
        showBooksOnPage(bookList);
        updatePaginationInfo();
    } 
}

// Function to Delete Data from local storage
function deleteBook(indexOnPage) {
    // Calculate the index in the entire bookList array based on the current page
    const indexInList = (currentPage - 1) * booksPerPage + indexOnPage;

    // Delete book from the bookList
    bookList.splice(indexInList, 1);

    // Update the bookList in local storage
    localStorage.setItem("bookList", JSON.stringify(bookList));

    // Show the alert-delete message
    var deleteAlert = document.querySelector(".alert-danger");
    deleteAlert.style.display = "block";

    // Hide the alert-delete message after 3 seconds
    setTimeout(function () {
        deleteAlert.style.display = "none";
    }, 3000);

    // Show update books immediately
    showBooksOnPage(bookList);
    updatePaginationInfo();

    // After deleting, reset the search, show all results, and clear the search input
    document.getElementById("searchBar").value = "";
    // Call the SearchBar function to show all results again
    SearchBar();
}

// Function to Update Data from local storage
function updateBook(indexOnPage) {
    // Submit button will hide and Update Button will show for updating of Data in local storage
    document.getElementById('Submit').style.display = "none";
    document.getElementById('Update').style.display = "block";
    
    // Calculate the index in the entire bookList array based on the current page
    const indexInList = (currentPage - 1) * booksPerPage + indexOnPage;
    
    // Get the book to update
    const bookToUpdate = bookList[indexInList];

    // Get old data and display in the input field for update
    document.getElementById("title").value = bookList[indexInList].bookTitle;
    document.getElementById("author").value = bookList[indexInList].bookAuthor;
    document.getElementById("description").value = bookList[indexInList].bookDescription;
    document.getElementById("edition").value = bookList[indexInList].bookEdition;
    document.getElementById("barcode").value = bookList[indexInList].bookBarcode;
    document.getElementById("publication").value = bookList[indexInList].bookPublication;
    document.getElementById("date-publish").value = bookList[indexInList].datePub;
    document.getElementById("category").value = bookList[indexInList].bookCategory;
    document.getElementById("status").value = bookList[indexInList].bookStatus;
    document.getElementById("comment").value = bookList[indexInList].comment;

    // Get old data to update
    document.querySelector("#Update").onclick = function() {
        if (validateForm()) {
            // Update the book data
            bookToUpdate.bookTitle = document.getElementById("title").value;
            bookToUpdate.bookAuthor = document.getElementById("author").value;
            bookToUpdate.bookDescription = document.getElementById("description").value;
            bookToUpdate.bookEdition = document.getElementById("edition").value;
            bookToUpdate.bookBarcode = document.getElementById("barcode").value;
            bookToUpdate.bookPublication = document.getElementById("publication").value;
            bookToUpdate.datePub = document.getElementById("date-publish").value;
            bookToUpdate.bookCategory = document.getElementById("category").value;
            bookToUpdate.bookStatus = document.getElementById("status").value;
            bookToUpdate.comment = document.getElementById("comment").value;
            
            // Update the bookList in local storage
            localStorage.setItem("bookList", JSON.stringify(bookList));

            // Show the alert-update message
            var updateAlert = document.querySelector(".alert-info");
            updateAlert.style.display = "block";

            // Hide the alert-update message after 3 seconds
            setTimeout(function () {
                updateAlert.style.display = "none";
            }, 3000);
                    
            // Clear forms fields
            document.getElementById("title").value = "";
            document.getElementById("author").value = "";
            document.getElementById("description").value = "";
            document.getElementById("edition").value = "";
            document.getElementById("barcode").value = "";
            document.getElementById("publication").value = "";
            document.getElementById("date-publish").value = "";
            document.getElementById("category").value = "";
            document.getElementById("status").value = "";
            document.getElementById("comment").value = "";

            // Update button will hide and Submit Button will show for updating of Data in local storage
            document.getElementById('Update').style.display = "none";
            document.getElementById('Submit').style.display = "block";
                    
            // Show update books immediately
            showBooksOnPage(bookList);
            updatePaginationInfo();
        }
    }
}

// Function to display matched data on the table
function populateTable(data) {
    var html = "";
    
    // Display matched search in the table
    data.forEach(function (element, index) {
        html += "<tr>";
        html += "<td>" + element.bookTitle + "</td>";
        html += "<td>" + element.bookAuthor + "</td>";
        html += "<td>" + element.bookEdition + "</td>";
        html += "<td>" + element.bookBarcode + "</td>";
        html += "<td>" + element.bookCategory + "</td>";
        html += "<td>" + element.bookStatus + "</td>";
        html +=
            '<td style="text-align: center"><button onclick="viewBook(' + 
            index +
            ')" class="btn btn-info m-2"><i class="bi bi-eye"></i></button><button onclick="deleteBook(' + 
            index +
            ')" class="btn btn-danger" id="Delete"><i class="bi bi-trash"></i></button><button onclick="updateBook(' + 
            index +
            ')" class="btn btn-warning m-2"><i class="bi bi-pencil-square"></i></button></td>'
        html += "</tr>";
    });

    document.querySelector("#bookTable tbody").innerHTML = html;
}

// Function to calculate the total number of pages
function getTotalPages(bookList) {
    return Math.ceil(bookList.length / booksPerPage);
}

// Function to update pagination and show result current information
function updatePaginationInfo() {
    const paginationInfo = document.getElementById("paginationInfo");
    const paginationShowResult = document.getElementById("paginationShowResult");
    const totalPages = getTotalPages(bookList);

    // Page 1 of (totalpages)
    paginationInfo.textContent = `Page ${currentPage} of ${totalPages}`;
    // Showing 1 results
    paginationShowResult.textContent = `Showing ${totalResults} results`;
}

// Function to display books on the current page
function showBooksOnPage(bookList) {
    const startIndex = (currentPage - 1) * booksPerPage;
    const endIndex = startIndex + booksPerPage;
    const booksToShow = bookList.slice(startIndex, endIndex);
    var html = "";

    // Show books based in show entries and default is 5 per pages
    booksToShow.forEach(function (element, index) {
        html += "<tr>";
        html += "<td>" + element.bookTitle + "</td>";
        html += "<td>" + element.bookAuthor + "</td>";
        html += "<td>" + element.bookEdition + "</td>";
        html += "<td>" + element.bookBarcode + "</td>";
        html += "<td>" + element.bookCategory + "</td>";
        html += "<td>" + element.bookStatus + "</td>";
        html +=
            '<td style="text-align: center"><button onclick="viewBook(' + 
            index +
            ')" class="btn btn-info m-2"><i class="bi bi-eye"></i></button><button onclick="deleteBook(' + 
            index +
            ')" class="btn btn-danger" id="Delete"><i class="bi bi-trash"></i></button><button onclick="updateBook(' + 
            index +
            ')" class="btn btn-warning m-2"><i class="bi bi-pencil-square"></i></button></td>'
        html += "</tr>";
    });

    document.querySelector("#bookTableBody").innerHTML = html;

    // Update the total results based on the filtered book list
    totalResults = bookList.length;
}

// Function to go to the previous page
function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        // Update displayed data
        showBooksOnPage(bookList);
        updatePaginationInfo();
    }
}

// Function to go to the next page
function nextPage() {
    if (currentPage < getTotalPages(bookList)) {
        currentPage++;
        // Update displayed data
        showBooksOnPage(bookList);
        updatePaginationInfo();
    }
}

// Function to change the number of books displayed per page
function changeBooksPerPage() {
    booksPerPage = parseInt(document.getElementById("showEntries").value);
    currentPage = 1;
    showBooksOnPage(bookList);
    updatePaginationInfo();
}

// Function to search through bookList
function SearchBar() {
    var input, filter, i, textValue;
    input = document.getElementById("searchBar");
    filter = input.value.toUpperCase();

    // No result found message
    const searchMessage = document.getElementById("message");
    // Show all result
    const paginationShowResult = document.getElementById("paginationShowResult");
    // Show number of matching result
    searchResultCount = document.getElementById("paginationShowResult");
    // Flag to track if any matching row is found
    let hasResults = false;

    // Initialize an array to store the rows that match the search
    let matchingRows = [];

    if (filter === "") {
        // If the search input is empty, reset the bookList to the original list
        bookList = JSON.parse(localStorage.getItem("bookList")) || [];
    } else {
        for (i = 0; i < bookList.length; i++) {
            const book = bookList[i];

            // Check each property in the book object for a match
            for (const key in book) {
                if (book.hasOwnProperty(key)) {
                    textValue = book[key].toUpperCase();
                    if (textValue.indexOf(filter) > -1) {
                        // If a match is found, add this book to the matchingRows array
                        matchingRows.push(book);
                        hasResults = true;
                        // No need to check other properties for this book
                        break; 
                    }
                }
            }
        }
    }

    // Update the table with the matching rows or back to original book list if the search is empty
    if (filter === "") {
        showBooksOnPage(bookList);
    } else {
        populateTable(matchingRows);
    }

    // Show or hide the message match is found or not
    if (hasResults) {
        searchMessage.style.display = "none";
        searchMessage.innerHTML = "";
    } else {
        searchMessage.style.display = "block";
        searchMessage.innerHTML = "No result found";
    }

    if (searchResultCount) {
        // Update the search result count
        searchResultCount.style.display = "block";
        // Update the count here
        searchResultCount.textContent = `Showing ${matchingRows.length} of ${totalResults} results`; 
    } else {
        // Back to original all count
        searchResultCount.style.display = "none";
        paginationShowResult.textContent = `Showing ${totalResults} results`;
    }

    // Clear the message when the input value is empty and back to the original table
    if (input.value === "") {
        searchMessage.style.display = "none";
        searchMessage.innerHTML = "";
        showBooksOnPage(bookList);
        updatePaginationInfo();
    }

    // Show original/current result count
    booksPerPage = parseInt(document.getElementById("showEntries").value);
}

// Function to sort all table
function sortTable(columnIndex) {
    // Identify the header cell and the sort icon for the clicked column
    const headerCell = document.querySelector(`#bookTable th:nth-child(${columnIndex + 1})`);
    const sortIcon = headerCell.querySelector('.sort-icon');

    // Toggle the sorting order (ascending/descending) and update the sort icon
    ascendingSort = !ascendingSort;
    sortIcon.classList.toggle('bi-sort-alpha-up', ascendingSort);
    sortIcon.classList.toggle('bi-sort-alpha-down-alt', !ascendingSort);

    // Determine the sorting key based on the column index
    let sortKey = '';
    switch (columnIndex) {
        case 0:
            sortKey = 'bookTitle';
            break;
        case 1:
            sortKey = 'bookAuthor';
            break;
        case 2:
            sortKey = 'bookEdition';
            break;
        case 3:
            sortKey = 'bookBarcode';
            break;
        case 4:
            sortKey = 'bookCategory';
            break;
        case 5:
            sortKey = 'bookStatus';
            break;
    }

    // Perform the sorting on the bookList array
    bookList.sort((a, b) => {
        const valueA = a[sortKey].toUpperCase();
        const valueB = b[sortKey].toUpperCase();
        if (valueA < valueB) {
            return ascendingSort ? -1 : 1;
        }
        if (valueA > valueB) {
            return ascendingSort ? 1 : -1;
        }
        return 0;
    });

    // Update the table with the sorted data
    showBooksOnPage(bookList);
}

// Loads all data from local storage when document or page loaded
window.onload = function() {
    // Show all booklist data
    showBook();
}

// Initialize book list
var bookList = localStorage.getItem("bookList") ? JSON.parse(localStorage.getItem("bookList")) : [];
