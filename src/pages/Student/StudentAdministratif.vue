<template lang="">
    <div class="row">
        <div class="col-12">
            <div class="row">
                <div class="tab-header-title"> 
                    <p class="title"> MES DOCUMENTS ADMINISTRATIFS</p> 
                </div>
            </div>
            <div class="row" id="link">
                <div class="col-3">
                    <div class="menu">
                        <ul>
                            <li><router-link to="/app/students/administratif/bulletin">MES BULLETINS</router-link></li>
                            <li><router-link to="">MES FACTURES</router-link></li>
                            <li><router-link to="">MES AVIS D'IMPOSITIONS</router-link></li>
                            <li><router-link to="">MES ATTESTATIONS</router-link></li>
                        </ul>
                    </div>
                </div>
                <div class="col-8  offset-1">
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
    
</template>

<script setup>
    
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Montserrat');

    .tab-header-title {
        width:100%;
        height: 80px;
        border: 1px solid #ccc;
        background-color: #00427A;
    }

    .title {
        color: white;
        text-align: center;
        margin-top: 27px;
        font-size: 20px;
        font-weight: bold;
        font-family: 'Montserrat';
        letter-spacing: 5px;
    }

    .menu ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
    }

    li {
        text-align: center;
        border-bottom: 1px solid white;
        margin-bottom: 10px;
    }

    li a {
        display: block;
        color: white;
        padding: 8px 16px;
        font-family: 'Montserrat';
        text-decoration: none;
        font-weight: bold;
        letter-spacing: 2px;
        background-color:  #00427A;
        cursor: pointer;
    }
   
   #link {
       margin-top:50px
   }

</style>