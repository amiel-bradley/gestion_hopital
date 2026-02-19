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
  <div class="h-app-frame">
    <main class="h-container">
      
      <header class="h-top-header">
        <div class="h-title-block">
          <div class="h-main-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5">
              <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div class="h-text">
            <h1>Annuaire Médical</h1>
            <p>Administration des effectifs praticiens</p>
          </div>
        </div>
        
        <div class="h-counter-pill">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87m-4-12a4 4 0 010 7.75"/></svg>
          <span>Total : <b>{{ doctors.length }}</b> praticiens</span>
        </div>
      </header>

      <div class="h-main-grid">
        
        <aside class="h-sidebar">
          <div class="h-card h-form-box">
            <div class="h-card-head">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
              <h2>{{ selectDoctor ? 'Modification' : 'Nouveau Profil' }}</h2>
            </div>
            
            <div class="h-form-container">
              <DoctorForm 
                @addDoctors="addDoctors" 
                :doctor="selectDoctor" 
                @editDoctor="saveEditDoctor" 
              />
              
              <button v-if="selectDoctor" class="h-btn-abort" @click="selectDoctor = null">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 18L18 6M6 6l12 12" /></svg>
                Annuler l'édition
              </button>
            </div>
          </div>
        </aside>

        <section class="h-content">
          <div class="h-card h-list-box">
            <div class="h-card-head h-flex-between">
              <div class="h-flex-align">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M4 6h16M4 12h16M4 18h16" /></svg>
                <h2>Effectifs Actifs</h2>
              </div>
              <div class="h-status-dot">
                <span class="dot"></span> Temps réel
              </div>
            </div>

            <div class="h-list-wrapper">
              <DoctorCard 
                :doctors="doctors" 
                @removeDoctor="removeDoctor" 
                @editDoctor="editDoctor" 
              />
            </div>
          </div>
        </section>

      </div>
    </main>
  </div>
</template>

<style scoped>
/* --- FONDATIONS (CADRAGE CHEF) --- */
.h-app-frame {
  min-height: 100vh;
  background-color: #f8fafc;
  padding: 40px 0;
  font-family: 'Inter', system-ui, sans-serif;
  color: #1e293b;
}

.h-container {
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 24px;
}

/* --- HEADER SANS NAVBAR --- */
.h-top-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
}

.h-title-block {
  display: flex;
  align-items: center;
  gap: 20px;
}

.h-main-icon {
  background: #0d9488;
  width: 56px;
  height: 56px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 15px -3px rgba(13, 148, 136, 0.2);
}
.h-main-icon svg { width: 30px; }

.h-text h1 { font-size: 1.8rem; font-weight: 800; margin: 0; letter-spacing: -0.02em; }
.h-text p { color: #64748b; margin: 4px 0 0; font-size: 1rem; }

.h-counter-pill {
  background: white;
  border: 1px solid #e2e8f0;
  padding: 10px 20px;
  border-radius: 30px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.95rem;
  color: #475569;
}
.h-counter-pill svg { width: 18px; color: #0d9488; }
.h-counter-pill b { color: #0d9488; }

/* --- GRID LAYOUT --- */
.h-main-grid {
  display: grid;
  grid-template-columns: 380px 1fr;
  gap: 32px;
  align-items: start;
}

/* --- CARD DESIGN --- */
.h-card {
  background: white;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}

.h-card-head {
  padding: 20px 24px;
  border-bottom: 1px solid #f1f5f9;
  display: flex;
  align-items: center;
  gap: 12px;
}
.h-card-head h2 { font-size: 1rem; font-weight: 700; color: #1e293b; margin: 0; }
.h-card-head svg { width: 18px; color: #0d9488; }
.h-flex-between { justify-content: space-between; }
.h-flex-align { display: flex; align-items: center; gap: 12px; }

/* --- SIDEBAR FORM --- */
.h-form-container { padding: 24px; }

.h-btn-abort {
  width: 100%;
  margin-top: 16px;
  padding: 12px;
  background: #fff1f2;
  border: 1.5px dashed #fecaca;
  color: #e11d48;
  border-radius: 12px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: 0.2s;
}
.h-btn-abort:hover { background: #ffe4e6; border-color: #f43f5e; }

/* --- LIST CONTENT --- */
.h-list-wrapper {
  padding: 24px;
  background: #fafafa;
}

.h-status-dot {
  font-size: 0.75rem;
  font-weight: 700;
  color: #64748b;
  display: flex;
  align-items: center;
  gap: 6px;
  text-transform: uppercase;
}
.dot {
  width: 8px;
  height: 8px;
  background: #2ecc71;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { opacity: 1; }
  50% { opacity: 0.4; }
  100% { opacity: 1; }
}

@media (max-width: 1100px) {
  .h-main-grid { grid-template-columns: 1fr; }
}
</style>