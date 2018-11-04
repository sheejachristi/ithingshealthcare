import { PolymerElement, html } from '@polymer/polymer/polymer-element';
import  '@polymer/iron-flex-layout/iron-flex-layout-classes';
import '@polymer/iron-icons/iron-icons';
import '@polymer/iron-icons/editor-icons';
import '@polymer/paper-button/paper-button';
import '@polymer/paper-checkbox/paper-checkbox';
import '../../elements/ith-multi-select/ith-multi-select.js';
import '../../elements/ith-dropdown-menu/ith-dropdown-menu.js';
import '../../shared-styles/paper-button-styles';
import '../../shared-styles/add-event-param-styles';
import '../../icons/ithings-icons.js';

class IthEventTriggerView extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles add-event-param-styles iron-flex iron-flex-factors iron-flex-alignment paper-button-styles">
      :host {
        display: block;
        padding-top: 20px;
      }  
      .frequency-width{
        width: 138px;
      }
      </style>
      <div class="layout horizontal add-template-header center">
        <div class="add-template-header-title flex-1">Event trigger</div>
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
         <div class="layout horizontal trigger-view-row-container flex-8">
          <div class="layout vertical flex-1 dropdown-margin">
            <div class="dropdown-title">Device type:</div>
            <ith-multi-select items="[[devices]]" value="[[_deviceValue]]"></ith-multi-select>
          </div>
          <ith-dropdown-menu value-is-object class="flex-1" items="[[_sensors]]"  value="sensor1" label="Sensor event:"></ith-dropdown-menu>
         </div>
         <div class="flex-1 editable-view layout vertical center-center">Editable on the front end?</div>
        </div>
        <div class="layout horizontal">
         <div class="layout horizontal trigger-view-row-container flex-8">
          <ith-dropdown-menu 
            class="flex-1 dropdown-margin" 
            value="{{_timePeriod}}" 
            name="timePeriod"
            label="Time Period/Duration" 
            items="[[_timePeriodLabel]]"
            on-value-changed="_onValueChanged">
          </ith-dropdown-menu>
          <div class="flex-1 layout horizontal">
            <ith-dropdown-menu 
                hidden$="[[!_hideTimePeriodDropDown]]" 
                value="9:00"
                name="timeFrom"
                class="from-drop-down flex-1" 
                placeholder="From"  
                label="Time from" 
                items="[[_timePeriods]]">
            </ith-dropdown-menu>
            <ith-dropdown-menu 
              value="14:00" 
              hidden$="[[!_hideTimePeriodDropDown]]" 
              class="flex-1" 
              placeholder="To"  
              name="timeTo"
              label="Time to" 
              items="[[_timePeriods]]">
            </ith-dropdown-menu>
            <ith-dropdown-menu 
              hidden$="[[_hideTimePeriodDropDown]]" 
              class="frequency-width" 
              placeholder="Duration"
              value="30 mins"
              name="duration"
              label="Time:" 
              items="[[_durations]]">
            </ith-dropdown-menu>
          </div>
         </div>
         <paper-checkbox checked class="flex-1 editable-view layout vertical center-center"></paper-checkbox>
        </div>
        <div class="layout horizontal">
          <div class="layout horizontal trigger-view-row-container flex-8">
            <ith-dropdown-menu class="dropdown-width" value="1" items="[[_frequency]]" label="Frequency:"></ith-dropdown-menu>
          </div>
          <paper-checkbox checked="{{_checked}}"  class="flex-1 editable-view layout vertical center-center"></paper-checkbox>
        </div>
       </div>
    `;
  }

  static get properties() {
    return {
      item: Object,

      devices: Array,

      _deviceValue: {
        type: Array,
        value: function(){
          return ['1','2']
        }
      },

      _sensors: {
        type: Array,
        value: function(){
          return [{'id': 'sensor1','name':'Bed occupied'}, {'id': 'sensor2', 'name': 'Door Sensor'},
          { 'id': 'sensor3', 'name': 'Bed Sensor'}]
        }
      },

      _timePeriodLabel: {
        type: Array,
        value: function(){
          return ['Time Period', 'Duration']
        }
      },

      _timePeriod: {
        type: String,
        value: 'Duration'
      },

      _timePeriods: {
        type: Array,
        value: function(){
          return ['0:00','1:00','1:30','2:00','3:00','3:30','4:00','4:30','5:00','6:00','6:30','7:00',
                 '7:30','8:00','8:30','9:00','10:00','11:00','12:00','12:30','13:00','13:30','14:00','14:30',
                 '15:00','15:30','16:00','16:30','17:00','17:30','18:00','18:30','19:00','19:30','20:00',
                 '20:30','21:00','21:30','22:00','22:30','23:00']
        }
      },

      _durations: {
        type: Array,
        value: function(){
          return []
        }
      },

      _hideTimePeriodDropDown: {
        type: Boolean,
        value: false
      },

      _checked: {
        type: Boolean,
        value: false
      },

      _frequency: {
        type: Array,
        value: function(){
          return []
        }
      }
    }
  }

  connectedCallback(){
    super.connectedCallback();
    var self = this;
    var number = [];
    var frequency = [];

    for(var i=0;i<=60;i++){
      number.push(i + ' mins')
      frequency.push(i);
    }

    this.set('_frequency', frequency);
    this.set('_durations', number);
  }

  _onValueChanged(e){
    if(e.target.value === 'Time Period'){
      this.set('_hideTimePeriodDropDown', true);
      return;
    }

    this.set('_hideTimePeriodDropDown', false);
  }
}

window.customElements.define('ith-event-trigger-view', IthEventTriggerView);
