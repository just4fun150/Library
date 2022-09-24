const bookContainer = document.querySelector(".book-container");
const addBookBtn = document.getElementById("add-book");
const formContainer = document.getElementById("formContainer");
const form = document.querySelector("form");
const modal = document.getElementById("modal");

let myLibrary = [];

class Book {
	constructor(title, author, pages, status) {
		this.title = title;
		this.author = author;
		this.pages = pages + " " + "pages";
		this.status = status;
	}

	changeStatus() {
		if (this.status === "Read") {
			this.status = "Not Read";
		} else this.status = "Read";
	}
}

// add form to screen
addBookBtn.addEventListener("click", e => {
	popUP();
});

function popUP() {
	modal.classList.add("modal");
	formContainer.classList.add("open-popup");
}

function closePopUP() {
	formContainer.classList.remove("open-popup");
	modal.classList.remove("modal");
}

// add form values to the created object
function addBookToLibrary(e) {
	const inputTitle = document.getElementById("ftitle").value;
	const inputAuthor = document.getElementById("fauthor").value;
	const inputPage = document.getElementById("fpages").value;
	let inputReadStatus;

	if (document.querySelector("#read-status").checked) {
		inputReadStatus = "Read";
	} else {
		inputReadStatus = "Not Read";
	}

	form.reset();

	const obj = new Book(inputTitle, inputAuthor, inputPage, inputReadStatus);
	myLibrary.push(obj);
}

//display books  in array
function displayBook() {
	//prevent node from dubplicating
	const stopDuplicate = document.querySelectorAll(".card");
	for (let i = 0; i < stopDuplicate.length; i++) {
		stopDuplicate[i].remove();
	}

	//create node for books
	myLibrary.forEach((element, index) => {
		const card = document.createElement("div");
		const title = document.createElement("p");
		const author = document.createElement("p");
		const pages = document.createElement("p");
		const readStatusBtn = document.createElement("button");
		const deleteBtn = document.createElement("button");

		card.classList.add("card");
		card.dataset.book = `${index}`;
		card.append(title, author, pages, readStatusBtn, deleteBtn);
		bookContainer.append(card);
		deleteBtn.classList.add("remove-btn");

		title.textContent = element.title;
		author.textContent = element.author;
		pages.textContent = element.pages;
		readStatusBtn.textContent = element.status;
		deleteBtn.textContent = "Delete";

		if (readStatusBtn.textContent === "Read") {
			readStatusBtn.classList.add("read");
		} else {
			readStatusBtn.classList.add("not-read");
		}

		deleteBtn.addEventListener("click", e => {
			e.currentTarget.parentNode.remove();
			const objIndex = deleteBtn.parentNode.dataset.book; //returns data attribute value
			//only splice when array is not empty
			if (objIndex > -1) {
				myLibrary.splice(objIndex, 1);
			}
		});

		readStatusBtn.addEventListener("click", toggleStatusBtn);

		function toggleStatusBtn(e) {
			let cardIndex = e.target.parentNode.dataset.book;
			myLibrary[cardIndex].changeStatus();
			e.target.textContent = myLibrary[cardIndex].status;

			if (e.target.textContent === "Read") {
				e.target.classList.remove("not-read");
				e.target.classList.add("read");
			} else {
				e.target.classList.remove("read");
				e.target.classList.add("not-read");
			}
		}
	});
}

form.addEventListener("submit", e => {
	e.preventDefault();
	addBookToLibrary();
	closePopUP();
	displayBook();
});

//run if anywhere on the modal/window is clicked excluding form area
window.addEventListener("click", e => {
	if (e.target.className.includes("modal")) {
		closePopUP();
	}
});
