<script setup>
// Plus tard, tu pourras importer tes données ici
import { patients, doctors, rooms } from '@/services/data';
</script>

<template>
  <div class="dashboard-container">
    <header class="dashboard-header">
      <h1>Tableau de Bord Administratif</h1>
      <p>Bienvenue, voici l'état actuel de l'hôpital aujourd'hui.</p>
    </header>

    <section class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon patient">👥</div>
        <div class="stat-details">
          <h3>{{ patients.length}}</h3>
          <p>Patients Total</p>
        </div>
        <span class="stat-trend positive">+3%</span>
      </div>

      <div class="stat-card">
        <div class="stat-icon doctor">👨‍⚕️</div>
        <div class="stat-details">
          <h3>{{doctors.length}}</h3>
          <p>Médecins en service</p>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon appointment">📅</div>
        <div class="stat-details">
          <h3>18</h3>
          <p>Rendez-vous aujourd'hui</p>
        </div>
      </div>

      <div class="stat-card warning">
        <div class="stat-icon room">🏥</div>
        <div class="stat-details">
          <h3>{{rooms.length}}</h3>
          <p>Chambres </p>
        </div>
        <span class="stat-tag alert">Critique</span>
      </div>
    </section>

<section class="dashboard-content">
  <div class="content-box">
    <div class="box-header">
      <h3>Consultations en cours</h3>
      <span class="live-indicator">Direct</span>
    </div>
    
    <div class="appointment-timeline">
      <div class="appointment-item">
        <div class="time-slot">10:30</div>
        <div class="appointment-info">
          <div class="patient-name">Mme. Sarah Kouamé</div>
          <div class="doctor-assigned">Dr. Traoré • Cardiologie</div>
        </div>
        <div class="status-badge waiting">En attente</div>
      </div>

      <div class="appointment-item ongoing">
        <div class="time-slot">11:15</div>
        <div class="appointment-info">
          <div class="patient-name">M. Jean Dupont</div>
          <div class="doctor-assigned">Dr. Martin • Pédiatrie</div>
        </div>
        <div class="status-badge active">En cours</div>
      </div>

      <div class="appointment-item">
        <div class="time-slot">12:00</div>
        <div class="appointment-info">
          <div class="patient-name">Lamine Sarr</div>
          <div class="doctor-assigned">Dr. Diallo • Généraliste</div>
        </div>
        <div class="status-badge scheduled">Programmé</div>
      </div>
    </div>
  </div>
</section>
  </div>
</template>

<style scoped>
.dashboard-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.dashboard-header h1 {
  color: #1e293b;
  font-size: 1.8rem;
  font-weight: 800;
}

.dashboard-header p {
  color: #64748b;
  margin-top: 0.2rem;
}

/* Grille de cartes */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
}

.stat-card {
  background: white;
  padding: 1.5rem;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  gap: 1rem;
  position: relative;
  transition: transform 0.2s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05);
}

.stat-icon {
  width: 50px;
  height: 50px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}

/* Couleurs des icônes */
.patient { background: #e0f2fe; color: #0369a1; }
.doctor { background: #f0fdf4; color: #166534; }
.appointment { background: #fef9c3; color: #854d0e; }
.room { background: #fff1f2; color: #9f1239; }

.stat-details h3 {
  font-size: 1.5rem;
  color: #0f172a;
  font-weight: 800;
}

.stat-details p {
  color: #64748b;
  font-size: 0.9rem;
  font-weight: 600;
}

/* Tags et Trends */
.stat-trend {
  position: absolute;
  top: 15px;
  right: 15px;
  font-size: 0.75rem;
  font-weight: 700;
  color: #10b981;
}

.stat-tag.alert {
  position: absolute;
  bottom: 15px;
  right: 15px;
  background: #be123c;
  color: white;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 0.65rem;
  text-transform: uppercase;
}

/* Contenu bas */
.content-box {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 1.5rem;
}

.content-box h3 {
  margin-bottom: 1rem;
  color: #1e293b;
}

.list-item {
  padding: 1rem 0;
  border-bottom: 1px solid #f1f5f9;
  color: #475569;
  font-size: 0.9rem;
}

.list-item:last-child { border-bottom: none; }
.box-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.live-indicator {
  background: #fee2e2;
  color: #ef4444;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: bold;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
}

.appointment-timeline {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.appointment-item {
  display: grid;
  grid-template-columns: 60px 1fr auto;
  align-items: center;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 12px;
  border-left: 4px solid #cbd5e1;
  transition: all 0.2s ease;
}

/* Bordure colorée selon l'importance */
.appointment-item.ongoing {
  border-left-color: #42b883;
  background: #f0fdf4;
}

.time-slot {
  font-weight: 800;
  color: #64748b;
  font-size: 0.9rem;
}

.patient-name {
  font-weight: 700;
  color: #1e293b;
}

.doctor-assigned {
  font-size: 0.8rem;
  color: #64748b;
}

/* Badges de statut */
.status-badge {
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: bold;
}

.status-badge.active { background: #42b883; color: white; }
.status-badge.waiting { background: #fef9c3; color: #854d0e; }
.status-badge.scheduled { background: #e2e8f0; color: #475569; }

.appointment-item:hover {
  transform: scale(1.02);
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}
</style>