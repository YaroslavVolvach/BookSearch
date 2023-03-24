const typeDefs = `#graphql
  type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
  }

  type Book{
    _id: ID
    authors: [String]
    bookId: String
    description: String
    image: String
    forSale: String
    link: String
    title: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
  }
  input SavedBookInput {
        authors: [String]
        bookId: String
        description: String
        image: String
        forSale: String
        link: String
        title: String
    }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(book: SavedBookInput): User
    removeBook(bookId:ID!): User
  }
`;

module.exports = typeDefs;