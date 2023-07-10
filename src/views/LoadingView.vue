<template>
  <div class="loading-view">
    <q-spinner-gears size="80px" color="light-green-14" />
    <p>Loading</p>
  </div>
</template>

<style scoped lang="scss">
.loading-view {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: calc(100% - 140px);

  p {
    font-size: 2rem;
    margin-top: 1rem;
  }
}
</style>
