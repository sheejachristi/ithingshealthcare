import { PolymerElement, html } from '@polymer/polymer/polymer-element';
import  '@polymer/iron-flex-layout/iron-flex-layout-classes';
import  '@polymer/iron-form/iron-form';
import '../../elements/ith-dropdown-menu/ith-dropdown-menu.js';
import '../../elements/ith-recipients-settings/ith-recipients-settings.js';
import '../../shared-styles/shared-styles';
import {mixinBehaviors} from '@polymer/polymer/lib/legacy/class.js';
import {IronFormElementBehavior} from '@polymer/iron-form-element-behavior/iron-form-element-behavior';

class IthPatientEventSettings extends mixinBehaviors([IronFormElementBehavior], PolymerElement) {
  static get template() {
    return html`
      <style include="iron-flex iron-flex-factors iron-flex-alignment shared-styles">
        :host {
          display: block;
        }
       .event-title {
         font-size: 16px;
         font-family: 'Roboto-Bold';
         color: var(--app-accent-color);
         margin-bottom: 15px;
       }
       .main-list-container {
         margin-top: 15px;
       }
       .cell-content {
          padding: 15px 20px 17px 20px;
          box-sizing: border-box;
          border-bottom: 2px solid var(--light-theme-background-color);
          background: var(--very-pale-blue-grey);
       }
       .drop-down {
         margin-right: 20px;
       }
       .recipient-container {
         flex-direction: column;
       }
       @media (max-width: 1024px) {
        .list-container,
        .time-period-container  {
          flex-wrap: wrap;
        }
        .list-container {
          margin-bottom: 20px;
        }
       .list-container:last-child{
          margin-bottom: 0px;
        }
        .cell-content.time-period-container {
          padding: 0px;
        }
         ith-dropdown-menu,
         ith-recipients-settings,
         .recipient-container {
           min-width: 100%;
           box-sizing: border-box;
         }
         .from-drop-down {
           border-bottom: 2px solid  var(--light-theme-background-color);
           padding: 20px;
         }
         .time-period-dropdown {
          padding: 20px;
         }
        }
      </style>
      <div class="main-list-container">
        <div class="event-title">[[event.eventName]]</div>
        <div class="layout horizontal header-list-container">
          <div class="flex-1 layout vertical center-justified border header-cell-content">setting</div>
          <div class="flex-3 layout vertical center-justified header-cell-content">value</div>
        </div>
        <iron-form id="ironForm" >
          <form id="form">
            <div class="layout horizontal list-container">
              <ith-dropdown-menu class="border cell-content flex-1" 
                value="{{_timePeriod}}" 
                name="timePeriod"
                label="Time Period/Duration" 
                items="[[_timePeriodLabel]]"
                on-value-changed="_setValue">
              </ith-dropdown-menu>
              <div class="flex-3 layout horizontal cell-content time-period-container">
                <ith-dropdown-menu 
                    hidden$="[[!_hideTimePeriodDropDown]]" 
                    value="[[event.eventTrigger.timeFrom]]"
                    name="timeFrom"
                    class="drop-down from-drop-down flex-1" 
                    placeholder="From"  
                    label="Time from" 
                    items="[[_timePeriods]]"
                    on-value-changed="_setValue">
                </ith-dropdown-menu>
                <ith-dropdown-menu 
                  value="[[event.eventTrigger.timeTo]]" 
                  hidden$="[[!_hideTimePeriodDropDown]]" 
                  class="flex-1 time-period-dropdown" 
                  placeholder="To"  
                  name="timeTo"
                  label="Time to" 
                  items="[[_timePeriods]]"
                  on-value-changed="_setValue">
                </ith-dropdown-menu>
                <ith-dropdown-menu 
                  hidden$="[[_hideTimePeriodDropDown]]" 
                  class="flex-1 drop-down time-period-dropdown" 
                  placeholder="Duration"
                  value="[[event.eventTrigger.duration]]"
                  name="duration"
                  label="Duration" 
                  items="[[_durations]]"
                  on-value-changed="_setValue">
                </ith-dropdown-menu>
                  <div class="flex-1" hidden$="[[_hideTimePeriodDropDown]]"></div>
                <div class="flex-2"></div>
              </div>
            </div>
            <div class="layout horizontal list-container">
              <ith-dropdown-menu 
                class="border cell-content flex-1" 
                value-is-object 
                label="Sensor event" 
                items="[[sensors]]"
                name="sensorEvent"
                value="[[event.eventTrigger.sensorEvent.id]]"
                on-value-changed="_setValue">
              </ith-dropdown-menu>
              <div class="flex-3 layout horizontal cell-content">
                <ith-dropdown-menu  
                  class="drop-down flex-1" 
                  placeholder="Within"  
                  label="Within" 
                  name="frequency"
                  items="[[_durations]]"
                  value="[[event.eventTrigger.frequency]]"
                  on-value-changed="_setValue">
                </ith-dropdown-menu>
                <div class="flex-1"></div>
                <div class="flex-2"></div>
              </div>
            </div>
            <div class="layout horizontal list-container">
              <ith-dropdown-menu 
                value="{{_alertType}}" 
                class="border cell-content flex-1" 
                label="Alert type" 
                name="alertType"
                items="[[_alertTypes]]"
                on-value-changed="_setValue">
              </ith-dropdown-menu>
              <div class="flex-3 layout horizontal cell-content">
                <div class="flex-1 recipient-container" hidden="[[!_eq(_alertTypeDropDowm, 'Notification')]]">
                  <div class="dropdown-title">Recipents</div>
                  <ith-recipients-settings
                    items="[[recipents]]" 
                    name="recipients"
                    input-value="[[event.eventAlert.recipients]]">
                  </ith-recipients-settings>
                </div>
              <ith-dropdown-menu 
                class="drop-down flex-1" 
                hidden="[[!_eq(_alertTypeDropDowm, 'Workflow')]]"
                value="[[event.eventAlert.workflow]]"
                placeholder="Workflow template"  
                label="Workflow template" 
                name="workflow"
                items="[[workflowTemplates]]"
                on-value-changed="_setValue">
              </ith-dropdown-menu>
              <ith-dropdown-menu 
                class="drop-down flex-1" 
                hidden="[[!_eq(_alertTypeDropDowm, 'System')]]"
                value="[[event.eventAlert.forwardToSystem]]"
                placeholder="Forward to another system"  
                label="Forward to another system"
                name="forwardToSystem"
                items="[[forwardToSystem]]"
                on-value-changed="_setValue">
              </ith-dropdown-menu>
              <div class="flex-1"></div>
              <div class="flex-2"></div>
            </div>
          </form>
        </iron-form>
      </div>
    `;
  }

  static get properties() {
    return {
      event: Object,
      
      _timePeriods: {
        type: Array,
        value: function(){
          return ['0:00','1:00','1:30','2:00','3:00','3:30','4:00','4:30','5:00','6:00','6:30','7:00',
                 '7:30','8:00','8:30','9:00','10:00','11:00','12:00','12:30','13:00','13:30','14:00','14:30',
                 '15:00','15:30','16:00','16:30','17:00','17:30','18:00','18:30','19:00','19:30','20:00',
                 '20:30','21:00','21:30','22:00','22:30','23:00']
        }
      },

      recipents: Array,
      workflowTemplates: Array,
      forwardToSystem: Array,

      _durations: {
        type: Array,
        value: function(){
          return []
        }
      },

      _alertTypes: {
        type: Array,
        value: function(){
          return ['Notification', 'Workflow', 'Forward to another system']
        }
      },

      _timePeriodLabel: {
        type: Array,
        value: function(){
          return ['Time Period', 'Time Duration']
        }
      },

      _timePeriod: {
        type: String,
        observer: '_onTimePeriodChanged'
      },

      _alertType: {
        type: String,
        value: 'Notification',
        observer: '_onAlertTypeChanged'
      },

      _hidden: {
        type: Boolean,
        value: false,
        reflectToAttribute: true
      },

      _hideTimePeriodDropDown: {
        type: Boolean,
        value: false
      }
    }; 
  }

  static get observers() {
    return ['_setTimePeriodAndAlertType(event.eventTrigger.time, event.eventAlert.alertType)'];
  }

  connectedCallback(){
    super.connectedCallback();
    var self = this;
    var number = [];

    for(var i=0;i<=60;i++){
      number.push(i + ' mins')
    }
    
    this.set('_durations', number);
    setTimeout(() => {
      self._setValue();
    }, 100); 
  }

  _setValue(){
    var formSerializeData = this.$.ironForm.serializeForm()
    var obj = {...this.event, ...formSerializeData}
    this.set('value', obj);
  }

  _setTimePeriodAndAlertType(timePeriod, alertType){
    this.set('_timePeriod', timePeriod);
    this.set('_alertType', alertType);
  }
  
  _eq(str1, str2){
    return str1 === str2;
  }

  _onTimePeriodChanged(e){
    if(this._timePeriod === 'Time Period'){
      this.set('_hideTimePeriodDropDown', true);
      return;
    }

    this.set('_hideTimePeriodDropDown', false);
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
}

window.customElements.define('ith-patient-event-settings', IthPatientEventSettings);
