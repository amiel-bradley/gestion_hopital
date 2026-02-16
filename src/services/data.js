import { ref } from "vue"

export const users = ref([
    { id: Date.now(), username: 'John', firstname: 'Doe', role: 'admin', password: '1234' },
    { id: Date.now(), username: 'Rogalex', firstname: 'ZANNOU', role: 'doctor', password: '1234' },
    { id: Date.now(), username: 'Marcel', firstname: 'YESSIA', role: 'recept', password: '1234' },
])
localStorage.setItem('users', JSON.stringify(users.value))

export const doctors = ref([
    { id: Date.now(), name: 'Rogalex', speciality: 'chirugie', phone: '0166010292', available: true }
])
localStorage.setItem('doctors', JSON.stringify(doctors))

export const patients = ref([
    {
        id: Date.now(),
        firstName: "SOUDE",
        lastName: "Armel",
        gender: "male",
        phone: "0158010353",
        bloodGroup: "O+",
        status: "hospitalized",
        doctorId: 3,
        roomId: 12,
        createdAt: new Date()
    }
])
localStorage.setItem('patients', JSON.stringify(patients))

export const rooms = ref([
    { numero: "001", capacite: 5, statut: "busy", affectationPatient: null },
    { numero: "002", capacite: 5, statut: "available", affectationPatient: null },
    { numero: "003", capacite: 5, statut: "busy", affectationPatient: null },
    { numero: "004", capacite: 5, statut: "busy", affectationPatient: null },
    { numero: "005", capacite: 5, statut: "available", affectationPatient: null },
    { numero: "006", capacite: 5, statut: "available", affectationPatient: null },
    { numero: "007", capacite: 5, statut: "busy", affectationPatient: null },
    { numero: "008", capacite: 5, statut: "available", affectationPatient: null },
    { numero: "009", capacite: 5, statut: "busy", affectationPatient: null },
    { numero: "010", capacite: 5, statut: "busy", affectationPatient: null },
    { numero: "011", capacite: 5, statut: "available", affectationPatient: null },
    { numero: "012", capacite: 5, statut: "busy", affectationPatient: null },
    { numero: "013", capacite: 5, statut: "available", affectationPatient: null },
    { numero: "014", capacite: 5, statut: "busy", affectationPatient: null },
    { numero: "015", capacite: 5, statut: "available", affectationPatient: null },
    { numero: "016", capacite: 5, statut: "available", affectationPatient: null },
    { numero: "017", capacite: 5, statut: "busy", affectationPatient: null },
    { numero: "018", capacite: 5, statut: "busy", affectationPatient: null},
    { numero: "019", capacite: 5, statut: "available", affectationPatient: null },
    { numero: "020", capacite: 5, statut: "busy", affectationPatient: null }
])
localStorage.setItem('rooms', JSON.stringify(rooms))
