import { BaseComponent } from "../BaseComponent.js";
import { getDataFromDocs, getDataFromDoc } from "../utils.js";

class EmployeeList extends BaseComponent {
    constructor() {
        super();

        this.state = {
            employs: []
        }
    }

    render() {
        let html = '';
        for (let employ of this.state.employs) {
            html += /*html*/`
            <empl-container 
                id="${employ.id}" 
                name="${employ.name}"
                age="${employ.age}" 
                owner="${employ.owner}" 
                date="${employ.date}">
            </empl-container>`;
        }

        this._shadowRoot.innerHTML = /*html*/`
            <div class="empl-list">${html}</div>
        `;
    }

    componentDidMount() {
        firebase.firestore().collection('Employee').onSnapshot((querySnapshot) => {
            // console.log(getDataFromDocs(querySnapshot.docs));
            this.setState({
                employs: getDataFromDocs(querySnapshot.docs)
            })
        });
    }
}

window.customElements.define('empl-list', EmployeeList);