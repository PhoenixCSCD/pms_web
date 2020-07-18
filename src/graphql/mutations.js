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
    deleteGroup(groupId: $id) {
        group {
            id
            name
        }
    }
}`;

export const ADD_DRUG = gql`mutation ($name: String!, $sellingPrice: Decimal!, $costPricePerPack: Decimal!, $quantityPerPack: Int!) {
    addDrug(name: $name, sellingPrice: $sellingPrice, costPricePerPack: $costPricePerPack, quantityPerPack: $quantityPerPack) {
        drug {
            id
            name
        }
    }
}`;

export const OBTAIN_TOKEN = gql`mutation ($email: String!, $password: String!) {
    obtainToken(email: $email, password: $password) {
        token
        payload
    }
}`;

export const RECORD_SUPPLY = gql`mutation ($supplyDate: Date!, $supplier: String!, $vat: Decimal!, $discount: Decimal!, $freightCharge: Decimal!, $supplyLines: [SupplyLineInput]!) {
    recordSupply(supplyDate: $supplyDate, supplier: $supplier, vat: $vat, discount: $discount, freightCharge: $freightCharge, supplyLines: $supplyLines) {
        supply {
            id
        }
    }
}`;

export const RECORD_SALE = gql`mutation ($timestamp: DateTime!, $discount: Decimal!, $saleLines: [SaleLineInputType!]!) {
    recordSale(timestamp: $timestamp, discount: $discount, saleLines: $saleLines) {
        sale {
            id
        }
    }
}`;

export const VERIFY_PASSWORD_RESET_TOKEN = gql`mutation ($userId: UUID!, $token: String!){
    verifyPasswordResetToken(userId: $userId, token: $token) {
        valid
    }
}`;

export const RECORD_STOCK_ADJUSTMENT = gql`mutation ($timestamp: DateTime!, $reason: String!, $stockAdjustmentLines: [StockAdjustmentLineInput!]!) {
    recordStockAdjustment(timestamp: $timestamp, reason: $reason, stockAdjustmentLines: $stockAdjustmentLines) {
        stockAdjustment {
            id
        }
    }
}`;

export const DELETE_USERS = gql`mutation ($userIds: [UUID]) {
    deleteUsers(userIds: $userIds) {
        userIds
    }
}`;