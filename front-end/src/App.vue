<template>
  <div class="container-fluid">   
    <router-view/> 
  </div>
</template>
<script>
export default {
 name:'App',
 components:{  
 }
}
</script>
<style>
#app {
  font-family: 'Lato', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  width: 100%;
  height:100%;
  display: flex;
  flex-direction: column; 
  margin: 0;
  box-sizing: border-box;
}
html{
  box-sizing: border-box; 
}
.container-fluid{
  padding-right: 0;
  padding-left:0;
}
.custom-btn{
  background:#FD2D01;
  transition: all 0.3s ease-in;
  box-shadow:0 0 1em rgba(28, 27, 27, 0.588);
}
.custom-btn:hover{
  box-shadow: 0 0 1em rgba(213, 48, 48, 0.588);
  transform: scale(105%);
}
.custom-btn:active{
  filter: hue-rotate(50deg);
}
.return-btn{
  transition: all 0.3s ease-in;
  box-shadow:0 0 1em rgba(28, 27, 27, 0.588);
}
.return-btn:hover{
  box-shadow: 0 0 1em rgba(213, 48, 48, 0.588);
  transform: scale(105%);
}
.return-btn:active{
  filter: hue-rotate(50deg);
}
.custom-header{
  background:#FD2D01
}
.feed{
  background: #cbc9c9;
}
a{
  text-decoration: none;
  color:black;
}
.modal-backdrop {
  position:inherit;
  top: 0;
  left: 0;
  z-index: 1050;
  width: 100vw;
  height: 100vh;
  background-color: #000;
}
.modal {
  position:fixed;
  left: 0;
  top:20%;
  z-index: 1055;
  display: none;
  width: 100%;
  height: 40em;
  overflow-x: hidden;
  overflow-y: auto;
  outline: 0;
}
</style>
