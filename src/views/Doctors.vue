<script setup>
//////////////Les imports nécessaires//////////////////////////////
import DoctorCard from '@/components/DoctorCard.vue';
import DoctorForm from '@/components/DoctorForm.vue';
import { doctors } from '@/services/data';
import { ref } from 'vue';
/////////////////////////////////////////////////////////////////////



//////////Les constantes///////////////////////////////////
const selectDoctor = ref(null)
///////////////////////////////////////////////////////////



//////////////////Les méthodes utilisés///////////////////////////////

////***************Fonction ajout du CRUD*****************************
function addDoctors(doctor){
    doctors.value.push(doctor)
}


////***************Fonction suppression du CRUD*****************************
function removeDoctor(doctor){
    doctors.value = doctors.value.filter(d => d!== doctor)
}


////***************Fonction modification du CRUD*****************************
function editDoctor(doctor){
    selectDoctor.value = {...doctor}
}


////***************Fonction sayvegarde de la modification du CRUD*****************************
function saveEditDoctor(doctor){
    const index = doctors.value.findIndex(d => d.id === doctor.id)
    if(index !== -1){
        doctors.value.splice(index, 1, doctor)
    }
    selectDoctor.value = null 
}
//////////////////////////////////////////////////////////////////////////
</script>


<template>

<div class="divDoctor">
<div class="doctorForm"><DoctorForm @addDoctors="addDoctors" :doctor="selectDoctor" @editDoctor="saveEditDoctor" /></div>
<div><DoctorCard :doctors="doctors" @removeDoctor="removeDoctor" @editDoctor="editDoctor" /></div>
</div>



</template>


<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: "Segoe UI", Arial, sans-serif;
}

.divDoctor {
  min-height: 100vh;
  background-color: #f4f8fb; /* bleu très clair médical */
  display: flex;
  gap: 40px;
  padding: 40px 60px;
  align-items: flex-start;
}

/* Bloc formulaire */
.doctorForm {
  flex: 1;
  background: #ffffff;
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  border-top: 4px solid #1a73e8; /* accent bleu médical */
}

/* Bloc liste */
.divDoctor > div:last-child {
  flex: 2;
  background: #ffffff;
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  border-top: 4px solid #1a73e8;
}

/* Responsive simple */
@media (max-width: 900px) {
  .divDoctor {
    flex-direction: column;
    padding: 20px;
  }
}

</style>