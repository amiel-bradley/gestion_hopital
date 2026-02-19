<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { patients, doctors, roomsdispo } from "@/services/data";

const router = useRouter();

const genders = [
  { label: "Masculin", value: "M" },
  { label: "Féminin", value: "F" },
];

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const statuses = [
  { label: "En consultation", value: "consultation" },
  { label: "Hospitalisé", value: "hospitalise" },
  { label: "Transféré", value: "transfere" },
  { label: "Sorti", value: "sorti" },
];

const form = ref({
  id: null,
  firstName: "",
  lastName: "",
  gender: "",
  age: "",
  phone: "",
  email: "",
  address: "",
  dateNaissance: "",
  bloodGroup: "",
  status: "",
  besoinMedical: "",
  allergies: "",
  antecedents: "",
  doctorId: "",
  roomId: "",
});

onMounted(() => {
  const data = localStorage.getItem("patientToEdit");
  if (data) form.value = JSON.parse(data);
});

const goBack = () => router.back();

const savePatient = () => {
  if (!form.value.firstName || !form.value.lastName || !form.value.gender) {
    alert("Veuillez remplir au moins le nom, le prénom et le genre.");
    return;
  }

  if (form.value.id) {
    const index = patients.value.findIndex(p => p.id === form.value.id);
    if (index !== -1) patients.value[index] = { ...form.value };
  } else {
    patients.value.push({
      ...form.value,
      id: Date.now(),
      rdv: false,
      createdAt: new Date().toLocaleDateString(),
    });
  }

  localStorage.removeItem("patientToEdit");
  router.push("/patients");
};
</script>

<template>
  <section class="form-page">
    <header class="form-header">
      <div class="title-wrapper">
        <div class="icon-box">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path
              d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7M18.5 2.5a2.121 2.121 0 113 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
        </div>
        <div>
          <h1>{{ form.id ? 'Mise à jour Dossier' : 'Admission Patient' }}</h1>
          <p>{{ form.id ? 'ID #' + form.id : 'Enregistrement d\'un nouveau patient dans le système' }}</p>
        </div>
      </div>
    </header>

    <form @submit.prevent="savePatient" class="medical-form">

      <div class="form-section">
        <div class="section-tag">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          Etat Civil
        </div>

        <div class="row">
          <div class="field">
            <label>Prénom</label>
            <input v-model="form.firstName" placeholder="Prénom" required />
          </div>
          <div class="field">
            <label>Nom de famille</label>
            <input v-model="form.lastName" placeholder="Nom" required />
          </div>
        </div>

        <div class="row">
          <div class="field">
            <label>Genre</label>
            <select v-model="form.gender" required>
              <option value="" disabled>Sélectionner</option>
              <option v-for="g in genders" :key="g.value" :value="g.value">{{ g.label }}</option>
            </select>
          </div>
          <div class="field">
            <label>Âge</label>
            <input v-model="form.age" type="number" placeholder="Ex: 35" required/>
          </div>
          <div class="field">
            <label>Date de naissance</label>
            <input v-model="form.dateNaissance" type="date" />
          </div>
        </div>
      </div>

      <div class="form-section">
        <div class="section-tag">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          Contact & Affectation
        </div>

        <div class="row">
          <div class="field">
            <label>Téléphone</label>
            <input v-model="form.phone" type="tel" placeholder="01 23 45 67 89" required/>
          </div>
          <div class="field">
            <label>Email</label>
            <input v-model="form.email" type="email" placeholder="nom@exemple.com" required/>
          </div>
        </div>

        <div class="row">
          <div class="field">
            <label>Médecin Référent</label>
            <select v-model="form.doctorId">
              <option value="" disabled>Attribuer un praticien</option>
              <option v-for="d in doctors" :key="d.id" :value="d.id">Dr. {{ d.name }} ({{ d.speciality }})</option>
            </select>
          </div>
          <div class="field">
            <label>Chambre</label>
            <select v-model="form.roomId">
              <option value="" disabled>Assigner une unité</option>
              <option v-for="r in roomsdispo" :key="r.roomId" :value="r.roomId">
                Salle {{ r.numero }} ({{ r.capacite }} lits)
              </option>
            </select>
          </div>
        </div>
      </div>

      <div class="form-section highlight">
        <div class="section-tag medical">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
          </svg>
          Informations Cliniques
        </div>

        <div class="row">
          <div class="field">
            <label>Groupe Sanguin</label>
            <select v-model="form.bloodGroup">
              <option value="" disabled>Groupe</option>
              <option v-for="g in bloodGroups" :key="g" :value="g">{{ g }}</option>
            </select>
          </div>
          <div class="field">
            <label>Statut Actuel</label>
            <select v-model="form.status">
              <option value="" disabled>Statut clinique</option>
              <option v-for="s in statuses" :key="s.value" :value="s.value">{{ s.label }}</option>
            </select>
          </div>
        </div>

        <div class="row">
          <div class="field">
            <label>Allergies connues</label>
            <textarea v-model="form.allergies" placeholder="Lister les allergies ou noter 'Néant'"></textarea>
          </div>
          <div class="field">
            <label>Antécédents</label>
            <textarea v-model="form.antecedents" placeholder="Pathologies chroniques, interventions..."></textarea>
          </div>
        </div>

        <div class="field full">
          <label>Motif d'admission / Besoins</label>
          <textarea v-model="form.besoinMedical" placeholder="Décrire les soins nécessaires..."></textarea>
        </div>
      </div>

      <div class="form-footer">
        <button type="button" class="btn-cancel" @click="goBack">Annuler</button>
        <button type="submit" class="btn-submit">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M20 6L9 17l-5-5" />
          </svg>
          {{ form.id ? "Enregistrer les modifications" : "Confirmer l'admission" }}
        </button>
      </div>

    </form>
  </section>
</template>

<style scoped>
.form-page {
  max-width: 950px;
  margin: 40px auto;
  padding: 0 20px;
  font-family: 'Inter', sans-serif;
  color: #1e293b;
}

/* HEADER STYLE */
.form-header {
  margin-bottom: 32px;
}

.title-wrapper {
  display: flex;
  align-items: center;
  gap: 20px;
}

.icon-box {
  background: #0d9488;
  color: white;
  width: 52px;
  height: 52px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 15px -3px rgba(13, 148, 136, 0.2);
}

.icon-box svg {
  width: 26px;
}

h1 {
  font-size: 1.75rem;
  font-weight: 800;
  margin: 0;
  letter-spacing: -0.02em;
}

.form-header p {
  color: #64748b;
  margin: 4px 0 0;
  font-weight: 500;
}

/* FORM STRUCTURE */
.medical-form {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 24px;
  padding: 32px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
}

.form-section {
  margin-bottom: 32px;
  padding-bottom: 24px;
  border-bottom: 1px solid #f1f5f9;
}

.form-section:last-of-type {
  border: none;
  margin-bottom: 0;
}

.section-tag {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 800;
  font-size: 0.9rem;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 20px;
}

.section-tag svg {
  width: 18px;
  color: #0d9488;
}

.section-tag.medical svg {
  color: #ef4444;
}

/* INPUTS */
.row {
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
}

.field {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.field.full {
  width: 100%;
}

label {
  font-weight: 700;
  font-size: 0.85rem;
  color: #334155;
}

input,
select,
textarea {
  padding: 12px 16px;
  border-radius: 12px;
  border: 1.5px solid #e2e8f0;
  background: #f8fafc;
  font-size: 0.95rem;
  font-family: inherit;
  transition: all 0.2s;
}

input:focus,
select:focus,
textarea:focus {
  outline: none;
  border-color: #0d9488;
  background: white;
  box-shadow: 0 0 0 4px rgba(13, 148, 136, 0.1);
}

textarea {
  min-height: 100px;
  resize: vertical;
}

/* SPECIAL HIGHLIGHT FOR MEDICAL SECTION */
.form-section.highlight {
  background: #fffafa;
  border: 1px solid #fee2e2;
  padding: 24px;
  border-radius: 20px;
}

/* FOOTER ACTIONS */
.form-footer {
  display: flex;
  gap: 16px;
  margin-top: 40px;
}

.btn-cancel {
  flex: 1;
  padding: 14px;
  border-radius: 14px;
  border: 1.5px solid #e2e8f0;
  background: white;
  font-weight: 700;
  color: #64748b;
  cursor: pointer;
  transition: 0.2s;
}

.btn-cancel:hover {
  background: #f1f5f9;
  color: #1e293b;
}

.btn-submit {
  flex: 2;
  padding: 14px;
  border-radius: 14px;
  border: none;
  background: #0d9488;
  color: white;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
  transition: 0.3s;
}

.btn-submit:hover {
  background: #0f766e;
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgba(13, 148, 136, 0.2);
}

.btn-submit svg {
  width: 20px;
}

@media (max-width: 768px) {
  .row {
    flex-direction: column;
  }

  .form-footer {
    flex-direction: column-reverse;
  }
}
</style>