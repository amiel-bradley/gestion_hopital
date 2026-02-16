<script setup>
// import Header from '@/Layouts/Header.vue';
// import SideBar from '@/Layouts/SideBar.vue';
import Patients from './views/Patients.vue';

</script>


<template>
  <Patients/>
  <!-- <header>
    <Header></Header>
  </header>
  <div>
    <aside>
      <SideBar></SideBar>
    </aside>
    <main>
      <RouterView></RouterView>
    </main>
  </div> -->

</template>


<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

main {
  background-color: antiquewhite;
  min-width: 90%;
}

div {
  display: flex;
  margin-top: 20px;
  gap: 20px;
}
</style>