import * as actions from '../constants'
import { v4 as uuidv4 } from 'uuid';
import { request, gql } from 'graphql-request'

const endpoint = 'http://localhost:3002/graphql'

const loadPhonebookSuccess = phonebooks => ({
    type: actions.LOAD_PHONEBOOK_SUCCESS,
    phonebooks
})
const loadPhonebookFailure = () => ({
    type: actions.LOAD_PHONEBOOK_FAILURE
})

export const loadPhonebook = () => (dispatch) => {
    const queryLoad = gql`
    query{
        getPhonebooks{
          id
          name
          phone
              createdAt
        }
      }
    `
    return request(endpoint, queryLoad).then((response) => {
        response.getPhonebooks.map(i => {
            return i.sent = true
        })
        dispatch(loadPhonebookSuccess(response.getPhonebooks))
    }).catch(err => {
        dispatch(loadPhonebookFailure())
    })
}

const addPhonebookSuccess = (oldId, phonebook) => ({
    type: actions.ADD_PHONEBOOK_SUCCESS,
    oldId, phonebook
})
const addPhonebookFailure = (id) => ({
    type: actions.ADD_PHONEBOOK_FAILURE,
    id
})
const addDrawPhonebook = (id, name, phone) => ({
    type: actions.ADD_DRAW_PHONEBOOK,
    id, name, phone
})

export const addPhonebook = (name, phone) => (dispatch) => {
    const id = uuidv4()
    dispatch(addDrawPhonebook(id, name, phone))

    const mutationAdd = gql`
    mutation createPhonebook($name: String, $phone: String){
        createPhonebook(input: {name:$name, phone:$phone}){
            id
           name
           phone
         } 
       }
    `
    const variablesAdd = {
        name: name,
        phone: phone,
    }

    return request(endpoint, mutationAdd, variablesAdd).then((response) => {
        dispatch(addPhonebookSuccess(id, response.createPhonebook))
    }).catch(err => {
        dispatch(addPhonebookFailure(id))
    })
}

const removePhonebookSuccess = id => ({
    type: actions.REMOVE_PHONEBOOK_SUCCESS,
    id
})
const removePhonebookFailure = () => ({
    type: actions.REMOVE_PHONEBOOK_FAILURE,
})

export const removePhonebook = (id) => (dispatch) => {
    const mutationDelete = gql`
    mutation deletePhonebook($id:ID!){
        deletePhonebook(id:$id){
            id
           name
           phone
         } 
       }
    `
    const variablesDelete = {
        id: id,
    }
    return request(endpoint, mutationDelete, variablesDelete).then((response) => {
        dispatch(removePhonebookSuccess(id))
    }).catch(err => {
        console.log(err)
        dispatch(removePhonebookFailure(id))
    })
}

const resendPhonebookSuccess = (oldId, newId) => ({
    type: actions.RESEND_PHONEBOOK_SUCCESS,
    oldId, newId
})
const resendPhonebookFailure = () => ({
    type: actions.RESEND_PHONEBOOK_FAILURE,
})
const resendPhonebookCancel = (id) => ({
    type: actions.RESEND_PHONEBOOK_CANCEL,
    id
})

export const resendPhonebook = (id, name, phone) => (dispatch) => {
    const mutationResend = gql`
    mutation createPhonebook($name: String, $phone: String){
        createPhonebook(input: {name:$name, phone:$phone}){
            id
           name
           phone
         } 
       }
    `
    const variablesResend = {
        name: name,
        phone: phone,
    }

    return request(endpoint, mutationResend, variablesResend).then((response) => {
        dispatch(resendPhonebookSuccess(id, response.createPhonebook.id))
    }).catch(err => {
        dispatch(resendPhonebookFailure())
    })
}

export const cancelResend = (id) => (dispatch) => {
    return dispatch(resendPhonebookCancel(id))
}

const editPhonebookSuccess = (id, name, phone) => ({
    type: actions.EDIT_PHONEBOOK_SUCCESS,
    id, name, phone
})
const editPhonebookFailure = () => ({
    type: actions.EDIT_PHONEBOOK_FAILURE,
})

export const editPhonebook = (id, name, phone) => (dispatch) => {
    const mutationEdit = gql`
    mutation updatePhonebook($id:ID!, $name: String, $phone: String){
        updatePhonebook(id:$id, input: {name:$name, phone:$phone}){
            id
           name
           phone
         } 
       }
    `
    const variablesEdit = {
        id:id,
        name: name,
        phone: phone,
    }

    return request(endpoint, mutationEdit, variablesEdit).then((response) => {
        dispatch(editPhonebookSuccess(id, name, phone))
    }).catch(err => {
        console.error(err)
        dispatch(editPhonebookFailure())
    })
}

const searchPhonebookSuccess = phonebooks => ({
    type: actions.SEARCH_PHONEBOOK_SUCCESS,
    phonebooks
})
const searchPhonebookFailure = () => ({
    type: actions.SEARCH_PHONEBOOK_FAILURE,
})

export const searchPhonebook = (name, phone, sort) => (dispatch) => {
    const querySearch = gql`
    query searchPhonebooks($name: String, $phone: String, $sort: String){
        searchPhonebooks(name: $name, phone: $phone, sort: $sort){
          id
          name
          phone
          createdAt
        }
      }
    `
    const variablesSearch = {
        name: name,
        phone: phone,
        sort: sort
    }

    return request(endpoint, querySearch, variablesSearch).then((response) => {
        dispatch(searchPhonebookSuccess(response.searchPhonebooks))
    }).catch(err => {
        console.error(err)
        dispatch(searchPhonebookFailure())
    })
}




