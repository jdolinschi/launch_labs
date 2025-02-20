import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface CanvasBox {
    id: string
    x: number
    y: number
    width: number
    height: number
    content: string // e.g., 'general', 'teams'
}

export const useCanvasStore = defineStore('canvas', () => {
    const boxes = ref<CanvasBox[]>([])

    const addBox = (content: string) => {
        const id = `${content}-${Date.now()}`
        boxes.value.push({ id, x: 100, y: 100, width: 200, height: 150, content })
    }

    const removeBox = (id: string) => {
        boxes.value = boxes.value.filter(box => box.id !== id)
    }

    const updateBoxPosition = (id: string, x: number, y: number) => {
        const box = boxes.value.find(b => b.id === id)
        if (box) {
            box.x = x
            box.y = y
        }
    }

    const updateBoxSize = (id: string, width: number, height: number) => {
        const box = boxes.value.find(b => b.id === id)
        if (box) {
            box.width = width
            box.height = height
        }
    }

    return { boxes, addBox, removeBox, updateBoxPosition, updateBoxSize }
})