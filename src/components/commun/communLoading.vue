<template>
  <div class="w-full h-full flex items-center justify-center">
    <div id="loading"></div>
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
#loading {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 3px solid var(--vt-loading-border);
  border-radius: 50%;
  border-top-color: var(--vt-loading);
  animation: spin 1s ease-in-out infinite;
  -webkit-animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to {
    -webkit-transform: rotate(360deg);
  }
}

@-webkit-keyframes spin {
  to {
    -webkit-transform: rotate(360deg);
  }
}
</style>
