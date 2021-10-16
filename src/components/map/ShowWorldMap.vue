<template>
  <div class="grid grid-cols-1 py-8">
    <span class="inline"
      ><p class="inline font-bold font-sans text-blue-900 text-2xl">
        Choose a location
      </p>
      <select
        v-model="selectedRegion"
        name="region"
        id="region"
        class="inline-block bg-white text-gray-400 max-w-xs ml-6 px-8 py-4"
      >
        <!-- NEED TO GET OPTION VALUES FROM API AND ITERATE USING V-FOR-->
        <!-- CONSIDER USING UL and LI ELEMENTS FOR DROPDOWN: http://jsfiddle.net/QSkUR/1/ -->
        <option disabled value="">Nothing selected</option>
        <option
          v-for="region in activeRegions"
          :value="region"
          :key="region"
          class="font-bold my-5"
        >
          {{ region }}
        </option>
      </select>
    </span>
  </div>
  <div class="grid grid-cols-1 ml-auto mr-auto" id="map"></div>
</template>

<script>
export default {
  name: "ShowWorldMap",
  data() {
    return {
      selectedRegion: "",
      //MOCK DATA FOR TESTING... NEED TO PULL FROM API VIA CREATED() IN FUTURE
      //BREAK OUT REGIONAL OPTIONS AND MERGE THEM INTO EACH REGION AFTER FETCHED FROM API
      //   regionOptions: {
      //     color: "#00A2FF",
      //     hover_color: "#EDC80A",
      //     zoomable: "no",
      //     region_hover_opacity: 0,
      //   },
      regionOptions: {
        color: "#00A2FF",
        hover_color: "#EDC80A",
        zoomable: "no",
        region_hover_opacity: 0,
        description: `<p class="font-bold pt-5 text-2xl font-sans text-blue-900">REGION_NAME</p><br /><a href="LINK" class="font-bold text-lg font-sans text-blue-900">Read more</a>`,
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
      },
    };
  },
  methods: {
    changeSelectedRegion(event) {
      console.log(event.currentTarget.id, "value of currentTarget.id");
    },
  },
  created() {
    //initialize regions to blank object to then pull in region data from API from client
    this.simplemaps_worldmap.mapdata.regions = this.mergedRegions;
    // let mapdata = document.createElement("script");
    // mapdata.setAttribute("src", "./mapdata.js");
    // document.head.appendChild(mapdata);
    // let worldmap = document.createElement("script");
    // worldmap.setAttribute("src", "./worldmap.js");
    // document.head.appendChild(worldmap);
  },
  computed: {
    simplemaps_worldmap: () => {
      return window.simplemaps_worldmap;
    },
    activeRegions: function () {
      return Object.values(this.regions).map((region) => {
        return region.name;
      });
    },
    mergedRegions: function () {
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
      }
      return mergedRegions;
    },
  },
  updated() {
    //fires whenever there is a state change
    //ensuring value of selectedRegion has indeed changed
    console.log(this.selectedRegion, "selected region updated");
  },
};
</script>
