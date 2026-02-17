import { ref, watch } from "vue"

export const users = ref([
    { id: 1, username: 'John', firstname: 'Doe', role: 'admin', password: '1234' },
    { id: 2, username: 'Rogalex', firstname: 'ZANNOU', role: 'doctor', password: '1234' },
    { id: 3, username: 'Marcel', firstname: 'YESSIA', role: 'recept', password: '1234' },
])
localStorage.setItem('users', JSON.stringify(users.value))


const storedDoctors = JSON.parse(localStorage.getItem('doctors'))
export const doctors = ref(storedDoctors || [
    { id: Date.now(), name: 'Rogalex', speciality: 'chirugie', phone: '0166010292', available: true }
])
watch(
  doctors,
  (newValue) => {
    localStorage.setItem('doctors', JSON.stringify(newValue))
  },
  { deep: true }
)

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
localStorage.setItem('patients', JSON.stringify(patients.value))

export const rooms = ref([
    { numero: "001", capacite: 5, statut: "available", affectationPatient: 0 },
    { numero: "002", capacite: 5, statut: "available", affectationPatient: 0 },
    { numero: "003", capacite: 5, statut: "available", affectationPatient: 0 },
    { numero: "004", capacite: 5, statut: "available", affectationPatient: 0 },
    { numero: "005", capacite: 5, statut: "available", affectationPatient: 0 },
    { numero: "006", capacite: 5, statut: "available", affectationPatient: 0 },
    { numero: "007", capacite: 5, statut: "available", affectationPatient: 0 },
    { numero: "008", capacite: 5, statut: "available", affectationPatient: 0 },
    { numero: "009", capacite: 5, statut: "available", affectationPatient: 0 },
    { numero: "010", capacite: 5, statut: "available", affectationPatient: 0 },
    { numero: "011", capacite: 5, statut: "available", affectationPatient: 0 },
    { numero: "012", capacite: 5, statut: "available", affectationPatient: 0 },
    { numero: "013", capacite: 5, statut: "available", affectationPatient: 0 },
    { numero: "014", capacite: 5, statut: "available", affectationPatient: 0 },
    { numero: "015", capacite: 5, statut: "available", affectationPatient: 0 },
    { numero: "016", capacite: 5, statut: "available", affectationPatient: 0 },
    { numero: "017", capacite: 5, statut: "available", affectationPatient: 0 },
    { numero: "018", capacite: 5, statut: "available", affectationPatient: 0 },
    { numero: "019", capacite: 5, statut: "available", affectationPatient: 0 },
    { numero: "020", capacite: 5, statut: "available", affectationPatient: 0 }
])
localStorage.setItem('rooms', JSON.stringify(rooms.value))
