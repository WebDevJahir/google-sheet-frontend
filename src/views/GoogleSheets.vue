<template>
  <div class="container mx-auto mt-12 px-4">
    <h2 class="text-3xl font-bold text-gray-700 mb-8 text-center">Your Google Sheets Data</h2>
    <div v-if="loading" class="flex justify-center items-center h-32">
      <svg class="w-12 h-12 text-blue-500 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none"
        viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
      </svg>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div v-for="sheet in sheets" :key="sheet.id"
        class="bg-white border border-gray-200 shadow-lg rounded-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl p-6">
        <div class="flex flex-col items-start">
          <div class="flex items-center space-x-3 mb-3">
            <svg class="w-20 h-20 text-green-500 animate-pulse" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
              viewBox="0 0 24 24">
              <path d="M3 3h18v18H3V3z" fill="none" />
              <path
                d="M21 3H3a1 1 0 00-1 1v16a1 1 0 001 1h18a1 1 0 001-1V4a1 1 0 00-1-1zM10 5v14H5V5h5zm9 14h-7V5h7v14zm-6-9h5v2h-5v-2zm0 3h5v2h-5v-2zm0 3h5v2h-5v-2zm0-9h5v2h-5V7z" />
            </svg>
          </div>
          <h5 class="text-lg font-semibold text-gray-800">{{ sheet.name }}</h5>
          <router-link :to="`/read-spreadsheet-data/${sheet.id}/${sheet.name}`"
            class="inline-block mt-2 text-blue-500 font-medium hover:text-blue-700 transition duration-200">
            View Data
          </router-link>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    data() {
      return {
        loading: true,
      };
    },
    computed: {
      ...mapGetters(['sheets']),
    },
    async created() {
      try {
        await this.$store.dispatch('fetchGoogleSheets');
      } finally {
        this.loading = false;
      }
    },
    methods: {
      deleteSheet(sheetId) {
        console.log(`Delete sheet with ID: ${sheetId}`);
      },
    },
  };
</script>

<style scoped>
  .container {
    max-width: 1200px;
  }
</style>