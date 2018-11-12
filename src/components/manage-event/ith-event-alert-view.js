import { PolymerElement, html } from '@polymer/polymer/polymer-element';
import  '@polymer/iron-flex-layout/iron-flex-layout-classes';
import '@polymer/paper-radio-button/paper-radio-button';
import '@polymer/paper-radio-group/paper-radio-group.js';
import '../../shared-styles/shared-styles';
import '../../shared-styles/input-styles';
import '../../shared-styles/add-event-param-styles';
import '../../elements/ith-multi-select/ith-multi-select.js';

class IthEventAlertView extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles add-event-param-styles input-styles iron-flex iron-flex-factors iron-flex-alignment">
      :host {
        display: block;
        padding-top: 20px;
      }  
      paper-radio-button {
        padding: 17px 12px 0px 0px;
      }
      .alert-text {
        font-size: 16px;
        font-family: 'Roboto-Regular';
        color: var(--app-text-color);
      }
      #alertType {
        margin-right: 24px;
      }
      </style>
      <div class="layout horizontal add-template-header center">
      <div class="add-template-header-title flex-1">Event alert</div>
        <div class="help-icon-container">
          <paper-icon-button icon="icons:help-outline" class="help-icon"></paper-icon-button>
          <div class="help-info-container">
            <div class="help-title">Help title</div>
            <div class="help-info">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
              when an unknown printer took a galley of type and scrambled it to make a type
              specimen book. It has survived not only five centuries, but also the leap into 
              electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the 
              release of Letraset sheets containing Lorem Ipsum passages.
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
     <div class="add-template-view-container">
      <div class="layout horizontal">
        <div class="layout vertical trigger-view-row-container flex-8">
          <div class="alert-text">Will the alert trigger when the event trigger takes place or if it doesn't?</div>
           <paper-radio-group selected="{{_selected}}">
              <paper-radio-button name="take_palce">When it takes place</paper-radio-button>
              <paper-radio-button name="tale_not_palce">if it does not take place</paper-radio-button>
           </paper-radio-group>
        </div>
      </div>

      <div class="layout horizontal">
        <div class="layout horizontal trigger-view-row-container flex-8">
          <ith-dropdown-menu 
            value="{{_alertType}}" 
            class="flex-1"
            id="alertType" 
            label="Alert type"
            name="alertType"
            id = "alertType"
            items="[[_alertTypes]]">
          </ith-dropdown-menu>
          <div class="layout vertical flex-1">
            <div class="flex-1 recipient-container" hidden="[[!_eq(_alertTypeDropDowm, 'Notification')]]">
              <div class="dropdown-title">Recipents</div>
              <ith-recipients-settings
                items="[[recipents]]" 
                name="recipients"
                id="recipients"
                input-value="[[inputValue]]">
              </ith-recipients-settings>
            </div>
            <ith-dropdown-menu 
                class="drop-down flex-1" 
                hidden="[[!_eq(_alertTypeDropDowm, 'Workflow')]]"
                value="worlflow template1"
                placeholder="Workflow template"  
                label="Workflow template" 
                name="workflow"
                items="[[workflowTemplates]]">
              </ith-dropdown-menu>
              <ith-dropdown-menu 
                class="drop-down flex-1" 
                hidden="[[!_eq(_alertTypeDropDowm, 'System')]]"
                value="system1"
                placeholder="Forward to another system"  
                label="Forward to another system"
                name="forwardToSystem"
                items="[[forwardToSystem]]">
              </ith-dropdown-menu>
          </div>
        </div>
      </div>
      
      <div class="layout horizontal">
        <div class="layout vertical trigger-view-row-container flex-8">
          <div class="dropdown-title">Message:</div>
          <textarea rows="5" id="message" autocomplete="off" placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting industry."></textarea>
        </div>
      </div>
     </div>
    `;
  }

  static get properties() {
    return { 
      _selected: {
        type: String,
        value: 'take_palce'
      },

      workflowTemplates: {
        type: Array,
        value: function(){
          return  ['worlflow template1','worlflow template2']
        }
      },

      forwardToSystem: {
        type: Array,
        value: function(){
          return  ['system1']
        }
      },

      inputValue: {
        type: Array,
        value: function(){
          return  [{'contanct1': ['EMAIL','APP']},{'contanct2': ['EMAIL','APP']},{'contanct3': ['EMAIL','SMS']}]
        }
      },

      recipents: {
        type: Array,
        value: function(){
          return [{'id': 'contanct1','name':'apexa kheni'}, {'id': 'contact2', 'name': 'ruchita kheni'},
          {'id': 'contact3', 'name': 'nirmal baladaniya'}]
        }
      },

     _alertType: {
        type: String,
        value: 'Notification',
        observer: '_onAlertTypeChanged'
      },

      _alertTypes: {
        type: Array,
        value: function(){
          return ['No Action', 'Notification', 'Workflow', 'Forward to another system']
        }
      },
    }
  }

  connectedCallback(){
    super.connectedCallback()
    var elPaperRadioButton = this.shadowRoot.querySelectorAll('paper-radio-button');
    var number = [];

    for(var i = 0 ; i < elPaperRadioButton.length ; i++){
      var elRadioContainer = elPaperRadioButton[i].shadowRoot.querySelector('#radioContainer');
      var onRadio = elRadioContainer.querySelector('#onRadio');
      var offRadio = elRadioContainer.querySelector('#offRadio');
      
      onRadio.style.backgroundColor= '#11367A';
      offRadio.style.backgroundColor= 'white';
    }
  }

  _onAlertTypeChanged(e){
    if(this._alertType === 'Notification'){
      this.set('_alertTypeDropDowm', 'Notification');
      return;
    }

    if(this._alertType === 'Workflow'){
      this.set('_alertTypeDropDowm', 'Workflow');
      return;
    }

    this.set('_alertTypeDropDowm', 'System');
  }

  _eq(str1, str2){
    return str1 === str2;
  }

  getActionDetails() {
      var action = {};

      action.deliveryType = this.$.alertType.value;
      if (this.$.alertType.value == 'Notification') {
          action.deliveryType = "email";
          action.recipients = this.$.recipients.value;
          action.message = this.$.message.value;
      } else if (this.$.alertType.value == 'No Action') {
          action.actionName = 'noaction';
      }

      return action;
  }
}

window.customElements.define('ith-event-alert-view', IthEventAlertView);
