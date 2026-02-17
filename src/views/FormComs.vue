<script setup>
import { ref, watch } from "vue";
import { patients } from "@/services/data";
import { doctorsdispo, roomsdispo } from "@/services/data";
import { useRouter } from "vue-router";

const router = useRouter();

// const patients = ref(JSON.parse(localStorage.getItem("patients")) || []);

const savedTodos = localStorage.getItem("patients") || [];

if (savedTodos) {
  patients.value = JSON.parse(savedTodos);
  console.log((patients.value = JSON.parse(savedTodos)));
}

watch(
  patients,
  (newValue) => {
    localStorage.setItem("patients", JSON.stringify(newValue));
  },
  { deep: true }, // nécessaire si c'est un tableau ou objet
);

const firstName = ref("");
const lastName = ref("");
const gender = ref("");
const phone = ref("");
const blood = ref("");
const status = ref("");
const medicalNeed = ref("");
const selectedDoctorId = ref("");
const selectedRoomId = ref("");

const addPatient = () => {
  //   console.log(selectedDoctorId.value);
  //   console.log(selectedRoomId.value);

  const doctorSelect = doctorsdispo.value.find(
    (d) => d.id === Number(selectedDoctorId.value),
  );

  const roomSelect = roomsdispo.value.find(
    (r) => r.roomId === Number(selectedRoomId.value),
  );
  // console.log(doctorSelect);

  // console.log(roomSelect);

  let patient = {
    id: Date.now(),
    firstName: firstName.value,
    lastName: lastName.value,
    gender: gender.value,
    phone: phone.value,
    bloodGroup: blood.value,
    besoinMedical: medicalNeed.value,
    status: status.value,
    rdv:false,
    doctorId: selectedDoctorId.value,
    roomId: selectedRoomId.value,
    createdAt: new Date().toLocaleDateString(),
  };

  patients.value.push(patient);

  console.log(patients.value);

  localStorage.setItem("patients", JSON.stringify(patients.value));

  router.push("/patients");
};
</script>

<template>
  <form @submit.prevent="addPatient">
    <label for="FirstName">FirstName</label>
    <input type="text" placeholder="FirstName" v-model="firstName" />
    <label for="LastName">LastName</label>
    <input type="text" placeholder="LastName" v-model="lastName" />
    <label for="Genre">Genre</label>
    <select id="genre" name="genre" required v-model="gender">
      <option value="">-- Select --</option>
      <option value="M">M</option>
      <option value="F">F</option>
    </select>

    <label for="Phone">Phone</label>
    <input type="number" placeholder="Phone" v-model="phone" />

    <label for="bloodGroup">Blood type</label>
    <select id="bloodGroup" name="bloodGroup" required v-model="blood">
      <option value="">-- Select --</option>
      <option value="A+">A+</option>
      <option value="A-">A-</option>
      <option value="B+">B+</option>
      <option value="B-">B-</option>
      <option value="AB+">AB+</option>
      <option value="AB-">AB-</option>
      <option value="O+">O+</option>
      <option value="O-">O-</option>
    </select>

    <label for="patientStatus">Patient status</label>
    <select id="patientStatus" name="patientStatus" required v-model="status">
      <option value="">-- Select --</option>
      <option value="en_attente">En attente</option>
      <option value="en_consultation">En consultation</option>
      <option value="en_traitement">En traitement</option>
      <option value="hospitalise">Hospitalisé</option>
      <option value="sorti">Sorti</option>
      <option value="transfere">Transféré</option>
    </select>

    <label for="besoinMedical">Medical need</label>
    <select id="besoinMedical" name="besoinMedical" v-model="medicalNeed">
      <option value="">-- Select --</option>
      <option value="consultation">Consultation générale</option>
      <option value="chirurgie">Chirurgie</option>
      <option value="gynecologie">Suivi gynécologique</option>
      <option value="cardiologie">Examen cardiologique</option>
      <option value="urgence">Urgence</option>
    </select>

    <label for="besoinMedical">Doctor available</label>
    <select id="doctorId" name="doctorId" v-model="selectedDoctorId" required>
      <option value="">-- Select --</option>

      <option
        v-for="doctor in doctorsdispo"
        :key="doctor.id"
        :value="doctor.id"
      >
        {{ doctor.name }}
      </option>
    </select>

    <label for="besoinMedical">Room available</label>
    <select id="roomId" name="roomId" v-model="selectedRoomId" required>
      <option value="">-- Select --</option>

      <option
        v-for="room in roomsdispo"
        :key="room.roomId"
        :value="room.roomId"
      >
        {{ room.numero }}
      </option>
    </select>

    <!-- <label for="admissionDate">Admission date</label>
    <input
      type="date"
      id="admissionDate"
      v-model="patient.admissionDate"
      required
    /> -->

    <button type="submit">Enregistrer</button>
  </form>
</template>

<style scoped>
/* ===============================
   FORM CONTAINER
================================ */
form {
  max-width: 720px;
  margin: 40px auto;
  padding: 32px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 20px;
  font-family: "Inter", "Segoe UI", sans-serif;
}

/* ===============================
   LABELS
================================ */
label {
  display: block;
  margin-bottom: 6px;
  margin-top: 18px;
  font-size: 14px;
  font-weight: 500;
  color: #0f172a;
}

/* ===============================
   INPUTS & SELECTS
================================ */
input,
select {
  width: 100%;
  padding: 12px 14px;
  border-radius: 10px;
  border: 1px solid #e2e8f0;
  background: #ffffff;
  font-size: 14px;
  color: #0f172a;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

input::placeholder {
  color: #94a3b8;
}

input:focus,
select:focus {
  outline: none;
  border-color: #5eead4;
  box-shadow: 0 0 0 3px rgba(13, 148, 136, 0.15);
}

/* ===============================
   GROUPING FEEL
================================ */
select {
  cursor: pointer;
}

/* ===============================
   SUBMIT BUTTON
================================ */
button[type="submit"] {
  margin-top: 28px;
  width: 100%;
  padding: 14px;
  border-radius: 12px;
  border: none;
  background: #0d9488;
  color: #ffffff;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition:
    background 0.2s ease,
    transform 0.15s ease;
}

button[type="submit"]:hover {
  background: #0f766e;
  transform: translateY(-1px);
}

/* ===============================
   RESPONSIVE
================================ */
@media (max-width: 768px) {
  form {
    padding: 24px;
    border-radius: 16px;
  }
}
</style>
