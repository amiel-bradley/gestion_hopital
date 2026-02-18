<script setup>
import { rooms } from '@/services/data';
import { ref, computed } from 'vue';

const rdv = ref(JSON.parse(localStorage.getItem('rdv')) || []);
const patients = ref(JSON.parse(localStorage.getItem('patients')) || []);
const doctors = ref(JSON.parse(localStorage.getItem('doctors')) || []);
const errorMessage = ref('');
const successMessage = ref('');

// ---------- Modals & Notifications ----------
const showModal = ref(false);
const modalMessage = ref('');
const modalConfirmCallback = ref(null);

function confirmAction(message, callback) {
    modalMessage.value = message;
    modalConfirmCallback.value = callback;
    showModal.value = true;
}

function cancelModal() {
    showModal.value = false;
    modalConfirmCallback.value = null;
}

function okModal() {
    if (modalConfirmCallback.value) modalConfirmCallback.value();
    cancelModal();
}

const notification = ref({
    message: '',
    type: 'success',
    visible: false
});

function showNotification(msg, type = 'success', duration = 3000) {
    notification.value = { message: msg, type, visible: true };
    setTimeout(() => notification.value.visible = false, duration);
}

// ---------- Computed ----------
const roomsAvailable = computed(() => rooms.value.filter(r => r.capacite > 0));
const doctorsAvailable = computed(() => doctors.value.filter(d => d.available));
const patientsAvailable = computed(() => patients.value.filter(p => p.rdv !== true));

const sortedRdv = computed(() =>
    [...rdv.value].sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime))
);

const getPatientName = id => patients.value.find(p => p.id === Number(id))?.lastName || 'Inconnu';
const getDoctorName = id => doctors.value.find(d => d.id === Number(id))?.name || 'Inconnu';

function updateRoomCapacity(roomId, n) {
    const room = rooms.value.find(r => r.id == roomId);
    if (room) room.capacite += n;
}

// ---------- Formulaire ----------
const form = ref({
    patientId: '',
    doctorId: '',
    date: '',
    time: '',
    room: '',
    status: 'confirmed'
});

function handleSubmit() {
    errorMessage.value = '';
    successMessage.value = '';

    if (!patients.value.length || !doctors.value.length) {
        showNotification("Ajoutez d'abord patients et docteurs.", 'error');
        return;
    }

    const dateTime = `${form.value.date}T${form.value.time}`;
    const selectedDate = new Date(dateTime);
    if (selectedDate < new Date()) {
        showNotification("Impossible de programmer dans le passé.", 'error');
        return;
    }

    const doctorBusy = rdv.value.find(
        r => r.doctorId == form.value.doctorId && r.dateTime === dateTime
    );

    if (doctorBusy && doctorBusy.id !== form.value.id) {
        showNotification("Docteur déjà occupé.", 'error');
        return;
    }

    if (form.value.id) {
        const index = rdv.value.findIndex(r => r.id === form.value.id);
        rdv.value[index] = { ...form.value, dateTime };
        showNotification("Rendez-vous modifié ✔️", 'success');
    } else {
        rdv.value.push({
            ...form.value,
            id: Date.now(),
            dateTime
        });
        updateRoomCapacity(form.value.room, -1);
        showNotification("Rendez-vous ajouté ✔️", 'success');
    }
    saveAndReset();
}

function saveAndReset() {
    localStorage.setItem('rdv', JSON.stringify(rdv.value));
    form.value = {
        patientId: '',
        doctorId: '',
        date: '',
        time: '',
        room: '',
        status: 'confirmed'
    };
}

// ---------- Suppression ----------
function deleteRdv(id) {
    const item = rdv.value.find(r => r.id === id);
    if (!item) return;

    confirmAction("Supprimer ce rendez-vous ?", () => {
        updateRoomCapacity(item.room, +1);
        rdv.value = rdv.value.filter(r => r.id !== id);
        localStorage.setItem('rdv', JSON.stringify(rdv.value));
        showNotification("Rendez-vous supprimé ✔️", 'success');
    });
}

// ---------- Edition ----------
function editRdv(item) {
    const [date, time] = item.dateTime.split('T');
    form.value = { ...item, date, time };
    errorMessage.value = '';
    successMessage.value = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ---------- Date formatting ----------
function formatDate(dateStr) {
    return new Date(dateStr).toLocaleString('fr-FR', {
        day: '2-digit',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
    });
}
</script>

<template>
<div class="rdv-page">
    <!-- Header -->
    <header class="section-header">
        <div class="header-content">
            <h1>Planning des Consultations</h1>
            <p>Organisez les visites et suivez les disponibilités en temps réel.</p>
        </div>
        <div class="header-stats">
            <span class="badge-total">{{ sortedRdv.length }} RDV au total</span>
        </div>
    </header>

    <div class="rdv-grid">
        <!-- Formulaire RDV -->
        <section class="form-section">
            <div class="card main-card">
                <div class="card-header">
                    <span class="icon-circle" :class="{ 'edit-mode': form.id }">
                        {{ form.id ? '✏️' : '📅' }}
                    </span>
                    <h3>{{ form.id ? 'Modifier la séance' : 'Nouveau RDV' }}</h3>
                </div>
                <form @submit.prevent="handleSubmit">
                    <div class="field">
                        <label>Patient attendu</label>
                        <select v-model="form.patientId" required>
                            <option value="" disabled>Choisir un patient...</option>
                            <option v-for="p in patientsAvailable" :key="p.id" :value="p.id">
                                {{ p.lastName }} {{ p.firstName }}
                            </option>
                        </select>
                    </div>

                    <div class="field">
                        <label>Praticien</label>
                        <select v-model="form.doctorId" required>
                            <option value="" disabled>Choisir un docteur...</option>
                            <option v-for="d in doctorsAvailable" :key="d.id" :value="d.id">{{ d.name }}</option>
                        </select>
                    </div>

                    <div class="row">
                        <div class="field">
                            <label>Date</label>
                            <input type="date" v-model="form.date" required>
                        </div>
                        <div class="field">
                            <label>Heure</label>
                            <input type="time" v-model="form.time" required>
                        </div>
                    </div>

                    <div class="message-container">
                        <Transition name="fade">
                            <div v-if="errorMessage" class="msg error">{{ errorMessage }}</div>
                        </Transition>
                        <Transition name="fade">
                            <div v-if="successMessage" class="msg success">{{ successMessage }}</div>
                        </Transition>
                    </div>

                    <button type="submit" class="btn-submit" :class="{ 'btn-edit': form.id }">
                        {{ form.id ? 'Enregistrer les modifications' : 'Confirmer le rendez-vous' }}
                    </button>

                    <button v-if="form.id" type="button" class="btn-cancel" @click="saveAndReset">
                        Annuler la modification
                    </button>
                </form>
            </div>
        </section>

        <!-- Liste RDV -->
        <section class="list-section">
            <div class="table-card">
                <table v-if="rdv.length">
                    <thead>
                        <tr>
                            <th>Date & Heure</th>
                            <th>Patient</th>
                            <th>Docteur</th>
                            <th>Statut</th>
                            <th class="text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="r in sortedRdv" :key="r.id" :class="{ 'row-editing': form.id === r.id }">
                            <td class="date-cell">
                                <div class="date-wrapper">
                                    <span class="main-date">{{ formatDate(r.dateTime).split(' à ')[0] }}</span>
                                    <span class="main-time">{{ formatDate(r.dateTime).split(' à ')[1] }}</span>
                                </div>
                            </td>
                            <td class="name-cell"><strong>{{ getPatientName(r.patientId) }}</strong></td>
                            <td><span class="doctor-tag">{{ getDoctorName(r.doctorId) }}</span></td>
                            <td><span :class="['status-pill', r.status]">{{ r.status }}</span></td>
                            <td class="actions text-right">
                                <button @click="editRdv(r)" class="btn-action edit" title="Modifier">✏️</button>
                                <button @click="deleteRdv(r.id)" class="btn-action delete" title="Supprimer">🗑️</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div v-else class="empty-state">
                    <div class="empty-illustration">📅</div>
                    <p>Aucun rendez-vous dans l'agenda pour le moment.</p>
                </div>
            </div>
        </section>
    </div>

    <!-- Modal confirmation -->
    <Transition name="fade">
        <div v-if="showModal" class="modal-backdrop">
            <div class="modal-card">
                <p>{{ modalMessage }}</p>
                <div class="modal-actions">
                    <button class="btn-cancel" @click="cancelModal">Annuler</button>
                    <button class="btn-submit" @click="okModal">Confirmer</button>
                </div>
            </div>
        </div>
    </Transition>

    <!-- Notifications -->
    <Transition name="fade">
        <div v-if="notification.visible" :class="['notification', notification.type]">
            {{ notification.message }}
        </div>
    </Transition>
</div>
</template>

<style scoped>
/* Ton style actuel (inchangé) ... */

/* ---------- Modal & Notifications ---------- */
.modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.4);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}
.modal-card {
    background: white;
    border-radius: 16px;
    padding: 2rem;
    max-width: 400px;
    width: 90%;
    text-align: center;
    box-shadow: 0 8px 24px rgba(0,0,0,0.2);
}
.modal-actions {
    display: flex;
    justify-content: space-between;
    margin-top: 1.5rem;
}

.notification {
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 1rem 1.5rem;
    border-radius: 12px;
    font-weight: 600;
    z-index: 1001;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    color: white;
}
.notification.success { background: #16a34a; }
.notification.error { background: #dc2626; }

.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
