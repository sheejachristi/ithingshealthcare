import { PolymerElement, html } from '@polymer/polymer/polymer-element';
import '@polymer/iron-flex-layout/iron-flex-layout-classes';
import '@polymer/paper-icon-button/paper-icon-button';
import '@polymer/iron-icons/iron-icons';
import '@polymer/paper-button/paper-button';
import './ith-add-template-basic-details-view.js';
import './ith-add-template-list-view.js';


class IthAddTemplateView extends (PolymerElement) {
  static get template() {
    return html`
      <style include="iron-flex iron-flex-factors iron-flex-alignment paper-button-styles">
        :host {
          display: block;
          overflow-y: auto;
        }
        .add-template-title {
          font-size: 24px;
          font-family: 'Roboto-Bold';
          color: var(--app-accent-color);
        }
        paper-icon-button.close-icon{
          --iron-icon-fill-color: var(--app-accent-color);
          padding: 0px;
          width: 30px;
          height: 30px
        }
        .cancel-title {
          color: var(--app-accent-color);
          font-size: 14px;
          font-family: 'Roboto-Regular';
          text-decoration: underline;
          cursor: pointer;
        }
       .main-header{
         padding-bottom: 11px;
         padding-right: 11px;
       }
        ith-add-template-list-view {
          margin-top: 20px;
        }
        paper-button.filledWhite {
          min-width: 200px;
        }
        .btn-container {
          background: var(--app-accent-color);
          padding: 20px 21px 21px 0px;
        }
      </style>
        <div class="layout horizontal main-header">
          <div class="add-template-title flex-1">Create/Edit template</div>
          <div class="layout horizontal center" on-tap="_hideCreateTemplateView">
            <paper-icon-button icon="icons:close" class="close-icon"></paper-icon-button>
            <div class="cancel-title self-center">Cancel</div>
          </div>
        </div>
        <ith-add-template-basic-details-view></ith-add-template-basic-details-view>
        <ith-add-template-list-view></ith-add-template-list-view>
        <div class="btn-container layout vertical end">
          <paper-button class="filledWhite">
            save template
          </paper-button>
        </div>
    `;
  }

  static get properties() {
    return {
      id: String,
      name: String
    }
  }

  _hideCreateTemplateView() {
      this.dispatchEvent(new CustomEvent("hide-createtemplate"));
  }
}

window.customElements.define('ith-add-template-view', IthAddTemplateView);
