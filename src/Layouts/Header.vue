<script setup>
import { users } from '@/services/data';
const currentUser = users.value[0]
</script>


<template>

    <!-- <nav>
        <ul>
            <RouterLink to="/">Home</RouterLink>
            <RouterLink to="/login">Se Connecter</RouterLink>
        </ul>
    </nav> -->

    <nav>
        <ul>
            <li>{{ currentUser.firstname }}</li>
            <li>{{currentUser.role }}</li>
        </ul>
        <button>Déconnexion</button>
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