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
import {} from '@polymer/polymer/lib/elements/dom-repeat.js';
import {} from '@polymer/polymer/lib/elements/dom-if.js';
import "@polymer/iron-icons/iron-icons";
import "@polymer/iron-icon/iron-icon";
import './shared-styles/shared-styles.js';
import './icons/ithings-icons.js';

class MyNavigation extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
        }

        a {
            display: block;
            text-decoration: none;
            padding: 15px 15px;
            line-height: 20px;
            font-size: 14px;
            height: 50px;
            color: var(--app-text-color);
            text-transform: uppercase;
            box-sizing: border-box;
            outline: none;
        }

        iron-icon{
            width: 20px;
            height: 20px;
            margin-right: 10px;
            margin-left: 37px;
        }

        .backmenu {
            background-color: #E5EBEF;
            border-bottom: 1px solid var(--medium-blue-grey);
        }

        .mainmenu {
            background-color: #ECF2F6;
        }

        .globalmenu {
            background-color: #E5EBEF;
            border-top: 1px solid var(--medium-blue-grey);
        }

        a[selected] {
          color: var(--app-accent-color);
          background-color: white;
        }

        a iron-icon{
          --iron-icon-fill-color: var(--app-text-color);
        }

        a[selected] iron-icon{
          --iron-icon-fill-color: var(--app-accent-color);
        }

      </style>

      <template is="dom-if" if="[[showMenu]]">
          <iron-selector selected="[[currentPage]]" attr-for-selected="name" class="drawer-list" role="navigation">
            <template is="dom-if" if="[[showPrevious]]">
                <div class="backmenu">
                    <a name="[[previousPage]]" href="[[rootPath]][[previousPage]]">
                        <iron-icon icon="ithings-icons:arrow-back"></iron-icon>
                        [[previousLabel]]
                    </a>
                </div>
            </template>
            <div class="mainmenu">
                <template is="dom-repeat" items="[[currentNavigation]]">
                    <a name="[[item.page]]" href="[[rootPath]][[item.page]]">
                        <iron-icon icon="ithings-icons:[[item.icon]]"></iron-icon>
                        [[item.label]]
                    </a>
                </template>
            </div>
            <div class="globalmenu">
                <template is="dom-repeat" items="[[globals]]">
                    <a name="[[item.page]]" href="[[rootPath]][[item.page]]">
                        <iron-icon icon="ithings-icons:[[item.icon]]"></iron-icon>
                        [[item.label]]
                    </a>
                </template>
            </div>
          </iron-selector>
      </template>
    `;
  }

  static get properties() {
      return {
        previousPage: {
            type: String,
            value: "subscriberlist"
        },
        previousLabel: {
            type: String,
            value: "Service User List"
        },
        showPrevious: {
            type: Boolean,
            value: false
        },
        rootPath: {
            type: String,
            reflectToAttribute: true
        },
        currentPage: {
            type: String,
            notify: true,
            observer: '_changeNavigation'
        },
        currentNavigation: {
            type: Array,
            reflectToAttribute: true
        },
        globals: {
            type: Array,
            value: [
                { label: "MY ACCOUNT", page: "accountsetup", icon: "account" }, 
                { label: "SUPPORT", page: "supportpage", icon: "support" }, 
                { label: "LOGOUT", page: "logoutpage", icon: "contact" }
            ]
        },
        firstlevel: {
            type: Object,
            value: {
                "tecadmin": [ 
                    { label: "SERVICE PROVIDER DETAILS", page: "providerdetails" }, 
                    { label: "USERS", page: "providerusers" }
                ],
                "tecaccessor": [ 
                    { label: "SERVICE USERS", page: "serviceusers" }, 
                    { label: "CARE HOMES", page: "carehomes" }
                ],
                "techassistant": [
                    { label: "DEVICES", page: "devicespage" }
                ],
            }
        },
        secondlevel: {
            type: Object,
            value: { 
                "SERVICE PROVIDER": [ 
                    { label: "GENERAL DETAILS", page: "subscribergeneral" }, 
                    { label: "MANAGE EVENTS", page: "manageevents" }, 
                    { label: "MANAGE DEVICES", page: "managedevices" }, 
                    { label: "MANAGE CARETAKERS", page: "managecaretakers" }
                ],
                "CARE HOME": [ 
                    { label: "GENERAL DETAILS", page: "carehomegeneral" }, 
                    { label: "MANAGE EVENTS", page: "manageevents" }, 
                    { label: "MANAGE DEVICES", page: "managedevices" }
                ]
            }
        },
        pageNavigation: {
            type: Object,
            value: {}
        },
        showMenu: {
            type: Boolean,
            value: true
        },
        roleName: {
            type: String
        }
      };
  }

  ready() {
      super.ready();
      this.pageNavigation = {};
      this.pageNavigation['providerdetails'] = this.firstlevel['tecadmin'];
      this.pageNavigation['providerusers'] = this.firstlevel['tecadmin'];
      this.pageNavigation['login'] = [];
      this.currentNavigation = [ { label: "View1", page: "view1", icon: "patient-dashboard" },
                    { label: "View2", page: "view2", icon: "patient-dashboard" },
                    { label: "View3", page: "view3", icon: "patient-dashboard" }];
  }

  _changeNavigation(page) {
      if (this.currentPage == 'login') {
          this.showMenu = false;
      } else {
          this.showMenu = true;
      }

      this.currentNavigation = this.pageNavigation[this.currentPage];

      if (this.currentNavigation == undefined) {
          var role = this.roleName;
          if (role == 'DefaultRole') {
              role = "tecadmin";
          }
          this.currentNavigation = this.firstlevel[role];
      }
  }
}

window.customElements.define('my-navigation', MyNavigation);
