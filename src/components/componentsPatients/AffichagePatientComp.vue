<script setup>
import { computed } from "vue";
import { patients } from "@/services/data";
import { RouterLink, useRouter } from "vue-router";
import { ref } from "vue";

const router = useRouter();

const patientToEdit = JSON.parse(localStorage.getItem("patientToEdit"))
const modifier = (patient) => {
  localStorage.setItem("patientToEdit", JSON.stringify(patient));
  router.push("/patients/formulaire");
}

const search = ref("");

const selectedStatus = ref("");

const savedTodos = localStorage.getItem("patients") || [];

patients.value = JSON.parse(savedTodos);

console.log(patients.value);


const filteredPatients = computed(() => {
  return patients.value.filter(p => {
    const matchSearch =
      `${p.firstName} ${p.lastName}`
        .toLowerCase()
        .includes(search.value.toLowerCase());

    const matchStatus =
      !selectedStatus.value ||
      p.status === selectedStatus.value;

    return matchSearch && matchStatus;
  })
})

const ajouterPatient = () => {
  localStorage.removeItem("patientToEdit")
  router.push("/patients/formulaire")
};

const supp = (a) => {
  patients.value = patients.value.filter((p) => p.id !== a);
};
</script>

<template>
  <section class="patients-page">
    <!-- Header -->
    <header class="patients-header">
      <h2>Gestion des patients</h2>

      <button class="btn-add" @click="ajouterPatient">
        + Ajouter un patient
      </button>
    </header>

    <!-- Filtres -->
    <div class="patients-filters">
      <input type="text" v-model="search" placeholder="Rechercher par nom ou médecin" />

      <select v-model="selectedStatus">
        <option value="">Tous les statuts</option>
        <option value="en_consultation">En consultation</option>
        <option value="hospitalise">Hospitalisé</option>
        <option value="sorti">Sorti</option>
        <option value="transfere">Transféré</option>
      </select>
    </div>

    <!-- Liste des patients -->
    <div class="patients-list">
      <article class="patient-card" v-for="patient in filteredPatients" :key="patient.id">
        <div class="patient-main">
          <h3>{{ patient.firstName }} {{ patient.lastName }}</h3>
          <span class="patient-status">
            {{ patient.status.replace("_", " ") }}
          </span>
        </div>

        <div class="patient-info">
          <p><strong>ID :</strong> {{ patient.id }}</p>
          <p><strong>Genre :</strong> {{ patient.gender }}</p>
          <p><strong>Téléphone :</strong> {{ patient.phone }}</p>
          <p><strong>Groupe sanguin :</strong> {{ patient.bloodGroup }}</p>
        </div>

        <div class="patient-actions">
          <router-link class="btn secondary" :to="`/patients/details/${patient.id}`">
            Voir détail
          </router-link>
          <button class="btn primary" @click="modifier(patient)">Modifier</button>
          <button class="btn danger" @click="supp(patient.id)">
            Supprimer
          </button>
        </div>
      </article>
    </div>
  </section>
</template>

<!-- <style scoped>
/* Page globale */
.patients-page {
  max-width: 1100px;
  margin: 40px auto;
  padding: 0 20px;
  font-family: "Segoe UI", sans-serif;
}

/* Header */
.patients-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.patients-header h2 {
  font-size: 26px;
  color: #1e3a8a;
}

.btn-add {
  padding: 12px 20px;
  background-color: #1e40af;
  color: #fff;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 500;
}

.btn-add:hover {
  background-color: #1e3a8a;
}

/* Filtres */
.patients-filters {
  display: flex;
  gap: 16px;
  margin-bottom: 30px;
}

.patients-filters input,
.patients-filters select {
  padding: 12px 14px;
  border-radius: 6px;
  border: 1px solid #cbd5e1;
  font-size: 14px;
  width: 100%;
  max-width: 300px;
}

/* Liste */
.patients-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
}

/* Carte patient */
.patient-card {
  background-color: #f8fafc;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* En-tête carte */
.patient-main {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.patient-main h3 {
  font-size: 18px;
  color: #111827;
}

.patient-status {
  font-size: 12px;
  padding: 4px 10px;
  border-radius: 20px;
  background-color: #e0f2fe;
  color: #0369a1;
  font-weight: 500;
}

/* Infos */
.patient-info p {
  font-size: 14px;
  color: #374151;
  margin: 4px 0;
}

/* Actions */
.patient-actions {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.btn {
  flex: 1;
  padding: 10px 0;
  border-radius: 6px;
  border: none;
  font-size: 14px;
  cursor: pointer;
  font-weight: 500;
}

.btn.primary {
  background-color: #1e40af;
  color: #fff;
}

.btn.secondary {
  background-color: #e5e7eb;
  color: #1f2937;
}

.btn.danger {
  background-color: #dc2626;
  color: #fff;
}

.btn:hover {
  opacity: 0.9;
}

/* Responsive */
@media (max-width: 600px) {
  .patients-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  .patients-filters {
    flex-direction: column;
  }
}
</style> -->

<style scoped>
/* ===============================
   PAGE
================================ */
.patients-page {
  background: #ffffff;
  padding: 32px;
  font-family: "Inter", "Segoe UI", sans-serif;
  color: #0f172a;
}

/* ===============================
   HEADER
================================ */
.patients-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.patients-header h2 {
  font-family: "Merriweather", serif;
  font-size: 26px;
  font-weight: 700;
}

.btn-add {
  background: #0d9488;
  color: #ffffff;
  padding: 10px 18px;
  border-radius: 10px;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
}

.btn-add:hover {
  background: #0f766e;
}

/* ===============================
   FILTRES
================================ */
.patients-filters {
  display: flex;
  gap: 14px;
  margin-bottom: 28px;
}

.patients-filters input,
.patients-filters select {
  padding: 12px 14px;
  border-radius: 10px;
  border: 1px solid #e2e8f0;
  background: #ffffff;
  font-size: 14px;
  min-width: 260px;
}

.patients-filters input::placeholder {
  color: #94a3b8;
}

/* ===============================
   LISTE
================================ */
.patients-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  gap: 24px;
}

/* ===============================
   CARD PATIENT
================================ */
.patient-card {
  border: 1px solid #e2e8f0;
  border-radius: 18px;
  padding: 22px;
  background: #ffffff;
  transition: border-color 0.2s ease;
}

.patient-card:hover {
  border-color: #99f6e4;
}

/* ===============================
   HEADER CARD
================================ */
.patient-main {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.patient-main h3 {
  font-size: 16px;
  font-weight: 600;
}

/* Badge statut */
.patient-status {
  font-size: 12px;
  padding: 6px 12px;
  border-radius: 999px;
  background: #f1f5f9;
  color: #334155;
  text-transform: capitalize;
}

/* ===============================
   INFOS
================================ */
.patient-info {
  background: #f8fafc;
  border-radius: 12px;
  padding: 14px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px 14px;
  margin-bottom: 18px;
}

.patient-info p {
  font-size: 13px;
  color: #475569;
}

.patient-info strong {
  color: #0f172a;
  font-weight: 500;
}

/* ===============================
   ACTIONS
================================ */
.patient-actions {
  display: flex;
  gap: 10px;
}

.btn {
  flex: 1;
  padding: 10px 0;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 500;
  border: 1px solid transparent;
  cursor: pointer;
  background: #f1f5f9;
  color: #0f172a;
}

/* Boutons */
.btn.primary {
  background: #ecfeff;
  color: #0f766e;
  border-color: #99f6e4;
}

.btn.secondary {
  background: #f8fafc;
  border-color: #e2e8f0;
}

.btn.danger {
  background: #fff1f2;
  color: #be123c;
  border-color: #fecdd3;
}

.btn:hover {
  filter: brightness(0.97);
}

/* ===============================
   RESPONSIVE
================================ */
@media (max-width: 768px) {
  .patients-filters {
    flex-direction: column;
  }

  .patient-info {
    grid-template-columns: 1fr;
  }
}
</style>
