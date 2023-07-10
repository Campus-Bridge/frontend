<template>
  <div class="not-found">
    <h1 class="title">404</h1>
    <p class="subtitle">Oops! The page you are looking for does not exist.</p>
    <button class="button" @click="$router.push('/')">Go back to home page</button>
  </div>
</template>

<style scoped lang="scss">
.not-found {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 144px);
}

.title {
  font-size: 6rem;
  margin-bottom: 1rem;
  color: $light-green-14;
}

.subtitle {
  font-size: 2rem;
  margin-bottom: 2rem;
}

.button {
  padding: 1rem 2rem;
  font-size: 1.5rem;
  background-color: $light-green-14;
  color: #fff;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.button:hover {
  background-color: $light-green-13;
}
</style>
