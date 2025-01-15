<script setup lang="ts">
import { useDarkTheme } from "./composables/useDarkTheme";
import Toolbar from "primevue/toolbar";
import Button from "primevue/button";
import Toast from "primevue/toast";
import XLSTEditor from "./components/XLST/XLSTEditor.vue";

const { isDarkTheme, toggleDarkTheme } = useDarkTheme();
</script>

<template>
  <Toast position="bottom-right"/>
  <div class="container-fluid mx-auto p-4">
    <Toolbar class="mb-8">
      <template #start>
        <img
          alt="tqbit logo"
          height="48px"
          width="48px"
          class="mr-4"
          src="./assets/logo.png"
        />
        <h1 class="text-2xl">XLST Live Editor</h1>
      </template>
      <template #end>
        <Button
          :icon="isDarkTheme ? 'pi pi-sun' : 'pi pi-moon'"
          class="mr-2"
          severity="secondary"
          @click="toggleDarkTheme"
        />
      </template>
    </Toolbar>
    <XLSTEditor />
  </div>
</template>
