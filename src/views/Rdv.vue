<script setup>
import { ref } from 'vue';

//ETAT DES RDV : CONFIRMES, EN ATTENTE, ANNULES
const errorMessage = ref('');

//FORMULAIRE DE PRISE DE RDV
const form = ref({
    patientId: '',
    doctorId: '',
    dateTime: '',
    status: 'confirmed'
});

//CHARGER LES RDV, PATIENTS ET DOCTEURS DEPUIS LE LOCALSTORAGE
const rdv = ref(JSON.parse(localStorage.getItem('rdv')) || []);
console.log(rdv.value);

const patients = ref(JSON.parse(localStorage.getItem('patients')) || []);
const doctors = ref(JSON.parse(localStorage.getItem('doctors')) || []);

console.log(patients.value);
console.log(doctors.value);

const handleSubmit = () => {

    //EFFACER LES MESSAGES D'ERREUR PRECEDENTS
    errorMessage.value = '';

    //VERIFIER SI LE RDV EXISTE DEJA POUR LE MEME PATIENT
    const patientExists = rdv.value.find(r => r.patientId === form.value.patientId);

    //VERIFIER SI LE DOCTEUR EST DISPONIBLE
    const doctorBusy = rdv.value.find(r => r.doctorId === form.value.doctorId && r.dateTime === form.value.dateTime);

    //SI LE PATIENT A DEJA UN RDV A CETTE DATE ET HEURE
    if (patientExists) {
        setInterval(() => {
            errorMessage.value = 'le patient a déjà un rendez-vous prévu à cette date et heure.';
        }, 2000);
        return;
    }

    //SI LE DOCTEUR N'EST PAS DISPONIBLE A CETTE DATE ET HEURE
    if (doctorBusy) {
        errorMessage.value = "Le docteur n'est pas disponible à cette date et heure.";
        return;
    }

    //AJOUTER LE NOUVEAU RDV
    const newRdv = {
        id: Date.now(),
        patientId: form.value.patientId,
        doctorId: form.value.doctorId,
        dateTime: form.value.dateTime,
        status: form.value.status
    };

    //SAUVEGARDER LE RDV DANS LE LOCALSTORAGE
    rdv.value.push(newRdv);
    localStorage.setItem('rdv', JSON.stringify(rdv.value));

    //REINITIALISER LE FORMULAIRE
    form.value = {
        patientId: '',
        doctorId: '',
        dateTime: '',
        status: 'confirmed'
    };
}

function deleteRdv(id) {
    // L'utilisateur a confirmé la suppression
    if (confirm("Voulez-vous vraiment supprimer ce rendez-vous ?")) {
        // Supprimer le rendez-vous de la liste
        rdv.value = rdv.value.filter(r => r.id !== id);
        localStorage.setItem('rdv', JSON.stringify(rdv.value));
    }
    
}
// FONCTION POUR EDITER UN RDV
function editRdv(id) {
    const rdvToEdit = rdv.value.find(r => r.id === id);
    if (rdvToEdit) {
        form.value = { ...rdvToEdit };
        deleteRdv(id);
    }
    
}

</script>


<template>
    <h2>Prendre un rendez-vous</h2>
    <div class="appointment-container">
        <form @submit.prevent="handleSubmit">
            <div class="form-group">
                <label for="patient">Patient :</label>
                <select v-model="form.patientId" required>
                    <option>Choisir un patient</option>
                    <option v-for="patient in patients" :key="patient.id" :value="patient.id">
                        {{ patient.lastName }}
                    </option>
                </select>
            </div>

            <div class="form-group">
                <label for="doctor">Docteur :</label>
                <select v-model="form.doctorId" required>
                    <option>Choisir un docteur</option>
                    <option v-for="doctor in doctors" :key="doctor.id" :value="doctor.id">
                        {{ doctor.name }}
                    </option>
                </select>
            </div>

            <div class="form-group">
                <label for="type">Type de rendez-vous :</label>
                <select v-model="form.status" required>
                    <option value="confirmed">Confirmé</option>
                    <option value="pending">En attente</option>
                    <option value="cancelled">Annulé</option>
                </select>
            </div>


            <div class="form-group">
                <label for="dateTime">Date et heure :</label>
                <input type="datetime-local" v-model="form.dateTime" required>
            </div>
            <button type="submit">Valider le rendez-vous</button>

            <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

            <br>
            <hr>
            <br>
            <h3>Rendez-vous existants</h3>
            <ul>
                <li v-for="r in rdv" :key="r.id">
                    {{ r.dateTime }} - Patient ID: {{ r.patientId }} - Docteur ID: {{ r.doctorId }} - Statut: {{
                        r.status }} - <button @click="deleteRdv(r.id)">Supprimer</button> <button @click="editRdv(r.id)">Editer</button>
                </li>
            </ul>
        </form>

    </div>



</template>


<style scoped>
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

.appointment-container {
    max-width: 600px;
    margin: 20px auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #f9f9f9;
}

.form-group {
    margin-bottom: 15px;
}

label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
}

input,
select {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

button {
    padding: 10px 20px;
    background-color: #007BFF;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}

.error {
    margin-top: 10px;
    color: #d9534f;
    background-color: #f9f2f2;
    padding: 10px;
    border-radius: 4px;
    transition: all 0.3s ease;
}
</style>