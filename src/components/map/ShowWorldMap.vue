<template>
  <div id="simplemaps_list"></div>

  <div class="grid grid-cols-1 py-8 z-100">
    <span v-if="!mobileDevice" class="inline"
      ><p class="inline font-bold font-sans text-blue-900 text-2xl">
        Choose a location
      </p>
      <div class="inline w-28">
        <button
          @click="showMenu = !showMenu"
          class="
            inline-block
            h-14
            bg-white
            ml-4
            py-2
            px-5
            text-gray-400
            font-sans
            relative
            w-56
          "
        >
          <span>
            {{ selectedRegion ? selectedRegion : "Nothing selected" }}
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 absolute right-4 top-4"
            :class="[
              showMenu
                ? 'transform rotate-180 transition duration-300 text-yellow-500'
                : 'transition duration-300 text-blue-800',
            ]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
          <ul
            class="block w-56 shadow-lg absolute z-50 top-18 left-0"
            :class="[showMenu ? null : 'hidden']"
          >
            <li
              class="
                block
                py-1
                px-1
                text-left text-blue-800
                hover:text-blue-400
                font-sans
                bg-white
                w-full
              "
              v-for="region in activeRegions"
              :key="region.name"
            >
              <label>
                <input
                  type="radio"
                  class="mr-3"
                  name="selectedRegion"
                  :value="region.name"
                  v-on:change="updateRegion(region)"
                />
                <span class="inline font-bold font-sans">{{
                  region.name
                }}</span>
              </label>
            </li>
          </ul>
        </button>
      </div>
    </span>
  </div>
  <div class="grid grid-cols-1 ml-auto mr-auto relative" id="map">
    <div
      v-if="mobileDevice"
      class="grid grid-cols-1 py-8 z-10 mx-3 inline absolute top-10 bg-white"
    >
      <span class="inline"
        ><p class="inline font-bold font-sans text-blue-900 text-2xl">
          Choose a location
        </p>
        <div class="inline w-28">
          <button
            @click="showMenu = !showMenu"
            class="
              inline-block
              h-14
              bg-white
              ml-4
              py-2
              px-5
              text-gray-400
              font-sans
              relative
              w-56
            "
          >
            <span>
              {{ selectedRegion ? selectedRegion : "Nothing selected" }}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 absolute right-4 top-4"
              :class="[
                showMenu
                  ? 'transform rotate-180 transition duration-300 text-yellow-500'
                  : 'transition duration-300 text-blue-800',
              ]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
            <ul
              class="block w-56 shadow-lg absolute z-50 top-18 left-0"
              :class="[showMenu ? null : 'hidden']"
            >
              <li
                class="
                  block
                  py-1
                  px-1
                  text-left text-blue-800
                  hover:text-blue-400
                  font-sans
                  bg-white
                  w-full
                "
                v-for="region in activeRegions"
                :key="region.name"
              >
                <label>
                  <input
                    type="radio"
                    class="mr-3"
                    name="selectedRegion"
                    :value="region.name"
                    v-on:change="updateRegion(region)"
                  />
                  <span class="inline font-bold font-sans">{{
                    region.name
                  }}</span>
                </label>
              </li>
            </ul>
          </button>
        </div>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShowWorldMap",
  data() {
    return {
      showMenu: false,
      mobileDevice: false,
      selectedRegion: "",
      regionOptions: {
        // selected: false,
        color: "#00A2FF",
        hover_color: "#EDC80A",
        zoomable: "no",
        region_hover_opacity: 0,
        region_opacity: 0,
        description: `<p class="font-bold pt-1 mx-8 text-2xl font-sans text-blue-900">REGION_NAME</p><br /><span class="align-middle"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-900 inline pb-1" viewBox="0 0 20 20" fill="currentColor">
  <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
</svg><a href="LINK" class="font-bold text-lg text-left font-sans text-blue-900">Read more</a></span>`,
      },
      regions: {
        0: {
          name: "North America",
          states: ["MX", "CA", "US", "GL", "BM"],
          readMoreUrl: "http://www.google.com",
        },
        1: {
          name: "India",
          states: ["IN"],
          readMoreUrl: "http://www.bing.com",
        },
        2: {
          name: "Russia",
          states: ["RU"],
          readMoreUrl: "http://www.duck.com",
        },
        3: {
          name: "Australia",
          states: ["AU"],
          readMoreUrl: "http://www.zombo.com",
        },
        4: {
          name: "Western Europe",
          states: ["PT", "GB", "IE", "DE", "ES", "FR"],
          readMoreUrl: "http://www.slashdot.org",
        },
      },
    };
  },
  methods: {
    checkMobile() {
      if (
        /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      ) {
        this.mobileDevice = true;
      } else {
        this.mobileDevice = false;
      }
    },
    changeSelectedRegion(event) {
      console.log(event.currentTarget.id, "value of currentTarget.id");
    },
    updateRegion(region) {
      console.log(region);
      this.simplemaps_worldmap.region_zoom = region.regionId;
      this.simplemaps_worldmap.mapdata.regions[region.regionId].color =
        "#EDC80A";
      this.simplemaps_worldmap.refresh();
      this.simplemaps_worldmap.mapdata.regions[region.regionId].color = this
        .mobileDevice
        ? "#FFFFFF"
        : "#00A2FF";
      this.selectedRegion = region.name;
      this.showMenu = false;
    },
  },
  created() {
    this.simplemaps_worldmap.mapdata.regions = this.mergedRegions;
    this.checkMobile();
    if (this.mobileDevice) {
      this.simplemaps_worldmap.mapdata.main_settings.width = 400;
      this.simplemaps_worldmap.mapdata.main_settings.background_color =
        "#003D8E";
      this.simplemaps_worldmap.mapdata.main_settings.state_color = "#FFFFFF";
      this.simplemaps_worldmap.mapdata.main_settings.initial_zoom = 4;
      this.simplemaps_worldmap.mapinfo.initial_view = {
        y: 50.99,
        x: 50.99,
        x2: 2018.99,
        y2: 2464.5600000000001,
      };
    }
  },
  computed: {
    simplemaps_worldmap: () => {
      return window.simplemaps_worldmap;
    },
    activeRegions: function () {
      return Object.values(this.regions).map((region, index) => {
        return {
          name: region.name,
          regionId: index,
          readMoreUrl: region.readMoreUrl,
        };
      });
    },
    mergedRegions: function () {
      let isMobile =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        );
      console.log(isMobile, "isMobile from mergedRegions");
      //computed property that returns an object with the regions retreived from the API merged with the regional options
      let mergedRegions = {};
      let mergedArray = Object.values(this.regions).map((region) => {
        let o = Object.assign({ ...this.regionOptions }, region);
        return o;
      });

      for (let i = 0; i < mergedArray.length; i++) {
        //Iterate through merged array and replace values in description with value of readMoreUrl and region name from API call
        mergedRegions[i] = mergedArray[i];

        mergedRegions[i].description = mergedRegions[i].description.replace(
          "LINK",
          mergedRegions[i].readMoreUrl
        );
        mergedRegions[i].description = mergedRegions[i].description.replace(
          "REGION_NAME",
          mergedRegions[i].name
        );
        if (isMobile) {
          mergedRegions[i].zoomable = "yes";
          mergedRegions[i].color = "#FFFFFF";
        }
      }
      return mergedRegions;
    },
  },
};
</script>

<style>
.tt_sm {
  border-radius: 5px;
  box-shadow: 3px 3px 4px rgba(0, 0, 0, 0.5);
  z-index: 1000000;
  background-color: white;
  /* padding: 7px; */
  padding-right: 10px;
  margin-right: 10px;
  opacity: 0.9;
  font: 12px/1.5 Verdana, Arial, Helvetica, sans-serif;
  color: black;
}
.tt_name_sm {
  float: left;
  font-weight: bold;
  display: none;
}
.xmark_sm {
  float: right;
  margin-left: 5px;
  cursor: pointer;
  line-height: 0px;
}
.tt_custom_sm {
}
.tt_mobile_sm {
  margin-top: 5px;
  text-align: left;
}
.btn_simplemaps {
  color: black;
  text-decoration: none;
  background: #ffffff;
  display: inline-block;
  padding: 5px 5px;
  margin: 0;
  width: 100%;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  line-height: 1.43;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -ms-touch-action: manipulation;
  touch-action: manipulation;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  border: 1px solid;
  border-radius: 4px;
}
.btn_simplemaps:hover {
  text-decoration: underline;
}
</style>
