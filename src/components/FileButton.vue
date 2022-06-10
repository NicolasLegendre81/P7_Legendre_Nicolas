<template>
    <div class="input-group m-1">
        <label class="btn-sm rounded-pill bg-transparent bg-gradient text-white" 
            for="uploadFile-btn">{{Message}} <i class="fa-solid fa-image"></i>
        </label>
          <input id="uploadFile-btn" @change="selectedPic()" aria-label="Ajoutez une photo " type="file" style="display:none;">
          <span class="file-name">{{fileName}}</span>
    </div>
</template>
<script>
export default {
    props:["Message","uploadFile"],
    name:"FileButton",
    data() {
        return {
            fileName:"",
            newfile:""
        }
    },
    methods:{
        selectedPic:function() {
            const FileInput = document.querySelector("#uploadFile-btn");
            const fileName = FileInput.files[0].name;
            this.newfile = FileInput.files[0]
            console.log(this.newfile);
            this.fileName = fileName;
            this.uploadFile(this.newfile)
        },
    },
}
</script>
<style scoped>
.file-name{
    color: rgba(72, 158, 198, 0.744);
    overflow: hidden;  
}
</style>