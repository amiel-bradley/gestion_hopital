<script setup>
import { ref } from 'vue'

import { doctorsdispo, roomsdispo } from '@/services/data';


const patients = ref(JSON.parse(localStorage.getItem("patients")) || [])

const firstName = ref('');
const lastName = ref('');
const gender = ref('');
const phone = ref('');
const blood = ref('');
const status = ref('');
const medicalNeed = ref('');
const selectedDoctorId = ref('');
const selectedRoomId = ref('');



const addPatient = () => {

  // if (!doctorSelect) {
  //   console.error("Doctor non trouvé !")
  //   return
  // }
  // if (!roomSelect) {
  //   console.error("Room non trouvé !")
  //   return
  // }


  // let doctorSelect = doctorsdispo.value.find((x) => x.name == selectedDoctorId.value)

  // let roomSelect = roomsdispo.value.find((x) => x.numero == selectedRoomId.value)
  console.log(selectedDoctorId.value);
  console.log(selectedRoomId.value);

  const doctorSelect = doctorsdispo.value.find(
    d => d.id === Number(selectedDoctorId.value)
  )

  const roomSelect = roomsdispo.value.find(
    r => r.roomId === Number(selectedRoomId.value)
  )
  console.log(doctorSelect);

  console.log(roomSelect);

  let patient = {
    id: Date.now(),
    firstName: firstName.value,
    lastName: lastName.value,
    gender: gender.value,
    phone: phone.value,
    bloodGroup: blood.value,
    besoinMedical: medicalNeed.value,
    status: status.value,
    doctorId: selectedDoctorId.value,
    roomId: selectedRoomId.value,
    createdAt: new Date(),
  }

  patients.value.push(patient)

  console.log(patients.value);


  localStorage.setItem("patients", JSON.stringify(patients.value));
}
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

      <option v-for="doctor in doctorsdispo" :key="doctor.id" :value="doctor.id">
        {{ doctor.name }}
      </option>
    </select>

    <label for="besoinMedical">Room available</label>
    <select id="roomId" name="roomId" v-model="selectedRoomId" required>
      <option value="">-- Select --</option>

      <option v-for="room in roomsdispo" :key="room.roomId" :value="room.roomId">
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

<!-- <style scoped>
form {
  max-width: 600px;
  margin: 50px auto;
  padding: 40px 30px;
  background-color: #fff; /* blanc neutre */
  border-radius: 12px;
  border: 1px solid #d1d5db;
  display: flex;
  flex-direction: column;
  gap: 18px;
  font-family: "Arial", sans-serif;
}

label {
  font-weight: 500;
  color: #333;
  margin-bottom: 6px;
}

input[type="text"],
input[type="number"],
select {
  padding: 12px 14px;
  border-radius: 6px;
  border: 1px solid #9ca3af; /* gris neutre */
  font-size: 15px;
  outline: none;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

input:focus,
select:focus {
  border-color: #6b7280;
  box-shadow: 0 0 0 2px rgba(107, 114, 128, 0.2);
}

select {
  cursor: pointer;
}

form button {
  margin-top: 10px;
  padding: 14px 0;
  border-radius: 6px;
  border: none;
  background-color: #374151; /* gris foncé */
  color: #fff;
  font-weight: 500;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

form button:hover {
  background-color: #1f2937;
}

/* Responsive */
@media (max-width: 640px) {
  form {
    padding: 30px 20px;
  }
}
</style> -->
<style scoped>
form {
  max-width: 600px;
  margin: 50px auto;
  padding: 40px 30px;
  background-color: #f0f9f9;
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  gap: 20px;
  font-family: "Segoe UI", sans-serif;
}

label {
  font-weight: 500;
  color: #1e3a8a;
  margin-bottom: 6px;
}

input[type="text"],
input[type="number"],
select {
  padding: 12px 14px;
  border-radius: 6px;
  border: 1px solid #cbd5e1;
  font-size: 15px;
  outline: none;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

input:focus,
select:focus {
  border-color: #059669;
  box-shadow: 0 0 0 3px rgba(5, 150, 105, 0.2);
}

select {
  cursor: pointer;
}

form button {
  margin-top: 10px;
  padding: 14px 0;
  border-radius: 6px;
  border: none;
  background-color: #1e40af;
  color: #fff;
  font-weight: 500;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

form button:hover {
  background-color: #1e3a8a;
}

@media (max-width: 640px) {
  form {
    padding: 30px 20px;
  }
}
</style>
