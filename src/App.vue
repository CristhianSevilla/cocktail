<script setup>
import { RouterView } from "vue-router";
import Header from "./components/Header.vue";
import Modal from "./components/Modal.vue";
import Notificacion from "./components/Notificacion.vue";
import Spinner from "./components/Spinner.vue";
</script>

<template>
  <Header />

  <main class="container mx-auto mt-10 px-4 xl:px-16">
    <RouterView />
  </main>

  <Modal />
  <Notificacion />
  <Spinner />
</template>

<style scoped></style>
