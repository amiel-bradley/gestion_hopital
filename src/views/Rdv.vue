<script setup>
import { rooms } from '@/services/data';
import { ref, computed } from 'vue';

const rdv = ref(JSON.parse(localStorage.getItem('rdv')) || []);
const patients = ref(JSON.parse(localStorage.getItem('patients')) || []);
const doctors = ref(JSON.parse(localStorage.getItem('doctors')) || []);
const errorMessage = ref('');
const successMessage = ref('');
const roomsAvailable = computed(() =>
    rooms.value.filter(r => r.capacite > 0)
);
const doctorsAvailable = computed(() =>
    doctors.value.filter(d => d.available == true)
);
const patientsAvailable = computed(() =>
    patients.value.filter(p => p.rdv !== true)
);
console.log(patientsAvailable)


const form = ref({
    patientId: '',
    doctorId: '',
    date: '',
    time: '',
    room: '',
    status: 'confirmed'
});



const sortedRdv = computed(() =>
    [...rdv.value].sort((a, b) =>
        new Date(a.dateTime) - new Date(b.dateTime)
    )
);

const getPatientName = id =>
    patients.value.find(p => p.id === Number(id))?.lastName || 'Inconnu';

const getDoctorName = id =>
    doctors.value.find(d => d.id === Number(id))?.name || 'Inconnu';

function updateRoomCapacity(roomId, n) {
    const room = rooms.value.find(r => r.id == roomId);
    if (room) {
        room.capacite += n;
    }
}

function handleSubmit() {
    errorMessage.value = '';
    successMessage.value = '';
    if (!patients.value.length || !doctors.value.length) {
        showError("Ajoutez d'abord patients et docteurs.");
        return;
    }

    const dateTime = `${form.value.date}T${form.value.time}`;
    const selectedDate = new Date(dateTime);
    if (selectedDate < new Date()) {
        showError("Impossible de programmer dans le passé.");
        return;
    }

    const doctorBusy = rdv.value.find(
        r => r.doctorId == form.value.doctorId && r.dateTime === dateTime
    );

    if (doctorBusy && doctorBusy.id !== form.value.id) {
        showError("Docteur déjà occupé.");
        return;
    }

    if (form.value.id) {
        const index = rdv.value.findIndex(r => r.id === form.value.id)
        const old = rdv.value.find(r => r.id === form.value.id)

        if (old.room != form.value.room) {
            updateRoomCapacity(old.room, +1)
            const newRoom = rooms.value.find(r => r.id == form.value.room)
            if (!newRoom || newRoom.capacite <= 0) {
                showError("Chambre pleine.")
                updateRoomCapacity(old.room, -1)
                return
            }
            updateRoomCapacity(form.value.room, -1)
        }
        rdv.value[index] = { ...form.value, dateTime }
        successMessage.value = "Rendez-vous modifié ✔️"
    } else {
        const room = rooms.value.find(r => r.id == form.value.room)

        if (!room || room.capacite <= 0) {
            showError("Cette chambre n'a plus de places.");
            return;
        }
        rdv.value.push({
            ...form.value,
            id: Date.now(),
            dateTime
        })
        updateRoomCapacity(form.value.room, -1)
        successMessage.value = "Rendez-vous ajouté ✔️";
    }
    saveAndReset();
}

function saveAndReset() {
    // Sauvegarde------------------------------------------
    localStorage.setItem('rdv', JSON.stringify(rdv.value));
    // Réinitialisat° des valeurs -------------------------
    form.value = {
        patientId: '',
        doctorId: '',
        date: '',
        time: '',
        room: '',
        status: 'confirmed'
    }
    setTimeout(() => successMessage.value = '', 3000);
}

// Affichage des messages d'erreurs ------------
function showError(msg) {
    errorMessage.value = msg;
    setTimeout(() => errorMessage.value = '', 4000);
}

function deleteRdv(id) {
    const item = rdv.value.find(r => r.id === id)
    if (confirm("Supprimer ce rendez-vous ?")) {
        if (item) {
            updateRoomCapacity(item.room, +1);
        }
        rdv.value = rdv.value.filter(r => r.id !== id);
        localStorage.setItem('rdv', JSON.stringify(rdv.value));
    }
}

function editRdv(item) {
    const [date, time] = item.dateTime.split('T')
    form.value = { ...item, date, time }
    errorMessage.value = ''
    successMessage.value = ''
    window.scrollTo({ top: 0, behavior: 'smooth' })
}

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
                        <div>
                            <select v-model="form.room" required>
                                <option value="" disabled>Choisir une chambre...</option>
                                <option v-for="d in roomsAvailable" :key="d.id" :value="d.id">{{ d.numero }}</option>
                            </select>
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
                                <td class="name-cell">
                                    <strong>{{ getPatientName(r.patientId) }}</strong>
                                </td>
                                <td>
                                    <span class="doctor-tag">{{ getDoctorName(r.doctorId) }}</span>
                                </td>
                                <td>
                                    <span :class="['status-pill', r.status]">{{ r.status }}</span>
                                </td>
                                <td class="actions text-right">
                                    <button @click="editRdv(r)" class="btn-action edit" title="Modifier">
                                        <span class="icon">✏️</span>
                                    </button>
                                    <button @click="deleteRdv(r.id)" class="btn-action delete" title="Supprimer">
                                        <span class="icon">🗑️</span>
                                    </button>
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
    </div>
</template>

<style scoped>
.rdv-page {
    padding: 2.5rem;
    max-width: 1400px;
    margin: 0 auto;
    color: #334155;
    background-color: #f8fafc;
    min-height: 100vh;
}

.section-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 3rem;
}

.section-header h1 {
    color: #0f172a;
    font-size: 2.2rem;
    font-weight: 800;
    letter-spacing: -0.025em;
    margin-bottom: 0.5rem;
}

.section-header p {
    color: #64748b;
    font-size: 1.1rem;
}

.badge-total {
    background: #e2e8f0;
    padding: 0.5rem 1rem;
    border-radius: 99px;
    font-weight: 600;
    font-size: 0.85rem;
    color: #475569;
}

.rdv-grid {
    display: grid;
    grid-template-columns: 400px 1fr;
    gap: 2.5rem;
    align-items: start;
}

.card,
.table-card {
    background: #ffffff;
    border-radius: 24px;
    border: 1px solid rgba(226, 232, 240, 0.8);
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.04), 0 8px 10px -6px rgba(0, 0, 0, 0.04);
    padding: 2rem;
}

.card-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 2rem;
}

.icon-circle {
    width: 42px;
    height: 42px;
    background: #f1f5f9;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
}

.icon-circle.edit-mode {
    background: #eff6ff;
    color: #3b82f6;
}

.field {
    margin-bottom: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
}

label {
    font-size: 0.75rem;
    font-weight: 700;
    color: #94a3b8;
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

select,
input {
    padding: 0.85rem 1rem;
    border-radius: 14px;
    border: 2px solid #f1f5f9;
    background: #f8fafc;
    font-size: 0.95rem;
    color: #1e293b;
    transition: all 0.2s ease;
}

select:focus,
input:focus {
    outline: none;
    border-color: #0d9488;
    background: #fff;
    box-shadow: 0 0 0 4px rgba(13, 148, 136, 0.1);
}

.row {
    display: grid;
    grid-template-columns: 1.2fr 0.8fr;
    gap: 1rem;
}

.btn-submit {
    width: 100%;
    padding: 1rem;
    background: linear-gradient(135deg, #0d9488 0%, #0f766e 100%);
    color: white;
    border: none;
    border-radius: 14px;
    font-weight: 700;
    font-size: 1rem;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
    margin-top: 1rem;
}

.btn-submit:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 15px -3px rgba(13, 148, 136, 0.3);
}

.btn-edit {
    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
}

.btn-cancel {
    width: 100%;
    background: transparent;
    border: none;
    color: #94a3b8;
    margin-top: 1rem;
    cursor: pointer;
    font-weight: 600;
    font-size: 0.9rem;
}

.table-card {
    padding: 0;
    overflow: hidden;
}

table {
    width: 100%;
    border-collapse: collapse;
}

th {
    text-align: left;
    padding: 1.25rem 1.5rem;
    background: #f8fafc;
    color: #64748b;
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    border-bottom: 1px solid #f1f5f9;
}

td {
    padding: 1.25rem 1.5rem;
    border-bottom: 1px solid #f8fafc;
    vertical-align: middle;
}

tr:hover {
    background-color: #fcfdfe;
}

tr.row-editing {
    background-color: #eff6ff;
}

.date-wrapper {
    display: flex;
    flex-direction: column;
}

.main-date {
    font-weight: 700;
    color: #1e293b;
}

.main-time {
    font-size: 0.85rem;
    color: #0d9488;
    font-weight: 600;
}

.doctor-tag {
    background: #f1f5f9;
    padding: 0.4rem 0.8rem;
    border-radius: 8px;
    font-size: 0.85rem;
    color: #475569;
}

.status-pill {
    padding: 0.4rem 0.9rem;
    border-radius: 99px;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
}

.confirmed {
    background: #dcfce7;
    color: #15803d;
}

.pending {
    background: #fef3c7;
    color: #b45309;
}

.cancelled {
    background: #fee2e2;
    color: #b91c1c;
}

.text-right {
    text-align: right;
}

.btn-action {
    width: 36px;
    height: 36px;
    border-radius: 10px;
    border: 1px solid #f1f5f9;
    background: white;
    cursor: pointer;
    margin-left: 0.5rem;
    transition: all 0.2s;
}

.btn-action.edit:hover {
    background: #eff6ff;
    border-color: #bfdbfe;
    color: #3b82f6;
}

.btn-action.delete:hover {
    background: #fef2f2;
    border-color: #fecaca;
    color: #ef4444;
}

.message-container {
    min-height: 50px;
    margin-top: 1rem;
}

.msg {
    padding: 0.85rem;
    border-radius: 12px;
    font-size: 0.9rem;
    font-weight: 600;
    text-align: center;
}

.error {
    background: #fff1f2;
    color: #e11d48;
    border: 1px solid #ffe4e6;
}

.success {
    background: #f0fdf4;
    color: #16a34a;
    border: 1px solid #dcfce7;
}

.empty-state {
    text-align: center;
    padding: 5rem 2rem;
    color: #94a3b8;
}

.empty-illustration {
    font-size: 4rem;
    margin-bottom: 1.5rem;
    opacity: 0.2;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

@media (max-width: 1100px) {
    .rdv-grid {
        grid-template-columns: 1fr;
    }

    .section-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
    }
}
</style>