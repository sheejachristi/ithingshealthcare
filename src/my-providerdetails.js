/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-button/paper-button.js';
import './shared-styles/shared-styles.js';
import './shared-styles/input-styles.js';
import './shared-styles/paper-button-styles.js';
import './api/telehealthcareflow-lookup.js';
import './smart/smart-config.js';

class MyProviderDetails extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles input-styles paper-button-styles">
        :host {
          display: block;
        }
      </style>

      <div class="content-title">
        <h2>Edit Service Provider Details</h2>
      </div>
      <div class="card-header">
        Service Provider Address
      </div>
      <div class="card-content">
        <div class="content-two">
            <div class="row">
                <div class="element">
                    <div class="inputlabel">Street1</div>
                    <input id="street1" required type="text" value="[[provider.address.street1]]"></input>
                </div>
                <div class="spacer">&nbsp;</div>
                <div class="element">
                    <div class="inputlabel">Street2</div>
                    <input id="street2" type="text" required value="[[provider.address.street2]]"></input>
                </div>
            </div>
            <div class="row">
                <div class="element">
                    <div class="inputlabel">Pincode</div>
                    <input id="pincode" required type="text" value="[[provider.address.pincode]]"></input>
                </div>
                <div class="spacer">&nbsp;</div>
                <div class="element">
                    <div class="inputlabel">City</div>
                    <input id="city" type="text" required value="[[provider.address.city]]"></input>
                </div>
            </div>
            <div class="row">
                <div class="element">
                    <div class="inputlabel">State</div>
                    <input id="state" required type="text" value="[[provider.address.state]]"></input>
                </div>
                <div class="spacer">&nbsp;</div>
                <div class="element">
                    <div class="inputlabel">Country</div>
                    <input id="country" type="text" required value="[[provider.address.country]]"></input>
                </div>
            </div>
        </div>
      </div>
      <div class="card-header">
        Primary Contact
      </div>
      <div class="card-content">
        <div class="content-two">
            <div class="row">
                <div class="element">
                    <div class="inputlabel">Contact Name</div>
                    <input id="name" required type="text" value="[[provider.primaryContact.name]]"></input>
                </div>
                <div class="spacer">&nbsp;</div>
                <div class="element">
                    <div class="inputlabel">Contact Phone</div>
                    <input id="phone" type="text" required value="[[provider.primaryContact.phone]]"></input>
                </div>
            </div>
            <div class="row">
                <div class="element">
                    <div class="inputlabel">Contact Email</div>
                    <input id="email" required type="email" value="[[provider.primaryContact.email]]"></input>
                </div>
            </div>
        </div>
      </div>
      <div class="card-buttons layout horizontal">
          <span class="flex">&nbsp;</span>
          <paper-button class="filledWhite" on-click="_loginNow">SAVE PROVIDER DETAILS</paper-button>
      </div>

      <smart-config id="globals"></smart-config>
      <telehealthcareflow-lookup id="lookup" on-lookup-error="_showError" on-lookup-success="_setupProvider"></telehealthcareflow-lookup>
    `;
  }

  static get properties() {
      return {
        provider: {
            type: Object
        }
      };
  }

  _setupProvider(event) {
      if (event.detail.object != undefined) {
          this.provider = event.detail.object.result[0];
      }
  }

  _showError(event) {
      console.log(event.detail.error);
  }

  loadData() {
      var pname = this.$.globals.tenant;
      this.$.lookup.lookup("ServiceProvider", pname);
  }
}

window.customElements.define('my-providerdetails', MyProviderDetails);
