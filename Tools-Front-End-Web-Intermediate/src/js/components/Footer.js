import { html } from 'lit';
import LitWithoutShadowDom from './base/LitWithoutShadowDom';

class FooterApp extends LitWithoutShadowDom {
  render() {
    return html`
      <div class="main-footer bg-primary">
        <div class="container px-3 py-4">
          <p class="text-center text-white mb-0">
            Submission 1 | Tools Front-End Web Intermediate
          </p>
        </div>
      </div>
    `;
  }
}

customElements.define('footer-app', FooterApp);
