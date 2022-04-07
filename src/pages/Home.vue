<template>
  <div class="row items-center" id="welcome_message">
    <div class="col-8">
      <h3 class="full-border q-mr-md" id="big_title">Bonjour Julien</h3>
    </div>
    <div class="col-4">
      <h3 class="full-border" id="little_title">Ma demande d’admission</h3>
    </div>
  </div>

  <section class="container" id="programs">
    <div class="row items-center" id="title">
      <div class="col-6" id="title_bordered">
        <h3>Les programmes Théologique</h3>
      </div>
      <div class="col-6">
        <p>
          Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Donec
          sollicitudin molestie malesuada. Quisque velit nisi, pretium ut lacinia in,
          elementum id enim.
        </p>
      </div>
    </div>

    <div class="row items-start" id="content">
      <div class="col-6">
        <ul>
          <li>CERTIFICAT EN ETUDE BIBLIQUE (C.EB)</li>
          <li>CERTIFICAT EN RELATION D’AIDE (C.RA)</li>
          <li>BACCALAUREAT EN THEOLOGIE (B.TH)</li>
          <li>MAITRISE EN DIVINITE (M.DIV)</li>
          <li>MAITRISE EN ART (M.A)</li>
          <li>MAITRISE EN THEOLOGIE (M.TH)</li>
          <li>MAITRISE EN THEOLOGIE PRATIQUE (M.THP)</li>
        </ul>
      </div>
      <div class="col-6">
        <div id="blue">
          <div class="row">
            <div class="col-12" id="cert">
              Le certificat en études bibliques vous permet d’obtenir un diplôme
              totalisant 30 crédits universitaires échelonnés sur une année ou plus. Le
              CEB offre la possibilité de combiner une sélection de cours pour approfondir
              votre étude de la Bible, de la théologie, de l’histoire de l’église, et de
              ses implications pour l’église et notre société.
            </div>
          </div>
          <div class="row" id="cta_container">
            <div class="col-6 text-center">
              <q-btn
                class="cta cta_blue"
                flat
                color="white"
                rounded
                label="Télécharger le programme"
              />
            </div>
            <div class="col-6 text-center">
              <q-btn class="cta cta_red" flat rounded color="white" label="M'inscrire" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="container" id="events">
    <div class="row" id="title">
      <div class="col-6" id="title_bordered">
        <h3>Les dates Importantes</h3>
      </div>
    </div>

    <div class="row" id="content">
      <div class="col-6">
        <ul>
          <li>
            <div>
              <h5>10 JANVIER 2022</h5>
              <span>Rentrée académique</span>
            </div>
          </li>
          <li>
            <div>
              <h5>24 JANVIER 2022</h5>
              <span>Fin de la période d’inscription</span>
            </div>
          </li>
          <li>
            <div>
              <h5>10 FEVRIER 2022</h5>
              <span>Fin de la période d’abandon sans échec</span>
            </div>
          </li>
          <li>
            <div>
              <h5>19 FEVRIER 2022</h5>
              <span>Conférence sur la mission</span>
            </div>
          </li>
        </ul>
      </div>

      <div class="col-6"></div>
    </div>
  </section>
</template>

<script setup></script>

<style scoped lang="scss">
ul {
  list-style: none;
  padding-inline: 65px;
}

.container {
  width: 90vw;
  margin: auto;
}

#welcome_message {
  .full-border {
    border: 1px solid transparent;

    &#big_title {
      text-align: right;
      font: normal normal bold 60px/70px Montserrat;
      letter-spacing: 5.4px;
      color: #ffffff;
      background-color: #00427a;
      padding-block: 43px;
      padding-right: 62px;
    }

    &#little_title {
      text-align: center;
      font: normal normal bold 30px/70px Montserrat;
      letter-spacing: 2.7px;
      color: #ffffff;
      background-color: #c41526;
      padding-block: 43px;
    }
  }
}

#programs {
  #title #title_bordered {
    display: inherit;
    align-items: center;

    h3 {
      font: normal normal 600 60px/73px Montserrat;
      letter-spacing: 3.6px;
      color: #c41526;
      text-align: right;
      padding-inline: 65px;
    }

    &::after {
      content: '';
      display: block;
      width: 21px;
      background-color: #c41526;
      height: 177px;
      border-radius: 20px;
    }
  }

  #title p {
    text-align: left;
    font: normal normal normal 20px/30px Montserrat;
    letter-spacing: 1.8px;
    color: #3b3738;
    padding-inline: 65px;
  }

  #content {
    ul li {
      text-align: right;
      font: normal normal bold 20px/53px Montserrat;
      letter-spacing: 1.8px;
      color: #3b3738;
    }

    #blue {
      background: #00427a;
      border: 1px solid #707070;
      padding: 36px;
      margin-left: 65px;
    }

    #cta_container {
      .cta {
        font: normal normal normal 20px/24px Montserrat !important;
        letter-spacing: 1.2px !important;
        text-transform: capitalize !important;

        &.cta_blue {
          border: 1px solid white !important;
          background-color: transparent !important;
        }

        &.cta_red {
          padding-inline: 83px;
          border: 1px solid #c41526 !important;
          background-color: #c41526 !important;
        }
      }
    }

    #cert {
      text-align: left;
      font: normal normal normal 20px/30px Montserrat;
      letter-spacing: 1.8px;
      color: #ffffff;
    }

    #cta_container {
      margin-top: 52px;
      margin-bottom: 46px;
    }
  }
}

#events {
  #title #title_bordered {
    display: inherit;
    align-items: center;

    h3 {
      font: normal normal 600 60px/73px Montserrat;
      letter-spacing: 3.6px;
      color: #c41526;
      text-align: right;
      padding-inline: 65px;
    }

    &::after {
      content: '';
      display: block;
      width: 21px;
      background-color: #c41526;
      height: 177px;
      border-radius: 20px;
    }
  }

  #content {
    text-align: right;

    h5 {
      font: normal normal bold 40px/70px Montserrat;
      letter-spacing: 3.6px;
      color: #3b3738;
      margin: 0 !important;
    }

    span {
      font: normal normal normal 30px/30px Montserrat;
      letter-spacing: 2.7px;
      color: #00427a;
    }

    ul li {
      margin-bottom: 48px;
    }
  }
}
</style>
