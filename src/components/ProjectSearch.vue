<template>
  <form class="ui segment form" v-on:submit.prevent>
    <!-- <pre v-if="$parent.app.debug">{{ project.files }}</pre> -->
    <div class="field" v-bind:class="statusClass">
      <input
        type="text"
        v-model="project_code_query"
        ref="project_search"
        placeholder="Type project code"
      />
    </div>

    <div class="field">
      <div class="ui toggle checkbox" ref="open_in_finder_toggle">
        <input type="checkbox" name="open_in_finder" v-model="open_in_finder" />
        <label>Open in Finder</label>
      </div>
    </div>

    <div class="field">
      <div class="ui toggle checkbox" ref="open_in_premediapower_toggle">
        <input
          type="checkbox"
          name="open_in_premediapower"
          v-model="open_in_premediapower"
        />
        <label
          >Open in
          <a v-on:click="$parent.openExternalUrl('https://premediapower.com')"
            >Premediapower</a
          ></label
        >
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: "project-search",
  data: function() {
    return {
      statusClass: "",
      project_code_query: "",
      open_in_finder: true,
      open_in_premediapower: false,
      project: {}
    };
  },
  mounted() {
    const vm = this;
    console.log(["component mounted", this.$options.name, this.$data]);

    window.addEventListener(
      "keyup",
      function(event) {
        if (event.which == 32) {
          vm.focusProjectInput();
        }
      },
      true
    );
  },
  methods: {
    focusProjectInput() {
      const vm = this;

      vm.project_code_query = "";
      setTimeout(() => {
        vm.$refs.project_search.focus();
      }, 100);
    },
    getProject: function(projectCodeQuery) {
      const vm = this;

      axios
        .get("/spa/desktop/project/" + projectCodeQuery)
        .then(function(response) {
          vm.statusClass = "success";

          vm.project = response.data;

          if (vm.open_in_finder) {
            vm.$parent.openFinderPath(response.data.js_afp_url);
          }

          if (vm.open_in_premediapower) {
            vm.$parent.openExternalUrl(
              "https://premediapower.com/portal/projects/" + response.data.id
            );
          }
        })
        .catch(function(error) {
          vm.statusClass = "error";
        });
    }
  },
  watch: {
    project_code_query(projectCodeQuery) {
      const vm = this;

      if (projectCodeQuery.length > 6 && projectCodeQuery.length < 10) {
        vm.getProject(projectCodeQuery);
      } else {
        vm.project = {};
      }
    },
    statusClass(newClass) {
      const vm = this;

      if (newClass == "error") {
        setTimeout(() => {
          vm.statusClass = "";
        }, 1000);
      }
    }
  }
};
</script>
