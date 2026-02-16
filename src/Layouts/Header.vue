<script setup>
import { users } from '@/services/data';
import { auThis, currentId, logout } from '@/services/auth';
import { computed } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()
const currentUser = computed(() => {
  return users.value.find(u => u.id === currentId.value.id) || null;
})
function logoutt() {
    logout()
    router.push('/')
}
</script>

<template>
    <nav v-if="auThis">
        <ul>
            <li>{{ currentUser?.firstname || '' }}</li>
            <li>{{ currentUser?.username || '' }}</li>
            <li>{{ currentUser?.role || '' }}</li>
        </ul>
        <button @click="logoutt">Déconnexion</button>
    </nav>
    <nav v-else>
        <ul>
            <RouterLink to="/">Home</RouterLink>
            <RouterLink to="/login">Se Connecter</RouterLink>
        </ul>
    </nav>


</template>


<style scoped>
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

ul {
    display: flex;
    gap: 10px;
}

nav {
    display: flex;
    gap: 5px;
    background-color: black;
    color: white;
}

ul li {
    list-style: none;
}
</style>