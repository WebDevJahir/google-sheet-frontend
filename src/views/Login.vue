<template>
    <div class="login-container">
        <h1>Login</h1>
        <button class="google-login-button" @click="handleGoogleLogin">
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 48 48">
                <path fill="#FFC107"
                    d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z">
                </path>
                <path fill="#FF3D00"
                    d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z">
                </path>
                <path fill="#4CAF50"
                    d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z">
                </path>
                <path fill="#1976D2"
                    d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z">
                </path>
            </svg>
            Login with Google
        </button>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';

    export default {
        methods: {
            ...mapActions(['login']),
            handleGoogleLogin() {
                window.location.href = `http://localhost:8000/auth/google`;
            },
        },
        mounted() {
            const urlParams = new URLSearchParams(window.location.search);
            const userStr = urlParams.get('user');
            const token = urlParams.get('token');

            console.log('userStr', userStr, 'token', token);  // Log the encoded user string and token for debugging

            if (userStr) {
                const user = JSON.parse(decodeURIComponent(userStr));
                console.log('Parsed user:', user);  // Log the parsed user object for verification

                this.login(user).then(() => {
                    this.$store.commit('SET_USER', user);
                    this.$store.commit('SET_TOKEN', token);
                    this.$router.push('/dashboard');
                });
            }
        }

    };
</script>




<style scoped>
    .login-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
        background-color: #f9f9f9;
        padding: 20px;
    }

    h1 {
        font-size: 2rem;
        margin-bottom: 20px;
    }

    .login-form {
        display: flex;
        flex-direction: column;
        width: 100%;
        max-width: 400px;
        margin-bottom: 20px;
    }

    .input-field {
        padding: 10px;
        margin: 10px 0;
        border: 1px solid #ccc;
        border-radius: 5px;
        font-size: 1rem;
    }

    .login-button {
        padding: 10px;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 5px;
        font-size: 1rem;
        cursor: pointer;
        transition: background-color 0.3s;
    }

    .login-button:hover {
        background-color: #0056b3;
    }

    .divider {
        margin: 20px 0;
        text-align: center;
        font-weight: bold;
        color: #888;
    }

    .google-login-button {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 10px;
        background-color: #db4437;
        color: white;
        border: none;
        border-radius: 5px;
        font-size: 1rem;
        cursor: pointer;
        width: 100%;
        max-width: 400px;
        transition: background-color 0.3s;
    }

    .google-login-button:hover {
        background-color: #c1351d;
    }

    .google-logo {
        width: 20px;
        height: 20px;
        margin-right: 8px;
    }
</style>