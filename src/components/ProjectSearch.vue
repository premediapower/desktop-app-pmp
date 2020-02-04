<template>
  <form class="ui form" v-on:submit.prevent>
    <pre>{{ project }}</pre>
    <div class="field" v-bind:class="statusClass">
      <input
        type="text"
        v-model="project_code_query"
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
        <label>Open in <a href="https://premediapower.com" target="_blank">Premediapower</a></label>
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
  methods: {
    getProject: function(projectCodeQuery) {
      const vm = this;

      axios
        .get("/spa/desktop/project/" + projectCodeQuery)
        .then(function(response) {
          vm.statusClass = "success";

          vm.project = response.data;

          if (vm.open_in_finder) {
            vm.$parent.openFinderPathIfExists(response.data.js_afp_url);
          }

          if (vm.open_in_premediapower) {
            vm.$parent.openProjectInBrowser(response.data.id);
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

      if (projectCodeQuery.length > 6) {
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

<style>
@import url("https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css");
</style>
