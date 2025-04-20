<template>
    <TransitionRoot appear :show="open" as="template">
        <Dialog as="div" @close="closeModal" class="relative z-10">
            <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
                leave="duration-500 ease-in" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-black/25 blur-bg" />
            </TransitionChild>

            <div class="fixed inset-0 overflow-hidden">
                <div :class="[
                    useWidget.userLanguage === 'ar' ? 'justify-start' : ' justify-end',
                    'flex h-full text-center']">
                    <TransitionChild as="template" enter="duration-300 ease-out"
                        :enter-from="`${side === 'right' ? 'translate-x-80' : '-translate-x-80'}`"
                        enter-to="opacity-100 translate-x-0" leave="duration-300 ease-in"
                        leave-from="opacity-100 translate-x-0"
                        :leave-to="`${side === 'right' ? 'translate-x-80' : '-translate-x-80'}`">
                        <DialogPanel
                            class="w-full md:max-w-md transform overflow-hidden bg-[var(--color-bg-side)] p-6 text-left shadow-xl transition-all">
                            <DialogTitle as="h3" :class="px('text-lg font-medium leading-6', props.class)">
                                Payment successful
                            </DialogTitle>
                            <div class="mt-2">
                                <p class="text-sm">
                                    Your payment has been successfully submitted. We’ve sent you
                                    an email with all of the details of your order.
                                </p>
                            </div>

                            <div class="mt-4">
                                <button type="button"
                                    class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                    @click="closeModal">
                                    Got it, thanks!
                                </button>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<script setup>
import { ref } from 'vue'
import { px } from '@/lib/utils';
import {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogPanel,
    DialogTitle,
} from '@headlessui/vue'
import { useWidgetStore } from '@/stores/widget'

const useWidget = useWidgetStore()
const props = defineProps(['class', 'open', 'side'])
const emits = defineEmits(['closeSide'])

function closeModal() {
    emits('closeSide', false)
}
function openModal() {
    emits('closeSide', false)
}
</script>

<style>
.blur-bg {
    backdrop-filter: blur(1px);
    -webkit-backdrop-filter: blur(1px);
}
</style>