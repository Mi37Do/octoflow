<template>
  <div>
    <!-- Button to open the dialog -->
    <button @click="openModal" class="bg-blue-500 text-white px-4 py-2 rounded">
      Open Dialog
    </button>

    <!-- Dialog/Modal -->
    <TransitionRoot appear :show="isOpen" as="template">
      <Dialog as="div" @close="closeModal" class="relative z-10">
        <!-- Overlay -->
        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
          leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
          <div class="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>

        <!-- Modal/Drawer Content -->
        <div class="fixed inset-0 overflow-y-auto">
          <div class="flex min-h-full items-center justify-center p-4 text-center sm:items-end sm:justify-center"
            :class="{ 'sm:items-center': !isMobile }">
            <TransitionChild as="template" enter="ease-out duration-300"
              enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
              leave-from="opacity-100 translate-y-0 sm:scale-100"
              leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
              <DialogPanel
                class="w-full max-w-md transform overflow-hidden rounded-t-lg bg-white p-6 text-left align-middle shadow-xl transition-all sm:rounded-lg sm:max-w-lg"
                :class="{ 'rounded-t-lg': isMobile, 'rounded-lg': !isMobile }">
                <!-- Handle for the drawer (visible only on mobile) -->
                <div v-if="isMobile && handle" class="flex justify-center mb-4">
                  <div class="w-12 h-1.5 bg-gray-300 rounded-full"></div>
                </div>

                <!-- Dialog Content -->
                <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">
                  Modal Title
                </DialogTitle>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">
                    This is a responsive modal that turns into a drawer on mobile devices.
                  </p>
                </div>

                <!-- Close Button -->
                <div class="mt-4">
                  <button type="button"
                    class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    @click="closeModal">
                    Close
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue';

const isOpen = ref(false);
const isMobile = ref(false);
const handle = ref(true); // Control whether the drawer has a handle

const openModal = () => {
  isOpen.value = true;
};

const closeModal = () => {
  isOpen.value = false;
};

const checkIfMobile = () => {
  isMobile.value = window.innerWidth <= 640; // Adjust breakpoint as needed
};

onMounted(() => {
  checkIfMobile();
  window.addEventListener('resize', checkIfMobile);
});

onUnmounted(() => {
  window.removeEventListener('resize', checkIfMobile);
});
</script>

<style scoped>
/* Add any custom styles here */
</style>