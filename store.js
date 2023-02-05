import { legacy_createStore as createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { createWrapper } from "next-redux-wrapper";
import { userDetailsreducer, userLoginReducer, userRegisterReducer } from "./reducers/userReducer";
import {productDetailsReducer, productListReducer} from "./reducers/productReducer"
// initial states here

const reducer = combineReducers({
    userLogin : userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails : userDetailsreducer,
    productList : productListReducer,
    productDetails : productDetailsReducer,
})

const userInfoFromLocalStorage = typeof window !== "undefined" && localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
const imageFromLocalStorage = typeof window !== "undefined" && localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products')) : null
const initialState = {
    userLogin : {userInfo: userInfoFromLocalStorage},
    productDetails : {products: imageFromLocalStorage}
};
// middleware
const middleware = [thunk];

// creating store
export const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

// assigning store to next wrapper
const makeStore = () => store;

export const wrapper = createWrapper(makeStore);