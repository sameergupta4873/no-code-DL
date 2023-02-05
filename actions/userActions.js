import axios from 'axios';
import {
    USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL,USER_LOGOUT,
    USER_REGISTER_REQUEST, USER_REGISTER_RESET, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL,
    USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_DETAILS_FAIL,
    } from "../constants/userConstants";



export const loginAction = (email, password, axiosConfig) => async (dispacth,getState) => {
    try {
        dispacth({type:USER_LOGIN_REQUEST})
        const config = {headers: {'Content-Type' : 'application/json'}}
        const {data} = await axios.post('http://localhost:4000/api/v1/users/login', {email, password, config}, axiosConfig)
        dispacth({
            type: USER_LOGIN_SUCCESS,
            payload:data
        })
        
        
    localStorage.setItem('userInfo',JSON.stringify(getState().userLogin.userInfo))
    } catch (error) {
        dispacth({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message: error.message
        })
    }
}

export const logout = () => dispacth => {
    dispacth({type: USER_LOGOUT})
}

export const register = (name, email, password) => async dispacth => {
    try {
        dispacth({type:USER_REGISTER_REQUEST})
        const config = {headers: {'Content-Type' : 'application/json'}}
        const {data} = await axios.post('/api/v1/users', {name,email, password,config})
        dispacth({
            type: USER_REGISTER_SUCCESS,
            payload:data,
        })
        dispacth({
            type: USER_LOGIN_SUCCESS,
            payload:data
        })
        
    localStorage.setItem('userInfo',JSON.stringify(data))
    } catch (error) {
        dispacth({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message: error.message
        })
    }
}

export const getUserDetails = (id) => async (dispacth, getState )=> {
    try {
        dispacth({
            type: USER_DETAILS_REQUEST,
        })
        const {userLogin:{userInfo}} = getState();
        const config = {headers: {'Content-Type' : 'application/json', Authorization:`Bearer ${userInfo.token}`}};
        const {data} = await axios.get(`api/v1/users/profile`,config)
        
        dispacth({
            type: USER_DETAILS_SUCCESS,
            payload : data
        })
        
    } catch (error) {
        dispacth({
            type:USER_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message: error.message
        })
    }
};
