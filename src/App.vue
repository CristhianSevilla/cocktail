<script setup>
import { RouterView } from "vue-router";
import Header from "./components/Header.vue";
import Modal from "./components/Modal.vue";
</script>

<template>
  <Header />

  <main class="container mx-auto mt-10 px-4 xl:px-16">
    <RouterView />
  </main>

  <Modal />
</template>

<style scoped></style>
