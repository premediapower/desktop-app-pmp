<template>
  <div class="ui fluid card">
    <div class="content">
      <!-- <img
        class="right floated mini ui image"
        src="/images/avatar/large/elliot.jpg"
      /> -->
      <div class="header">
        {{ user.name }}
      </div>
      <div class="meta">
        {{ departmentName }}
      </div>
      <!-- <div class="description">
        Desc...
      </div> -->
      <div class="extra content" style="margin-top: 10px;">
        <div class="ui icon menu">
          <a
            class="item"
            v-on:click="$parent.app.sound = !$parent.app.sound"
            title="Volume"
          >
            <i class="icon" v-bind:class="volumeClass"></i>
          </a>

          <div class="right menu">
            <a
              class="item"
              v-bind:class="{ active: $parent.app.show_help }"
              v-on:click="$parent.app.show_help = !$parent.app.show_help"
            >
              <i
                class="icon help"
                v-bind:class="{ blue: $parent.app.show_help }"
              ></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Echo from "laravel-echo";
window.Pusher = require("pusher-js");

export default {
  name: "user-info",
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  mounted() {
    const vm = this;

    console.log(["component mounted", this.$options.name, this.$data]);

    window.Echo = new Echo({
      broadcaster: "pusher",
      key: "8ef96f5fc90e28e9fe3b",
      cluster: "eu",
      encrypted: true,
      disableStats: true
    });

    window.Echo.channel("pmp_user_" + vm.user.id)
      .listen(".projects.open_project_folder", project_folder_path => {
        console.log("listening project folders");
        vm.$parent.openFinderPath(project_folder_path);
      })
      .listen(".projects.open_deliverable_folder", deliverable_path => {
        console.log("listening deliverable folders");
        vm.$parent.openFinderPath(deliverable_path);
      });

    console.log(window.Echo);
  },
  computed: {
    volumeClass: function() {
      if (this.$parent.app.sound) {
        return "volume up green";
      } else {
        return "volume mute red";
      }
    },
    departmentName: function() {
      var departmentName = "";

      switch (this.user.department_id) {
        case 1:
          departmentName = "Studio";
          break;
        case 2:
          departmentName = "Account";
          break;
        case 3:
          departmentName = "Creatie";
          break;
      }

      return departmentName;
    }
  }
};
</script>
