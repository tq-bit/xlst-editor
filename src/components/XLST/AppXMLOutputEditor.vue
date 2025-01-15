<script setup lang="ts">
import { computed } from "vue";
import { useDarkTheme } from "../../composables/useDarkTheme";

// App components
import MonacoEditor from "monaco-editor-vue3";
import Toolbar from "primevue/toolbar";


// Theme handling
const { isDarkTheme } = useDarkTheme();
const theme = computed(() => (isDarkTheme.value ? "vs-dark" : "vs"));

// XSLT Configuration
const result = defineModel<string>("result");
</script>

<template>
  <div class="w-full">
    <Toolbar style="border-top-left-radius: 0; border-bottom-left-radius: 0; border-bottom-right-radius: 0">
      <template #start>
        <h2 class="text-lg font-semibold">Result:</h2>
      </template>
    </Toolbar>
    <MonacoEditor
      :theme="theme"
      :options="{
        colorDecorators: true,
        lineHeight: 24,
        tabSize: 2,
        formatOnPaste: true,
        formatOnType: true,
        automaticLayout: true,
      }"
      class="w-full"
      :height="1000"
      language="xml"
      :value="result"
    ></MonacoEditor>
  </div>
</template>
