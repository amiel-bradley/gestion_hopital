<script setup>
import DoctorCard from '@/components/DoctorCard.vue';
import DoctorForm from '@/components/DoctorForm.vue';
import { doctors } from '@/services/data';
import { ref } from 'vue';

const selectDoctor = ref(null)
const open = ref(false)

const closeForm = () => {
  open.value = false;
  selectDoctor.value = null;
};

// --- CRUD LOGIC ---

function addDoctors(doctor){
    doctors.value.push(doctor)
    open.value = false
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

    <button @click="open = true">Ajouter un Médécin</button>

    <div class="main-content">
<Teleport to="body">

    <div v-if="open || selectDoctor" class="modal-overlay" @click.self="closeForm">
      
      <div class="modal-container glow-effect">
        
        <button class="floating-close" @click="closeForm">
          <span>✕</span>
        </button>

        <header class="modal-header">
          <h3>{{ selectDoctor ? 'Modifier le Praticien' : 'Nouveau Praticien' }}</h3>
        </header>
        
        <div class="modal-body">
          <DoctorForm 
            @addDoctors="addDoctors" 
            :doctor="selectDoctor" 
            @editDoctor="saveEditDoctor" 
          />
        </div>

        <footer v-if="selectDoctor" class="modal-footer">
          <button class="btn-cancel-edit" @click="selectDoctor = null">
            Annuler la modification
          </button>
        </footer>
      </div>
    </div>

</Teleport>

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
button {
  width: 100%;
  padding: 1rem;
  background: #0d9488;
  color: white;
  border: none;
  border-radius: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s;
}

/* --- Overlay (Arrière-plan flouté) --- */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.7);
  backdrop-filter: blur(8px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  padding: 20px;
}

/* --- Le Modal avec son Halo --- */
.modal-container {
  background: white;
  width: 100%;
  max-width: 500px;
  border-radius: 28px;
  position: relative;
  /* Halo turquoise diffus + ombre portée classique */
  box-shadow: 0 0 50px -10px rgba(13, 148, 136, 0.5), 
              0 25px 50px -12px rgba(0, 0, 0, 0.3);
}

/* --- Bouton X Flottant Animé --- */
.floating-close {
  position: absolute;
  top: -15px;
  right: -15px;
  width: 44px;
  height: 44px;
  background: #1e293b;
  color: white;
  border: none;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-weight: bold;
  box-shadow: 0 10px 20px rgba(0,0,0,0.2);
  z-index: 100;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.floating-close:hover {
  background: #f30e06; /* Change en rouge au survol */
  transform: rotate(90deg) scale(1.1);
}

/* --- Design interne --- */
.modal-header {
  padding: 24px 32px;
  border-bottom: 1px solid #f1f5f9;
  background: linear-gradient(to right, #ffffff, #f9fafb);
  border-radius: 28px 28px 0 0;
}

.modal-header h3 {
  font-size: 1.3rem;
  font-weight: 800;
  color: #0f172a;
  margin: 0;
}

.modal-body {
  padding: 32px;
  max-height: 70vh;
  overflow-y: auto;
}

/* --- Animations d'entrée (Transitions) --- */
.modal-fade-enter-active {
  transition: all 0.4s ease-out;
}

.modal-fade-enter-from {
  opacity: 0;
}

/* Effet de "pop" du modal */
.modal-fade-enter-active .modal-container {
  animation: modal-pop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* Effet de "pop" du bouton X avec un léger retard */
.modal-fade-enter-active .floating-close {
  animation: btn-pop 0.5s 0.2s cubic-bezier(0.34, 1.56, 0.64, 1) both;
}

@keyframes modal-pop {
  from { opacity: 0; transform: scale(0.9) translateY(30px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}

@keyframes btn-pop {
  from { opacity: 0; transform: scale(0); }
  to { opacity: 1; transform: scale(1); }
}

/* Scrollbar discrète */
.modal-body::-webkit-scrollbar { width: 5px; }
.modal-body::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}

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