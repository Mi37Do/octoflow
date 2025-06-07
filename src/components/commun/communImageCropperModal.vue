<template>
  <TransitionRoot appear :show="useWidget.imageCropper" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-10">
      <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
        leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-black/15   blur-bg" />
      </TransitionChild>

      <div class="fixed inset-0">
        <div
          class="flex h-full md:h-fit md:min-h-full items-end sm:items-center justify-center p-4 text-center overflow-hidden">
          <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95">
            <DialogPanel
              class="w-full max-w-md md:max-w-screen-lg h-[80vh] sm:w-full  transform overflow-hidden rounded-2xl bg-[var(--color-bg-side)] p-[1.125rem] text-left align-middle shadow-xl transition-all flex flex-col ">
              <div class="w-full flex items-center justify-between">
                <DialogTitle as="h3" class="pixa-title truncate">
                  {{ t('translation.imageCropper') }}
                </DialogTitle>

                <button @click="closeModal" class="btn btn-square btn-nofloat">
                  <X />
                </button>
              </div>

              <div v-if="loading" class="mt-6 flex flex-col grow items-center justify-center">
                <commun-loading />
              </div>

              <div v-else class="w-full grow mt-6 overflow-hidden">

                <div v-if="image" class="w-full h-full relative flex flex-col gap-3">
                  <div class="w-full h-full relative flex flex-col gap-3">

                    <button @click="image = null" class="btn btn-square absolute right-3 top-3 btn-primary-red z-10">
                      <Trash color="white" />
                    </button>

                    <div class="absolute rounded-lg overflow-hidden inset-0">
                      <cropper class="w-full h-full" :src="image" :stencil-props="{ aspectRatio: 1 }" :autoZoom="true"
                        :resizeImage="true" :imageRestriction="'stencil'" @change="getCroppedImage" ref="cropperRef" />
                    </div>

                  </div>



                  <button @click="() => {
                    emits('selectedPic', croppedImage)
                    closeModal()
                  }" class="btn-primary btn justify-center">{{ t('translation.select') }}</button>
                </div>



                <div v-else
                  class="w-full h-full relative flex items-center justify-center border rounded-lg border-dashed">
                  <input type="file" class="w-full h-full absolute inset-0 opacity-0" accept="image/*"
                    @change="onFileChange">

                  <div class="flex flex-col items-center gap-6">

                    <Image size="60" />
                    <span class="uppercase">{{ t('translation.selectImage') }}</span>
                  </div>

                </div>
              </div>

            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'
import { useWidgetStore } from '@/stores/widget'
import communLoading from '@/components/commun/communLoading.vue'
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'
import { Cropper } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';
import { Image, X, Trash } from 'lucide-vue-next'

const useWidget = useWidgetStore()
const { t } = useI18n()
const loading = ref(false)
const loadingAdd = ref(false)
const emits = defineEmits(['selectedPic'])

function closeModal() {
  //loading.value = true
  useWidget.imageCropper = false
  loadingAdd.value = false
}

const image = ref(null);
const cropperRef = ref(null);
const croppedImage = ref(null);

function onFileChange(event) {
  const file = event.target.files[0];
  if (file && file.type.startsWith('image/')) {
    const reader = new FileReader();
    reader.onload = () => {
      image.value = reader.result;
    };
    reader.readAsDataURL(file);
  }
}

function onCropChange({ coordinates, canvas }) {
  // Optional: live crop preview
}

function getCroppedImage() {
  const result = cropperRef.value.getResult();
  if (result && result.canvas) {
    croppedImage.value = result.canvas.toDataURL();
  }
}

</script>
<style scoped></style>
