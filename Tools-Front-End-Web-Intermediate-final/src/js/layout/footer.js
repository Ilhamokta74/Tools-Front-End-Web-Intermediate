import { LitElement, html, css } from 'lit';

class FinalFooter extends LitElement {
  static styles = css`
    .main-footer {
      color: #f8f9fa;
      background-color: #212529;
      padding: 1rem;
      text-align: center;
    }

    .container {
      margin: 0 auto;
    }
  `;

  render() {
    const date = new Date();
    const year = date.getFullYear();

    return html`
      <footer class="main-footer">
        <div class="container">
          <p>Submission 2 | Tools Front-End Web Intermediate</p>
        </div>
      </footer>
    `;
  }
}

customElements.define('final-footer', FinalFooter);

export default FinalFooter;
