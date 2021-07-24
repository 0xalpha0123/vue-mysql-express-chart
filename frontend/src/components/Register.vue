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
                        <p class="card-text text-grey text-center">Sign un here</p>
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
                        <div class="mx-3 mt-5">
                            <button type="button" class="btn btn-primary float-right" v-on:click="signUp">
                                Sign Up                                
                            </button>
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
            authSignUp: "auth/authSignUp"
        }),
        async signUp() {            
            this.$v.$touch();
            if (!this.$v.$invalid) {
                let result = (await this.authSignUp(this.user));
                if (result == 'success') {
                    this.$router.push('/login')
                } else if (result == "email must be unique") {
                    this.$toast.error('Email is already existed.', {
                        showProgress: false,
                        rtl: true,
                        timeOut: 2000,
                        closeable: false
                    });
                } else {
                    this.$toast.error('Error is occupied.', {
                        showProgress: false,
                        rtl: true,
                        timeOut: 2000,
                        closeable: false
                    });
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