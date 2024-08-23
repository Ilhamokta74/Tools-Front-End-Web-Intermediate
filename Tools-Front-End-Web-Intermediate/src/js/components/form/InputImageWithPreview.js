import { html, nothing } from 'lit';
import LitWithoutShadowDom from '../base/LitWithoutShadowDom';

class InputImageWithPreview extends LitWithoutShadowDom {
  static properties = {
    inputId: { type: String, reflect: true },
    defaultImage: { type: String, reflect: true },
    defaultImageAlt: { type: String, reflect: true },
    validFeedbackMessage: { type: String, reflect: true },
    invalidFeedbackMessage: { type: String, reflect: true },
    required: { type: Boolean, reflect: true },
  };

  constructor() {
    super();
    this.defaultImage = '';
    this.defaultImageAlt = '';
  }

  render() {
    return html`
      <div style="width: 100%; height: 20rem" class="mb-3 ${!this.defaultImage ? 'd-none' : ''}">
        ${this._imagePreviewTemplate()}
      </div>
      <input
        type="file"
        class="form-control"
        id=${this.inputId || nothing}
        accept="image/*"
        ?required=${this.required}
        @change=${this._updatePhotoPreview}
      />
      ${this._feedbackTemplate()}
    `;
  }

  _updatePhotoPreview(event) {
    const photoInput = event.target;
    const previewImage = this.shadowRoot.querySelector(`#${this.inputId}ImgChange`);
    const defaultImageElement = this.shadowRoot.querySelector(`#${this.inputId}Img`);

    if (!photoInput.files.length) return;

    const file = photoInput.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      if (defaultImageElement) {
        defaultImageElement.classList.add('d-none');
      }
      previewImage.classList.remove('d-none');
      previewImage.style.backgroundImage = `url(${e.target.result})`;
    };

    reader.readAsDataURL(file);
  }

  _feedbackTemplate() {
    return html`
      ${this.validFeedbackMessage ? html`<div class="valid-feedback">${this.validFeedbackMessage}</div>` : nothing}
      ${this.invalidFeedbackMessage ? html`<div class="invalid-feedback">${this.invalidFeedbackMessage}</div>` : nothing}
    `;
  }

  _imagePreviewTemplate() {
    const previewStyle = `
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
    `;
    return html`
      ${this.defaultImage ? html`
        <img
          class="img-fluid h-100"
          src="${this.defaultImage}"
          alt="${this.defaultImageAlt}"
          id="${this.inputId || nothing}Img"
        />
      ` : nothing}
      <div
        class="w-100 h-100 ${this.defaultImage ? 'd-none' : ''}"
        style="${previewStyle}"
        id="${this.inputId || nothing}ImgChange"
      ></div>
    `;
  }
}

customElements.define('input-image-with-preview', InputImageWithPreview);
