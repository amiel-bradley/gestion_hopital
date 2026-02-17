import { ref } from "vue"
import { users } from "./data"

export const auThis = ref(!!localStorage.getItem('userId'));
export const currentId = ref(
  localStorage.getItem('userId') 
    ? { id: Number(localStorage.getItem('userId'))} 
    : null
)
export function login(username, password) {
    const existance = users.value.find(u =>
        u.username.toLowerCase() === username.toLowerCase() &&
        u.password === password
    )
    if (!existance) { 
        return false 
    } else {
        // const token = 'token' + Date.now()
        // localStorage.setItem('token', token)
        localStorage.setItem('userId', existance.id)
        currentId.value = { id: existance.id }        
        auThis.value = true
        return true
    }
}
export function getUser() {
    if (!currentId.value) return null
    return users.value.find(u => u.id === currentId.value.id)
}
export function logout() {
    // localStorage.removeItem('token')
    localStorage.removeItem('userId')
    auThis.value = false
}
export function isAuthenticated() {
    return !!localStorage.getItem('userId')
}
