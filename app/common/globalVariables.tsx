import {useState} from "react";

export const baseUrl = "https://slock.oscadeberranger.com"

let token = ""
export let currentUserId = 0

export let currentUserEmail = "profile"



export function setToken(newToken: string){
    token = newToken
}

export function getToken(){
    return token
}

export function setCurrentUserEmail(email: string){
    currentUserEmail = email
}

export function setCurrentUserId(id: number){
    currentUserId = id
}
