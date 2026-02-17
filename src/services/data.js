import { computed, ref } from "vue";

export const users = ref([
  {
    id: Date.now(),
    username: "John",
    firstname: "Doe",
    role: "admin",
    password: "1234",
  },
  {
    id: Date.now(),
    username: "Rogalex",
    firstname: "ZANNOU",
    role: "doctor",
    password: "1234",
  },
  {
    id: Date.now(),
    username: "Marcel",
    firstname: "YESSIA",
    role: "recept",
    password: "1234",
  },
]);
localStorage.setItem("users", JSON.stringify(users.value));

export const doctors = ref([
  {
    id: Date.now(),
    name: "Rogalex",
    speciality: "chirugie",
    phone: "0166010292",
    available: true,
  },
  {
    id: Date.now(),
    name: "Armiel",
    speciality: "chirugie",
    phone: "0166010292",
    available: true,
  },
  {
    id: Date.now(),
    name: "Maxson",
    speciality: "chirugie",
    phone: "0166010292",
    available: true,
  },
  {
    id: Date.now(),
    name: "Marcel",
    speciality: "chirugie",
    phone: "0166010292",
    available: false,
  },
]);
localStorage.setItem("doctors", JSON.stringify(doctors.value));

export const doctorsdispo = computed(() =>
  doctors.value.filter((x) => {
    return x.available == true;
  }),
);

console.log(doctorsdispo.value);

export const patients = ref([
  {
    id: Date.now(),
    firstName: "SOUDE",
    lastName: "Armel",
    gender: "male",
    phone: "0158010353",
    bloodGroup: "O+",
    besoinMedical: "chirurgie",
    status: "hospitalized",
    doctorId: 3,
    roomId: 12,
    createdAt: new Date(),
  },
]);
localStorage.setItem("patients", JSON.stringify(patients.value));

export const rooms = ref([
  {
    roomId: Date.now(),
    numero: "001",
    capacite: 5,
    statut: "available",
    affectationPatient: 0,
  },
  {
    roomId: Date.now(),
    numero: "002",
    capacite: 5,
    statut: "available",
    affectationPatient: 0,
  },
  {
    roomId: Date.now(),
    numero: "003",
    capacite: 5,
    statut: "available",
    affectationPatient: 0,
  },
  {
    roomId: Date.now(),
    numero: "004",
    capacite: 5,
    statut: "available",
    affectationPatient: 0,
  },
  {
    roomId: Date.now(),
    numero: "005",
    capacite: 5,
    statut: "available",
    affectationPatient: 0,
  },
  {
    roomId: Date.now(),
    numero: "006",
    capacite: 5,
    statut: "available",
    affectationPatient: 0,
  },
  {
    roomId: Date.now(),
    numero: "007",
    capacite: 5,
    statut: "available",
    affectationPatient: 0,
  },
  {
    roomId: Date.now(),
    numero: "008",
    capacite: 5,
    statut: "available",
    affectationPatient: 0,
  },
  {
    roomId: Date.now(),
    numero: "009",
    capacite: 5,
    statut: "available",
    affectationPatient: 0,
  },
  {
    roomId: Date.now(),
    numero: "010",
    capacite: 5,
    statut: "available",
    affectationPatient: 0,
  },
  {
    roomId: Date.now(),
    numero: "011",
    capacite: 5,
    statut: "available",
    affectationPatient: 0,
  },
  {
    roomId: Date.now(),
    numero: "012",
    capacite: 5,
    statut: "available",
    affectationPatient: 0,
  },
  {
    roomId: Date.now(),
    numero: "013",
    capacite: 5,
    statut: "available",
    affectationPatient: 0,
  },
  {
    roomId: Date.now(),
    numero: "014",
    capacite: 5,
    statut: "available",
    affectationPatient: 0,
  },
  {
    roomId: Date.now(),
    numero: "015",
    capacite: 5,
    statut: "available",
    affectationPatient: 0,
  },
  {
    roomId: Date.now(),
    numero: "016",
    capacite: 5,
    statut: "available",
    affectationPatient: 0,
  },
  {
    roomId: Date.now(),
    numero: "017",
    capacite: 5,
    statut: "available",
    affectationPatient: 0,
  },
  {
    roomId: Date.now(),
    numero: "018",
    capacite: 5,
    statut: "available",
    affectationPatient: 0,
  },
  {
    roomId: Date.now(),
    numero: "019",
    capacite: 5,
    statut: "available",
    affectationPatient: 0,
  },
  {
    roomId: Date.now(),
    numero: "020",
    capacite: 5,
    statut: " Not available",
    affectationPatient: 0,
  },
]);
localStorage.setItem("rooms", JSON.stringify(rooms.value));

export const roomsdispo = computed(() =>
  rooms.value.filter((x) => {
    return x.statut == "available";
  }),
);
console.log(roomsdispo.value);
