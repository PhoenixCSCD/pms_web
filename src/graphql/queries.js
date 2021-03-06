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
        avatar
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

export const DRUG_LOT_NUMBERS = gql`query ($drugId: UUID!) {
    drugLotNumbers(drugId: $drugId)
}`;

export const SALES = gql`{
   sales {
       id
       timestamp
       attendant {
           firstName
           lastName
       }
       subTotal
       discount
       grandTotal
       saleLines {
           id
           drug {
               name
           }
           quantity
           sellingPrice
       }
   } 
}`;

export const EMAIL_EXISTS = gql`query ($email: String!){
    emailExists(email: $email)
}`

export const USER_BY_EMAIL = gql`query ($email: String!) {
    userByEmail(email: $email) {
        id
    }
}`;

export const PASSWORD_RESET_TOKEN_IS_VALID = gql`query ($email: String!, $token: String!) {
   passwordResetTokenIsValid(email: $email, token: $token) 
}`;

export const SUPPLIES = gql`{
    supplies {
        id
        discount
        supplyDate
        supplier
        subTotal
        grandTotal
        freightCharge
        vat
        receiver {
            firstName
            lastName
        }
    }
}`

export const STOCK_ADJUSTMENTS = gql`{
    stockAdjustments {
        id
        timestamp
        reason
        user {
            firstName
            lastName
        }
    }
}`;