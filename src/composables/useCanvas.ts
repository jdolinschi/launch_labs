import { ref, onMounted, onUnmounted } from 'vue'
import type { Ref } from 'vue'
import interact from 'interactjs'
import { useCanvasStore } from '@/stores/canvasStore'

export function useCanvas(boxRef: Ref<HTMLElement | null>, boxId: string) {
    const store = useCanvasStore()
    const gridSize = 10 // Fine grid snapping (10px)

    const checkOverlap = (x: number, y: number, width: number, height: number, currentId: string) => {
        return store.boxes.every(b => {
            if (b.id === currentId) return true
            return !(x < b.x + b.width && x + width > b.x && y < b.y + b.height && y + height > b.y)
        })
    }

    const findNearestNonOverlapping = (x: number, y: number, width: number, height: number, currentId: string) => {
        let newX = x
        let newY = y
        let attempts = 0
        const maxAttempts = 50

        while (!checkOverlap(newX, newY, width, height, currentId) && attempts < maxAttempts) {
            newX += gridSize
            if (newX + width > window.innerWidth - 16) { // Adjust for sidebar width
                newX = x
                newY += gridSize
            }
            attempts++
        }
        return { x: newX, y: newY }
    }

    let interactable: interact.Interactable | null = null

    onMounted(() => {
        if (!boxRef.value) return

        interactable = interact(boxRef.value)
            .draggable({
                modifiers: [
                    interact.modifiers.snap({
                        targets: [interact.snappers.grid({ x: gridSize, y: gridSize })],
                        range: Infinity,
                        relativePoints: [{ x: 0, y: 0 }]
                    }),
                    interact.modifiers.restrict({
                        restriction: 'parent',
                        endOnly: true
                    })
                ],
                inertia: true,
                listeners: {
                    move(event) {
                        const target = event.target
                        let x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
                        let y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy
                        const box = store.boxes.find(b => b.id === boxId)

                        if (box) {
                            const { x: newX, y: newY } = checkOverlap(x, y, box.width, box.height, boxId)
                                ? { x, y }
                                : findNearestNonOverlapping(x, y, box.width, box.height, boxId)

                            target.style.transform = `translate(${newX}px, ${newY}px)`
                            target.setAttribute('data-x', newX)
                            target.setAttribute('data-y', newY)
                            store.updateBoxPosition(boxId, newX, newY)
                        }
                    }
                }
            })
            .resizable({
                edges: { left: true, right: true, bottom: true, top: true },
                modifiers: [
                    interact.modifiers.snapSize({
                        targets: [interact.snappers.grid({ width: gridSize, height: gridSize })]
                    }),
                    interact.modifiers.restrictSize({
                        min: { width: 100, height: 100 }
                    })
                ],
                listeners: {
                    move(event) {
                        const target = event.target
                        let x = parseFloat(target.getAttribute('data-x')) || 0
                        let y = parseFloat(target.getAttribute('data-y')) || 0

                        target.style.width = `${event.rect.width}px`
                        target.style.height = `${event.rect.height}px`

                        x += event.deltaRect.left
                        y += event.deltaRect.top

                        const { x: newX, y: newY } = checkOverlap(x, y, event.rect.width, event.rect.height, boxId)
                            ? { x, y }
                            : findNearestNonOverlapping(x, y, event.rect.width, event.rect.height, boxId)

                        target.style.transform = `translate(${newX}px, ${newY}px)`
                        target.setAttribute('data-x', newX)
                        target.setAttribute('data-y', newY)
                        store.updateBoxSize(boxId, event.rect.width, event.rect.height)
                        store.updateBoxPosition(boxId, newX, newY)
                    }
                }
            })
    })

    // Cleanup interact.js instance when the component is unmounted.
    onUnmounted(() => {
        if (interactable && boxRef.value) {
            interactable.unset()
        }
    })
}
