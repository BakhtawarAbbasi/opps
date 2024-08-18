#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
class Book {
    title;
    author;
    constructor(title, author) {
        this.title = title;
        this.author = author;
    }
}
class Library {
    books = [];
    constructor(initialBooks) {
        this.books = initialBooks;
    }
    addBook(book) {
        this.books.push(book);
        console.log(chalk.greenBright(`Book titled "${book.title}" by ${book.author} added to the library.`));
    }
    listBooks() {
        if (this.books.length === 0) {
            console.log(chalk.redBright("No books in the library."));
        }
        else {
            console.log(chalk.cyanBright("\nBooks in the Library:"));
            this.books.forEach(book => {
                console.log(chalk.magenta(`${book.title} by ${book.author}`));
            });
        }
    }
    searchBook(title) {
        const book = this.books.find(book => book.title.toLowerCase() === title.toLowerCase());
        if (book) {
            console.log(chalk.blueBright(`Found: ${book.title} by ${book.author}`));
        }
        else {
            console.log(chalk.redBright(`No book found with the title "${title}".`));
        }
    }
}
// Prepopulate the library with some books
const initialBooks = [
    new Book("The Great Gatsby", "F. Scott Fitzgerald"),
    new Book("1984", "George Orwell"),
    new Book("To Kill a Mockingbird", "Harper Lee"),
    new Book("The Catcher in the Rye", "J.D. Salinger")
];
const library = new Library(initialBooks);
const mainMenu = async () => {
    const answer = await inquirer.prompt({
        type: "list",
        name: "choice",
        message: chalk.yellow.bold("What would you like to do?"),
        choices: [
            { name: "Add a Book", value: "addBook" },
            { name: "View All Books", value: "viewBooks" },
            { name: "Search for a Book", value: "searchBook" },
            { name: "Exit", value: "exit" }
        ]
    });
    return answer.choice;
};
const addBook = async (library) => {
    const answers = await inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: chalk.blue.bold("Enter the book title: ")
        },
        {
            type: "input",
            name: "author",
            message: chalk.blue.bold("Enter the author's name: ")
        }
    ]);
    const book = new Book(answers.title, answers.author);
    library.addBook(book);
};
const searchBook = async (library) => {
    const answer = await inquirer.prompt({
        type: "input",
        name: "title",
        message: chalk.blue.bold("Enter the title of the book you want to search: ")
    });
    library.searchBook(answer.title);
};
const programStart = async (library) => {
    while (true) {
        const choice = await mainMenu();
        if (choice === "addBook") {
            await addBook(library);
        }
        else if (choice === "viewBooks") {
            library.listBooks();
        }
        else if (choice === "searchBook") {
            await searchBook(library);
        }
        else if (choice === "exit") {
            console.log(chalk.cyanBright.bold("Exiting the program. Goodbye!"));
            break;
        }
    }
};
programStart(library);
