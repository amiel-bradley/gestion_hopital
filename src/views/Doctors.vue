<script setup>
import DoctorCard from '@/components/DoctorCard.vue';
import DoctorForm from '@/components/DoctorForm.vue';
import { doctors } from '@/services/data';
import { ref } from 'vue';

function addDoctors(doctor){
    doctors.value.push(doctor)
}

function removeDoctor(doctor){
    doctors.value = doctors.value.filter(d => d!== doctor)
}

const selectDoctor = ref(null)

function editDoctor(doctor){
    selectDoctor.value = {...doctor}
}

function saveEditDoctor(doctor){
    const index = doctors.value.findIndex(d => d.id === doctor.id)
    if(index !== -1){
        doctors.value.splice(index, 1, doctor)
    }
    selectDoctor.value = null 
}

</script>


<template>

<div class="divDoctor">
<div><DoctorForm @addDoctors="addDoctors" :doctor="selectDoctor" @editDoctor="saveEditDoctor" /></div>
<div><DoctorCard :doctors="doctors" @removeDoctor="removeDoctor" @editDoctor="editDoctor" /></div>
</div>



</template>


<style scoped>
*{
    box-sizing: border-box;
    margin:  0;
    padding: 0;
}
.divDoctor{
    background-image: url("src/assets/images/tenuem-medicale.jpg") ;
    height: 100%;
    display: flex;
    gap: 3rem;
    padding: 1rem;

}

</style>