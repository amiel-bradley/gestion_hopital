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
    <div class="h-app-raw">
        <header class="h-main-header">
            <div class="h-container h-flex-header">
                <div class="h-brand">
                    <div class="h-icon-box">
                        <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5">
                            <path
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <div>
                        <h1>Planning des Consultations</h1>
                        <p>Gestion centrale des rendez-vous</p>
                    </div>
                </div>
                <div class="h-stats">
                    <span class="h-badge"><b>{{ sortedRdv.length }}</b> Séances programmées</span>
                </div>
            </div>
        </header>

        <main class="h-container">
            <div class="h-grid">
                <aside class="h-sidebar">
                    <div class="h-card">
                        <div class="h-card-head">
                            <svg :class="{ 'edit-icon': form.id }" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="2.5">
                                <path v-if="form.id"
                                    d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7M18.5 2.5a2.121 2.121 0 113 3L12 15l-4 1 1-4 9.5-9.5z" />
                                <path v-else d="M12 4v16m8-8H4" />
                            </svg>
                            <h2>{{ form.id ? 'Édition Séance' : 'Nouvelle Séance' }}</h2>
                        </div>

                        <form @submit.prevent="handleSubmit" class="h-form">
                            <div class="h-field">
                                <label>Patient attendu</label>
                                <select v-model="form.patientId" required>
                                    <option value="" disabled>Sélectionner un patient...</option>
                                    <option v-for="p in patientsAvailable" :key="p.id" :value="p.id">{{ p.lastName }} {{
                                        p.firstName }}</option>
                                </select>
                            </div>

                            <div class="h-field">
                                <label>Praticien responsable</label>
                                <select v-model="form.doctorId" required>
                                    <option value="" disabled>Choisir un docteur...</option>
                                    <option v-for="d in doctorsAvailable" :key="d.id" :value="d.id">{{ d.name }}
                                    </option>
                                </select>
                            </div>

                            <div class="h-row">
                                <div class="h-field">
                                    <label>Date</label>
                                    <input type="date" v-model="form.date" required>
                                </div>
                                <div class="h-field">
                                    <label>Heure</label>
                                    <input type="time" v-model="form.time" required>
                                </div>
                            </div>

                            <div class="h-form-actions">
                                <button type="submit" class="h-btn-main" :class="{ 'edit': form.id }">
                                    {{ form.id ? 'Mettre à jour' : 'Confirmer le RDV' }}
                                </button>
                                <button v-if="form.id" type="button" class="h-btn-sub"
                                    @click="saveAndReset">Annuler</button>
                            </div>
                        </form>
                    </div>
                </aside>

                <section class="h-content">
                    <div class="h-card">
                        <div class="h-card-head h-between">
                            <h2>Agenda des consultations</h2>
                            <div class="h-status-live"><span class="dot"></span> Live</div>
                        </div>

                        <div class="h-table-box">
                            <table v-if="rdv.length">
                                <thead>
                                    <tr>
                                        <th>HORAIRE</th>
                                        <th>PATIENT</th>
                                        <th>DOCTEUR</th>
                                        <th>STATUT</th>
                                        <th class="h-text-right">ACTIONS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="r in sortedRdv" :key="r.id" :class="{ 'is-editing': form.id === r.id }">
                                        <td>
                                            <div class="h-time-block">
                                                <span class="d">{{ formatDate(r.dateTime).split(' à ')[0] }}</span>
                                                <span class="t">{{ formatDate(r.dateTime).split(' à ')[1] }}</span>
                                            </div>
                                        </td>
                                        <td class="h-bold">{{ getPatientName(r.patientId) }}</td>
                                        <td><span class="h-tag-doc">{{ getDoctorName(r.doctorId) }}</span></td>
                                        <td><span :class="['h-pill', r.status]">{{ r.status }}</span></td>
                                        <td class="h-text-right">
                                            <div class="h-action-btns">
                                                <button @click="editRdv(r)" class="h-icon-btn edit">
                                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                        stroke-width="2.5">
                                                        <path
                                                            d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7M18.5 2.5a2.121 2.121 0 113 3L12 15l-4 1 1-4 9.5-9.5z" />
                                                    </svg>
                                                </button>
                                                <button @click="deleteRdv(r.id)" class="h-icon-btn del">
                                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                        stroke-width="2.5">
                                                        <path
                                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div v-else class="h-empty">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                                    <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <p>Aucun rendez-vous planifié.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>

        <Transition name="fade">
            <div v-if="showModal" class="h-modal-overlay">
                <div class="h-modal">
                    <div class="h-modal-icon">!</div>
                    <p>{{ modalMessage }}</p>
                    <div class="h-modal-btns">
                        <button class="h-btn-sub" @click="cancelModal">Annuler</button>
                        <button class="h-btn-main del" @click="okModal">Confirmer</button>
                    </div>
                </div>
            </div>
        </Transition>

        <Transition name="slide">
            <div v-if="notification.visible" :class="['h-notif', notification.type]">
                <svg v-if="notification.type === 'success'" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    stroke-width="3">
                    <path d="M5 13l4 4L19 7" />
                </svg>
                {{ notification.message }}
            </div>
        </Transition>
    </div>
</template>

<style scoped>
/* CONFIGURATION GÉNÉRALE */
.h-app-raw {
    min-height: 100vh;
    background-color: #f8fafc;
    font-family: 'Inter', system-ui, sans-serif;
    color: #1e293b;
    padding-bottom: 50px;
}

.h-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

/* HEADER */
.h-main-header {
    background: white;
    padding: 25px 0;
    border-bottom: 1px solid #e2e8f0;
    margin-bottom: 35px;
}

.h-flex-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.h-brand {
    display: flex;
    align-items: center;
    gap: 15px;
}

.h-icon-box {
    background: #0d9488;
    padding: 10px;
    border-radius: 12px;
    display: flex;
}

.h-icon-box svg {
    width: 28px;
}

.h-brand h1 {
    font-size: 1.4rem;
    font-weight: 800;
    margin: 0;
}

.h-brand p {
    font-size: 0.9rem;
    color: #64748b;
    margin: 0;
}

.h-badge {
    background: #f1f5f9;
    padding: 8px 16px;
    border-radius: 30px;
    font-size: 0.85rem;
    color: #475569;
}

/* GRID */
.h-grid {
    display: grid;
    grid-template-columns: 360px 1fr;
    gap: 30px;
    align-items: start;
}

/* CARD & TITRES */
.h-card {
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.h-card-head {
    padding: 18px 24px;
    border-bottom: 1px solid #f1f5f9;
    display: flex;
    align-items: center;
    gap: 12px;
}

.h-card-head h2 {
    font-size: 1rem;
    font-weight: 700;
    margin: 0;
}

.h-card-head svg {
    width: 20px;
    color: #0d9488;
}

.h-card-head svg.edit-icon {
    color: #f59e0b;
}

.h-between {
    justify-content: space-between;
}

/* FORMULAIRE */
.h-form {
    padding: 24px;
}

.h-field {
    margin-bottom: 18px;
}

.h-field label {
    display: block;
    font-size: 0.8rem;
    font-weight: 700;
    color: #64748b;
    margin-bottom: 6px;
}

.h-field select,
.h-field input {
    width: 100%;
    padding: 10px;
    border: 1.5px solid #e2e8f0;
    border-radius: 10px;
    font-size: 0.9rem;
    background: #f8fafc;
}

.h-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;
}

.h-form-actions {
    margin-top: 25px;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.h-btn-main {
    width: 100%;
    padding: 12px;
    border: none;
    border-radius: 10px;
    font-weight: 700;
    cursor: pointer;
    background: #0d9488;
    color: white;
    transition: 0.2s;
}

.h-btn-main.edit {
    background: #f59e0b;
}

.h-btn-sub {
    background: none;
    border: 1px solid #e2e8f0;
    padding: 10px;
    border-radius: 10px;
    color: #64748b;
    cursor: pointer;
    font-weight: 600;
}

/* TABLEAU */
.h-table-box {
    width: 100%;
}

table {
    width: 100%;
    border-collapse: collapse;
}

th {
    text-align: left;
    padding: 14px 20px;
    font-size: 0.75rem;
    color: #94a3b8;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    background: #f8fafc;
}

td {
    padding: 16px 20px;
    border-bottom: 1px solid #f1f5f9;
    font-size: 0.9rem;
}

.h-time-block {
    display: flex;
    flex-direction: column;
}

.h-time-block .d {
    font-weight: 700;
    color: #1e293b;
}

.h-time-block .t {
    font-size: 0.8rem;
    color: #0d9488;
    font-weight: 600;
}

.h-bold {
    font-weight: 700;
    color: #1e293b;
}

.h-tag-doc {
    background: #f1f5f9;
    padding: 4px 10px;
    border-radius: 6px;
    font-size: 0.8rem;
    color: #475569;
    border: 1px solid #e2e8f0;
}

/* PILLS STATUT */
.h-pill {
    padding: 4px 10px;
    border-radius: 20px;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
}

.confirmed {
    background: #dcfce7;
    color: #166534;
}

/* ACTIONS */
.h-action-btns {
    display: flex;
    gap: 8px;
}

.h-icon-btn {
    width: 34px;
    height: 34px;
    border-radius: 8px;
    border: 1px solid #e2e8f0;
    background: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #94a3b8;
}

.h-icon-btn svg {
    width: 16px;
}

.h-icon-btn.edit:hover {
    color: #f59e0b;
    border-color: #f59e0b;
}

.h-icon-btn.del:hover {
    color: #ef4444;
    border-color: #ef4444;
}

/* LIVE INDICATOR */
.h-status-live {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 0.75rem;
    font-weight: 800;
    color: #0d9488;
    text-transform: uppercase;
}

.dot {
    width: 8px;
    height: 8px;
    background: #0d9488;
    border-radius: 50%;
    animation: pulse 2s infinite;
}

/* NOTIFICATIONS & MODALS */
.h-notif {
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 12px 24px;
    border-radius: 12px;
    color: white;
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 10px;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    z-index: 2000;
}

.h-notif.success {
    background: #10b981;
}

.h-notif.error {
    background: #ef4444;
}

.h-notif svg {
    width: 18px;
}

.h-modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(15, 23, 42, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 3000;
}

.h-modal {
    background: white;
    padding: 30px;
    border-radius: 20px;
    max-width: 400px;
    text-align: center;
}

.h-modal-icon {
    width: 50px;
    height: 50px;
    background: #fee2e2;
    color: #ef4444;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 15px;
    font-weight: 900;
    font-size: 1.5rem;
}

.h-modal-btns {
    display: flex;
    gap: 12px;
    margin-top: 20px;
}

@keyframes pulse {
    0% {
        opacity: 1;
    }

    50% {
        opacity: 0.3;
    }

    100% {
        opacity: 1;
    }
}

@keyframes slideIn {
    from {
        transform: translateX(100%);
    }

    to {
        transform: translateX(0);
    }
}

.slide-enter-active {
    animation: slideIn 0.3s ease-out;
}

.slide-leave-active {
    animation: slideIn 0.3s ease-in reverse;
}

@media (max-width: 900px) {
    .h-grid {
        grid-template-columns: 1fr;
    }
}
</style>
