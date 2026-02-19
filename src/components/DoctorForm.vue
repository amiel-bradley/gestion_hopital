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
  if (newDoctor) {
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

function submitForm() {
  const doctorData = {
    name: name.value,
    speciality: speciality.value,
    phone: phone.value,
    available: available.value
  }

  if (props.doctor) {
    emit('editDoctor', { ...doctorData, id: props.doctor.id })
    triggerToast('modif')
  } else {
    emit('addDoctors', { ...doctorData, id: Date.now() })
    resetFields()
    triggerToast('ajout')
  }
}

function triggerToast(type) {
  if (type === 'ajout') succesMAjout.value = true
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
      <div class="toast-content">
        <span class="toast-icon">✓</span>
        <p>Praticien enregistré</p>
      </div>
    </div>
    <div class="toast success-edit" v-if="succesMModif" key="edit">
      <div class="toast-content">
        <span class="toast-icon">⚙️</span>
        <p>Profil mis à jour</p>
      </div>
    </div>
  </TransitionGroup>

  <div class="doctor-form-card" :class="{ 'edit-border': props.doctor }">
    <div class="form-header">
      <div class="icon-circle" :class="{ 'edit-mode': props.doctor }">
        <svg v-if="!props.doctor" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <line x1="19" y1="8" x2="19" y2="14" />
          <line x1="22" y1="11" x2="16" y2="11" />
        </svg>
        <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <path
            d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7M18.5 2.5a2.121 2.121 0 113 3L12 15l-4 1 1-4 9.5-9.5z" />
        </svg>
      </div>
      <h2>{{ props.doctor ? 'Mettre à jour' : 'Nouveau Praticien' }}</h2>
      <p class="form-subtitle">{{ props.doctor ? 'Modification des accès et infos' : 'Enregistrement dans l\'annuaire'
        }}</p>
    </div>

    <form @submit.prevent="submitForm" class="styled-form">
      <div class="input-group">
        <label>Nom du Praticien</label>
        <div class="input-wrapper">
          <input v-model="name" type="text" required placeholder="ex: Dr. Sarah Connor" />
        </div>
      </div>

      <div class="input-group">
        <label>Spécialité</label>
        <div class="input-wrapper">
          <input v-model="speciality" type="text" required placeholder="ex: Neurochirurgie" />
        </div>
      </div>

      <div class="input-group">
        <label>Contact Direct</label>
        <div class="input-wrapper">
          <input v-model="phone" type="tel" required placeholder="06 12 34 56 78" />
        </div>
      </div>

      <div class="status-toggle" :class="{ 'active-bg': available }">
        <div class="toggle-text">
          <span class="status-title">Disponibilité</span>
          <span class="status-desc">{{ available ? 'Prêt pour consultation' : 'Indisponible / Congé' }}</span>
        </div>
        <label class="switch">
          <input type="checkbox" v-model="available">
          <span class="slider"></span>
        </label>
      </div>

      <button type="submit" :class="{ 'btn-edit': props.doctor }" class="submit-btn">
        <svg v-if="!props.doctor" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
          <path d="M12 5v14M5 12h14" />
        </svg>
        <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
          <path d="M20 6L9 17l-5-5" />
        </svg>
        {{ props.doctor ? 'Valider les changements' : 'Inscrire le docteur' }}
      </button>
    </form>
  </div>
</template>

<style scoped>
.doctor-form-card {
  background: white;
  border-radius: 24px;
  padding: 24px;
  transition: all 0.3s ease;
}

.edit-border {
  border: 2px solid #3b82f6;
  background: #fdfdff;
}

.form-header {
  text-align: center;
  margin-bottom: 24px;
}

.form-subtitle {
  font-size: 0.8rem;
  color: #94a3b8;
  margin-top: 4px;
}

.icon-circle {
  width: 54px;
  height: 54px;
  background: #f0fdfa;
  color: #0d9488;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 12px;
  transition: 0.3s;
}

.icon-circle.edit-mode {
  background: #eff6ff;
  color: #3b82f6;
  transform: rotate(-10deg);
}

.icon-circle svg {
  width: 24px;
}

h2 {
  font-size: 1.15rem;
  color: #1e293b;
  font-weight: 800;
  margin: 0;
}

.input-group {
  margin-bottom: 16px;
}

label {
  display: block;
  font-size: 0.75rem;
  font-weight: 800;
  color: #64748b;
  text-transform: uppercase;
  margin-bottom: 6px;
  letter-spacing: 0.02em;
}

input {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #f1f5f9;
  border-radius: 12px;
  background: #f8fafc;
  font-size: 0.95rem;
  transition: all 0.2s;
  font-family: inherit;
}

input:focus {
  outline: none;
  border-color: #0d9488;
  background: white;
  box-shadow: 0 4px 12px rgba(13, 148, 136, 0.08);
}

.edit-border input:focus {
  border-color: #3b82f6;
}

/* Switch Toggle Design */
.status-toggle {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px;
  background: #f1f5f9;
  border-radius: 16px;
  margin: 20px 0;
  transition: 0.3s;
}

.active-bg {
  background: #f0fdfa;
  border: 1px solid #ccfbf1;
}

.toggle-text {
  display: flex;
  flex-direction: column;
}

.status-title {
  font-size: 0.85rem;
  font-weight: 800;
  color: #1e293b;
}

.status-desc {
  font-size: 0.75rem;
  color: #64748b;
  font-weight: 500;
}

.switch {
  position: relative;
  width: 44px;
  height: 24px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  inset: 0;
  background-color: #cbd5e1;
  transition: .4s;
  border-radius: 34px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: .4s;
  border-radius: 50%;
}

input:checked+.slider {
  background-color: #0d9488;
}

input:checked+.slider:before {
  transform: translateX(20px);
}

/* Submit Button */
.submit-btn {
  width: 100%;
  padding: 14px;
  background: #0d9488;
  color: white;
  border: none;
  border-radius: 14px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: all 0.3s;
}

.submit-btn svg {
  width: 18px;
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(13, 148, 136, 0.25);
}

.btn-edit {
  background: #3b82f6;
}

.btn-edit:hover {
  background: #2563eb;
  box-shadow: 0 8px 20px rgba(59, 130, 246, 0.25);
}

/* Toast Notifications */
.toast {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 10000;
}

.toast-content {
  padding: 12px 20px;
  border-radius: 12px;
  color: white;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(4px);
}

.success-add .toast-content {
  background: #0d9488;
}

.success-edit .toast-content {
  background: #3b82f6;
}

.toast-icon {
  background: rgba(255, 255, 255, 0.2);
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
}

/* Animations */
.toast-enter-active {
  animation: slideIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.toast-leave-active {
  animation: slideIn 0.3s ease-in reverse;
}

@keyframes slideIn {
  from {
    transform: translateX(120%);
    opacity: 0;
  }

  to {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>