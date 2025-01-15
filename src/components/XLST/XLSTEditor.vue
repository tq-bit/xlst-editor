<script setup lang="ts">
// Vue core imports
import AppXSLTInputEditor from "./AppXLSTInputEditor.vue";
import AppXMLInputEditor from "./AppXMLInputEditor.vue";
import AppXMLOutputEditor from "./AppXMLOutputEditor.vue";

// PrimeVue components
import Splitter from "primevue/splitter";
import SplitterPanel from "primevue/splitterpanel";

import { useXLSTStore } from "../../composables/useXLSTStore";

const { recentXml, setRecentXml, recentXslt, setRecentXslt, resultXml } = useXLSTStore();
</script>

<template>
  <div class="container-fluid mx-auto">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="mb-4"></div>
    </div>

    <!-- Code editors -->
    <Splitter class="mb-8">
      <SplitterPanel>
        <AppXSLTInputEditor :xlst="recentXslt" @update:xlst="setRecentXslt" />
        <AppXMLInputEditor :xml="recentXml" @update:xml="setRecentXml" />
      </SplitterPanel>

      <SplitterPanel>
        <AppXMLOutputEditor :result="resultXml" />
      </SplitterPanel>
    </Splitter>
  </div>
</template>
