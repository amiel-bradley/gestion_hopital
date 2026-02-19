<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { rooms } from '@/services/data'
import { useRouter, RouterLink } from 'vue-router'

const router = useRouter()
const patients = ref(JSON.parse(localStorage.getItem('patients')) || [])

onMounted(() => {
  const savedRooms = localStorage.getItem('rooms')
  if (savedRooms) rooms.value = JSON.parse(savedRooms)
})

watch(
  rooms,
  (newVal) => {
    localStorage.setItem('rooms', JSON.stringify(newVal))
  },
  { deep: true }
)

const libreCount = computed(() =>
  rooms.value.filter(r => r.statut === 'available').length
)

function desaffecter(room, patientId) {
  room.affectationPatient = room.affectationPatient.filter(
    id => id !== patientId
  );

  room.statut =
    room.affectationPatient.length === room.capacite
      ? "notavailable"
      : "available";

  localStorage.setItem("rooms", JSON.stringify(rooms.value));
  // Note: Assure-toi que showNotif est défini globalement ou importé
  if (typeof showNotif === 'function') showNotif("Patient retiré ✔️");
}
</script>

<template>
  <div class="h-page">
    <header class="h-header">
      <div class="h-title-group">
        <div class="h-icon-main">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
        </div>
        <div>
          <h1>Gestion des Chambres</h1>
          <p>Disponibilité des lits et affectations en temps réel</p>
        </div>
      </div>

      <div class="h-actions-group">
        <div class="h-stat-card">
          <span class="h-pulse-dot"></span>
          <span><strong>{{ libreCount }}</strong> Chambres Libres</span>
        </div>
        <div class="h-nav-links">
          <RouterLink class="h-btn-nav secondary" to="/rooms/affectation">Affectations</RouterLink>
          <RouterLink class="h-btn-nav primary" to="/rooms/roomdata">
             <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M12 5v14m7-7H5"/></svg>
             Ajouter
          </RouterLink>
        </div>
      </div>
    </header>

    <div class="h-grid">
      <div v-for="room in rooms" :key="room.roomId" class="h-card" :class="room.statut">
        <div class="h-card-head">
          <div class="h-room-number">Chambre {{ room.numero }}</div>
          <div :class="['h-badge', room.statut]">
            {{ room.statut === 'available' ? 'Disponible' : 'Complète' }}
          </div>
        </div>

        <div class="h-card-body">
          <div class="h-occupancy-wrapper">
             <div class="h-label-row">
               <span>Occupation</span>
               <span>{{ room.affectationPatient.length }} / {{ room.capacite }}</span>
             </div>
             <div class="h-progress-bg">
               <div class="h-progress-fill" :style="{ width: (room.affectationPatient.length / room.capacite * 100) + '%' }"></div>
             </div>
          </div>

          <div class="h-patient-list">
            <div v-if="room.affectationPatient.length === 0" class="h-empty-state">
              Aucun patient affecté
            </div>
            <div v-for="id in room.affectationPatient" :key="id" class="h-patient-tag">
              <div class="h-avatar">{{ patients.find(p => p.id === id)?.lastName?.charAt(0) }}</div>
              <span class="h-name">
                {{patients.find(p => p.id === id)?.firstName || ''}}
                {{patients.find(p => p.id === id)?.lastName || 'Inconnu'}}
              </span>
              <button @click="desaffecter(room, id)" class="h-btn-remove" title="Libérer le lit">×</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.h-page {
  padding: 2rem;
  background: #f8fafc;
  min-height: 100vh;
  font-family: 'Inter', system-ui, sans-serif;
}

/* HEADER STYLE */
.h-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.5rem;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.h-title-group { display: flex; align-items: center; gap: 1rem; }
.h-icon-main {
  background: #0d9488;
  color: white;
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(13, 148, 136, 0.2);
}
.h-icon-main svg { width: 24px; }

h1 { font-size: 1.6rem; font-weight: 800; color: #1e293b; margin: 0; }
p { color: #64748b; margin: 0; font-size: 0.95rem; }

.h-actions-group { display: flex; align-items: center; gap: 1.5rem; }

.h-stat-card {
  background: white;
  padding: 0.75rem 1.25rem;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.9rem;
}

.h-pulse-dot {
  width: 10px;
  height: 10px;
  background: #10b981;
  border-radius: 50%;
  box-shadow: 0 0 0 rgba(16, 185, 129, 0.4);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
  70% { box-shadow: 0 0 0 10px rgba(16, 185, 129, 0); }
  100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
}

.h-nav-links { display: flex; gap: 0.75rem; }
.h-btn-nav {
  text-decoration: none;
  padding: 0.75rem 1.25rem;
  border-radius: 10px;
  font-weight: 700;
  font-size: 0.9rem;
  transition: 0.2s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.h-btn-nav.primary { background: #0d9488; color: white; }
.h-btn-nav.primary:hover { background: #0f766e; }
.h-btn-nav.secondary { background: white; color: #475569; border: 1px solid #e2e8f0; }
.h-btn-nav.secondary:hover { background: #f1f5f9; }

/* GRID STYLE */
.h-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
}

.h-card {
  background: white;
  border-radius: 20px;
  border: 1px solid #e2e8f0;
  padding: 1.5rem;
  transition: transform 0.2s, box-shadow 0.2s;
  position: relative;
  overflow: hidden;
}

.h-card:hover { transform: translateY(-4px); box-shadow: 0 12px 24px rgba(0,0,0,0.05); }

.h-card-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.h-room-number { font-weight: 800; font-size: 1.2rem; color: #1e293b; }

.h-badge {
  padding: 0.3rem 0.8rem;
  border-radius: 30px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
}

.h-badge.available { background: #dcfce7; color: #15803d; }
.h-badge.notavailable { background: #fee2e2; color: #b91c1c; }

/* PROGRESS BAR */
.h-occupancy-wrapper { margin-bottom: 1.5rem; }
.h-label-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  font-weight: 600;
  color: #64748b;
  margin-bottom: 0.5rem;
}

.h-progress-bg { height: 8px; background: #f1f5f9; border-radius: 4px; overflow: hidden; }
.h-progress-fill {
  height: 100%;
  background: #0d9488;
  border-radius: 4px;
  transition: width 0.5s ease-out;
}
.notavailable .h-progress-fill { background: #ef4444; }

/* PATIENT TAGS */
.h-patient-list { display: flex; flex-direction: column; gap: 0.75rem; }
.h-patient-tag {
  display: flex;
  align-items: center;
  background: #f8fafc;
  padding: 0.6rem;
  border-radius: 12px;
  border: 1px solid #f1f5f9;
  gap: 0.75rem;
  position: relative;
}

.h-avatar {
  width: 28px;
  height: 28px;
  background: #e2e8f0;
  color: #475569;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 0.75rem;
}

.h-name { font-size: 0.9rem; font-weight: 600; color: #334155; flex: 1; }

.h-btn-remove {
  border: none;
  background: none;
  color: #94a3b8;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0 5px;
  transition: color 0.2s;
}
.h-btn-remove:hover { color: #ef4444; }

.h-empty-state {
  text-align: center;
  font-size: 0.85rem;
  color: #94a3b8;
  padding: 1rem;
  border: 2px dashed #f1f5f9;
  border-radius: 12px;
}

@media (max-width: 768px) {
  .h-header { flex-direction: column; align-items: flex-start; }
  .h-actions-group { width: 100%; justify-content: space-between; }
}
</style>