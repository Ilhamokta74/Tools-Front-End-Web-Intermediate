import { html, nothing } from 'lit';
import LitWithoutShadowDom from '../base/LitWithoutShadowDom';

class TextareaWithValidation extends LitWithoutShadowDom {
  static properties = {
    value: { type: String, reflect: true },
    rows: { type: Number, reflect: true },
    inputId: { type: String, reflect: true },
    validFeedbackMessage: { type: String, reflect: true },
    invalidFeedbackMessage: { type: String, reflect: true },
    required: { type: Boolean, reflect: true },
  };

  constructor() {
    super();
    this.rows = 5;
    this.required = false;
  }

  firstUpdated() {
    this._checkAvailabilityProperty();
  }

  _checkAvailabilityProperty() {
    if (!this.invalidFeedbackMessage) {
      throw new Error(`Attribute "invalidFeedbackMessage" must be set on ${this.localName}`);
    }
  }

  render() {
    return html`
      <textarea
        id=${this.inputId || nothing}
        class="form-control"
        rows=${this.rows}
        .value=${this.value || ''}
        ?required=${this.required}
        @input=${this._handleInput}
        style="resize:none"
      ></textarea>

      ${this.validFeedbackMessage ? html`<div class="valid-feedback">${this.validFeedbackMessage}</div>` : nothing}
      <div class="invalid-feedback">${this.invalidFeedbackMessage}</div>
    `;
  }

  _handleInput(event) {
    this.value = event.target.value;
  }
}

customElements.define('textarea-with-validation', TextareaWithValidation);
