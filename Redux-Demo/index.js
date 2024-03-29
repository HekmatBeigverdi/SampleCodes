const redux = require('redux')
const createStore = redux.createStore
const bindActionCreators = redux.bindActionCreators
const combineReducers = redux.combineReducers
const applyMiddleware = redux.applyMiddleware

const reduxLogger = require('redux-logger')
const logger = reduxLogger.createLogger()

const CAKE_ORDERED = 'CAKE_ORDERED'
const CAKE_RESTOCKED = 'CAKE_RESTOCKED'
const ICE_CREAM_ORDERED = 'ICE_CREAM_ORDERED'
const ICE_CREAM_RESTOCKED = 'ICE_CREAM_RESTOCKED'

function orderCake() {
    return {
        type: CAKE_ORDERED,
        payload: 1
    }
}
function restockCake(qty = 1) {
    return {
        type: CAKE_RESTOCKED,
        payload: qty
    }
}
function orderIceCream() {
    return {
        type: ICE_CREAM_ORDERED,
        payload: 1
    }
}
function restockIceCream(qty = 1) {
    return {
        type: ICE_CREAM_RESTOCKED,
        payload: qty
    }
}
//(previousState, action) => newState

// const initialState = {
//     numOfCakes : 10,
//     numOfIceCreams: 20,
//     anotherProperty: 0
// }
const initialCakeState = {
    numOfCakes: 10
}
const initialIceCreamState = {
    numOfIceCreams: 20
}


const cakeReducer = (state = initialCakeState, action) => {
    switch(action.type){
        case CAKE_ORDERED:
            return {
                ...state,
                numOfCakes : state.numOfCakes - 1,
            }
        case CAKE_RESTOCKED:
            return {
                ...state,
                numOfCakes : state.numOfCakes + action.payload,
            }                         
        default:
            return state
    }
}
const iceCreamReducer = (state = initialIceCreamState, action) => {
    switch(action.type){ 
        case ICE_CREAM_ORDERED:
            return {
                ...state,
                numOfIceCreams : state.numOfIceCreams - 1,
            }
        case ICE_CREAM_RESTOCKED:
            return {
                ...state,
                numOfIceCreams : state.numOfIceCreams + action.payload,
            }                        
        default:
            return state
    }
}

const rootReducer = combineReducers({
    cake: cakeReducer,
    iceCream: iceCreamReducer
})

const store = createStore(rootReducer, applyMiddleware(logger))

console.log('Initial State:', store.getState())

const unsubscribe = store.subscribe(()=> {})

// store.dispatch(orderCake())
// store.dispatch(orderCake())
// store.dispatch(orderCake())

// store.dispatch(restockCake(3))

const actions = bindActionCreators({ orderCake, restockCake, orderIceCream, restockIceCream }, store.dispatch)

actions.orderCake()
actions.orderCake()
actions.orderCake()
actions.restockCake(3)
actions.orderIceCream()
actions.orderIceCream()
actions.restockIceCream(2)

unsubscribe()