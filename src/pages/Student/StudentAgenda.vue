<template lang="">
    <div>
        <div class="chip"> 
        </div> <br>
        <TheCalendar/>
        <CustomModal class="modal-listes-cours" :render="false">
            <div class="q-gutter-md" id="form-search">
                <q-input rounded outlined v-model="text" label="Recherche">
                    <template v-slot:append>
                    <q-avatar>
                        <q-icon name="search" size="32px"/>
                    </q-avatar>
                    </template>
                </q-input>
            </div>
            <table id="table-cours">
                <tr>
                    <th>Cours</th>
                    <th>Leçon</th>
                    <th>Nom du document</th>
                    <th>Type</th>
                    <th>Session</th>
                    <th>Date</th>
                    <th>Télécharger</th>
                </tr>
                <tr>
                    <td>Les psaumes</td>
                    <td>N°2</td>
                    <td>Mon document numéro 1</td>
                    <td>Devoir</td>
                    <td>H22</td>
                    <td>16/03/22</td>
                    <td>
                        <q-btn round icon="download" id="download-cours">
                        </q-btn>
                    </td>
                </tr>
                <tr>
                    <td>Les évangiles</td>
                    <td>N°3</td>
                    <td>Mon document numéro 1</td>
                    <td>Examen</td>
                    <td>H22</td>
                    <td>16/03/22</td>
                    <td>
                        <q-btn round icon="download" id="download-cours">
                        </q-btn>
                    </td>
                </tr>
                <tr>
                    <td>Apocalypse</td>
                    <td>N°5</td>
                    <td>Mon document numéro 1</td>
                    <td>Examen</td>
                    <td>H22</td>
                    <td>16/03/22</td>
                    <td>
                        <q-btn round icon="download" id="download-cours">
                        </q-btn>
                    </td>
                </tr>
            </table>
        </CustomModal>
    </div>
</template>

<script setup>
import TheCalendar from 'src/components/Agenda/TheCalendar.vue';
import CustomModal from 'src/components/lib/CustomModal.vue';

</script>

<style scoped>
    .chip {
        display: inline-block;
        padding: 22px 903px;
        height: 30px;
        /* font-size: 18px; */
        line-height: 50px;
        border-radius: 25px;
        background-color: #f1f1f1;
    }

    #table-cours {
        font-family: 'Montserrat';
        border-collapse: collapse;
        width: 80vw;
    }

    #table-cours td, #table-cours th {
        padding: 8px;
        text-align: center;
    }

    #table-cours tr:nth-child(even){background-color: #f2f2f2;}

    #table-cours tr:hover {background-color: #ddd;}

    #table-cours th {
        padding-top: 12px;
        padding-bottom: 12px;
        text-align: center;
        background-color: #00427A;
        color: white;
    }

    #download-cours {
        position: relative;
        background-color: #C41526;
        color:white;
        height: 30px;
        width: 30px;
        border-radius: 50%;
        opacity: 1;
    }

    #form-search {
        width: 300px;
        height: 84px;
        float: right;
        margin-top: -82px;
        margin-right: 100px
    }

    .modal-listes-cours {
        width: 60vh !important;
    }
</style>