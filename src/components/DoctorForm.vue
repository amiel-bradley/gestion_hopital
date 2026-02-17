<script setup>
////////Les imports/////////////////////////////////////////////
import { ref, watch } from 'vue';
///////////////////////////////////////////////////////////////


////////////////Les constantes//////////////////////////////////
const props = defineProps({
  doctor: Object // null pour ajout, object pour édition
})
const emit = defineEmits(['addDoctors', 'saveEditedDoctor'])

const name = ref('')
const speciality = ref('')
const phone = ref('')
const available = ref(true)
const changedbutton = ref(false)
const succesMAjout = ref(false)
const succesMModif = ref(false)
/////////////////////////////////////////////////////////////////////////////////////



////////////////////Les méthodes///////////////////////////////////////////////////////////
// remplissage avant que doctor change
watch(() => props.doctor, (newDoctor) => {
  if(newDoctor){
    name.value = newDoctor.name
    speciality.value = newDoctor.speciality
    phone.value = newDoctor.phone
    available.value = newDoctor.available
    changedbutton.value = true;
} else {
    name.value = ''
    speciality.value = ''
    phone.value = ''
    available.value = ""
}
}, { immediate: true })


/////////// Fonction qui ajoute ou modifie un docteur********************************
function submitForm(){
//////////////*********Modification*************************** */
  if(props.doctor){
    emit('editDoctor', {
      ...props.doctor,
      name: name.value,
      speciality: speciality.value,
      phone: phone.value,
      available: available.value
    })
    changedbutton.value = false
    succesMModif.value = true

     setTimeout(() => {
      succesMModif.value = false
    }, 3000)
//////////////******************************************************************** */

///////////////************Ajout****************************************** */
  } else {
    emit('addDoctors', {
      id: Date.now(),
      name: name.value,
      speciality: speciality.value,
      phone: phone.value,
      available: available.value
    })
    name.value = ''
    speciality.value = ''
    phone.value = ''
    available.value = true
    succesMAjout.value = true

     setTimeout(() => {
      succesMAjout.value = false
    }, 3000)
  }
////////////*********************************************************** */
}

</script>



<template>
    <div class="succesMAjout" v-if="succesMAjout">
        <p>Docteur ajouté avec succes ✔</p>
    </div>

    <div class="succesMModif" v-if="succesMModif">
        <p>Docteur modifié avec succes ✔</p>
    </div>
  <div class="doctor-form">
    <h2>Ajouter un Docteur</h2>

    <form @submit.prevent="submitForm">
      
      <div>
        <div><label>Name</label></div>
        <input v-model="name" type="text" required placeholder="ajouter un nom" />
      </div>

      <div>
        <div><label>Speciality</label></div>
        <input v-model="speciality" type="text" required placeholder="ajouter la spécialité"  />
      </div>

      <div>
        <div><label>Phone</label></div>
        <input v-model="phone" type="number" required />
      </div>

      <div class="checkboxx">
         <label for="">
             <input v-model="available" type="checkbox" /> 
          Available
         </label>
      </div>

      <button type="submit">{{ changedbutton === true ? 'Modifier' : 'Ajouter' }}</button>
    </form>
  </div>
</template>


<style scoped>
/* Style commun aux deux messages */
.succesMAjout,
.succesMModif {
  position: fixed;
  top: 30px;
  right: 30px;
  min-width: 280px;
  padding: 15px 20px;
  border-radius: 12px;
  color: white;
  font-weight: 500;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  animation: slideIn 0.4s ease, fadeOut 0.4s ease 2.6s;
  backdrop-filter: blur(6px);
  z-index: 1000;
}

/* Ajout = bleu */
.succesMAjout {
  background: linear-gradient(135deg, #1a73e8, #4dabf7);
}

/* Modification = rose */
.succesMModif {
  background: linear-gradient(135deg, #ff6b9d, #ff8fab);
}

/* Texte */
.succesMAjout p,
.succesMModif p {
  margin: 0;
  font-size: 14px;
  letter-spacing: 0.5px;
}

/* Animation d’entrée */
@keyframes slideIn {
  from {
    transform: translateX(100px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

/* Animation de disparition */
@keyframes fadeOut {
  to {
    opacity: 0;
    transform: translateX(100px);
  }
}

.doctor-form {
  max-width: 300px;
  margin: 10px auto;
  padding: 25px;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  font-family: Arial, sans-serif;
}

.doctor-form h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #2c3e50;
}

form div {
  display: flex;
  flex-direction: column;
  margin-bottom: 5px;
}

label {
  font-size: 14px;
  color: #1d81f3;
}

input[type="text"] {
  padding: 8px 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
}

input[type="text"]:focus {
  border-color: #3498db;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  transition: 0.3s ease;
}

button:hover {
  background-color: #2980b9;
}
</style>
