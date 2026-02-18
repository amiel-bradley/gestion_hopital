<script setup>
import { useRoute, useRouter } from "vue-router";
import { computed } from "vue";
import { patients } from "@/services/data";

const route = useRoute();
const router = useRouter();

const patientId = Number(route.params.id);

const patient = computed(() =>
    patients.value.find(p => p.id === patientId)
);

const goBack = () => {
    router.back();
};

const editPatient = () => {
    localStorage.setItem("patientToEdit", JSON.stringify(patient.value));
    router.push("/patients/formulaire");
};
</script>

<template>
    <section class="details-page" v-if="patient">

        <!-- HEADER -->
        <header class="details-header">
            <h2>Détails du patient</h2>

            <div class="actions">
                <button class="btn back" @click="goBack">← Retour</button>
                <button class="btn edit" @click="editPatient">Modifier</button>
            </div>
        </header>

        <!-- CARD -->
        <div class="details-card">

            <div class="patient-name">
                {{ patient.firstName }} {{ patient.lastName }}
            </div>

            <span class="status" :class="patient.status">
                {{ patient.status.replace("_", " ") }}
            </span>

            <div class="grid">

                <div class="item">
                    <label>ID</label>
                    <p>{{ patient.id }}</p>
                </div>

                <div class="item">
                    <label>Genre</label>
                    <p>{{ patient.gender }}</p>
                </div>

                <div class="item">
                    <label>Téléphone</label>
                    <p>{{ patient.phone || "-" }}</p>
                </div>

                <div class="item">
                    <label>Groupe sanguin</label>
                    <p>{{ patient.bloodGroup || "-" }}</p>
                </div>

                <div class="item">
                    <label>Besoin médical</label>
                    <p>{{ patient.besoinMedical || "-" }}</p>
                </div>

                <div class="item">
                    <label>Date création</label>
                    <p>{{ patient.createdAt }}</p>
                </div>

            </div>
        </div>
    </section>

    <div v-else class="not-found">
        Patient introuvable.
    </div>
</template>

<style scoped>
.details-page {
    max-width: 900px;
    margin: 40px auto;
    font-family: "Inter", sans-serif;
}

.details-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
}

.details-header h2 {
    font-size: 26px;
    font-weight: 700;
    color: #0f172a;
}

.actions {
    display: flex;
    gap: 10px;
}

.btn {
    padding: 10px 16px;
    border-radius: 10px;
    border: none;
    font-weight: 600;
    cursor: pointer;
}

.btn.back {
    background: #f1f5f9;
}

.btn.edit {
    background: #0d9488;
    color: white;
}

.btn.edit:hover {
    background: #0f766e;
}

/* CARD */
.details-card {
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 18px;
    padding: 28px;
}

.patient-name {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 12px;
}

.status {
    display: inline-block;
    padding: 6px 14px;
    border-radius: 999px;
    font-size: 13px;
    font-weight: 600;
    margin-bottom: 20px;
}

/* couleurs statut */
.consultation {
    background: #dbeafe;
    color: #1e40af;
}

.hospitalise {
    background: #fee2e2;
    color: #991b1b;
}

.transfere {
    background: #fef3c7;
    color: #92400e;
}

.sorti {
    background: #dcfce7;
    color: #166534;
}

/* GRID INFOS */
.grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
}

.item {
    background: #f8fafc;
    padding: 14px;
    border-radius: 10px;
}

.item label {
    font-size: 12px;
    color: #64748b;
    text-transform: uppercase;
}

.item p {
    margin-top: 4px;
    font-weight: 600;
}

.not-found {
    text-align: center;
    margin-top: 100px;
    font-weight: 600;
}
</style>
