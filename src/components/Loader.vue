<template>
    <div class="loading-box">
        <div class="lds-roller">
            <img src="@/assets/3-dots-fade.svg">
        </div>        
        <div>Loading</div>
    </div>
</template>
<style>
    .loading-box {
        position: fixed;
        width: 100%;
        height: 100%;
        margin: auto;
        background: #fff;
        box-shadow: 0px 0px 9px -2px #000;
        z-index: 999;
        left: 0px;
        right: 0px;
        text-align: center;
        padding: 10px;
        opacity: 0.9;
        top: 0px;
        bottom: 0px;
    }
    .lds-roller {
        display: inline-block;
        position: relative;
        margin-top: 20%;
    }

</style>