<template>
  <form class="ui form" v-on:submit.prevent>
    <div class="ui negative icon message" v-if="!$_.isEmpty(error)">
      <i class="exclamation triangle icon"></i>
      <div class="content">
        <div class="header">
          Error
        </div>

        <p>{{ error }}</p>
      </div>
    </div>
    <div class="field" v-bind:class="!$_.isEmpty(error)">
      <input
        name="email"
        placeholder="E-mail"
        type="email"
        autocomplete="username"
        v-model="$parent.user.email"
      />
    </div>
    <div class="field" v-bind:class="!$_.isEmpty(error)">
      <input
        name="password"
        placeholder="Password"
        type="password"
        autocomplete="current-password"
        v-model="$parent.user.password"
      />
    </div>
    <button
      v-if="
        !$_.isEmpty($parent.user.password) && !$_.isEmpty($parent.user.email)
      "
      class="ui fluid large positive submit button"
      type="submit"
      v-on:click="authenticateApi"
    >
      Login
    </button>
  </form>
</template>

<script>
export default {
  name: "user-info",
  mounted() {
    const vm = this;

    // vm.error = "testtt";
  },
  data: function() {
    return {
      error: ""
    };
  },
  methods: {
    authenticateApi() {
      const vm = this;

      axios
        .post("/spa/airlock/token", {
          email: vm.$parent.user.email,
          password: vm.$parent.user.password,
          device_name: "electron-pmp-desktop-" + vm.$parent.app.version
        })
        .then(response => {
          vm.$parent.setApiKey(response.data);
        })
        .catch(function(error) {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            vm.error = error.response.data.message;
          }
        });
    }
  }
};
</script>
