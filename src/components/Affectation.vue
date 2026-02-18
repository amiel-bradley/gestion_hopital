<script setup>
import { ref } from "vue";
import { rooms, patients } from "@/services/data";
import { useRouter } from "vue-router";

const router = useRouter();

const selectedRoom = ref(null);
const selectedPatient = ref(null);

const affecter = () => {  
  // On affecte le patient à la chambre
  const roomIndex = rooms.findIndex(r => r.numero === selectedRoom.value);
  if (roomIndex !== -1) {
    rooms[roomIndex].affectationPatient = selectedPatient.value;
    alert(`Patient ${selectedPatient.value} affecté à la chambre ${selectedRoom.value}`);
    
    // Réinitialiser les sélections
    selectedRoom.value = null;
    selectedPatient.value = null;
  }
};
</script>

<template>
  <div class="affectation-page">
    <h2>Gestion des Affectations</h2>
    
    <div class="affectation-form">
      <label>
        Chambre :
        <select v-model="selectedRoom">
          <option disabled value="">Sélectionner une chambre </option>
          <option v-for="room in rooms" :key="room.numero" :value="room.numero">
            {{ room.numero }} - {{ room.statut }}
          </option>
        </select>
      </label>

      <label>
        Patient :
        <select v-model="selectedPatient">
          <option disabled value="">-- Sélectionner un patient --</option>
          <option v-for="p in patients" :key="p.id" :value="p.firstName + ' ' + p.lastName">
            {{ p.firstName }} {{ p.lastName }}
          </option>
        </select>
      </label>

      <button class="btn" @click="affecter">Affecter</button>
    </div>

    <div class="rooms-list">
      <h3>Chambres actuelles</h3>
      <ul>
        <li v-for="room in rooms" :key="room.numero">
          Chambre {{ room.numero }} - Patient : {{ room.affectationPatient || "Aucun" }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.affectation-page {
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  font-family: "Segoe UI", sans-serif;
}

.affectation-form {
  display: flex;
  gap: 20px;
  align-items: flex-end;
  margin-bottom: 30px;
}

.affectation-form label {
  display: flex;
  flex-direction: column;
  font-weight: 500;
}

.affectation-form select {
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid #cbd5e1;
  font-size: 14px;
  min-width: 200px;
}

.affectation-form .btn {
  padding: 10px 18px;
  background-color: #0d9488;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.affectation-form .btn:hover {
  background-color: #0f766e;
}

.rooms-list ul {
  list-style: none;
  padding: 0;
}

.rooms-list li {
  padding: 6px 0;
  border-bottom: 1px solid #e2e8f0;
}
</style>
