import gql from 'graphql-tag'

export const HELLO = gql`subscription {
    hello
}`;

export const STOCK_LEVEL_SUBSCRIPTION = gql`subscription ($drugId: UUID!){
    stockLevel(drugId: $drugId)
}`;