<template>
  <div>
    <div class="field">
      <div class="field">
        <input
          name="email"
          placeholder="E-mail"
          type="text"
          autocomplete="username"
          v-model="$parent.user.email"
        />
      </div>
      <div class="field">
        <input
          name="password"
          placeholder="Password"
          type="password"
          autocomplete="current-password"
          v-model="$parent.user.password"
        />
      </div>
      <button
        v-if="$parent.user.password.length > 0 && $parent.user.email.length > 0"
        class="ui fluid large positive submit button"
        type="submit"
        v-on:click="authenticateApi"
      >
        Login
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "user-info",
  mounted() {
    const vm = this;
  },
  methods: {
    authenticateApi() {
      const vm = this;

      axios
        .post("https://dev.premediapower.com/spa/airlock/token", {
          email: vm.$parent.user.email,
          password: vm.$parent.user.password,
          device_name: "electron-pmp-desktop"
        })
        .then(response => {
          console.log(response);
        });
    }
  }
};
</script>

<style>
@import url("https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css");
</style>
