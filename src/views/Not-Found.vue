<script setup>
// Simple retour arrière ou accueil
</script>

<template>
  <div class="not-found">
    <div class="content">
      <span class="emoji">🏥</span>
      <h1>404</h1>
      <p>Oups ! Cette page n'existe pas ou a été déplacée.</p>
      
      <div class="btns">
        <RouterLink to="/" class="btn-main">Accueil</RouterLink>
        <button @click="$router.back()" class="btn-link">Retour</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.not-found {
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-family: sans-serif;
}

.emoji {
  font-size: 4rem;
}

h1 {
  font-size: 5rem;
  margin: 10px 0;
  color: #0d9488; /* Ton vert émeraude */
}

p {
  color: #64748b;
  margin-bottom: 30px;
}

.btns {
  display: flex;
  gap: 15px;
  justify-content: center;
}

.btn-main {
  background: #0d9488;
  color: white;
  padding: 10px 25px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: bold;
}

.btn-link {
  background: none;
  border: 1px solid #cbd5e1;
  padding: 10px 25px;
  border-radius: 8px;
  cursor: pointer;
  color: #64748b;
}

.btn-link:hover {
  background: #f1f5f9;
}
</style>