<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { users } from '@/services/data'
import { login } from '@/services/auth'

const router = useRouter()
const err = ref()
const username = ref('')
const mdp = ref('')

function verify() {
  err.value = ''

  if (!username.value || !mdp.value) {
    err.value = 'Veuillez remplir tous les champs';
    return
  }
  const success = login(username.value, mdp.value)
  if (!success) {
    showError('Identifiants incorrects')
    return
  }
  const currUser = users.value.find(u => u.username.toLowerCase() === username.value.toLowerCase())
  localStorage
  if (!currUser) {
    showError('Utilisateur introuvable')
    return
  }

  const routes = {
    admin: '/admindash',
    doctor: '/doctordash',
    recept: '/receptdash'
  }
  router.push(routes[currUser.role] || '/');
}

function showError(message, duration = 3000) {
    err.value = message
    setTimeout(() => {
        err.value = ''
    }, duration)
}

</script>


<template>
    <div class="login-container">
        <form @submit.prevent="verify" class="login-card">
            <h2>Gestion Employés</h2>
            <p class="subtitle">Connectez-vous à votre espace</p>

            <div class="input-group">
                <label>Nom d'utilisateur</label>
                <input type="text" v-model="username" placeholder="Nom d'utilisateur">
            </div>

            <div class="input-group">
                <label>Mot de passe</label>
                <input type="password" v-model="mdp" placeholder="••••••••">
            </div>

            <div v-if="err" class="error-message">
                {{ err }}
            </div>

            <button type="submit">Se connecter</button>
        </form>
    </div>
</template>

<style scoped>
.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 70vh;
}

.login-card {
    background: #ffffff;
    padding: 2.5rem;
    border-radius: 16px;
    box-shadow: 0 10px 25px rgba(14, 165, 233, 0.15);
    border: 1px solid #e0f2fe;
    width: 100%;
    max-width: 400px;
    text-align: center;
}

h2 {
    color: #0c4a6e;
    margin-bottom: 0.5rem;
    font-size: 1.5rem;
}

.subtitle {
    color: #64748b;
    font-size: 0.9rem;
    margin-bottom: 2rem;
}

.input-group {
    text-align: left;
    margin-bottom: 1.5rem;
}

label {
    display: block;
    font-weight: 700;
    color: #0369a1;
    margin-bottom: 0.5rem;
    font-size: 0.85rem;
    text-transform: uppercase;
}

input {
    width: 100%;
    padding: 0.8rem 1rem;
    border: 2px solid #e2e8f0;
    border-radius: 8px;
    font-size: 1rem;
    transition: all 0.3s ease;
    box-sizing: border-box;
}

input:focus {
    outline: none;
    border-color: #0ea5e9;
    box-shadow: 0 0 0 4px rgba(14, 165, 233, 0.1);
}

.error-message {
    background-color: #fff1f2;
    color: #be123c;
    padding: 0.75rem;
    border-radius: 6px;
    border-left: 4px solid #be123c;
    margin-bottom: 1.5rem;
    font-size: 0.85rem;
    font-weight: 600;
    text-align: left;
}

button {
    width: 100%;
    padding: 0.8rem;
    background-color: #0ea5e9;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-top: 1rem;
}

button:hover {
    background-color: #0284c7;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(2, 132, 199, 0.3);
}

button:active {
    transform: translateY(0);
}
</style>