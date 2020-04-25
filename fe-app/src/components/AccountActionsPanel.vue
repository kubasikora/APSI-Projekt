<template>
  <v-card class="action-card">
    <v-form>
      <v-card-title>Akcje</v-card-title>
      <v-divider />
      <v-row>
        <v-col cols="6">
          <h3 class="action-label">Zmień hasło:</h3>
        </v-col>
        <v-col cols="6">
          <v-spacer />
            <v-dialog v-model="dialogPassword" width="500">
              <template v-slot:activator="{ on }">
                <v-btn v-on="on" color="success" class="alert-button button-col">Zmień</v-btn>
              </template>

              <v-card v-if="displayConfirmation">
                <v-card-title class="headline grey lighten-2" primary-title>Zmień hasło</v-card-title>
                <v-card-text class="modal-form">
                  Hasło zmieniono pomyślnie, proszę przejdź do strony logowania.  
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="success" @click="$router.push({path: '/login'})">Przejdź</v-btn>
                </v-card-actions>
              </v-card>

              <v-card v-else-if="displayError">
                <v-card-title class="headline grey lighten-2" primary-title>Zmień hasło</v-card-title>
                <v-card-text class="modal-form">
                  Niestety nie udało zmienić się Twojego hasła. Spróbuj ponownie później.
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="success" @click="dialogPassword = false; displayError= false">Zamknij</v-btn>
                </v-card-actions>
              </v-card>

              <v-card v-else>
                <v-card-title class="headline grey lighten-2" primary-title>Zmień hasło</v-card-title>
                <v-card-text class="modal-form">
                  <v-text-field v-model="newPassword" type="password" label="Nowe hasło" color="primary" :loading="loadingModal" :disabled="loadingModal"></v-text-field>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="success" @click="submitNewPassword">Zmień</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
        </v-col>
      </v-row>
      <v-divider />
      <v-row>
        <v-col cols="6">
          <h3 class="action-label">Usuń konto:</h3>
        </v-col>
        <v-col cols="6">
          <v-spacer />
          <v-dialog v-model="dialogAccount" width="500">
              <template v-slot:activator="{ on }">
                <v-btn v-on="on" color="#f00" class="alert-button button-col">Usuń</v-btn>
              </template>

              <v-card v-if="displayConfirmation">
                <v-card-title class="headline grey lighten-2" primary-title>Usuń konto</v-card-title>
                <v-card-text class="modal-form">
                  Konto usunięto pomyślnie. Naciśnij przycisk aby opuścić Helapdo.  
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="success" @click="$router.push({path: '/'})">Wyjdź</v-btn>
                </v-card-actions>
              </v-card>

              <v-card v-else-if="displayError">
                <v-card-title class="headline grey lighten-2" primary-title>Usuń konto</v-card-title>
                <v-card-text class="modal-form">
                  Niestety nie udało się usunąć Twojego konta. Spróbuj ponownie później.
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="success" @click="dialogAccount = false; displayError= false">Zamknij</v-btn>
                </v-card-actions>
              </v-card>

              <v-card v-else>
                <v-card-title class="headline grey lighten-2" primary-title>Usuń konto</v-card-title>
                <v-card-text class="modal-form">
                  Czy jesteś pewna/pewien że chcesz usunąć konto w systemie Helpado?
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="#f00" class="alert-button button-col" @click="deleteCurrentUser">Usuń</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
        </v-col>
      </v-row>
    </v-form>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import BaselineLayout from "@/layouts/BaselineLayout.vue";
import { namespace } from "vuex-class";

const account = namespace("Account");
const login = namespace("Login");

@Component
export default class AccountActionsPanel extends Vue {
  private dialogPassword: boolean = false;
  private dialogAccount: boolean = false;
  private newPassword: string = "";
  private displayConfirmation: boolean = false;
  private displayError: boolean = false;

  @account.State
  public loadingModal: boolean;

  @account.Action
  public changePassword: (password: String) => Boolean;

  @account.Action
  public deleteUser: () => Boolean;

  @login.Action
  public logout: () => boolean;

  @Watch("dialogPassword")
  watchModal(value: boolean){
    this.newPassword = "";
  }

  public async submitNewPassword(){
    if(await this.changePassword(this.newPassword)){
      this.displayConfirmation = true;
      this.logout();
    } else this.displayError = true;
  }

  public async deleteCurrentUser(){
    if(await this.deleteUser()){
      this.displayConfirmation = true;
      this.logout();
    } else this.displayError = true;
  }
}
</script>

<style scoped>
.alert-button {
  color: white;
}

.action-label {
  margin-left: 1rem;
}

.action-card {
  margin: 2rem 0;
}

.button-col {
  float: right;
  margin: 0 10px;
}

.modal-form {
  margin-top: 2rem;
}
</style>