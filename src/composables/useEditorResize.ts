import { ref, onBeforeUnmount, watch } from 'vue'

export function useEditorResize(containerRef: any) {
  const editorWidth = ref(800) // default width
  let resizeObserver: ResizeObserver | null = null

  const setupResizeObserver = (element: any) => {
    // Get the actual DOM element
    const domElement = element?.$el ?? element

    if (!domElement || !(domElement instanceof Element)) {
      console.log('No valid DOM element found', domElement)
      return
    }

    resizeObserver?.disconnect()
    resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width } = entry.contentRect
        editorWidth.value = Math.floor(width)
      }
    })

    resizeObserver.observe(domElement)
  }

  watch(() => containerRef?.value, (newElement) => {
    if (newElement) {
      setupResizeObserver(newElement)
    }
  }, { immediate: true })

  onBeforeUnmount(() => {
    if (resizeObserver) {
      resizeObserver.disconnect()
    }
  })

  return {
    editorWidth
  }
}
