<template>
  <div id="wrapper">
    <main>
      <div class="ui segment">
        <template v-if="app.api.token.length">
          <user></user>
          <project-search></project-search>

          <disk-status></disk-status>
        </template>

        <div v-else>
          <login></login>
        </div>
      </div>
      <footer>
        <span class="ui basic mini label">V:{{ app.version }}</span>

        <a
          style="float: right;"
          class="ui basic mini icon button"
          v-on:click="clearStorage"
          ><i class="sign out alternate icon"></i
        ></a>
      </footer>
    </main>
  </div>
</template>

<script>
// import taskItem from "./TaskItem";
import diskStatus from "./DiskStatus";
import Login from "./Login";
import User from "./User";
import ProjectSearch from "./ProjectSearch";
const { exec } = require("child_process");
const appVersion = require("../../package.json").version;

export default {
  name: "pmp",
  components: {
    // taskItem,
    diskStatus,
    Login,
    User,
    ProjectSearch
  },
  data: function() {
    return {
      app: {
        version: 0,
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
  mounted() {
    const vm = this;

    vm.app.version = appVersion;

    if (window.localStorage.getItem("apiToken")) {
      this.setApiKey(window.localStorage.getItem("apiToken"));
    }

    vm.loading = false;
  },
  methods: {
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
          vm.ClearUser();
        });
    },
    openProjectInBrowser: function(project_id) {
      exec(
        'open "https://premediapower.com/portal/projects/' + project_id + '"'
      );
    },
    openFinderPath: function(path) {
      exec('open "' + path + '"');
    },
    openFinderPathIfExists: function(path) {
      const vm = this;

      console.log(["openFinderPathIfExists", path]);

      var exists = exec('[ -d "' + path + '" ] && echo true');
      console.log(["openFinderPathIfExists exists:", exists]);

      exists.stdout.on("data", function(data) {
        if (data == true) {
          vm.openFinderPath(path);
        } else {
          // exec("mkdir " + path);
          vm.openFinderPath(path);
        }
      });
    }
  },
  watch: {
    "app.api.token"(newToken) {
      const vm = this;

      vm.getCurrentUser();
    }
  }
};
</script>
