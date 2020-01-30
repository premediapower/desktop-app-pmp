<template>
  <div class="ui segments">
    <div class="ui segment blue">
      <div class="ui ribbon blue label">
        <i class="icon server"></i> Disk status
      </div>
      <br />
      <div
        v-for="(item, index) in disks"
        v-bind:key="index"
        style="margin-top: 10px;"
      >
        <a
          class="ui fluid labeled icon button"
          v-bind:class="{ red: !item.mounted, green: item.mounted }"
          :href="item.url"
        >
          <i
            class="icon"
            v-bind:class="{ remove: !item.mounted, disk: item.mounted }"
          ></i>
          {{ item.name }}
        </a>
      </div>
    </div>

    <div class="ui segment blue" v-if="paths.length">
      <div class="ui ribbon label blue">
        <i class="icon archive"></i> History
      </div>
      <br />
      <div
        v-for="(item, index) in paths"
        v-bind:key="index"
        style="margin-top: 10px;"
      >
        <div class="ui label fluid">
          <a v-on:click="openFinderPath(item)">{{ item }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Echo from "laravel-echo";
window.Pusher = require("pusher-js");
const { exec } = require("child_process");

export default {
  props: {},
  data: function() {
    return {
      disks: [
        {
          name: "ZDSGN01",
          mounted: false,
          url: "afp://192.168.0.225"
        },
        {
          name: "ZDSGN02",
          mounted: false,
          url: "afp://192.168.0.226"
        },
        {
          name: "ZDSGN03",
          mounted: false,
          url: "afp://192.168.0.213"
        },
        {
          name: "pmp_deliverables",
          mounted: false,
          url: "afp://146.185.139.142"
        }
      ],
      paths: []
    };
  },
  methods: {
    checkDisk: function(item) {
      var command = exec(
        "df | awk '{print $9}' | grep -Ex \"/Volumes/" + item.name + '"'
      );

      command.stdout.on("data", function(data) {
        if (data) {
          item.mounted = true;
        }
      });
    },
    openFinderPath: function(path) {
      exec('open "' + path + '"');
    },
    openFinderPathIfExists: function(path) {
      const vm = this;
      var exists = exec('[ -d "' + path + '" ] && echo true');

      exists.stdout.on("data", function(data) {
        if (data == true) {
          vm.openFinderPath(path);
        } else {
          exec("mkdir " + path);
          vm.openFinderPath(path);
        }
      });
    },
    checkIfDisksMounted: function() {
      const vm = this;

      this.disks.filter(function(item) {
        return (item.mounted = vm.checkDisk(item));
      });
    }
  },
  mounted() {
    const vm = this;
    this.checkIfDisksMounted();

    window.setInterval(() => {
      this.checkIfDisksMounted();
    }, 3000);

    if (localStorage.user_id != 0) {
      window.Echo = new Echo({
        broadcaster: "pusher",
        key: "8ef96f5fc90e28e9fe3b",
        cluster: "eu",
        encrypted: true,
        disableStats: true
      });
      console.log(window.Echo.channel("pmp_user_" + localStorage.user_id));
      window.Echo.channel("pmp_user_" + localStorage.user_id)
        .listen(".projects.open_project_folder", project_folder_path => {
          console.log("listening");
          this.openFinderPath(project_folder_path);
          this.paths.push(project_folder_path);
        })
        .listen(".projects.open_deliverable_folder", deliverable_path => {
          this.openFinderPathIfExists(deliverable_path);
          this.paths.push(deliverable_path);
        });
    }
  }
};
</script>
