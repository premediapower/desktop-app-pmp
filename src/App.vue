  
<style src="../semantic/dist/semantic.min.css"></style>



<template>
  <div id="app" style="user-select: none;  -webkit-app-region: drag;">
    <center
      style="position: fixed; width: 100%; height: 140px;z-index: 9999; background-color: #fff; border-bottom: 1px solid #ccc;"
    >
      <img src="../public/logo.png" 
        width="400"
        height="134"
        alt="Premediapower"
        style="display: flex; align-items: center; justify-content: center;">
    </center>

    <div style="padding: 10px; position:relative; top: 150px;">
      <index />
    </div>
  </div>
</template>

<script>
import Index from "./components/Index.vue";

export default {
  name: "app",
  components: {
    Index
  }
};
</script>
