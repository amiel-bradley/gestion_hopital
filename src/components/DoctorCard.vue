<script setup>
///////////////// Les imports//////////////////////////////////
import { ref } from 'vue';
//////////////////////////////////////////////////////////////////////////


///////////////////// Les constantes ///////////////////////////////////////
const props = defineProps({
    doctors: Array,
})
const emit = defineEmits(["removeDoctor", "editDoctor"])
const showModal = ref(false)
const doctorToDelete = ref(null)
//////////////////////////////////////////////////////////////////////////////////////


//////////////////Les méthodes//////////////////////////////////////////////

/// Fonction qui confirme ou non la supression****************************
function confirmDelete(doctor){
    doctorToDelete.value = doctor ///// dnne à doctorDelete lesw infos du docteur concerner
    showModal.value = true
}

/// Fonction qui fait la supression**********************************
function deleteDoctor(){
    if(doctorToDelete.value){
        emit("removeDoctor", doctorToDelete.value) /// envoie le docteur à supprimer en emit
    }
    showModal.value = false
    doctorToDelete.value = null
}

/// Fonction qui  refuse la supression*************************************
function cancelDelete(){
    showModal.value = false
    doctorToDelete.value = null
}

/// Fonction qui modifie un docteur****************************
function editDoctor(doctor){
    emit("editDoctor", doctor)
}
///////////////////////////////////////////////////////////////////////
</script>

<template>

<div class="doctor-container">
  <h2>Liste des docteurs 
<svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="50px" fill="#000000"><path d="M420-280h120v-140h140v-120H540v-140H420v140H280v120h140v140ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z"/></svg> </h2>

<!-- Tableau des docteurs -->
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
          <button class="remove-btn" @click="confirmDelete(doctor)">Supprimer</button>
        </td>
      </tr>
    </tbody>
  </table>
  <!-- ********************************************* -->

  <!-- Modal Confirmation -->
<div v-if="showModal" class="modal-overlay">
  <div class="modal">
    <h3>Confirmer la suppression</h3>
    <p>
      Voulez-vous vraiment supprimer 
      <strong>{{ doctorToDelete?.name }}</strong> ?
    </p>
    <div class="modal-actions">
      <button class="cancel-btn" @click="cancelDelete">Annuler</button>
      <button class="confirm-btn" @click="deleteDoctor">Confirmer</button>
    </div>
  </div>
</div>
  <!-- ********************************************* -->

</div>
</template>

<style scoped>
/* Overlay sombre */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 40, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
}

/* Boîte modale */
.modal {
  background: white;
  padding: 25px 30px;
  border-radius: 12px;
  width: 350px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  animation: fadeIn 0.3s ease;
}

.modal h3 {
  color: #1a73e8;
  margin-bottom: 15px;
}

.modal p {
  margin-bottom: 20px;
  font-size: 14px;
}

.modal-actions {
  display: flex;
  justify-content: center;
  gap: 15px;
}

/* Boutons */
.cancel-btn {
  background: #ccc;
  color: #333;
  border: none;
  padding: 8px 15px;
  border-radius: 6px;
  cursor: pointer;
}

.cancel-btn:hover {
  background: #b5b5b5;
}

.confirm-btn {
  background: linear-gradient(135deg, #ff4d6d, #ff8fab);
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 6px;
  cursor: pointer;
}

.confirm-btn:hover {
  opacity: 0.85;
}

/* Animation */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* ===== Container principal ===== */
.doctor-container {
  background-color: #f4f8fb; /* bleu très clair médical */
  padding: 40px;
  border-radius: 14px;
  max-width: 1000px;
  margin: 40px auto;
}

/* ===== Titre ===== */
h2 {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  color: #0d6efd; /* bleu hospitalier */
  margin-bottom: 30px;
  font-weight: 600;
}

/* ===== Tableau ===== */
.doctor-table {
  width: 100%;
  border-collapse: collapse;
  background: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.05);
}

.doctor-table thead {
  background-color: #e9f2ff; /* bleu doux */
  color: #0d6efd;
  font-weight: 600;
}

.doctor-table th,
.doctor-table td {
  padding: 16px;
  text-align: left;
  font-size: 14px;
}

.doctor-table tbody tr {
  border-bottom: 1px solid #eef2f7;
  transition: background 0.2s ease;
}

.doctor-table tbody tr:hover {
  background-color: #f7fbff;
}

/* ===== Disponibilité ===== */
.available {
  color: #198754; /* vert médical */
  font-weight: 600;
}

.unavailable {
  color: #dc3545;
  font-weight: 600;
}

/* ===== Boutons Actions ===== */
.edit-btn {
  background-color: #0d6efd;
  color: white;
  padding: 6px 14px;
  border-radius: 6px;
  font-size: 13px;
  border: none;
  cursor: pointer;
  transition: 0.2s ease;
}

.edit-btn:hover {
  background-color: #0b5ed7;
}

.remove-btn {
  background-color: #f1f3f5;
  color: #dc3545;
  padding: 6px 14px;
  border-radius: 6px;
  font-size: 13px;
  border: none;
  cursor: pointer;
  transition: 0.2s ease;
}

.remove-btn:hover {
  background-color: #f8d7da;
}

</style>
