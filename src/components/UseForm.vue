<script setup>
import router from '@/router';
import { ref } from 'vue';
import { users } from '@/services/data';


const nom = ref("");
const prenon = ref("");
const age = ref("");
const email = ref("");
const number = ref("");
const showToast = ref("")

// Dans ton <script setup>
const rolesDisponibles = ref(["admin", "recept", "Doctor"]);

// On initialise le rôle avec une valeur par défaut si tu le souhaites
const role = ref("Utilisateur");

function addUsers(){
    users.value.push( {username: prenon.value, firstname: nom.value, role: role.value, telephone: number.value, email: email.value, age: age.value})

    nom.value = "";
    prenon.value = "";
    age.value = "";
    email.value = "";
    number.value = "";
    role.value = "";
    
        showToast.value = true;

        setTimeout(() => {
            showToast.value = false;
            userToDelete.value = null;
        }, 3000);
}


</script>

<template>
  <div class="page-wrapper">
    <Transition name="pop">
      <div v-if="showToast" class="smart-toast">
        <div class="icon-circle">✨</div>
        <p>Utilisateur ajouté !</p>
      </div>
    </Transition>

    <div class="glass-card">
      <div class="card-header">
        <div class="header-icon">👤</div>
        <h2>Nouveau Profil</h2>
      </div>

      <form @submit.prevent="addUsers" class="creative-form">
        <div class="input-grid">
          <div class="floating-group">
            <input v-model="nom" type="text" placeholder=" " required>
            <label>Nom de famille</label>
          </div>

          <div class="floating-group">
            <input v-model="prenon" type="text" placeholder=" " required>
            <label>Prénom</label>
          </div>
        </div>

        <div class="input-grid dual">
          <div class="floating-group">
            <input v-model="age" type="number" placeholder=" ">
            <label>Âge</label>
          </div>

          <div class="floating-group">
            <select v-model="role">
              <option v-for="r in rolesDisponibles" :key="r" :value="r">{{ r }}</option>
            </select>
            <label class="static-label">Rôle</label>
          </div>
        </div>

        <div class="floating-group">
          <input v-model="email" type="email" placeholder=" ">
          <label>Adresse Email</label>
        </div>

        <div class="floating-group">
          <input v-model="number" type="tel" placeholder=" ">
          <label>Téléphone</label>
        </div>

        <div class="button-row">
          <button type="submit" class="grad-btn">Enregistrer</button>
          <router-link to="/users" class="link-btn">Liste des membres →</router-link>
        </div>
      </form>
    </div>
  </div>
</template>


<style scoped>
/* Background avec un dégradé dynamique */
.page-wrapper {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  font-family: 'Poppins', sans-serif;
}

/* Carte effet "Neumorphism" léger */
.glass-card {
  background: rgba(255, 255, 255, 0.95);
  padding: 40px;
  border-radius: 30px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.2);
  width: 60%;
  max-width: 500px;
}

.card-header {
  text-align: center;
  margin-bottom: 30px;
}

.header-icon {
  font-size: 3rem;
  margin-bottom: 10px;
}

h2 {
  color: #2d3436;
  font-weight: 800;
  font-size: 1.8rem;
}

/* Groupe d'inputs avec labels flottants */
.floating-group {
  position: relative;
  margin-bottom: 25px;
}

.input-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

input, select {
  width: 100%;
  padding: 15px;
  border: 2px solid #eee;
  border-radius: 15px;
  outline: none;
  font-size: 1rem;
  transition: all 0.3s;
  background: #fdfdfd;
}

input:focus {
  border-color:rgb(145, 218, 202);
  background: white;
}

/* Animation Label Flottant */
label {
  position: absolute;
  left: 15px;
  top: 15px;
  color: #b2bec3;
  pointer-events: none;
  transition: all 0.3s;
}

input:focus ~ label,
input:not(:placeholder-shown) ~ label {
  top: -12px;
  left: 10px;
  font-size: 0.8rem;
  font-weight: bold;
  color: rgb(145, 218, 202);
  background: white;
  padding: 0 5px;
}

.static-label {
  top: -12px;
  left: 10px;
  font-size: 0.8rem;
  background: white;
  color: rgb(5, 168, 133);
  padding: 0 5px;
}

/* Bouton Gradient */
.grad-btn {
  width: 100%;
  padding: 15px;
  border: none;
  border-radius: 15px;
  background-color: rgb(145, 218, 202);
  color: white;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.grad-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(118, 75, 162, 0.3);
}

.link-btn {
  display: block;
  text-align: center;
  margin-top: 20px;
  text-decoration: none;
  color: #636e72;
  font-weight: 600;
  font-size: 0.9rem;
}

/* Toast Pop Animation */
.smart-toast {
  position: fixed;
  top: 30px;
  background: white;
  padding: 10px 25px;
  border-radius: 50px;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  z-index: 1000;
}

.icon-circle {
  background: #667eea;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pop-enter-active { animation: pop-in 0.5s; }
.pop-leave-active { animation: pop-in 0.5s reverse; }

@keyframes pop-in {
  0% { transform: translateY(-100px) scale(0.5); opacity: 0; }
  100% { transform: translateY(0) scale(1); opacity: 1; }
}
</style>