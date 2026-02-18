<script setup>
import { ref, computed, watch } from "vue";
import { rooms, patients } from "@/services/data";
import { useRouter } from "vue-router";

const router = useRouter();

// ----- STATE -----
const selectedRoom = ref("");
const selectedPatient = ref("");

// Modal
const showModal = ref(false);
const modalMessage = ref("");
const modalAction = ref(null);

// Notification
const notification = ref({ show: false, message: "", type: "success" });

// ----- UTIL -----
function showNotif(message, type = "success") {
    notification.value = { show: true, message, type };
    setTimeout(() => (notification.value.show = false), 2500);
}

function openModal(message, action) {
    modalMessage.value = message;
    modalAction.value = action;
    showModal.value = true;
}

function confirmModal() {
    if (modalAction.value) modalAction.value();
    showModal.value = false;
}

function cancelModal() {
    showModal.value = false;
}

// ----- COMPUTED -----
const roomsdispos = computed(() =>
    rooms.value.filter(r => r.affectationPatient === 0)
);

// ----- ACTIONS -----

function affecter() {
    if (!selectedRoom.value || !selectedPatient.value) {
        showNotif("Sélectionnez une chambre et un patient.", "error");
        return;
    }

    const room = rooms.value.find(r => r.numero === selectedRoom.value);
    if (!room) return;

    if (room.affectationPatient >= room.capacite) {
        showNotif("Cette chambre est déjà complète.", "error");
        return;
    }
    room.affectationPatient += 1;
    room.statut = room.affectationPatient === room.capacite ? "notavailable" : "available";
    
    localStorage.setItem("rooms", JSON.stringify(rooms.value))    
    selectedRoom.value = "";
    selectedPatient.value = "";

    showNotif("Patient affecté ✔️");
}


function desaffecter(room) {
    room.affectationPatient = Math.max(room.affectationPatient - 1, 0); // pas négatif
    // Mettre à jour le statut selon le nombre de lits occupés
    room.statut = room.affectationPatient === room.capacite ? "occupée" : "available";
    localStorage.setItem("rooms", JSON.stringify(rooms.value));
    showNotif("Patient retiré ✔️");
}


// Retour
function goBack() {
    router.back();
}
</script>

<template>
    <div class="affectation-page">

        <!-- Header -->
        <header class="section-header">
            <button class="btn-text-back" @click="goBack">← Retour</button>
            <h1>Gestion des Affectations</h1>
            <p>Gérez l'occupation des lits et l'admission des patients en temps réel.</p>
        </header>

        <div class="affectation-grid">

            <!-- Formulaire d'affectation -->
            <section class="form-section">
                <div class="card main-card">
                    <h3>Admission Patient</h3>
                    <div class="field">
                        <label>Chambre de destination</label>
                        <select v-model="selectedRoom">
                            <option disabled value="">Choisir une chambre...</option>
                            <option v-for="room in roomsdispos" :key="room.roomId" :value="room.numero">
                                Chambre {{ room.numero }}
                            </option>
                        </select>
                    </div>
                    <div class="field">
                        <label>Patient concerné</label>
                        <select v-model="selectedPatient">
                            <option disabled value="">Choisir un patient...</option>
                            <option v-for="p in patients" :key="p.id" :value="p.id">
                                {{ p.firstName }} {{ p.lastName }}
                            </option>
                        </select>
                    </div>
                    <button class="btn-affecter" @click="affecter">Valider l'affectation</button>
                </div>
            </section>

            <!-- Liste des chambres simplifiée -->
            <section class="list-section">
                <h3>Disponibilité des Chambres</h3>
                <div class="rooms-grid">
                    <div v-for="room in rooms" :key="room.roomId" class="room-card" :class="room.statut">
                        <div class="room-info">
                            <strong>Chambre {{ room.numero }}</strong>
                            <span>
                                Statut : {{ room.statut === 'available' ? 'Disponible' : 'Occupée' }}
                            </span>
                        </div>
                        <div>
                            <span>
                                Patients affectés : {{ room.affectationPatient }}
                            </span>
                        </div>
                    </div>
                </div>
            </section>


        </div>
    </div>
</template>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

.affectation-page {
    font-family: 'Inter', sans-serif;
    max-width: 1400px;
    margin: 0 auto;
    padding: 2rem;
    background-color: #f8fafc;
    min-height: 100vh;
    color: #1e293b;
}

/* Header */
.section-header {
    margin-bottom: 2.5rem;
}

.btn-text-back {
    display: flex;
    align-items: center;
    gap: 8px;
    background: none;
    border: none;
    color: #64748b;
    font-weight: 600;
    cursor: pointer;
    margin-bottom: 1rem;
    transition: 0.2s;
}

.btn-text-back:hover {
    color: #0d9488;
}

.section-header h1 {
    font-size: 2.2rem;
    font-weight: 800;
    letter-spacing: -0.02em;
    margin: 0;
}

.section-header p {
    color: #64748b;
    font-size: 1.1rem;
}

/* Layout Grid */
.affectation-grid {
    display: grid;
    grid-template-columns: 360px 1fr;
    gap: 2.5rem;
    align-items: start;
}

/* Admission Card */
.card {
    background: white;
    padding: 2rem;
    border-radius: 24px;
    border: 1px solid #e2e8f0;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
}

.card-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 2rem;
}

.icon-circle {
    width: 44px;
    height: 44px;
    background: #f0fdf4;
    color: #10b981;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
}

.field {
    margin-bottom: 1.5rem;
}

label {
    display: block;
    font-size: 0.75rem;
    font-weight: 700;
    color: #94a3b8;
    text-transform: uppercase;
    margin-bottom: 0.5rem;
}

select {
    width: 100%;
    padding: 0.8rem;
    border-radius: 12px;
    border: 2px solid #f1f5f9;
    background: #f8fafc;
    transition: 0.2s;
    font-size: 0.95rem;
}

select.active {
    border-color: #0d9488;
    background: white;
}

.btn-affecter {
    width: 100%;
    padding: 1rem;
    background: #0d9488;
    color: white;
    border: none;
    border-radius: 12px;
    font-weight: 700;
    cursor: pointer;
    transition: 0.2s;
}

.btn-affecter:hover {
    background: #0f766e;
    transform: translateY(-2px);
}

/* Rooms & Beds */
.section-title {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
}

.badge {
    background: #e2e8f0;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 700;
}

.rooms-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
    gap: 1.5rem;
}

.room-card {
    background: white;
    border-radius: 20px;
    padding: 1.5rem;
    border: 1px solid #e2e8f0;
    border-top: 4px solid #cbd5e1;
}

.room-info {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1.5rem;
}

.room-title {
    display: flex;
    flex-direction: column;
}

.room-number {
    font-weight: 800;
    font-size: 1.25rem;
}

.capacity-tag {
    font-size: 0.75rem;
    color: #94a3b8;
    font-weight: 600;
}

.status-indicator {
    font-size: 0.7rem;
    font-weight: 800;
    text-transform: uppercase;
    padding: 4px 10px;
    border-radius: 8px;
}

/* Status Specifics */
.room-card.disponible {
    border-top-color: #10b981;
}

.room-card.disponible .status-indicator {
    background: #dcfce7;
    color: #059669;
}

.room-card.not-available {
    border-top-color: #ef4444;
}

.room-card.not-available .status-indicator {
    background: #fee2e2;
    color: #dc2626;
}

/* BED VISUALS */
.beds-visual {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
}

.bed-box {
    padding: 1rem;
    border-radius: 16px;
    display: flex;
    align-items: center;
    gap: 0.8rem;
    transition: 0.3s;
    border: 1px solid transparent;
}

.bed-box.occupied {
    background: #f0f7ff;
    border-color: #dbeafe;
}

.bed-box.empty {
    background: #f8fafc;
    border: 1px dashed #e2e8f0;
}

.bed-icon {
    width: 36px;
    height: 36px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.occupied .bed-icon {
    background: #3b82f6;
    color: white;
}

.empty .bed-icon {
    background: #f1f5f9;
    color: #94a3b8;
}

.bed-content {
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.bed-label {
    font-weight: 700;
    font-size: 0.85rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.bed-label.empty {
    color: #94a3b8;
    font-weight: 500;
}

.release-btn {
    background: none;
    border: none;
    color: #ef4444;
    font-size: 0.75rem;
    font-weight: 700;
    cursor: pointer;
    padding: 0;
    text-align: left;
    margin-top: 2px;
}

.release-btn:hover {
    text-decoration: underline;
}

@media (max-width: 1100px) {
    .affectation-grid {
        grid-template-columns: 1fr;
    }

    .rooms-grid {
        grid-template-columns: 1fr;
    }
}
</style>
