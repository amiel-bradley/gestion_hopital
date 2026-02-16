<script setup>


</script>


<template>

    <aside>
        <RouterLink to='/admindash'>Dashboard</RouterLink>
        <!-- <RouterLink>Dashboard</RouterLink> -->
        <!-- <RouterLink>Dashboard</RouterLink> -->
        <RouterLink to='/patients'>Patients</RouterLink>
        <RouterLink to='/doctors'>Médecins</RouterLink>
        <RouterLink to='/rdv'>Rendez-vous</RouterLink>
        <RouterLink to='/rooms'>Chambres</RouterLink>
    </aside>

</template>


<style scoped>
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}
a{
    text-decoration: none;
    color: black;
}

aside {
    display: flex;
    flex-direction: column;
    margin-left: 0;
    background-color: rgba(95, 152, 187, 0.927);
    max-width: 200px;
    gap: 10px;
    min-height: 100vh;
    padding: 10px;
}
</style>