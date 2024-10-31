<template>
    <div class="min-h-screen bg-gray-100 flex flex-col items-center p-6">
        <main class="w-full max-w-4xl mt-8 flex flex-col items-center space-y-4">
            <div class="bg-white w-full rounded-lg shadow-lg p-6 flex flex-col items-center">
                <button
                    class="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition duration-200"
                    @click="loadMySpreadSheets">
                    My Spreadsheets
                </button>
            </div>
        </main>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        computed: {
            ...mapGetters(['user']),
            username() {
                return this.user ? this.user.name : 'User';
            },
        },
        methods: {
            handleLogout() {
                this.$store.dispatch('logout');
                this.$router.push('/login');
            },
            loadMySpreadSheets() {
                this.$router.push('/google-sheets');
            },
        },
    };
</script>