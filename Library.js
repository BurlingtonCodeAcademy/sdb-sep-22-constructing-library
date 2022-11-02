const { MongoClient, ObjectId } = require("mongodb")

class Library {
    constructor(dbUrl, dbName, collName) {
        this.dbUrl = dbUrl
        this.dbName = dbName
        this.collName = collName
        this.dbClient
    }

    async client() {
        console.log(`Connecting to ${this.dbUrl}`)
        this.dbClient = MongoClient.connect(this.dbUrl)
        console.log(`Connected to db`)
        return this.dbClient
    }

    async test() {
        let client = await this.client()
        client.close()
    }

    async collection() {
        // establishes connection to mongodb
        let client = await this.client()
        // creates a db using name from class instance
        let db = client.db(this.dbName)
        // creates a collection using property value from class instance
        let collection = db.collection(this.collName)
        return collection
    }

    async allBooks() {
        let collection = await this.collection()
        return collection.find({}).toArray()
    }

    async findOneBook(id) {
        let docId = ObjectId(id)
        let collection = await this.collection()
        return collection.find(docId).toArray()
    }

    async findManyBooks(query) {
        let collection = await this.collection()
        return collection.find(query).toArray()
    }

    async addBook(info) {
        let collection = await this.collection()
        collection.insertOne(info)
        console.log(`Book entered`)
    }

    async changeBook(id, newInfo) {
        let mongoId = { _id: ObjectId(id) }
        let infoObj = { $set: newInfo}
        let collection = await this.collection()
        await collection.updateOne(mongoId, infoObj)
        console.log(`Book successfully updated`)
    }

    async removeBook(id) {
        let mongoId = { _id: ObjectId(id) }
        let collection = await this.collection()
        collection.deleteOne(mongoId)
        console.log(`Book successfully deleted`)
    }

}

module.exports = Library