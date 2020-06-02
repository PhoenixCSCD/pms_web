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
    userById(userId: $id) {
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

// export const GROUPS_WITH_PERMISSIONS = gql`{
//     groups {
//         id
//         name
//         permissions {
//             id
//             name
//         }
//     }
// }`;

export const PERMISSIONS = gql`{
    permissions {
        id
        name
    }
}`;

export const GROUP_BY_ID_WITH_PERMISSIONS = gql`query ($id: Int!){
    groupById(groupId: $id) {
        id
        name
        permissions {
            id
            name
        }
    }
}`;

export const DRUGS = gql`{
  drugs {
      id
      name
      sellingPrice
      costPricePerPack
      quantityPerPack
  }  
}`;

export const ME = gql`{
    me {
        id
        firstName
        lastName
        avatar
    }
}`;

export const HAS_PERMISSION = gql`query ($permission: String!){
    hasPermission(permission: $permission)
}`;

export const DRUG_STOCK_LEVEL = gql`query ($drugId: UUID!) {
    stockLevel(drugId: $drugId)
}`;

export const DRUG_BATCH_STOCK_LEVEL = gql`query ($drugId: UUID!, $lotNumber: String!) {
    stockLevel(drugId: $drugId, lotNumber: $lotNumber)
}`;