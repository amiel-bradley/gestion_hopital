<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { rooms, roomsdispo, patients } from '@/services/data'
import { useRouter, RouterLink } from 'vue-router'

const router = useRouter()

// On recharge les données depuis localStorage si existant
onMounted(() => {
  const savedRooms = localStorage.getItem('rooms')
  if (savedRooms) rooms.value = JSON.parse(savedRooms)
})

// Watch pour synchroniser automatiquement le localStorage
watch(
  rooms,
  (newVal) => {
    localStorage.setItem('rooms', JSON.stringify(newVal))
  },
  { deep: true }
)

// Statistique : nombre de chambres libres
const libreCount = computed(() =>
  rooms.value.filter(r => r.statut === 'available').length
)
</script>

<template>
  <div class="page-container">
    <header class="page-header">
      <div class="title-zone">
        <h2>Gestion des Chambres</h2>
        <p>Disponibilité des lits et affectations en temps réel</p>
      </div>

      <div class="stats-mini">
        <div class="stat-item">
          <span class="dot green"></span>
          <strong>{{ libreCount }}</strong> Libres
        </div>
        <div class="card-footer">
          <RouterLink class="btn-manage" to="/rooms/affectation">Gérer l'affectation</RouterLink>
        </div>
      </div>
    </header>

    <div class="rooms-grid">
      <div v-for="room in rooms" :key="room.roomId" class="room-card" :class="room.statut">
        <div class="card-header">
          <span class="room-number">Chambre {{ room.numero }}</span>
          <span :class="['status-badge', room.statut]">
            {{ room.statut === 'available' ? 'Disponible' : 'Occupée' }}
          </span>
        </div>

        <div class="card-body">
          <div class="info">
            <span class="label">Capacité :</span>
            <span class="value">{{ room.capacite }} Lits</span>
          </div>
          <div class="info">
            <span class="label">Patients :</span>
            <span class="value">
              {{ room.affectationPatient }} patient{{ room.affectationPatient > 1 ? 's' : '' }}
            </span>


          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title-zone h2 {
  color: #1e293b;
  font-size: 1.7rem;
  font-weight: 800;
}

.title-zone p {
  color: #64748b;
}

.stats-mini {
  background: white;
  padding: 0.5rem 1rem;
  border-radius: 10px;
  border: 1px solid #e2e8f0;
  font-size: 0.9rem;
}

.dot {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 5px;
}

.dot.green {
  background: #10b981;
}

/* Grille des chambres */
.rooms-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

.room-card {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 1.2rem;
  transition: all 0.3s ease;
  border-left: 5px solid #cbd5e1;
}

/* Changement de couleur selon le statut */
.room-card.available {
  border-left-color: #10b981;
}

.room-card.occupied {
  border-left-color: #3b82f6;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.room-number {
  font-weight: 800;
  color: #1e293b;
  font-size: 1.1rem;
}

.status-badge {
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
}

.status-badge.available {
  background: #dcfce7;
  color: #166534;
}

.status-badge.occupied {
  background: #dbeafe;
  color: #1e40af;
}

.card-body {
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.info {
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
}

.label {
  color: #64748b;
}

.value {
  color: #1e293b;
  font-weight: 600;
}

.btn-manage {
  width: 100%;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  padding: 0.6rem;
  border-radius: 8px;
  color: #475569;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-manage:hover {
  background: #0d9488;
  color: white;
  border-color: #0d9488;
}

@media (max-width: 600px) {
  .rooms-grid {
    grid-template-columns: 1fr;
  }
}
</style>
