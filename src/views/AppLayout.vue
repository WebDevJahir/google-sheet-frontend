<template>
    <div class="min-h-screen bg-gray-100">
        <header class="w-full text-white flex justify-between items-center p-4 rounded-b-lg shadow-md" v-if="user">
            <button
                class="bg-blue-500 hover:bg-blue-600 text-white font-medium py-1 px-2 rounded-lg transition duration-200"
                @click="$router.go(-1)">
                Back
            </button>
            <h1 class="text-2xl text-black font-semibold">Welcome, {{ username }}</h1>
            <button
                class="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
                @click="handleLogout">
                Logout
            </button>
        </header>
        <main class="p-6">

            <router-view></router-view>
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
        },
    };
</script>