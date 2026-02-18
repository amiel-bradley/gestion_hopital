<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { patients } from "@/services/data";

const router = useRouter();

const genders = [
  { label: "Masculin", value: "M" },
  { label: "Féminin", value: "F" },
];

const bloodGroups = [
  "A+", "A-",
  "B+", "B-",
  "AB+", "AB-",
  "O+", "O-"
];

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
  phone: "",
  bloodGroup: "",
  status: "",
  besoinMedical: "",
  doctorId: "",
  roomId: "",
});

// -------- PRE-REMPLISSAGE SI EDIT ----------
onMounted(() => {
  const data = localStorage.getItem("patientToEdit");
  if (data) {
    form.value = JSON.parse(data);
  }
});
const goBack = () => {
  router.back();
};

// -------- SAVE ----------
const savePatient = () => {

  if (form.value.id) {
    // MODE MODIFICATION
    const index = patients.value.findIndex(
      p => p.id === form.value.id
    );

    if (index !== -1) {
      patients.value[index] = { ...form.value };
    }

  } else {
    // MODE AJOUT
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
  <form @submit.prevent="savePatient">

    <input v-model="form.firstName" placeholder="First Name" required />
    <input v-model="form.lastName" placeholder="Last Name" required />

    <select v-model="form.gender">
      <option value="" disabled>Genre</option>
      <option v-for="g in genders" :key="g.value" :value="g.value">
        {{ g.label }}
      </option>
    </select>

    <input v-model="form.phone" placeholder="Phone" />

    <select v-model="form.bloodGroup">
      <option value="" disabled>Groupe Sanguins</option>
      <option v-for="group in bloodGroups" :key="group" :value="group">
        {{ group }}
      </option>
    </select>

    <select v-model="form.status">
      <option value="" disabled>Statut du patient</option>
      <option v-for="s in statuses" :key="s.value" :value="s.value">
        {{ s.label }}
      </option>
    </select>

    <div class="actions">
  <button type="button" class="btn-back" @click="goBack">
    ← Retour
  </button>

  <button type="submit">
    {{ form.id ? "Modifier Patient" : "Ajouter Patient" }}
  </button>
</div>

  </form>


</template>

<style scoped>
form {
  max-width: 720px;
  margin: 40px auto;
  padding: 32px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 20px;
  font-family: "Inter", sans-serif;
}

label {
  display: block;
  margin-bottom: 6px;
  margin-top: 18px;
  font-size: 14px;
  font-weight: 500;
}

input,
select {
  width: 100%;
  padding: 12px 14px;
  border-radius: 10px;
  border: 1px solid #e2e8f0;
  font-size: 14px;
  margin-top: 4px;
}

button[type="submit"] {
  margin-top: 28px;
  width: 100%;
  padding: 14px;
  border-radius: 12px;
  border: none;
  background: #0d9488;
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
}

button[type="submit"]:hover {
  background: #0f766e;
}
.actions {
  display: flex;
  gap: 12px;
  margin-top: 28px;
}

.btn-back {
  flex: 1;
  padding: 14px;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  background: #f8fafc;
  color: #334155;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
}

.btn-back:hover {
  background: #f1f5f9;
}

button[type="submit"] {
  flex: 2;
}

</style>
