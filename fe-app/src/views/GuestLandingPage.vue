<template>
  <BaselineLayout title="Helpado">
    <v-container>
      <v-row>
        <v-col>
          <EntryCarousel />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4">
          <v-card class="info-card">
            <v-card-text>
              <strong>JESTEŚMY TUTAJ BY POMÓC</strong>
              <br />Nasza aplikacja o nazwie Helpado jest systemem umożliwiającym udzielenie pomocy osobom potrzebującym poprzez wykonanie dla nich zakupów.
              Pomysł na aplikację narodził się z analizy potrzeb starszego i chorego społeczeństwa w obliczu pandemii,
              aby ułatwić im codzienne funkcjonowanie i zapewnić bezpieczeństwo w tych trudnych czasach.
              <v-spacer />
            </v-card-text>
          </v-card>
          <v-card>
            <v-card-text>
              <strong>Opinie szczęśliwych użytkowników:</strong>
              <br />
              <i>-"To jest wspaniałe!!! Nareszczie nie muszę chodzić sama po papier toaletowy w tej okropnej maseczce, w której czuje jaki mam okropny oddech. DZIĘKUJĘ HELPADO!!"</i>
              <br />
              <br />
              <i>-"Bardzo mi się podoba ten interfejs. Wszystko mam pod ręką i tam gdzie trzeba. W prosty sposób mogę znaleźć potrzebujących ludzi w okolicy. Poznaje ich adresy. A kiedy już usną to kradnę z ich domów co się da"</i>
              <br />
              <br />
              <i>-"Moja babcia nareszcie może otrzymywać pomoc od kogoś, kto nie jest mną. W końcu trochę wolnego. HELPADU FOR THE WIN!!!"</i>
              <br />
              <v-spacer />
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="8">
          <v-card class="info-card">
            <v-card-text>
              Pewnego razu żył sobie Boomer.
              <br />Boomer był stary i niedołężny.
              <br />Bolały go stopy.
              <br />Bolała go głowa.
              <br />Bolały go plecy.
              <br />Bolała go sytuacja polityczna w kraju bez pieniędzy i z PISem u władzy.
              <br />Nie radził sobie z tym wszystkim.
              <br />Pewnego dnia stała się tragedia.
              <br />Do kraju biednego Boomera przybył straszny wirus co nosił koronę.
              <br />Nazywał sie Koronawirus.
              <br />Władza państwa zamknęła biednego Boomera w mieszkaniu przez co
              nie mógł sobie sam zrobić zakupów przez co często miał brudno w domu i chodził głodny.
              <br />Biedne było życie Boomera.
              <br />Aż tu nagle.
              <br />Pewnego razu.
              <br />Do drzwi Boomera zapukał Wolontariusz.
              <br />Silny, umięśniony czarny mężczyzna gej z torbą zakupów dla biednego staruszka.
              <br />Był to sąsiad Boomera, który widział, że nie łatwo mu jest teraz, więc postanowił mu pomóc.
              <br />Boomer tak się ucieszył, że w końcu ktoś mu pomógł.
              <br />Widząc radość na twarzy Boomera, Wolontariusz postanowił skontaktować się z ekspertami branży IT,
              <br />aby oni właśnie, wykorzystując swoje doświadczenie i więdzę, stworzyli aplikację, która umożliwi Boomerom wyszukiwać wolontariuszy.
              <br />W ten właśnie sposób powstała aplikacja <strong><i>HELPADO</i></strong>, która niesie pomoc uciśnionym i potrzebującym.
              <br />
              <v-spacer />
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </BaselineLayout>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BaselineLayout from "@/layouts/BaselineLayout.vue";
import EntryCarousel from "@/components/EntryCarousel.vue";

@Component({
  components: {
    BaselineLayout,
    EntryCarousel
  }
})
export default class GuestLandingPageView extends Vue {}
</script>

<style scoped>
.info-card {
  margin: 1rem 0;
}
</style>