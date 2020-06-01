import gql from 'graphql-tag'


export const ADD_USER = gql`mutation ($firstName: String!, $lastName: String!, $email: String!, $gender: String!, $dateOfBirth: Date!, $phoneNumber: String! $groups: [Int], $avatar: String!) {
    addUser(firstName: $firstName, lastName: $lastName, email: $email, gender: $gender, dateOfBirth: $dateOfBirth, phoneNumber: $phoneNumber, groups: $groups, avatar: $avatar) {
        user {
            id
            password
        }
    }
}`;

export const ADD_GROUP = gql`mutation ($name: String!, $permissions: [Int]) {
    addGroup(name: $name, permissions: $permissions) {
        group {
            id
            name
        }
    }
}`;

export const EDIT_GROUP = gql`mutation ($id: Int!, $name: String!, $permissions: [Int]) {
    editGroup(id: $id, name: $name, permissions: $permissions) {
        group {
            id
            name
        }
    }
}`;

export const DELETE_GROUP = gql`mutation ($id: Int!) {
    deleteGroup(id: $id) {
        group {
            id
            name
        }
    }
}`;
