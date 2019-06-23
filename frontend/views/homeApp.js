let app = new Vue({
    el: "#home",
    data: {
        siteName: "PROPER GANDER"
    },
    computed:{
        leftPaneClass(){
            return this.loginState ? this.leftPaneClassState1 :
                this.leftPaneClassState2;
        },
        rightPaneClass() {
            return this.loginState ? this.rightPaneClassState1 :
                this.rightPaneClassState2;
        }
    },
    methods: {
        changeState(){
            this.loginState = !this.loginState;
        }
    },
});
