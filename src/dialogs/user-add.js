
import { PolymerElement, html } from '@polymer/polymer/polymer-element';
import '@polymer/iron-flex-layout/iron-flex-layout-classes';
import '@polymer/paper-dialog-behavior/paper-dialog-shared-styles';
import '@polymer/paper-radio-button/paper-radio-button.js';
import '@polymer/paper-radio-group/paper-radio-group.js';
import { PaperDialogBehavior } from '@polymer/paper-dialog-behavior/paper-dialog-behavior';

import '@polymer/paper-icon-button/paper-icon-button';
import '@polymer/paper-button/paper-button';
import '@polymer/paper-dialog-scrollable/paper-dialog-scrollable';
import '../shared-styles/shared-styles';
import '../shared-styles/input-styles';
import '../shared-styles/add-event-param-styles';
import '../api/telehealthcareflow-createtecuser.js';
import '../smart/smart-config.js';

import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class';

class UserAdd extends mixinBehaviors([PaperDialogBehavior], PolymerElement) {
  static get template() {
    return html`
    <style include="shared-styles input-styles add-event-param-styles iron-flex iron-flex-factors iron-flex-alignment paper-dialog-shared-styles paper-button-styles">
      :host {
        display: block;
        min-width: 1024px;
      }
    </style>
    <div class="layout horizontal center main-header">
      <div class="main-title">Add User</div>
      <span class="flex"></span>
      <paper-icon-button dialog-dismiss="" class="dialog-close" icon="close"></paper-icon-button>
    </div>
    <paper-dialog-scrollable dialog-element="[[_dialogElement]]">
      <div class="dialog-content-container">
          <div class="card-header">
            Provide User Details
          </div>
          <div class="card-content">
            <div class="content-single">
                <div class="row">
                    <div class="element">
                        <div class="inputlabel">User Email</div>
                        <input id="email" required type="email"></input>
                    </div>
                    <div class="element">
                        <div class="inputlabel">Name</div>
                        <input id="name" type="text" required></input>
                    </div>
                    <div class="element">
                        <div class="inputlabel">Phone</div>
                        <input id="phone" type="text" required></input>
                    </div>
                    <div class="element">
                        <paper-radio-group id="role" selected="tecassessor">
                            <paper-radio-button name="tecassessor">TEC Assessor</paper-radio-button>
                            <paper-radio-button name="techassistant">Technical Assistant</paper-radio-button>
                        </paper-radio-group>
                    </div>
                </div>
            </div>
          </div>
      </div>
    </paper-dialog-scrollable>
    <div class="btn-container layout vertical end">
      <paper-button class="filledWhite" on-tap="_createTECUser">
        add user
      </paper-button>
    </div>
    <telehealthcareflow-createtecuser id="createuser" on-created-user="_createdUser"></telehealthcareflow-createtecuser>
    <smart-config id="globals"></smart-config>
   `;
  }

  static get properties() {
    return {
      _dialogElement: {
        type: Object,
        value: function() {
          return this;
        }
      },
    };
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('iron-overlay-closed', this._closeDialog);
  }

  _closeDialog() {
  }

  _createTECUser() {
      var spname = this.$.globals.tenant;
      var email = this.$.email.value;
      var name = this.$.name.value;
      var phone = this.$.phone.value;
      var role = this.$.role.selected;
      this.$.createuser.createtecuser(spname, email, name, phone, role);
  }

  _createdUser(event) {
      var email = this.$.email.value;
      this.close();
      this.dispatchEvent(new CustomEvent('user-created', { detail: { 'email': email }}));
  }

}

customElements.define('user-add', UserAdd);
