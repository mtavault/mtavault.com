<template>
  <div class="loader">
    <div></div>
    <div></div>
    <div></div>
  </div>
</template>
<style scoped>
.loader {
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  width: 50px;
  height: 40px;
}
.loader div {
  width: 8px;
  height: 10px;
  background-color: var(--ui-primary);
  border-radius: 3px;
  animation: bar-bounce 1.2s infinite ease-in-out;
}
.loader div:nth-child(2) {
  animation-delay: -1s;
}
.loader div:nth-child(3) {
  animation-delay: -0.8s;
}
@keyframes bar-bounce {
  0%,
  40%,
  100% {
    transform: scaleY(0.4);
  }
  20% {
    transform: scaleY(1);
  }
}
</style>
