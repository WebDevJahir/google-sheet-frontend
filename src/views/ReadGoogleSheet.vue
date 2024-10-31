<template>
    <div class="container mx-auto p-5">
        <div v-if="loading" class="flex justify-center items-center h-64">
            <div class="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
        </div>
        <h1 v-if="!loading" class="text-3xl text-gray-700 mb-8 text-center">Document Name: <span class="font-bold">{{
                docName }}</span>
        </h1>
        <div v-if="!loading" v-for="(rows, sheetName) in allData" :key="sheetName" class="mb-10">
            <h2 class="text-2xl text-center text-gray-800 mb-2">Sheet Name: <span class="font-semibold">{{
                    sheetName }}</span></h2>
            <hr class="border-t border-gray-200 mb-4">
            <router-link :to="`/add-sheet-data/${spreadsheetId}/${sheetName}`"
                class="inline-block bg-blue-600 text-white float-end py-2 px-4 rounded hover:bg-blue-700 transition-transform duration-200 transform hover:scale-105 mb-4">
                Add New Row
            </router-link>

            <p v-if="!rows.length" class="text-gray-500">No data available in this sheet.</p>
            <table v-else class="min-w-full bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden">
                <thead>
                    <tr class="bg-gray-100">
                        <th v-for="index in maxColumns" :key="index"
                            class="py-2 px-4 text-left text-gray-600 font-semibold border-b border-gray-200">
                            {{ rows[0][index - 1] || ' ' }}
                        </th>
                        <th
                            class="fixed-width py-2 px-4 text-center text-gray-600 font-semibold border-b border-gray-200">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(row, index) in rows" :key="index" class="hover:bg-gray-50 transition-all duration-200">
                        <td v-for="index in maxColumns" :key="index"
                            class="py-2 px-4 border-b border-gray-200 whitespace-nowrap">
                            {{ row[index - 1] || ' ' }}
                        </td>
                        <td class="fixed-width text-center py-2 px-4 border-b border-gray-200 whitespace-nowrap">
                            <div class="flex space-x-2 justify-center">
                                <router-link :to="`/edit-sheet-data/${spreadsheetId}/${sheetName}/${index}`"
                                    class="bg-blue-500 text-white py-1 px-3 rounded-lg hover:bg-blue-600 transition-transform duration-200 transform hover:scale-105">
                                    Edit
                                </router-link>
                                <button @click="deleteRow(spreadsheetId, sheetName, index + 1, index)"
                                    class="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600 transition-transform duration-200 transform hover:scale-105">
                                    <span v-if="buttonLoadingRow !== index">Delete</span>
                                    <span v-else>
                                        <svg aria-hidden="true" role="status"
                                            class="inline w-4 h-4 text-white animate-spin" viewBox="0 0 100 101"
                                            fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                                fill="#E5E7EB" />
                                            <path
                                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                                fill="currentColor" />
                                        </svg>
                                    </span>
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    

    export default {
        data() {
            return {
                loading: true,
                buttonLoadingRow: null,
                spreadsheetId: this.$route.params.id,
                docName: this.$route.params.docname
            };
        },
        computed: {
            ...mapGetters(['allData']),
            maxColumns() {
                let max = 0;
                Object.values(this.allData).forEach(sheetData => {
                    sheetData.forEach(row => {
                        max = Math.max(max, row.length);
                    });
                });
                return max;
            }
        },
        async created() {
            try {
                await this.$store.dispatch('readSpreadsheetData', this.spreadsheetId);
            } finally {
                this.loading = false;
            }
        },
        methods: {
            deleteRow(spreadsheetId, sheetName, rowId, rowIndex) {
                this.buttonLoadingRow = rowIndex;
                this.$store.dispatch('deleteSheetData', { spreadsheetId, sheetName, rowId }).then(() => {
                    this.$notify.success('Success', 'Row deleted successfully!');
                    this.buttonLoadingRow = null;
                });
            }
        }
    };
</script>

<style scoped>
    .fixed-width {
        width: 150px;
    }

    table {
        table-layout: fixed;
    }
</style>