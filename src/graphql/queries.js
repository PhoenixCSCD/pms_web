import gql from 'graphql-tag'

export const USERS = gql`{
    users {
        id
        firstName
        lastName
        gender
        email
        phoneNumber
    }
}`;

export const USER = gql`query ($id: UUID!) {
    userById(id: $id) {
        id
        firstName
        lastName
        gender
        dateOfBirth
        email
        phoneNumber
        groups {
            id
            name
        }
        lastLogin
    }
}`;

export const GROUPS = gql`{
    groups {
        id
        name
    }
}`;

export const GROUPS_WITH_PERMISSIONS = gql`{
    groups {
        id
        name
        permissions {
            id
            name
        }
    }
}`;

export const PERMISSIONS = gql`{
    permissions {
        id
        name
    }
}`;

export const GROUP_BY_ID_WITH_PERMISSIONS = gql`query ($id: Int!){
    groupById(id: $id) {
        id
        name
        permissions {
            id
            name
        }
    }
}`;
