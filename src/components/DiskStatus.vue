<template>
  <div class="ui segments">
    <div class="ui segment">
      <div
        v-for="(item, index) in disks"
        v-bind:key="index"
        style="margin-top: 10px;"
      >
        <a
          class="ui fluid labeled icon button"
          v-bind:class="{
            basic: !item.mounted,
            red: !item.mounted,
            green: item.mounted
          }"
          v-on:click="openDisk(item)"
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
          url: "afp://10.33.128.21"
        },
        {
          name: "ZDSGN02",
          mounted: false,
          url: "afp://10.33.128.22"
        },
        {
          name: "ZDSGN03",
          mounted: false,
          url: "afp://10.33.128.23"
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
    openDisk: function(disk) {
      const vm = this;
      if (disk.mounted) {
        vm.$parent.openFinderPathIfExists("/Volumes/" + disk.name);
      } else {
        window.href = disk.url;
      }
    },
    checkDisk: function(disk) {
      var command = exec(
        "df | awk '{print $9}' | grep -Ex \"/Volumes/" + disk.name + '"'
      );

      command.stdout.on("data", function(data) {
        if (data) {
          disk.mounted = true;
        }
      });
    },
    checkIfDisksMounted: function() {
      const vm = this;

      this.disks.filter(function(disk) {
        return (disk.mounted = vm.checkDisk(disk));
      });
    }
  },
  mounted() {
    const vm = this;

    vm.checkIfDisksMounted();

    window.setInterval(() => {
      vm.checkIfDisksMounted();
    }, 3000);

    if (localStorage.user_id != 0) {
      window.Echo = new Echo({
        broadcaster: "pusher",
        key: "8ef96f5fc90e28e9fe3b",
        cluster: "eu",
        encrypted: true,
        disableStats: true
      });

      window.Echo.channel("pmp_user_" + localStorage.user_id)
        .listen(".projects.open_project_folder", project_folder_path => {
          console.log("listening");
          vm.$parent.openFinderPath(project_folder_path);
          vm.paths.push(project_folder_path);
        })
        .listen(".projects.open_deliverable_folder", deliverable_path => {
          vm.$parent.openFinderPathIfExists(deliverable_path);
          vm.paths.push(deliverable_path);
        });
    }
  }
};
</script>
