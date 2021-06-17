import { BaseComponent } from "../BaseComponent.js";

const style = /*html*/ `
<style>
    .content {
        width: 70%;
        margin: 100px auto;
    }
</style>
`;

class IndexScreen extends BaseComponent {
    constructor() {
        super();

    }

    render() {
        this._shadowRoot.innerHTML = /*html*/`
            ${style}
            <section class="index-screen">
            <div class="content">
                <form-add></form-add>
                <empl-list></empl-list>
            </div>
            </section>
        `;
    }
}

window.customElements.define('index-screen', IndexScreen);