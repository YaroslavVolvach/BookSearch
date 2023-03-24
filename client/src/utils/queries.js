
import {gql} from '@apollo/client';

export const GET_ME = gql`
  {
    me {
      _id
      username
      email
      bookCount
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
`;

export const GET_SAVED_BOOKS = gql`
  query allProfiles {
    profiles {
      _id
      name
      skills
    }
  }
`;