<style src="../semantic/dist/semantic.min.css"></style>

<style lang="scss">
#app {
  user-select: none;
  -webkit-app-region: drag;

  main {
    padding: 10px;
    position: relative;
    top: 150px;
  }

  header {
    position: fixed;
    width: 100%;
    height: 140px;
    z-index: 9999;
    background-color: #fff;
    border-bottom: 1px solid #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>

<template>
  <div id="app">
    <header>
      <img
        src="../public/logo.png"
        width="400"
        height="134"
        alt="Premediapower"
      />
    </header>
    <main>
      <div class="ui segment">
        <template v-if="apiAuthenticated">
          <pre v-if="app.debug" v-html="{ app: app, user: user }"></pre>
          <user></user>
          <project-search></project-search>
          <disk-status></disk-status>
        </template>

        <template v-else>
          <login></login>
        </template>
      </div>
      <footer>
        <span
          class="ui basic mini label"
          v-on:click="app.show_releases = !app.show_releases"
          v-bind:class="{ green: app.show_releases }"
          >V:{{ app.version }}</span
        >

        <a
          v-if="apiAuthenticated"
          style="float: right;"
          class="ui basic mini icon button"
          v-on:click="clearStorage"
          ><i class="sign out alternate icon"></i
        ></a>

        <releases v-if="app.show_releases"></releases>
      </footer>
    </main>
  </div>
</template>

<script>
const appVersion = require("../package.json").version;
const { shell } = require("electron");
import Echo from "laravel-echo";
window.Pusher = require("pusher-js");

import Releases from "./components/Releases";
import Login from "./components/Login";
import diskStatus from "./components/DiskStatus";
import User from "./components/User";
import ProjectSearch from "./components/ProjectSearch";

export default {
  name: "pmp-desktop-app",
  components: {
    Releases,
    Login,
    diskStatus,
    User,
    ProjectSearch
  },
  data: function() {
    return {
      app: {
        localStorage: window.localStorage,
        debug: process.env.NODE_ENV !== "production",
        version: 0,
        sound: true,
        show_releases: false,
        api: {
          token: ""
        }
      },
      user: {
        id: null,
        email: "",
        password: ""
      }
    };
  },
  computed: {
    apiAuthenticated: function() {
      return this.app.api.token.length;
    }
  },
  mounted() {
    const vm = this;

    console.log(["App mounted", this.$options.name, this.$data]);

    vm.app.version = appVersion;

    if (window.localStorage.getItem("apiToken")) {
      this.setApiKey(window.localStorage.getItem("apiToken"));
    }

    // this.openFinderPath("/Volumes/ZDSGN01");

    vm.loading = false;
  },
  methods: {
    openExternalUrl(url) {
      shell.openExternal(url);
    },
    openFinderPath: function(path) {
      if (this.app.sound) {
        shell.beep();
      }
      // showItemInFolder select item but does not navigate into folder
      shell.openItem(path);
    },
    setApiKey: function(apiKey) {
      const vm = this;

      window.localStorage.setItem("apiToken", apiKey);

      vm.app.api.token = apiKey;
    },
    clearStorage() {
      const vm = this;

      window.localStorage.clear();
      vm.app.api.token = "";
      location.reload();
    },
    getCurrentUser: function() {
      const vm = this;

      axios
        .get("/spa/desktop/user")
        .then(function(response) {
          vm.user = response.data;
        })
        .catch(function(error) {
          vm.clearStorage();
        });
    }
  },
  watch: {
    "app.api.token"(newToken) {
      const vm = this;

      vm.getCurrentUser();
    },
    user(newUser) {
      const vm = this;

      if (newUser.id != null) {
        window.Echo = new Echo({
          broadcaster: "pusher",
          key: "8ef96f5fc90e28e9fe3b",
          cluster: "eu",
          encrypted: true,
          disableStats: true
        });

        window.Echo.channel("pmp_user_" + newUser.id)
          .listen(".projects.open_project_folder", project_folder_path => {
            console.log("listening project folders");
            vm.openFinderPath(project_folder_path);
          })
          .listen(".projects.open_deliverable_folder", deliverable_path => {
            console.log("listening deliverable folders");
            vm.openFinderPath(deliverable_path);
          });
      }
    }
  }
};
</script>
