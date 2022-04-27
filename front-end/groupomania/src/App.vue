 <template>
  <router-view />
</template>

<script>
export default {};
</script>

<style >
#app {
  font-family: "Roboto", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  justify-content: center;
}
@media (max-width: 768px) {
  #app{
    justify-content:start;
    width: 100%;
  }
}
</style>
