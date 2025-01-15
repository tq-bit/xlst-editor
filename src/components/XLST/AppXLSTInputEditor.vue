<script setup lang="ts">
import MonacoEditor from "monaco-editor-vue3";
import { computed } from "vue";
import { useDarkTheme } from "../../composables/useDarkTheme";
import Toolbar from "primevue/toolbar";

// Theme handling
const { isDarkTheme } = useDarkTheme();
const theme = computed(() => (isDarkTheme.value ? "vs-dark" : "vs"));

// XSLT Configuration
const xlst = defineModel<string>("xlst");
const handleChange = (value: string | undefined) => {
  xlst.value = value || "";
};
</script>

<template>
  <div class="w-full">
    <Toolbar style="border-top-right-radius: 0; border-bottom-left-radius: 0; border-bottom-right-radius: 0">
      <template #start>
        <h2 class="text-lg font-semibold">Enter your XSLT</h2>
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
      :height="500"
      language="xml"
      :value="xlst"
      @change="handleChange"
    ></MonacoEditor>
  </div>
</template>
