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

// Initialize book list
var bookList = localStorage.getItem("bookList") ? JSON.parse(localStorage.getItem("bookList")) : [];

// Loads all data from local storage when document or page loaded
// Call the initial showBook function to populate the table and pagination info
window.onload = function() {
    showBook(); 
    changeBooksPerPage();
}

// Function to Show Data from local storage
function showBook() {
    var bookList;
    if (localStorage.getItem("bookList") == null) {
        bookList = [];
    }
    else {
        bookList = JSON.parse(localStorage.getItem("bookList"))
    }

    var html = "";

    bookList.forEach(function (element, index) {
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

    // Sort table after adding the book
    // Sort by the first column (Title) on page load
    //  sortTable(0); 

    // Pagination
    updatePaginationInfo();
}

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

        var bookList;
        if (localStorage.getItem("bookList") == null) {
            bookList = [];
        }
        else {
            bookList = JSON.parse(localStorage.getItem("bookList"));
        }
        
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

        // Show the updated book list in the table
        showBook();

        // Keep entries same 
        changeBooksPerPage();

        // Sort table after adding the book
        // sortTable(0);
    }
}

// Function to Delete Data from local storage
function deleteBook(index) {
    var bookList;
    if (localStorage.getItem("bookList") == null) {
        bookList = [];
    }
    else {
        bookList = JSON.parse(localStorage.getItem("bookList"));
    }

    bookList.splice(index, 1);
    localStorage.setItem("bookList", JSON.stringify(bookList));

    // Show the alert-danger message
    var deleteAlert = document.querySelector(".alert-danger");
    deleteAlert.style.display = "block";

    // Hide the alert-danger message after 3 seconds
    setTimeout(function () {
        deleteAlert.style.display = "none";
    }, 3000);
    
    showBook();

    // Keep entries same 
    changeBooksPerPage();
}

// Function to Update Data from local storage
function updateBook(index) {
    // Submit button will hide and Update Button will show for updating of Data in local storage
    document.getElementById('Submit').style.display = "none";
    document.getElementById('Update').style.display = "block";
    
    var bookList;
    if (localStorage.getItem("bookList") == null) {
        bookList = [];
    }
    else {
        bookList = JSON.parse(localStorage.getItem("bookList"));
    }
    
    document.getElementById("title").value = bookList[index].bookTitle;
    document.getElementById("author").value = bookList[index].bookAuthor;
    document.getElementById("description").value = bookList[index].bookDescription;
    document.getElementById("edition").value = bookList[index].bookEdition;
    document.getElementById("barcode").value = bookList[index].bookBarcode;
    document.getElementById("publication").value = bookList[index].bookPublication;
    document.getElementById("date-publish").value = bookList[index].datePub;
    document.getElementById("category").value = bookList[index].bookCategory;
    document.getElementById("status").value = bookList[index].bookStatus;
    document.getElementById("comment").value = bookList[index].comment;

    // Get old data to update
    document.querySelector("#Update").onclick = function() {
        if (validateForm()) {
            bookList[index].bookTitle = document.getElementById("title").value;
            bookList[index].bookAuthor = document.getElementById("author").value;
            bookList[index].bookDescription = document.getElementById("description").value;
            bookList[index].bookEdition = document.getElementById("edition").value;
            bookList[index].bookBarcode = document.getElementById("barcode").value;
            bookList[index].bookPublication = document.getElementById("publication").value;
            bookList[index].datePub = document.getElementById("date-publish").value;
            bookList[index].bookCategory = document.getElementById("category").value;
            bookList[index].bookStatus = document.getElementById("status").value;
            bookList[index].comment = document.getElementById("comment").value;
            
            localStorage.setItem("bookList", JSON.stringify(bookList));

            // Show the alert-success message
            var updateAlert = document.querySelector(".alert-info");
            updateAlert.style.display = "block";

            // Hide the alert-success message after 3 seconds
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
            
            showBook();

            // Keep entries same 
            changeBooksPerPage();
        }
    } 
}

// Function search book list
function SearchBar() {
    var input, filter, table, tr, td, i, textValue;
    input = document.getElementById("searchBar");
    filter = input.value.toUpperCase();
    table = document.getElementById("bookTable");
    tr = table.getElementsByTagName("tr");

    const searchMessage = document.getElementById("message");
    // Flag to track if any matching row is found
    let hasResults = false;

    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td");
        found = false;

        if (td) {
            for (j = 0; j < td.length; j++) {
                textValue = td[j].textContent || td[j].innerText;
                if (textValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                    found = true;
                    // Break the inner loop if a match is found
                    break;
                }
            }

            if (found) {
                tr[i].style.display = "";
                // Found matching row
                hasResults = true;
            } 
            else {
                tr[i].style.display = "none";
            }
        } 
    }

    // Show the message if no matching rows are found
    if (!hasResults) {
        searchMessage.style.display = "block";
        searchMessage.innerHTML = "No result found";
    } else {
        // Clear the message if there are matching rows
        searchMessage.style.display = "none";
        searchMessage.innerHTML = "";
    }
}

// Function pagination book list
// Pagination variables
let currentPage = 1;
let booksPerPage = 5;
let totalResults = 0;
var bookList;

// Function to calculate the total number of pages
function getTotalPages(bookList) {
    return Math.ceil(bookList.length / booksPerPage);
}

// Function to update pagination information
function updatePaginationInfo() {
    const paginationInfo = document.getElementById("paginationInfo");
    const paginationShowResult = document.getElementById("paginationShowResult");
    const totalPages = getTotalPages(bookList);

    paginationInfo.textContent = `Page ${currentPage} of ${totalPages}`;
    paginationShowResult.textContent = `Showing ${totalResults} results`;
}

// Function to display books on the current page
function showBooksOnPage(bookList) {
    const startIndex = (currentPage - 1) * booksPerPage;
    const endIndex = startIndex + booksPerPage;
    const booksToShow = bookList.slice(startIndex, endIndex);

    var html = "";

    booksToShow.forEach(function (element, index) {
        // Generate the HTML for each book row
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
        showBooksOnPage(bookList);
        updatePaginationInfo();
    }
}

// Function to go to the next page
function nextPage() {
    if (currentPage < getTotalPages(bookList)) {
        currentPage++;
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

