<template>
  <div v-if="!mobile" class="grid grid-cols-1 py-8 z-100">
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
                  class="mr-3 cursor-pointer"
                  name="selectedRegion"
                  :value="region.name"
                  v-on:change="updateRegion(region)"
                />
                <span
                  class="w-44 cursor-pointer inline-block font-bold font-sans"
                  >{{ region.name }}</span
                >
              </label>
            </li>
          </ul>
        </button>
      </div>
    </span>
  </div>
  <div
    v-on:click="resetMap()"
    class="grid grid-cols-1 ml-auto mr-auto relative w-8/12"
    id="map"
  >
    <div
      v-if="mobile && Object.keys(mobileModalInfo).length"
      class="
        absolute
        fixed
        -bottom-16
        shadow-lg
        text-black
        bg-white
        w-full
        z-10
        rounded
      "
    >
      <p class="font-bold text-2xl pt-1 pl-8 font-sans text-blue-900 text-left">
        {{ mobileModalInfo.name }}
      </p>
      <br />
      <p class="text-left pl-8">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 text-blue-900 inline pb-1"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clip-rule="evenodd"
          /></svg
        ><a
          :href="mobileModalInfo.readMoreUrl"
          class="font-bold text-lg text-left font-sans text-blue-900"
          >Read more</a
        >
      </p>
    </div>
    <div
      v-if="mobile"
      class="grid grid-cols-1 py-1 z-10 mx-3 inline absolute top-7 bg-white"
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
              h-12
              bg-white
              ml-4
              py-1
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
                  <span
                    class="w-44 cursor-pointer inline-block font-bold font-sans"
                    >{{ region.name }}</span
                  >
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
      mobile: window.innerWidth <= 600,
      showMenu: false,
      selectedRegion: this.mobile ? "Western Europe" : "Nothing Selected",
      mobileModalInfo: {},
      regionOptions: {
        color: "#00A2FF",
        hover_color: "#EDC80A",
        zoomable: "no",
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
        // 5: {
        //   name: "Brazil",
        //   states: ["BR"],
        //   readMoreUrl: "http://www.microsoft.com",
        // },
      },
    };
  },
  methods: {
    updateRegion(region) {
      this.mobileModalInfo = region;
      this.simplemaps_worldmap.popup("region", region.regionId);
      this.selectedRegion = region.name;
      this.showMenu = false;
    },
    resetMap() {
      if (!this.mobile) {
        this.selectedRegion = "";
      }
    },
    mobileConfig() {
      this.selectedRegion = "Western Europe";
      this.simplemaps_worldmap.mapdata.main_settings.width = 375;
      this.simplemaps_worldmap.mapdata.main_settings.background_color =
        "#003D8E";
      this.simplemaps_worldmap.mapdata.main_settings.state_color = "#EDC80A";
      this.simplemaps_worldmap.mapdata.main_settings.initial_zoom = 4;
      this.simplemaps_worldmap.mapinfo.initial_view = {
        y: 50.99,
        x: 50.99,
        x2: 2018.99,
        y2: 2464.5600000000001,
      };
    },
  },
  async created() {
    addEventListener("resize", () => {
      this.mobile = innerWidth <= 600;
    });
    //fetch active regions from mock api server - could abstract away to vuex actions and dispatch action to update global store
    // try {
    //   let response = await fetch("http://www.someapiendpoint.com/regions/active")
    //   let data = await response.json();
    //   if (response.ok) {
    //     this.regions = data;
    //   }
    // } catch (error) {
    //   this.errors = true
    // }
    this.simplemaps_worldmap.mapdata.regions = this.mergedRegions;
    this.mobileModalInfo = Object.values(this.mergedRegions)[4];

    if (this.mobile) {
      this.mobileConfig();
    }
  },
  updated() {
    if (this.mobile) {
      this.mobileConfig();
    }
  },
  computed: {
    simplemaps_worldmap: () => {
      //gives access to this.simplemaps_worldmap
      return window.simplemaps_worldmap;
    },
    activeRegions: function () {
      //computed value is used to provide the select form element with regions to display
      return Object.values(this.mergedRegions).map((region, index) => {
        return {
          name: region.name,
          readMoreUrl: region.readMoreUrl,
          description: region.description,
          regionId: index,
        };
      });
    },
    mergedRegions: function () {
      // let isMobile =
      //   /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      //     navigator.userAgent
      //   );

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
        if (this.mobile) {
          mergedRegions[i].zoomable = "yes";
          mergedRegions[i].color = "#EDC80A";
          mergedRegions[i].hover_color = "#EDC80A";
        }
      }
      return mergedRegions;
    },
  },
};
</script>

<style>
/* styles for the map popups */
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
