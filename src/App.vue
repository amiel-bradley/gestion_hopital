<script setup>
import Header from '@/Layouts/Header.vue';
import SideBar from '@/Layouts/SideBar.vue';
import { auThis } from './services/auth';

</script>


<template>
  <header>
    <Header></Header>
  </header>
  <div>
    <aside v-if="auThis">
      <SideBar></SideBar>
    </aside>
    <main>
      <RouterView></RouterView>
    </main>
  </div>

</template>


<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

main {
  min-width: 90%;
}

div {
  display: flex;
  margin-top: 20px;
  gap: 20px;
}
</style>