import {BaseComponent} from "../BaseComponent.js"
import {
    verifyEmail,
    md5,
    getDataFromDocs,
    saveCurrentUser,
} from "../utils.js";

class LoginScreen extends BaseComponent {
    constructor() {
        super();

        this.state = {
            errors: {
                email: "",
                password: "",
            },

            data: {
                email: "",
                password: "",
            },
        };
    }

    render() {
        this._shadowRoot.innerHTML = /*html*/ `
        <link rel="stylesheet" href="./screen/login.css">
        <div class="login-screen">
            <form class="form-login">
                <h3 class="section-head">LOGIN</h3>
                <input-wrapper type="email" placeholder="Email" name="email" class="email" error="${this.state.errors.email}" value="${this.state.data.email}" ></input-wrapper>
                <input-wrapper type="password" placeholder="Password" name="password" class="password" error="${this.state.errors.password}" value="${this.state.data.password}" ></input-wrapper>
                <button class="btn-login" >SIGN IN</button>
            </form>
        
            <div class="text-center">
                <p class="create"><a href="#c/register">Create Account</a></p>
                <p><a href="#">Forgot your password ?</a></p>
            </div>
        </div> 
        `;

        this.$formLogin = this._shadowRoot.querySelector(".form-login");
        this.$formLogin.onsubmit = async (event) => {
            event.preventDefault();

            // lấy dữ liệu từ các input-wrapper
            let email = this._shadowRoot.querySelector(".email").value;
            let password = this._shadowRoot.querySelector(".password").value;

            // kiểm tra dữ liệu nhập vào, nếu có lỗi thì show ra
            let isPassed = true;

            if (email == "" || !verifyEmail(email)) {
                isPassed = false;
                this.state.errors.email = "Invalid email";
            } else {
                this.state.errors.email = "";
                this.state.data.email = email;
            }

            if (password == "") {
                isPassed = false;
                this.state.errors.password = "Input your password";
            } else {
                this.state.errors.password = "";
                this.state.data.password = password;
            }

            // kiểm tra dữ liệu người dùng
            if (isPassed) {
                let response = await firebase
                    .firestore()
                    .collection("users")
                    .where("email", "==", email)
                    .where("password", "==", md5(password))
                    .get();

                if (response.empty) {
                    alert("Email or password is not correct");
                } else {
                    // console.log(response);
                    // console.log(getDataFromDocs(response.docs));
                    const currentUser = getDataFromDocs(response.docs)[0];
                    console.log(currentUser);
                    // lưu người dùng hiện tại
                    saveCurrentUser(currentUser);
                    // chuyển sang trang index
                    router.navigate("/index");
                }
            }

            this.setState(this.state);
        };
    }
}

window.customElements.define("login-screen", LoginScreen);