<template>
  <div class="ui clearing segment">
    <template v-for="release in releases">
      <article
        v-bind:key="release.id"
        class="ui segment"
        v-bind:class="activeReleaseClasses(release)"
        :ref="'release_' + release.tag_name"
      >
        <h3 class="ui dividing header">
          {{ release.tag_name }}
        </h3>
        <p v-html="release.body"></p>
        <small>{{ release.published_at }}</small>
      </article>
    </template>
  </div>
</template>

<script>
export default {
  name: "user-info",
  data: function() {
    return {
      githubApi: null,
      releases: []
    };
  },
  mounted() {
    const vm = this;
    console.log(["component mounted", this.$options.name, this.$data]);

    vm.githubApi = axios.create({
      baseURL: "https://api.github.com/",
      timeout: 1000,
      withCredentials: false
    });

    this.getReleases();

    //
  },
  methods: {
    activeReleaseClasses(release) {
      console.log(this.$parent.app.version);
      return release.tag_name == "v" + this.$parent.app.version
        ? "green raised"
        : null;
    },
    getReleases() {
      const vm = this;
      vm.githubApi
        .get("/repos/premediapower/desktop-app-pmp/releases")
        .then(function(response) {
          vm.releases = response.data;
          setTimeout(() => {
            window.scrollBy(0, 500);
          }, 100);
        });
    }
  }
};
</script>
