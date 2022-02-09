<template>
    <div>
        <h4 class="titleContent">Ensemble des demandes d'inscription aux cours</h4>
        <div class="tableListsRegistration">
            <q-markup-table>
                <thead>
                    <tr>
                    <th class="text-center">Nom</th>
                    <th class="text-center">Diplôme</th>
                    <th class="text-center">Session</th>
                    <th class="text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="text-center"></td>
                        <td class="text-center">BTH</td>
                        <td class="text-center"></td>
                        <td class="text-center">
                            <a href="" style="text-decoration:none">Valider</a> &nbsp;
                            <a href="" style="text-decoration:none">Refuser</a>
                        </td>
                    </tr>
                </tbody>
            </q-markup-table>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>

<style scoped>
    .titleContent {
        text-align: center;
    }

    .tableListsRegistration {
        margin-left: 3em;
        margin-right: 3em;
    }

</style>