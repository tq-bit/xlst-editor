<script setup lang="ts">
import { ref } from "vue";
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import { useDarkTheme } from "../../composables/useDarkTheme";
import { cheatsheetContent } from "../../data/cheatsheetContent";
import { useToast } from 'primevue/usetoast';

// State
const visible = ref(false);
const { isDarkTheme } = useDarkTheme();
const toast = useToast();

// Methods
const onClickCode = (code: string) => {
  visible.value = false;
  window.navigator.clipboard.writeText(code);
  toast.add({
    severity: "success",
    summary: "Copied to clipboard",
    detail: code,
    life: 3000,
  })
};
</script>

<template>
  <Button
    class="mr-2"
    icon="pi pi-question"
    text
    severity="secondary"
    @click="visible = true"
  />
  <Dialog v-model:visible="visible" modal header="Cheatsheet">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div
        v-for="(column, columnIndex) in cheatsheetContent"
        :key="columnIndex"
      >
        <div v-for="(item, itemIndex) in column" :key="itemIndex" class="mb-4">
          <div class="flex justify-between">
            <h3 class="text-md font-semibold mb-2">{{ item.title }}</h3>
            <Button
              @click="() => onClickCode(item.code)"
              icon="pi pi-file-export"
              severity="secondary"
              text
              class="p-0"
              style="width: 1.5rem; height: 1.5rem"
            />
          </div>
          <pre
            class="p-4 text-xs rounded"
            :class="isDarkTheme ? 'bg-gray-800' : 'bg-gray-100'"
            >{{ item.code }}</pre
          >
        </div>
      </div>
    </div>
  </Dialog>
</template>
