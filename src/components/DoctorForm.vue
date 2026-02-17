<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  doctor: Object // null pour ajout, object pour édition
})
const emit = defineEmits(['addDoctors', 'editDoctor'])

const name = ref('')
const speciality = ref('')
const phone = ref('')
const available = ref(true)

const succesMAjout = ref(false)
const succesMModif = ref(false)

// Surveillance du docteur pour basculer entre Ajout et Edition
watch(() => props.doctor, (newDoctor) => {
  if(newDoctor){
    name.value = newDoctor.name
    speciality.value = newDoctor.speciality
    phone.value = newDoctor.phone
    available.value = newDoctor.available
  } else {
    resetFields()
  }
}, { immediate: true })

function resetFields() {
  name.value = ''
  speciality.value = ''
  phone.value = ''
  available.value = true
}

function submitForm(){
  const doctorData = {
    name: name.value,
    speciality: speciality.value,
    phone: phone.value,
    available: available.value
  }

  if(props.doctor){
    // MODE EDITION
    emit('editDoctor', { ...doctorData, id: props.doctor.id })
    triggerToast('modif')
  } else {
    // MODE AJOUT
    emit('addDoctors', { ...doctorData, id: Date.now() })
    resetFields()
    triggerToast('ajout')
  }
}

function triggerToast(type) {
  if(type === 'ajout') succesMAjout.value = true
  else succesMModif.value = true
  
  setTimeout(() => {
    succesMAjout.value = false
    succesMModif.value = false
  }, 3000)
}
</script>

<template>
  <TransitionGroup name="toast">
    <div class="toast success-add" v-if="succesMAjout" key="add">
      <span class="toast-icon">✓</span>
      <p>Praticien enregistré avec succès</p>
    </div>
    <div class="toast success-edit" v-if="succesMModif" key="edit">
      <span class="toast-icon">⚙️</span>
      <p>Profil mis à jour avec succès</p>
    </div>
  </TransitionGroup>

  <div class="doctor-form-card">
    <div class="form-header">
      <div class="icon-circle" :class="{ 'edit-mode': props.doctor }">
        <svg v-if="!props.doctor" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
      </div>
      <h2>{{ props.doctor ? 'Modifier le profil' : 'Nouveau Docteur' }}</h2>
    </div>

    <form @submit.prevent="submitForm">
      <div class="input-group">
        <label>Nom Complet</label>
        <input v-model="name" type="text" required placeholder="ex: Dr. Jean Dupont" />
      </div>

      <div class="input-group">
        <label>Spécialité médicale</label>
        <input v-model="speciality" type="text" required placeholder="ex: Cardiologue" />
      </div>

      <div class="input-group">
        <label>Numéro de téléphone</label>
        <input v-model="phone" type="tel" required placeholder="01 23 45 67 89" />
      </div>

      <div class="status-toggle">
        <label class="switch">
          <input type="checkbox" v-model="available">
          <span class="slider"></span>
        </label>
        <span class="status-label">{{ available ? 'Disponible immédiatement' : 'En congé / Indisponible' }}</span>
      </div>

      <button type="submit" :class="{ 'btn-edit': props.doctor }">
        {{ props.doctor ? 'Enregistrer les modifications' : 'Ajouter au registre' }}
      </button>
    </form>
  </div>
</template>

<style scoped>
.doctor-form-card {
  max-width: 400px;
  margin: 20px auto;
  padding: 2rem;
  background: #ffffff;
  border-radius: 24px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.05);
  border: 1px solid #f1f5f9;
}

.form-header {
  text-align: center;
  margin-bottom: 2rem;
}

.icon-circle {
  width: 60px;
  height: 60px;
  background: #f0fdfa;
  color: #0d9488;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
}

.icon-circle.edit-mode {
  background: #eff6ff;
  color: #2563eb;
}

h2 {
  font-size: 1.25rem;
  color: #1e293b;
  font-weight: 800;
}

.input-group {
  margin-bottom: 1.2rem;
}

label {
  display: block;
  font-size: 0.8rem;
  font-weight: 700;
  color: #64748b;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
  padding-left: 4px;
}

input {
  width: 100%;
  padding: 0.8rem 1rem;
  border: 2px solid #f1f5f9;
  border-radius: 12px;
  transition: all 0.2s;
  font-size: 0.95rem;
}

input:focus {
  outline: none;
  border-color: #0d9488;
  background: #fff;
}

/* Switch (Checkbox stylisée) */
.status-toggle {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 1.5rem 0;
  padding: 10px;
  background: #f8fafc;
  border-radius: 12px;
}

.switch {
  position: relative;
  display: inline-block;
  width: 44px;
  height: 22px;
}

.switch input { opacity: 0; width: 0; height: 0; }

.slider {
  position: absolute;
  cursor: pointer;
  inset: 0;
  background-color: #cbd5e1;
  transition: .4s;
  border-radius: 34px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: .4s;
  border-radius: 50%;
}

input:checked + .slider { background-color: #0d9488; }
input:checked + .slider:before { transform: translateX(22px); }

.status-label { font-size: 0.85rem; color: #475569; font-weight: 600; }

/* Button */
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

button:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(13, 148, 136, 0.2); }
.btn-edit { background: #2563eb; }
.btn-edit:hover { box-shadow: 0 8px 20px rgba(37, 99, 235, 0.2); }

/* Toasts style */
.toast {
  position: fixed;
  top: 100px;
  right: 20px;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  color: white;
  display: flex;
  align-items: center;
  gap: 12px;
  z-index: 9999;
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
}

.success-add { background: #227e76; }
.success-edit { background: #f30ab9; }

.toast-icon {
  background: rgba(255,255,255,0.2);
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
}

/* Transitions */
.toast-enter-active { animation: slideIn 0.4s ease-out; }
.toast-leave-active { animation: slideIn 0.4s ease-in reverse; }

@keyframes slideIn {
  from { transform: translateX(100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}
</style>