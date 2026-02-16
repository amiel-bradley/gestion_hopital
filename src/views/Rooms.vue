<script setup>
import { rooms } from '@/services/data';

</script>


<template>
    <h2>Liste des chambres</h2>
    <div class="container">
        <!-- <p>Rooms</p> -->
        <div v-for="room in rooms" :key="room.numero" class="room-card">
            <p><strong>Chambre n° :</strong> {{ room.numero }}</p>
            <p><strong>Capacité :</strong> {{ room.capacite }}</p>
            <p><strong>Statut : </strong>
                <span :class="room.statut">{{ room.statut }}</span></p>
            <p><strong>Patients affectés :</strong> {{ room.affectationPatient }}</p>
            <hr>
        </div>
    </div>

</template>


<style scoped>
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}
.room-card {
  border: 1px solid #ddd;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 8px;
}
.available { color: green; }
</style>