<template lang="">
    <div>
        <table id="table-bulletin">
            <tr>
                <th>ID</th>
                <th>SEMESTRE</th>
                <th>ANNEE</th>
                <th>TYPE</th>
                <th>ACTION</th>
            </tr>
            <tr>
                <td><q-badge rounded class="badge"/> &nbsp; 581132</td>
                <td>A32</td>
                <td>2022</td>
                <td>Relevé officiel</td>
                <td>
                    <q-btn round icon="download" id="download-bulletin">
                    </q-btn>
                </td>
            </tr>
            <tr>
                <td><q-badge rounded class="badge"/> &nbsp; 581132</td>
                <td>A32</td>
                <td>2022</td>
                <td>Relevé officiel</td>
                <td>
                    <q-btn round icon="download" id="download-bulletin">
                    </q-btn>
                </td>
            </tr>
            <tr>
                <td><q-badge rounded class="badge"/> &nbsp; 581132</td>
                <td>A32</td>
                <td>2022</td>
                <td>Relevé officiel</td>
                <td>
                    <q-btn round icon="download" id="download-bulletin">
                    </q-btn>
                </td>
            </tr>
            <tr>
                <td>581132</td>
                <td>A32</td>
                <td>2022</td>
                <td>Relevé officiel</td>
                <td>
                    <q-btn round icon="download" id="download-bulletin">
                    </q-btn>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Montserrat');


#table-bulletin {
  font-family: 'Montserrat';
  border-collapse: collapse;
  width: 100%;
}

#table-bulletin td, #table-bulletin th {
  padding: 8px;
  text-align: center;
}

#table-bulletin tr:nth-child(even){background-color: #f2f2f2;}

#table-bulletin tr:hover {background-color: #ddd;}

#table-bulletin th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: center;
  background-color: #00427A;
  color: white;
}

#download-bulletin {
    position: relative;
    background-color: #C41526;
    color:white;
    height: 30px;
    width: 30px;
    border-radius: 50%;
    opacity: 1;
}

.badge {
    background-color: #C41526 !important;
}

</style>