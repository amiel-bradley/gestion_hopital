<script setup>
// Plus tard, tu pourras importer tes données ici
// import { patients, doctors, rooms } from '@/services/data';
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
          <h3>1,284</h3>
          <p>Patients Total</p>
        </div>
        <span class="stat-trend positive">+3%</span>
      </div>

      <div class="stat-card">
        <div class="stat-icon doctor">👨‍⚕️</div>
        <div class="stat-details">
          <h3>42</h3>
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
          <h3>5</h3>
          <p>Chambres Libres</p>
        </div>
        <span class="stat-tag alert">Critique</span>
      </div>
    </section>

    <section class="dashboard-content">
      <div class="content-box">
        <h3>Activités Récentes</h3>
        <div class="placeholder-list">
          <div class="list-item">Admission de Mme. Diallo - Chambre 102</div>
          <div class="list-item">Dr. Martin a terminé sa consultation</div>
          <div class="list-item">Nouveau rendez-vous enregistré pour 14h30</div>
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
</style>