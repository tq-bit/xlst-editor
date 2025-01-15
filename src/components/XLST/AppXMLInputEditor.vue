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
const xml = defineModel<string>("xml");
const handleChange = (value: string | undefined) => {
  xml.value = value || "";
};
</script>

<template>
  <div class="w-full">
    <Toolbar style="border-radius: 0">
      <template #start>
        <h2 class="text-lg font-semibold">Enter your XML</h2>
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
      :height="445"
      language="xml"
      :value="xml"
      @change="handleChange"
    ></MonacoEditor>
  </div>
</template>
