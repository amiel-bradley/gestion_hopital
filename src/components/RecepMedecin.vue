<script setup>
import { doctors } from '@/services/data';


</script>

<template>
  <div class="page-container">
    <header class="page-header">
      <div class="title-zone">
        <h1>Gérer le Corps Médical</h1>
        <p>Gestion des médecins et de leurs spécialités</p>
      </div>
      <div class="header-actions">
        <router-link class="btn-add" to='/doctors'>+ Ajouter un Médécin</router-link>
      </div>
    </header>

    <div v-for="doctor in doctors" class="doctors-grid">
      
      <div class="doctor-card">
        <div class="status-indicator online" title="En service"></div>
        <div class="doctor-header">
          <div class="doctor-avatar">Dr</div>
          <div class="doctor-meta">
            <h3>{{doctor.name}}</h3>
            <span class="specialty">{{doctor.specialty}}</span>
          </div>
        </div>
        
        <div class="doctor-body">
          <div class="info-row">
            <span class="label">Consultations:</span>
            <span class="value">12 aujourd'hui</span>
          </div>
          <div class="info-row">
            <span class="label">Étage:</span>
            <span class="value">B - Aile Nord</span>
          </div>
        </div>

        <div class="doctor-footer">
          <button class="btn-profile">Voir Planning</button>
          <button class="btn-contact">✉️</button>
        </div>
      </div>

      <!-- <div class="doctor-card">
        <div class="status-indicator offline" title="Absent"></div>
        <div class="doctor-header">
          <div class="doctor-avatar surgeon">Dr</div>
          <div class="doctor-meta">
            <h3>Dr. Marc N'diaye</h3>
            <span class="specialty">Chirurgie Générale</span>
          </div>
        </div>
        
        <div class="doctor-body">
          <div class="info-row">
            <span class="label">Consultations:</span>
            <span class="value">Aucune</span>
          </div>
          <div class="info-row">
            <span class="label">Étage:</span>
            <span class="value">Plateau Technique</span>
          </div>
        </div>

        <div class="doctor-footer">
          <button class="btn-profile">Voir Planning</button>
          <button class="btn-contact">✉️</button>
        </div>
      </div> -->

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

.header-actions {
  display: flex;
  gap: 10px;
}

.page-header h1 {
  color: #1e293b;
  font-size: 1.7rem;
  font-weight: 800;
}

.doctors-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.doctor-card {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 20px;
  padding: 1.5rem;
  position: relative;
  transition: all 0.3s ease;
}

.doctor-card:hover {
  border-color: #0d9488;
  box-shadow: 0 10px 20px rgba(13, 148, 136, 0.05);
  transform: translateY(-5px);
}

.status-indicator {
  position: absolute;
  top: 15px;
  right: 15px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid white;
}
.online { background-color: #10b981; box-shadow: 0 0 8px #10b981; }
.offline { background-color: #94a3b8; }

.doctor-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 1.5rem;
}

.doctor-avatar {
  width: 55px;
  height: 55px;
  background: #f0fdf4;
  color: #166534;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  border: 1px solid #bbf7d0;
}
.doctor-avatar.surgeon { background: #fff1f2; color: #9f1239; border-color: #fecdd3; }

.doctor-meta h3 {
  font-size: 1.1rem;
  color: #0f172a;
  margin: 0;
}

.specialty {
  font-size: 0.85rem;
  color: #0d9488;
  font-weight: 700;
}

.doctor-body {
  background: #f8fafc;
  border-radius: 12px;
  padding: 1rem;
  margin-bottom: 1.5rem;
}

.info-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  margin-bottom: 5px;
}

.info-row:last-child { margin-bottom: 0; }

.label { color: #64748b; }
.value { color: #1e293b; font-weight: 600; }

.doctor-footer {
  display: flex;
  gap: 10px;
}

.btn-add {
  background: #0d9488;
  color: white;
  border: none;
  padding: 0.7rem 1.2rem;
  border-radius: 10px;
  font-weight: 700;
  cursor: pointer;
  text-decoration: none;
}

.btn-secondary {
  background: white;
  border: 1px solid #e2e8f0;
  padding: 0.7rem 1.2rem;
  border-radius: 10px;
  color: #64748b;
  font-weight: 600;
  cursor: pointer;
}

.btn-profile {
  flex: 1;
  background: #f1f5f9;
  border: none;
  padding: 0.6rem;
  border-radius: 8px;
  color: #475569;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s;
}
.btn-profile:hover { background: #e2e8f0; }

.btn-contact {
  background: white;
  border: 1px solid #e2e8f0;
  padding: 0.6rem;
  border-radius: 8px;
  cursor: pointer;
}

</style>