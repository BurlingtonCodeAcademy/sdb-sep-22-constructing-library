const Library = require("./Library")
const MONGO_URL = "mongodb://localhost:27017"

let collection = new Library(MONGO_URL, "library", "books")

console.log(collection)

// collection.test()

async function showEndpoints() {
    let allBooks = await collection.allBooks()
    console.log(allBooks)

    // let findOneBook = await collection.findOneBook("6362729de57e3524a7a2a16b")
    // console.log(findOneBook)

    // let query = await collection.findManyBooks({author: "Lemony Snicket", copies: 3})
    // console.log(query)

    // console.log(collection.addBook({title: "Lord of the Rings", author: "J R R Tolkien", copies: 5}))

    // collection.changeBook("6362817a6f673de6fea25799", {title: "Lord of the Flies", author: "William Golding", copies: 1})

    // console.log(collection.removeBook("6362729de57e3524a7a2a16a"))
}

showEndpoints()