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
  <div class="min-h-screen bg-[#F8FAFC] p-4 md:p-6 lg:p-10 font-sans text-slate-900">
    
    <header class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
      <div class="space-y-1">
        <h1 class="text-2xl md:text-3xl font-black text-[#1E293B]">
          Annuaire <span class="text-[#10b981]">Médical</span>
        </h1>
        <p class="text-sm md:text-base text-slate-500">Gérez les effectifs et les disponibilités des praticiens.</p>
      </div>
      
      <div class="bg-white px-4 py-2 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-3 self-end sm:self-auto">
        <span class="flex h-2 w-2 rounded-full bg-emerald-500"></span>
        <span class="text-sm font-bold text-slate-600">
          Total : <span class="text-emerald-600">{{ doctors.length }}</span> médecins
        </span>
      </div>
    </header>

    <div class="flex flex-col lg:flex-row gap-8 items-start">
      
      <aside class="w-full lg:w-[380px] shrink-0">
        <div class="bg-white rounded-[2rem] p-6 shadow-xl shadow-slate-200/60 border border-white">
          <div class="mb-6 flex items-center gap-3 px-2">
            <div class="p-2 bg-emerald-50 rounded-lg">
              <UserPlus class="w-5 h-5 text-emerald-600" />
            </div>
            <h2 class="font-bold text-slate-800">{{ selectDoctor ? 'Modifier le profil' : 'Nouveau Docteur' }}</h2>
          </div>

          <DoctorForm 
            @addDoctors="addDoctors" 
            :doctor="selectDoctor" 
            @editDoctor="saveEditDoctor" 
          />

          <button 
            v-if="selectDoctor" 
            @click="selectDoctor = null"
            class="w-full mt-4 py-3 rounded-xl bg-slate-50 text-slate-500 text-sm font-bold border-2 border-dashed border-slate-200 hover:border-red-200 hover:text-red-500 transition-all uppercase tracking-widest"
          >
            Annuler la modification
          </button>
        </div>
      </aside>

      <section class="w-full flex-1">
        <div class="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
          <div class="p-6 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div class="flex items-center gap-3">
              <div class="p-2 bg-emerald-50 rounded-lg">
                <Users class="w-5 h-5 text-emerald-600" />
              </div>
              <h2 class="font-bold text-slate-800 text-lg">Personnel Médical</h2>
            </div>
            
            <div class="relative w-full md:w-64">
              <input type="text" placeholder="Rechercher..." class="w-full bg-slate-50 border-none rounded-xl py-2 px-4 text-sm focus:ring-2 focus:ring-emerald-500/20" />
            </div>
          </div>

          <div class="p-2 md:p-6 overflow-x-auto">
            <DoctorCard 
              :doctors="doctors" 
              @removeDoctor="removeDoctor" 
              @editDoctor="editDoctor" 
            />
          </div>
        </div>
      </section>

    </div>
  </div>
</template>

<style scoped>

@media (max-width: 1024px) {
  .lg\:col-span-4 {
    grid-column: span 12 / span 12;
  }
  .lg\:col-span-8 {
    grid-column: span 12 / span 12;
  }
}
</style>

<!-- <style scoped>
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
</style> -->