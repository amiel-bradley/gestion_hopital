import { computed, ref, watch } from "vue"

// --------- Données Utilisateurs ----------------------------------
export const users = ref([
    { id: 1, username: 'John', firstname: 'Doe', role: 'admin', password: '1234' },
    { id: 2, username: 'Rogalex', firstname: 'ZANNOU', role: 'doctor', password: '1234' },
    { id: 3, username: 'Marcel', firstname: 'YESSIA', role: 'recept', password: '1234' },
])
localStorage.setItem('users', JSON.stringify(users.value))

// --------- Données Médecins ----------------------------------
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

// --------- Données Patients ----------------------------------
const storedPatients = JSON.parse(localStorage.getItem('patients'))
export const patients = ref(storedPatients || [
    {
        id: Date.now(),
        firstName: "SOUDE",
        lastName: "Armel",
        gender: "male",
        phone: "0158010353",
        bloodGroup: "O+",
        status: "hospitalized",
        rdv: false,
        doctorId: 3,
        roomId: 12,
        createdAt: new Date()
    }
])
// localStorage.setItem('patients', JSON.stringify(patients.value))
watch(
    patients,
    (newValue) => {
        localStorage.setItem('patients', JSON.stringify(newValue))
    },
    { deep: true }
)

// --------- Données Chambres ----------------------------------
export const rooms = ref([
    { roomId: Date.now(),numero: "001", capacite: 5, statut: "available", affectationPatient: 0 },
    { roomId: Date.now(),numero: "002", capacite: 5, statut: "available", affectationPatient: 0 },
    { roomId: Date.now(),numero: "003", capacite: 5, statut: "available", affectationPatient: 0 },
    { roomId: Date.now(),numero: "004", capacite: 5, statut: "available", affectationPatient: 0 },
    { roomId: Date.now(),numero: "005", capacite: 5, statut: "available", affectationPatient: 0 },
    { roomId: Date.now(),numero: "006", capacite: 5, statut: "available", affectationPatient: 0 },
    { roomId: Date.now(),numero: "007", capacite: 5, statut: "available", affectationPatient: 0 },
    { roomId: Date.now(),numero: "008", capacite: 5, statut: "available", affectationPatient: 0 },
    { roomId: Date.now(),numero: "009", capacite: 5, statut: "available", affectationPatient: 0 },
    { roomId: Date.now(),numero: "010", capacite: 5, statut: "available", affectationPatient: 0 },
    { roomId: Date.now(),numero: "011", capacite: 5, statut: "available", affectationPatient: 0 },
    { roomId: Date.now(),numero: "012", capacite: 5, statut: "available", affectationPatient: 0 },
    { roomId: Date.now(),numero: "013", capacite: 5, statut: "available", affectationPatient: 0 },
    { roomId: Date.now(),numero: "014", capacite: 5, statut: "available", affectationPatient: 0 },
    { roomId: Date.now(),numero: "015", capacite: 5, statut: "available", affectationPatient: 0 },
    { roomId: Date.now(),numero: "016", capacite: 5, statut: "available", affectationPatient: 0 },
    { roomId: Date.now(),numero: "017", capacite: 5, statut: "available", affectationPatient: 0 },
    { roomId: Date.now(),numero: "018", capacite: 5, statut: "available", affectationPatient: 0 },
    { roomId: Date.now(),numero: "019", capacite: 5, statut: "available", affectationPatient: 0 },
    { roomId: Date.now(),numero: "020", capacite: 5, statut: "available", affectationPatient: 0 }
]);
localStorage.setItem("rooms", JSON.stringify(rooms.value));

export const roomsdispo = computed(() =>
  rooms.value.filter((x) => {
    return x.statut == "available";
  }),
)
watch(
    rooms,
    (newValue) => {
        localStorage.setItem('rooms', JSON.stringify(newValue))
    },
    { deep: true }
)
export const roomsAvailable = computed(() => rooms.value.filter(r => r.capacite >= 1))
watch(
    roomsAvailable,
    (newValue) => {
        localStorage.setItem('roomsAvailable', JSON.stringify(newValue))
    },
    { deep: true }
)


