<template>
    <div class="container max-w-lg mx-auto p-8 bg-white shadow-lg rounded-lg mt-10">

        <div v-if="loading" class="flex justify-center items-center h-64">
            <div class="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
        </div>
        <h2 class="text-3xl font-bold text-center text-gray-800 mb-6">Add Data to Google Sheets</h2>
        <hr />

        <div v-if="errors.length" class="bg-red-50 text-red-600 border border-red-200 p-4 rounded-lg mb-6">
            <ul>
                <li v-for="(error, index) in errors" :key="index" class="text-sm">{{ error }}</li>
            </ul>
        </div>

        <form @submit.prevent="submitForm" class="space-y-6">
            <div class="flex justify-between items-center mb-4">
                <h3 class="text-xl font-semibold text-gray-700">Data Rows</h3>
                <button type="button" @click="addRow"
                    class="bg-blue-500 text-white py-1 px-4 mt-2 rounded hover:bg-blue-600 transition-all text-sm">
                    + Add Row
                </button>
            </div>

            <div id="rows">
                <div class="flex space-x-4 mb-4" v-for="(value, index) in values" :key="index">
                    <div class="flex-1">
                        <label :for="'name' + index" class="block text-sm font-medium text-gray-600 mb-1">
                            Column {{ index + 1 }}
                        </label>
                        <div class="flex items-center space-x-2">
                            <input type="text" v-model="values[index]" :id="'name' + index"
                                class="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                                :placeholder="'Enter value for Column ' + (index + 1)" />
                            <button type="button" @click="values.splice(index, 1)"
                                class="border border-red-500 text-red-500 py-2 px-4 rounded hover:bg-red-500 hover:text-white transition-all text-sm">
                                -
                            </button>
                        </div>
                    </div>
                </div>
            </div>



            <button type="submit"
                class="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold shadow-md transition-all hover:shadow-lg">
                <span v-if="!addButtonLoading">Add Data</span>
                <span v-else>
                    <svg aria-hidden="true" role="status" class="inline w-4 h-4 text-white animate-spin"
                        viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="#E5E7EB" />
                        <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentColor" />
                    </svg>
                </span>
            </button>
        </form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                values: [''],
                errors: [],
                spreadSheetId: this.$route.params.spreadsheetId,
                sheetName: this.$route.params.sheetname,
                loading: true,
                success: false,
                addButtonLoading: false
            };
        },
        async created() {
            this.loading = false;
        },
        methods: {
            addRow() {
                this.values.push('');
            },
            async submitForm() {
                this.addButtonLoading = true;
                this.errors = [];
                this.values.forEach((value, index) => {
                    if (!value) {
                        this.errors.push(`Column ${index + 1} cannot be empty.`);
                    }
                });

                if (this.errors.length) {
                    this.addButtonLoading = false;
                    return;
                }

                try {
                    await this.$store.dispatch('addSheetData', {
                        spreadsheetId: this.spreadSheetId,
                        sheetName: this.sheetName,
                        values: this.values
                    }).then(() => {
                        this.addButtonLoading = false;
                        this.$notify.success('Success', 'Data inserted Successfully!');
                        this.$router.push({
                            name: 'ReadGoogleSheets',
                            params: {
                                id: this.spreadSheetId,
                                docname: this.sheetName
                            }
                        });
                        this.values = [''];
                    });

                } catch (error) {
                    console.log(error.response?.data || error.message);  // Log the exact error
                    this.errors.push('Failed to add data. Please try again.');
                    this.addButtonLoading = false;
                }
            }

        }
    };
</script>

<style scoped>
    /* Component-specific styles */
    body {
        font-family: 'Inter', sans-serif;
        background-color: #f9fafb;
    }

    .container {
        background-color: white;
    }
</style>