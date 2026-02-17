<script setup>
import DoctorCard from '@/components/DoctorCard.vue';
import DoctorForm from '@/components/DoctorForm.vue';
import { doctors } from '@/services/data';
import { ref } from 'vue';

const selectDoctor = ref(null)

// --- CRUD LOGIC ---

function addDoctors(doctor){
    doctors.value.push(doctor)
}

function removeDoctor(doctor){
    doctors.value = doctors.value.filter(d => d !== doctor)
    // Si on supprime le docteur qu'on était en train d'éditer
    if(selectDoctor.value && selectDoctor.value.id === doctor.id) {
        selectDoctor.value = null
    }
}

function editDoctor(doctor){
    // On crée une copie pour ne pas modifier la liste en temps réel avant validation
    selectDoctor.value = {...doctor}
}

function saveEditDoctor(doctor){
    const index = doctors.value.findIndex(d => d.id === doctor.id)
    if(index !== -1){
        doctors.value.splice(index, 1, doctor)
    }
    selectDoctor.value = null 
}
</script>

<template>
  <div class="page-layout">
    <header class="page-header">
      <div class="header-info">
        <h1>Annuaire Médical</h1>
        <p>Gérez les effectifs et les disponibilités des praticiens de l'établissement.</p>
      </div>
      <div class="badge-total">
        <span>Total : <b>{{ doctors.length }}</b> médecins</span>
      </div>
    </header>

    <div class="main-content">
      <aside class="form-sidebar">
        <div class="sticky-container">
          <DoctorForm 
            @addDoctors="addDoctors" 
            :doctor="selectDoctor" 
            @editDoctor="saveEditDoctor" 
          />
          <button v-if="selectDoctor" class="btn-cancel-edit" @click="selectDoctor = null">
            Annuler la modification
          </button>
        </div>
      </aside>

      <section class="list-section">
        <DoctorCard 
          :doctors="doctors" 
          @removeDoctor="removeDoctor" 
          @editDoctor="editDoctor" 
        />
      </section>
    </div>
  </div>
</template>

<style scoped>
.page-layout {
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

/* Header de la page */
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  border-bottom: 1px solid #e2e8f0;
  padding-bottom: 1.5rem;
}

.header-info h1 {
  font-size: 1.8rem;
  font-weight: 800;
  color: #1e293b;
}

.header-info p {
  color: #64748b;
  margin-top: 0.2rem;
}

.badge-total {
  background: #f1f5f9;
  padding: 0.5rem 1rem;
  border-radius: 30px;
  font-size: 0.9rem;
  color: #475569;
}

.badge-total b { color: #0d9488; }

/* Layout Main */
.main-content {
  display: flex;
  gap: 2.5rem;
  align-items: flex-start;
}

/* Sidebar Formulaire */
.form-sidebar {
  flex: 0 0 400px; /* Largeur fixe pour le formulaire */
}

.sticky-container {
  position: sticky;
  top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* Section Liste */
.list-section {
  flex: 1;
}

/* Bouton spécial pour annuler l'édition */
.btn-cancel-edit {
  width: 100%;
  padding: 0.6rem;
  background: white;
  border: 1px dashed #cbd5e1;
  color: #64748b;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;
}

.btn-cancel-edit:hover {
  background: #fff1f2;
  border-color: #f43f5e;
  color: #f43f5e;
}

/* Responsive */
@media (max-width: 1100px) {
  .main-content {
    flex-direction: column;
  }
  .form-sidebar {
    width: 100%;
    flex: none;
  }
}
</style>