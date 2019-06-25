Vue.component("welcome-pane", {
  data: function() {
    return {
      welcomeHeader: "WELCOME BACK",
      welcomeText: "Log in to help us serve you best."
    };
  },
  methods: {
    updateState() {
      this.$emit("change-state");
    }
  },
  template: `

                <div class="center mssg-container justify-content-center">
                    <div class="mssg-text">
                        <h1 class="mssg-text-hdr">{{welcomeHeader}}</h1>
                        <p class="mssg-text-body">
                            {{welcomeText}}
                        </p>
                        <p class="mssg-text-footer">
                            Don't have an account?
                        </p>
                    </div>
                    <button type="button bottom-right"
                            class="form-btn btn
                                  btn-light ml-auto flex-end"
                            @click="this.updateState"
                    >Signup</button>
                </div>
`
});

Vue.component("join-pane", {
  data: function() {
    return {
      joinHeader: "JOIN US",
      joinText: "Become a part of the community today.",
      loginState: true
    };
  },
  methods: {
    updateState() {
      this.$emit("change-state");
      console.log("mongoose");
    }
  },
  template: `

                <div class="center mssg-container justify-content-center">
                    <div class="mssg-text">
                        <h1 class="mssg-text-hdr">{{joinHeader}}</h1>
                        <p class="mssg-text-body">
                            {{joinText}}
                        </p>
                        <p class="mssg-text-footer">
                            Have an account?
                        </p>
                    </div>
                    <button type="button bottom-right"
                            class="form-btn btn
                                  btn-light ml-auto flex-end"
                            @click="this.updateState"
                    >Login</button>
                </div>
`
});

Vue.component("login-pane", {
  data: function() {
    return {};
  },
  template: `
                <div class="login form-container justify-content-center">
                    <!-- <div class="center">
                         </div> -->
                    <!-- <form action="/users/login" style="" class="login-form" id="UserLoginForm" method="post" accept-charset="utf-8"> -->
                    <form name="login-form" class="login-form" action="" method="post">
                        <div class="form-group">
                            <h1 class="input-hdr center">LOG IN</h1>
                            <div class="input-group">
                            <input name="data[User][username]"
                required="required" class="form-control mx-auto" placeholder="Username" maxlength="255" type="text" id="UserUsername">
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="input-group">
                            <input name="data[User][password]"
                required="required" class="form-control mx-auto" placeholder="Password" type="password" id="UserPassword">
                            <i class="glyphicon glyphicon-lock"></i>
                            </div>
                            <center><a href=""><p class="grey-text"><i>Forgot your password?</i></p></a></center>
                        </div>
                        <div class="center form-group">
                            <button type="button " class="form-btn btn
                btn-light mx-auto">Sign in</button>
                        </div>
                    </form>
                </div>

`
});

Vue.component("signup-pane", {
  template: `
                <div class="login form-container justify-content-center">
                    <form name="login-form" class="login-form" action="/api/signup/" method="post">
                        <div class="form-group">
                            <h1 class="input-hdr center">Sign up</h1>
                            <div class="input-group">
                            <input name="name"
                required="required" class="form-control mx-auto"
 placeholder="Full Name" maxlength="255" type="text">
                           <input name="password"
                required="required" class="form-control mx-auto" placeholder="Password" type="password" id="UserRepeatPassword">
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="input-group">
                            <input name="email"
                required="required" class="form-control mx-auto" placeholder="Email" type="email">
                           <input name="repass"
                required="required" class="form-control mx-auto"
 placeholder="Repeat Password" type="password" id="UserPasswordConfirm">
                            <i class="glyphicon glyphicon-lock"></i>
                            </div>
                        </div>
                        <div class="center form-group">
                            <button type="button " class="form-btn btn
                btn-light mx-auto">Sign in</button>
                        </div>
                    </form>
                </div>

`
});

let app = new Vue({
  el: "#login",
  data: {
    currentLayout: 0,
    loginState: true,
    leftPaneClassState1: "col-md-5 col-sm-12 col-xs-12",
    leftPaneClassState2: "col-md-8 col-sm-12 col-xs-12",
    rightPaneClassState1: "col-md-7 col-sm-12 col-xs-12",
    rightPaneClassState2: "col-md-4 col-sm-12 col-xs-12"
  },
  computed: {
    leftPaneClass() {
      return this.loginState
        ? this.leftPaneClassState1
        : this.leftPaneClassState2;
    },
    rightPaneClass() {
      return this.loginState
        ? this.rightPaneClassState1
        : this.rightPaneClassState2;
    }
  },
  methods: {
    changeState() {
      this.loginState = !this.loginState;
    }
  }
});
