import { BaseComponent } from "../BaseComponent.js";
import { getCurrentUser } from "../utils.js";
const style = `
<style>
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: sans-serif;
}


h2{
    text-align: center;
    font-size: 2rem;
    color: #111;
    margin-bottom: 1.5em;

}

.form-add{
    display: flex;
    justify-content: center;
    align-items: center;
}

input[type="text"]{
    margin: 12px 20px;
    border: none;
    padding: 12px 20px;
    border-bottom: 2px solid rebeccapurple ;
    font-weight: bold;
    font-size: 20px;
    outline: none;
}
button{
    
  padding: 10px 20px;
  border: none;
  background: #262626;
  text-transform: uppercase;
  color: #fff;
  font-size: 20px;
  cursor: pointer;
}

button:hover{
    background-color: #008489;
}

</style>
`;

class FormAdd extends BaseComponent {
    constructor() {
        super();
    }

    render() {
        this._shadowRoot.innerHTML = /*html*/`
            ${style}
            <h2>EMPLOYEES MANAGER</h2>
            <form class="form-add">
                <input  type="text" placeholder="Nhập name" name="name">
                <input type="text" placeholder="Nhập age" name="age">
                <button class="btn" id="addUser">ADD</button>
            </form>
            
            
            `;

        this.$formAdd = this._shadowRoot.querySelector('.form-add');
        this.$formAdd.onsubmit = async (event) => {
            event.preventDefault();
            // lấy dữ liệu
            let name = this.$formAdd.name.value.trim();
            let age = this.$formAdd.age.value.trim();
            console.log(name)

            // kiểm tra dữ liệu
            if (name == '' || age == '') {
                alert("Vui lòng nhập đủ thông tin!");
            } else {
                let currentUser = getCurrentUser();
                // thêm dữ liệu vào firestore
                await firebase.firestore().collection('Employee').add({
                    name: name,
                    age: age,
                    owner: currentUser.id,
                    date: new Date().toISOString()
                });

                this.$formAdd.reset();
            }

        }
    }
}

window.customElements.define('form-add', FormAdd);