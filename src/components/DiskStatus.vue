<template>
  <div class="ui segments">
    <div class="ui segment">
      <div
        v-for="(item, index) in disks"
        v-bind:key="index"
        style="margin-top: 10px"
      >
        <a
          class="ui fluid labeled icon button"
          :title="'Press Alt+' + (index + 1)"
          v-bind:class="{
            basic: !item.mounted,
            red: !item.mounted,
            green: item.mounted,
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
  </div>
</template>

<script>
const { exec } = require("child_process");

export default {
  data: function () {
    return {
      disks: [
        {
          name: "ZDSGN01",
          folder: "ZDSGN01",
          mounted: false,
          url: "afp://10.33.128.21",
        },
        // {
        //   name: "ZDSGN02",
        //   mounted: false,
        //   url: "afp://10.33.128.22"
        // },
        {
          name: "ZDSGN03",
          folder: "ZDSGN03",
          mounted: false,
          url: "afp://10.33.128.23",
        },
        {
          name: "pmp_deliverables",
          folder: "Data",
          mounted: false,
          url: "afp://172.31.1.70",
        },
      ],
    };
  },
  mounted() {
    const vm = this;

    window.addEventListener(
      "keyup",
      function (event) {
        if (event.altKey && event.which == 49) {
          console.log("Open disk 1");
          vm.openDisk(vm.disks[0]);
        }
        if (event.altKey && event.which == 50) {
          console.log("Open disk 2");
          vm.openDisk(vm.disks[1]);
        }
        if (event.altKey && event.which == 51) {
          console.log("Open disk 3");
          vm.openDisk(vm.disks[2]);
        }
      },
      true
    );

    vm.checkIfDisksMounted();

    const diskCheckInterval = setInterval(() => {
      vm.checkIfDisksMounted();
    }, 5000);
  },
  methods: {
    openDisk: function (disk) {
      const vm = this;

      if (disk.mounted) {
        vm.$parent.openFinderPath("/Volumes/" + disk.name);
      } else {
        window.location = disk.url;
      }
    },
    checkDisk: function (disk) {
      var command = exec(
        "df | awk '{print $9}' | grep -Ex \"/Volumes/" + disk.folder + '"'
      );

      command.stdout.on("data", function (data) {
        if (data) {
          disk.mounted = true;
        }
      });

      return disk.mounted;
    },
    checkIfDisksMounted: function () {
      const vm = this;

      this.disks.filter(function (disk) {
        return (disk.mounted = vm.checkDisk(disk));
      });
    },
  },
};
</script>
