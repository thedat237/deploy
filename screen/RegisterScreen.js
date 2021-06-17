import { BaseComponent } from "../BaseComponent.js";
import { verifyEmail, md5 } from "../utils.js";

class RegisterScreen extends BaseComponent {
    constructor() {
        super();

        this.state = {
            errors: {
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
            },

            data: {
                name: "",
                email: "",
                password: "",
            },
        };
    }

    render() {
        this._shadowRoot.innerHTML = /*html*/ `
        <link rel="stylesheet" href="./screen/register.css">
        <div class="register-screen">
            <form class="form-register">
                <h3 class="section-head">CREATE ACCOUNT</h3>
                <input-wrapper class="name" type="text" placeholder="Name" name="name" value="${this.state.data.name}" error="${this.state.errors.email}"></input-wrapper>
                <input-wrapper class="email" type="email" placeholder="Email" name="email" value="${this.state.data.email}" error="${this.state.errors.email}"></input-wrapper>
                <input-wrapper class="password" type="password" placeholder="Password" name="password" value="${this.state.data.password}" error="${this.state.errors.password}"></input-wrapper>
                <input-wrapper class="confirm-password" type="password" placeholder="Confirm Password" name="confirm-password" error="${this.state.errors.confirmPassword}"></input-wrapper>
                <button class="btn-register">CREATE</button>
            </form>
            <div class="text-center">
                <p class="create"><a href="#c/login">YOU HAVE A ACCOUNT ?</a></p>
                <p><a href="resetpass.html">FORGOT YOUR PASSWORD ?</a></p>
            </div>
        </div> 
        `;

        this.$formRegister = this._shadowRoot.querySelector(".form-register");
        this.$formRegister.onsubmit = async (event) => {
            event.preventDefault();

            // lấy dữ liệu từ các input-wrapper
            let name = this._shadowRoot.querySelector(".name").value;
            let email = this._shadowRoot.querySelector(".email").value;
            let password = this._shadowRoot.querySelector(".password").value;
            let confirmPassword =
                this._shadowRoot.querySelector(".confirm-password").value;

            // kiểm tra dữ liệu nhập vào, nếu có lỗi thì show ra
            let isPassed = true;
            
            if (name == "") {
                isPassed = false;
                this.state.errors.name = "Input your name";
            } else {
                this.state.errors.name = "";
                this.state.data.name = name;
            }
        
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

            if (confirmPassword == "" || confirmPassword != password) {
                isPassed = false;
                this.state.errors.confirmPassword =
                    "Your password confirmation is not correct";
            } else {
                this.state.errors.confirmPassword = "";
            }

            // lưu dữ liệu vào firestore
            if (isPassed) {
                this.state.data.password = md5(this.state.data.password).toString();
                // check email trùng
                const response = await firebase
                    .firestore()
                    .collection("users")
                    .where("email", "==", email)
                    .get();
                // thêm
                if (response.empty) {
                    await firebase.firestore().collection("users").add(this.state.data);
                    alert("Sign up successfully");
                    router.navigate("/login");
                } else {
                    alert("Your email has already been used");
                }
            }

            this.setState(this.state);
        };
    }
}

window.customElements.define("register-screen", RegisterScreen);