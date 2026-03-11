<script setup>
// Plus tard, tu feras : const listPatients = users.value.filter(u => u.role === 'patient')
</script>

<template>
  <div class="page-container">
    <header class="page-header">
      <div class="title-zone">
        <h1>Registre des Patients</h1>
        <p>Gérez les admissions et les dossiers médicaux</p>
      </div>
      <button class="btn-add">
        <span class="plus">+</span> Admettre un Patient
      </button>
    </header>

    <div class="filters-bar">
      <input type="text" placeholder="Rechercher un nom ou un ID..." class="search-input" />
      <select class="filter-select">
        <option>Tous les services</option>
        <option>Urgences</option>
        <option>Cardiologie</option>
        <option>Pédiatrie</option>
      </select>
    </div>

    <div class="table-card">
      <table class="hospital-table">
        <thead>
          <tr>
            <th>Patient</th>
            <th>ID / Matricule</th>
            <th>Service</th>
            <th>Statut</th>
            <th>Médecin Traitant</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div class="patient-info">
                <div class="avatar">JD</div>
                <span class="name">Jean Dupont</span>
              </div>
            </td>
            <td><code class="id-badge">#PT-2024-001</code></td>
            <td>Urgences</td>
            <td><span class="badge status-urgent">Urgence</span></td>
            <td>Dr. Martin</td>
            <td class="actions">
              <button class="btn-icon edit" title="Modifier">✏️</button>
              <button class="btn-icon view" title="Voir Dossier">📂</button>
            </td>
          </tr>

          <tr>
            <td>
              <div class="patient-info">
                <div class="avatar woman">ML</div>
                <span class="name">Marie Lawson</span>
              </div>
            </td>
            <td><code class="id-badge">#PT-2024-089</code></td>
            <td>Pédiatrie</td>
            <td><span class="badge status-stable">Stable</span></td>
            <td>Dr. Sow</td>
            <td class="actions">
              <button class="btn-icon edit">✏️</button>
              <button class="btn-icon view">📂</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.page-header h1 {
  color: #1e293b;
  font-size: 1.7rem;
  font-weight: 800;
}

.page-header p { color: #64748b; }

.btn-add {
  background-color: #0d9488;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 10px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: background 0.2s;
}
.btn-add:hover { background-color: #0f766e; }

.filters-bar {
  display: flex;
  gap: 1rem;
}

.search-input, .filter-select {
  padding: 0.7rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background: white;
  color: #475569;
}
.search-input { flex: 1; }

.table-card {
  background: white;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  overflow: hidden;
}

.hospital-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

.hospital-table th {
  background: #f8fafc;
  padding: 1rem;
  color: #64748b;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.05rem;
  border-bottom: 1px solid #e2e8f0;
}

.hospital-table td {
  padding: 1rem;
  border-bottom: 1px solid #f1f5f9;
  color: #1e293b;
  vertical-align: middle;
}

.patient-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.avatar {
  width: 35px;
  height: 35px;
  background: #dbeafe;
  color: #1e40af;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: 700;
}
.avatar.woman { background: #fce7f3; color: #9d174d; }

.id-badge {
  background: #f1f5f9;
  padding: 4px 8px;
  border-radius: 5px;
  font-family: monospace;
  color: #475569;
}

.badge {
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 700;
}
.status-urgent { background: #fee2e2; color: #991b1b; }
.status-stable { background: #dcfce7; color: #166534; }

.actions { display: flex; gap: 8px; }
.btn-icon {
  border: 1px solid #e2e8f0;
  background: white;
  padding: 5px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}
.btn-icon:hover { background: #f8fafc; border-color: #cbd5e1; }

</style>