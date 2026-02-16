<script setup>
const props = defineProps({
    doctors: Array,
})

const emit = defineEmits(["removeDoctor", "editDoctor"])

function removeDoctor(doctor){
    emit("removeDoctor", doctor)
}
function editDoctor(doctor){
    emit("editDoctor", doctor)
}
</script>

<template>
<div class="doctor-container">
  <h2>Liste des docteurs 
<svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="50px" fill="#000000"><path d="M420-280h120v-140h140v-120H540v-140H420v140H280v120h140v140ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z"/></svg> </h2>

  <table class="doctor-table">
    <thead>
      <tr>
        <th>Nom</th>
        <th>Spécialité</th>
        <th>Téléphone</th>
        <th>Disponibilité</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="doctor in doctors" :key="doctor.id">
        <td>{{ doctor.name }}</td>
        <td>{{ doctor.speciality }}</td>
        <td>{{ doctor.phone }}</td>
        <td>
          <span :class="doctor.available ? 'available' : 'unavailable'">
            {{ doctor.available ? 'Disponible' : 'Indisponible' }}
          </span>
        </td>
        <td>
          <button class="edit-btn" @click="editDoctor(doctor)">Modifier</button>
          <button class="remove-btn" @click="removeDoctor(doctor)">Supprimer</button>
        </td>
      </tr>
    </tbody>
  </table>
</div>
</template>

<style scoped>
h2{
    display: flex;
    margin-left: 8rem;
    gap: 5px;
}
.doctor-container {
  background-color: #fdfdfd; /* blanc clair */
  padding: 20px;
  border-radius: 10px;
  max-width: 900px;
  margin: 30px auto;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  font-family: Arial, sans-serif;
}

h2 {
  text-align: center;
  color: #1a73e8; /* bleu */
  margin-bottom: 20px;
}

.doctor-table {
  width: 100%;
  border-collapse: collapse;
}

.doctor-table th, .doctor-table td {
  padding: 12px 15px;
  text-align: left;
}

.doctor-table thead {
  background-color: #ffb6c1; /* rose clair */
  color: #000;
  font-weight: bold;
}

.doctor-table tbody tr {
  border-bottom: 1px solid #ddd;
}

.doctor-table tbody tr:nth-child(even) {
  background-color: #f0f8ff; /* bleu très clair pour les lignes paires */
}

.available {
  color: green;
  font-weight: bold;
}

.unavailable {
  color: red;
  font-weight: bold;
}

button {
  padding: 6px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.2s;
}

.edit-btn {
  background-color: #1a73e8; /* bleu */
  color: white;
  margin-right: 5px;
}

.edit-btn:hover {
  background-color: #155ab6;
}

.remove-btn {
  background-color: #ff4d6d; /* rose foncé */
  color: white;
}

.remove-btn:hover {
  background-color: #d93657;
}
</style>
