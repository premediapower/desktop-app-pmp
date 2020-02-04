<template>
  <div>
    <pre>{{ $parent.user }}</pre>
  </div>
</template>

<script>
export default {
  name: "user-info",
  mounted() {
    const vm = this;

    // if (localStorage.user_id) {
    //   vm.user_id = localStorage.user_id;

    //   axios
    //     .post("https://dev.premediapower.com/spa/airlock/token", {
    //       email: "robert.fridzema@zdsgn.com",
    //       password: "frizemavos",
    //       device_name: "electron-pmp-desktop"
    //     })
    //     .then(response => {
    //       console.log(response);
    //     });
    // }
  },
  methods: {
    clearUser: function() {
      this.user_id = 0;
      this.user = {};
    },
    departmentName: function(department_id) {
      var departmentName = null;

      if (department_id == 1) {
        departmentName = "Studio";
      }

      if (department_id == 2) {
        departmentName = "Account";
      }

      if (department_id == 2) {
        departmentName = "Creatie";
      }

      return departmentName;
    }
  }
};
</script>

<style>
@import url("https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css");
</style>
