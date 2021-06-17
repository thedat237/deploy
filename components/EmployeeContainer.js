import { BaseComponent } from "../BaseComponent.js";
import { getDataFromDoc } from "../utils.js";
const style = /*html*/`
<style>
    * {
        font-family: sans-serif;
        font-size: 20px;
    }

    .tableEmployee{
       
        display:flex;
        justify-content:center;
        margin-top:30px
    }
    
    .tableEmployee td{
        font-size: 20px;
        padding: 15px 16px;
    }

    .btn{
        display:flex;
    }

    .btn-feature{
       
        padding: 10px 20px;
        border: none;
        background: #262626;
        text-transform: uppercase;
        color: #fff;
        font-size: 20px;
        cursor: pointer;
    }

    .btn-feature:hover{
        background-color: #008489;
    }

    .owner {
        color: #75B1A9;
    }
</style>
`;
const deletes = (id) => firebase.firestore().collection('Employee').doc(id).delete();
class StoryContainer extends BaseComponent {
    constructor() {
        super();

        this.state = {
            name: ''
        }

        this.props = {
            "id": '',
            "name": '',
            "age": '',
            "date": ''
        };
    }

    static get observedAttributes() {
        return ['id', 'name', "age", "date"];
    }
    
    render() {
        this._shadowRoot.innerHTML = /*html*/`
            ${style}
                <table class="tableEmployee">
                    <tr class="tr">
                        <td>${this.props.id} </td>
                        <td>${this.props.name} </td>
                        <td>${this.props.age}</td>
                        <td>${this.props.date}</td>
                        <td class="btn">
                            <button class="btn-feature" id="updateData" data-id="${this.props.id}">UPDATE</button>
                            <button class="btn-feature" id="deleteData" data-id="${this.props.id}">DELETE</button>
                        </td>
                    </tr>
                </table>
            
        
        `;
        
        
    }


    async componentDidUpdate() {
        if (this.props.owner) {
            let response = await firebase
                .firestore()
                .collection('Employee')
                .doc(this.props.owner)
                .get();
            let owner = getDataFromDoc(response);
            this.setState({
                name: owner.name
            })
        }
    }
}

window.customElements.define('empl-container', StoryContainer); 