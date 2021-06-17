import { BaseComponent } from "./BaseComponent.js";

const style = /*html*/ `
<style>

.input-main {
    width: 89%;
    height:30px;
    padding: 5px 20px;
    margin: 8px 0;
    font-size: 14px;
    border: 1px solid black;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
}
.input-error {
    font-size: 13px;
    color: #DB5145;
}
</style>
`;

class InputWrapper extends BaseComponent {
    constructor() {
        super();

        this.props = {
            label: '',
            type: 'text',
            error: '',
            value: '',
            placeholder: '',
        };
    }

    static get observedAttributes() {
        return ['label', 'type', 'error', 'value', 'placeholder'];
    }

    render() {
        this._shadowRoot.innerHTML = /*html*/ `
            ${style}
            <div class="input-wrapper">
                    <input class="input-main" type="${this.props.type}" value="${this.props.value}" placeholder="${this.props.placeholder}">
                    <div class="input-error">${this.props.error}</div>
        </div>  
        `;
    }

    get value() {
        return this._shadowRoot.querySelector('.input-main').value;
    }
}

window.customElements.define('input-wrapper', InputWrapper);