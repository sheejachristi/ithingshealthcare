
import { PolymerElement, html } from '@polymer/polymer/polymer-element';
import '@polymer/iron-flex-layout/iron-flex-layout-classes';
import '@polymer/paper-dialog-behavior/paper-dialog-shared-styles';
import { PaperDialogBehavior } from '@polymer/paper-dialog-behavior/paper-dialog-behavior';
import '@polymer/paper-icon-button/paper-icon-button';
import '@polymer/paper-button/paper-button';
import '@polymer/paper-dialog-scrollable/paper-dialog-scrollable';
import '../../shared-styles/shared-styles';
import '../../shared-styles/add-event-param-styles';
import './ith-event-basic-detail-view.js';
import './ith-event-trigger-view.js';
import './ith-event-alert-view.js';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class';
//import { closeEventAddEditDialog } from '../../actions/patient-event-teplates.js';

class IthEventAddEditDialog extends (mixinBehaviors([PaperDialogBehavior], PolymerElement)) {
  static get template() {
    return html`
    <style include="shared-styles add-event-param-styles iron-flex iron-flex-factors iron-flex-alignment paper-dialog-shared-styles paper-button-styles">
      :host {
        display: block;
        min-width: 1024px;
      }
    </style>
    <div class="layout horizontal center main-header">
      <div class="main-title">[[_computeTitle(_id)]]</div>
      <span class="flex"></span>
      <paper-icon-button dialog-dismiss="" class="dialog-close" icon="close"></paper-icon-button>
    </div>
    <paper-dialog-scrollable dialog-element="[[_dialogElement]]">
      <div class="dialog-content-container">
          <ith-event-basic-detail-view categories="[[_eventTemplateCategories]]"></ith-event-basic-detail-view>
          <ith-event-trigger-view devices="[[_devices]]"></ith-event-trigger-view>
          <ith-event-alert-view></ith-event-alert-view>
      </div>
    </paper-dialog-scrollable>
    <div class="btn-container layout vertical end">
      <paper-button class="filledWhite">
        add event
      </paper-button>
    </div>
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

       /**
       * Represents array of devices. e.g. [{id: 1, name: 'Device  1'}, {id: 2, name: 'Device  2'}]
       */
      _devices: {
        type: Array,
        value: () => []
      },

     /**
      * Represents array of  event template categories list e.g. [{id: 1, name: 'Category  1'}, {id: 2, name: 'Category  2'}]
      */
     _eventTemplateCategories: {
      type: Array,
      value: () => []
      }
    };
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('iron-overlay-closed', this._closeDialog);
  }

  _closeDialog() {
  }

  _computeTitle(id){
    if(!id){
      return 'Add event';
    }

    return 'Edit event';
  }

  _stateChanged(state) {
    this.opened = state.patientEventTemplates.eventAddEditDialog.opened;
    this._id = state.patientEventTemplates.eventAddEditDialog.id;
    //this._eventTemplateCategories = getEventTemplateCategories(state);
    //this._devices = getDevices(state);
  }
}

customElements.define('ith-event-add-edit-dialog', IthEventAddEditDialog);
