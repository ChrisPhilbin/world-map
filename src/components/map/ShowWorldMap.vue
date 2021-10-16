<template>
  <div class="grid grid-cols-1 pt-8">
    <span class="inline"
      ><p class="inline font-bold font-sans text-blue-900 text-3xl">
        Choose a location
      </p>
      <select
        name="region"
        id="region"
        class="inline-block bg-white text-gray-700 max-w-xs ml-6 px-8 py-4"
      >
        <!-- NEED TO GET OPTION VALUES FROM API AND ITERATE USING V-FOR-->
        <!-- CONSIDER USING UL and LI ELEMENTS FOR DROPDOWN: http://jsfiddle.net/QSkUR/1/ -->
        <option
          v-for="region in regions"
          :value="region.regionName"
          :key="region.regionName"
          class="font-bold my-5"
        >
          {{ region.regionName }}
        </option>
      </select>
    </span>
  </div>
</template>

<script>
export default {
  name: "ShowWorldMap",
  data() {
    return {
      //MOCK DATA FOR TESTING... NEED TO PULL FROM API VIA CREATED() IN FUTURE
      regions: [
        {
          regionName: "North America",
          isActive: true,
          readmoreLink: "http://www.google.com",
        },
        {
          regionName: "South America",
          isActive: true,
          readmoreLink: "http://www.bingo.com",
        },
        {
          regionName: "Africa",
          isActive: false,
          readmoreLink: "http://www.duck.com",
        },
        {
          regionName: "Asia",
          isActive: true,
          readmoreLink: "http://www.zombo.com",
        },
      ],
    };
  },
};
</script>
