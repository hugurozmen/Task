<template>
  <v-container class="fill-height bg-img" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" md="8" sm="8">
        <v-card class="elevation-12">
          <v-window v-model="step">
            <v-window-item :value="1">
              <v-row>
                <v-col cols="8">
                  <v-card-text class="mt-12">
                    <h1 class="text-center display-2 teal--text text--accent-3"
                    >Hoşgeldiniz...</h1>
                    <v-form ref="loginForm">
                      <v-text-field
                          v-model="credentials.username"
                          color="teal accent-3"
                          label="Kullanıcı Adı"
                          name="Kullanıcı Adı"
                          prepend-icon="mdi-account"
                          type="text"
                      />
                      <v-text-field
                          id="password"
                          v-model="credentials.password"
                          color="teal accent-3"
                          label="Parola"
                          name="Parola"
                          prepend-icon="mdi-lock"
                          type="password"
                      />
                    </v-form>
                  </v-card-text>
                  <div class="text-center my-3">
                    <v-btn color="teal accent-3" dark rounded @click="userLogin">Giriş Yap</v-btn>
                  </div>
                </v-col>
                <v-col class="teal accent-3" cols="12" md="4">
                  <v-card-text class="white--text mt-12">
                    <h1 class="text-center display-1">Hesabınız Yok Mu?</h1>
                    <h5
                        class="text-center"
                    >Hemen Kayıt Olun!</h5>
                  </v-card-text>
                  <div class="text-center">
                    <v-btn dark outlined rounded @click="step++">Kayıt Ol</v-btn>
                  </div>
                </v-col>
              </v-row>
            </v-window-item>
            <v-window-item :value="2">
              <v-row class="fill-height">
                <v-col class="teal accent-3" cols="12" md="4">
                  <v-card-text class="white--text mt-12">
                    <h1 class="text-center display-1">Tekrar Hoşgeldiniz!</h1>
                    <h5
                        class="text-center"
                    >Eğer Hesabınız Varsa Lütfen Giriş Yapınız.</h5>
                  </v-card-text>
                  <div class="text-center">
                    <v-btn dark outlined rounded @click="step--">Giriş Yap</v-btn>
                  </div>
                </v-col>

                <v-col cols="12" md="8">
                  <v-card-text class="mt-12">
                    <h1 class="text-center display-2 teal--text text--accent-3">Hesap Oluştur</h1>
                    <v-form>
                      <v-text-field
                          v-model="newAccount.username"
                          color="teal accent-3"
                          label="Kullanıcı Adı"
                          name="Kullanıcı Adı"
                          prepend-icon="mdi-account"
                          type="text"
                      />
                      <v-text-field
                          v-model="newAccount.email"
                          color="teal accent-3"
                          label="Email"
                          name="Email"
                          prepend-icon="mdi-email"
                          type="text"
                      />

                      <v-text-field
                          id="password"
                          v-model="newAccount.password"
                          color="teal accent-3"
                          label="Parola"
                          name="Parola"
                          prepend-icon="mdi-lock"
                          type="password"
                      />
                    </v-form>
                  </v-card-text>
                  <div class="text-center my-4">
                    <v-btn color="teal accent-3" dark rounded @click="signUp">Kayıt Ol</v-btn>
                  </div>
                </v-col>
              </v-row>
            </v-window-item>
          </v-window>
        </v-card>
      </v-col>
    </v-row>
    <div class="text-center">
      <v-snackbar
          v-model="snackbar"
          :timeout="2000"
      >
        {{ msg }}
        <template v-slot:action="{ attrs }">
          <v-btn
              color="blue"
              text
              v-bind="attrs"
              @click="snackbar = false"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </div>
  </v-container>
</template>

<script>
import UserStore from '@/store/';
import AuthService from "@/services/AuthService";

export default {
  name: 'Login',
  data: () => ({
    snackbar: false,
    msg: 'Kullanıcı adı parola hatalı !',
    step: 1,
    loginIsLoading: false,
    newAccount: {
      username: null,
      email: null,
      password: null,
    },
    credentials: {
      username: null,
      password: null,
    },
  }),
  methods: {
    async userLogin() {
      console.log(UserStore)
      let valid = await this.$refs.loginForm.validate();
      if (!valid) return;
      this.loginIsLoading = true;
      UserStore.dispatch('userLogin', this.credentials).then(() => {
        this.$router.push({name: 'Dashboard'})
        this.snackbar = true;
        this.msg = 'Giriş Başarılı !';
      }).catch(() => {
        this.snackbar = true;
        this.msg = 'Kullanıcı adı veya parola hatalı !';
      }).finally(() => {
        this.loginIsLoading = false;
      });
    },
    async signUp() {
      this.loginIsLoading = true;
      AuthService.userSignUp(this.newAccount).then(() => {
        this.step = 1;
        this.snackbar = true;
        this.msg = 'Kayıt Başarılı !';
      }).catch(() => {
        this.snackbar = true;
        this.msg = 'Kullanıcı adı veya email kullanılmakta !';
      }).finally(() => {
        this.loginIsLoading = false;
      });
    }
  },
};
</script>

<style scoped>
.bg-img {
  background-image: url('@/assets/login.jpg');
  background-size: cover;
  background-position: center;
}
</style>
