Vue.component("video-container",{
    props:['thumbnailsrc','videotitle','videotext'],
    template:`
<div>
    <div class="collection-item">
        <div class="collection-text">
                <h1>{{videotitle}}</h1>
                <img
                    :src="thumbnailsrc" alt="List
            picture" class="video-thumbnail" width="" height="">
                <p>
                {{videotext}}
                </p>
        </div>
    </div>
</div>
`
});


let app = new Vue({
    el: "#home",
    data: {
        siteName: "PROPERGANDA",
        videoSrc: "",
        videoUploaded: false
    },
    computed:{
        leftPaneClass(){
            return this.loginState ? this.leftPaneClassState1 :
                this.leftPaneClassState2;
        },
        rightPaneClass() {
            return this.loginState ? this.rightPaneClassState1 :
                this.rightPaneClassState2;
        },
    },
    methods: {
        changeState(){
            this.loginState = !this.loginState;
        },
        videoSrcChanged(event){
            this.videoSrc = event.srcElement.value;
            if(this.videoSrc != "" && this.videoSrc.indexOf(".mp4")
               !== -1){
                this.videoUploaded = true;
            }
        },
        fileSelection(){
            this.$refs.fileInput.click();
        }
    },
});
