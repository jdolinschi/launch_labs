import { ref } from 'vue'

export function usePanel() {
    const activePanel = ref<string | null>(null)
    let timeoutId: number | null = null

    const openPanel = (panelId: string) => {
        if (timeoutId) {
            clearTimeout(timeoutId)
        }
        activePanel.value = panelId
    }

    const keepOpen = () => {
        if (timeoutId) {
            clearTimeout(timeoutId)
        }
    }

    const closePanel = () => {
        timeoutId = setTimeout(() => {
            activePanel.value = null
        }, 200)
    }

    return {
        activePanel,
        openPanel,
        closePanel,
        keepOpen
    }
}