<template>
    <div class="container-fluid">
        <Toasts />
        <div class="row mt-5">
            <div class="col-md-4">
            </div>
            <div class="col-md-4">
                <div class="card rounded">
                    <div class="card-body shadow">
                        <h4 class="card-title text-center">Have An Account?</h4>
                        <p class="card-text text-grey text-center">Sign in here</p>
                        <div class="form-group mx-3">
                            <label>Email:</label>
                            <input type="text" class="form-control form-control-lg" v-model="$v.user.email.$model">
                            <validation-error v-bind:validation="$v.user.email" />
                        </div>
                        <div class="form-group mx-3">
                            <label>Password:</label>
                            <input type="password" class="form-control form-control-lg" v-model="$v.user.password.$model">
                            <validation-error v-bind:validation="$v.user.password" />
                        </div>
                        <div class="d-flex justify-content-between mx-3 mt-5">
                            <div class="custom-control custom-checkbox">
                                <input type="checkbox" class="custom-control-input" id="customCheck" name="example1">
                                <label class="custom-control-label" for="customCheck">Remember me?</label>
                            </div>
                            <button type="button" class="btn btn-primary" v-on:click="signIn">
                                Sign In                                
                            </button>
                        </div>
                        <div class="d-flex justify-content-between mx-3 mt-2">
                            <a href="/login">Forgot your password?</a>
                            <router-link to="/register">To register?</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import { required, email } from 'vuelidate/lib/validators';
import { mapActions } from 'vuex';
import ValidationError from './ValidationError';

export default {
    name: 'login',

    data: function() {
        return {
            user: {
                email: 'admin@admin.com',
                password: '123456789',
            }
        }
    },

    components: {
        ValidationError
    },

    validations: {
        user: {
            email: { required, email },
            password: { required }
        }
    },
    
    methods: {
        ...mapActions({
            authSignIn: "auth/authSignIn"
        }),
        async signIn() {            
            this.$v.$touch();
            if (!this.$v.$invalid) {
                let result = (await this.authSignIn(this.user));
                if (result == 'success') {
                    this.$router.go('/chart')
                }
            }
        }
    }
}

</script>

<style>

.shadow {
    box-shadow: 0 .5rem 1rem rgba(0, 0, 0, .15) !important;
}

</style>