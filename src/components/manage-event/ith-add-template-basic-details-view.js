import { PolymerElement, html } from '@polymer/polymer/polymer-element';
import  '@polymer/iron-flex-layout/iron-flex-layout-classes';
import '@polymer/paper-icon-button/paper-icon-button';
import '@polymer/paper-radio-button/paper-radio-button';
import '@polymer/paper-radio-group/paper-radio-group.js';
import '@polymer/iron-input/iron-input';
import '@polymer/iron-icons/iron-icons';
import '../../shared-styles/input-styles';
import '../../shared-styles/shared-styles';
import '../../elements/ith-event-status-select/ith-event-status-select.js';
import '../../elements/ith-multi-select/ith-multi-select.js';
import '../../elements/ith-dropdown-menu/ith-dropdown-menu.js';

class IthAddTemplateBasicDetailsView extends (PolymerElement) {
  static get template() {
    return html`
      <style include="shared-styles input-styles iron-flex iron-flex-factors iron-flex-alignment">
        :host {
          display: block;
        }
        .container {
          padding: 0px 82px 37px 0px;
        }
        .view-container {
          padding: 23px 23px 0px 48px;
          background: var(--light-theme-background-color);
        }
        .add-info {
          background: var(--very-pale-blue-grey);
          margin-bottom: 24px;
          padding: 21px 40px 21px 37px;
        }
        input {
          font-size: 14px;
          padding-left: 6px;
        }
        ith-event-status-select {
          width: 140px;
          padding-bottom: 27px;
        }
        paper-radio-group {
          margin: 24px 0px 24px 0px;
        }
        paper-radio-button {
          padding: 0px 14px 0px 0px;
        }
        .min-drop-down {
          margin-right: 24px;
        }
        .minmum-dropdown {
          width: 50%;
        }
      </style>
      <div class="layout horizontal add-template-header center">
        <div class="add-template-header-title flex-1">Template Details</div>
        <div class="help-icon-container">
          <paper-icon-button icon="icons:help-outline" class="help-icon"></paper-icon-button>
          <div class="help-info-container">
            <div class="help-title">Help title</div>
            <div class="help-info">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages.
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              </p>
            </div>
          </div>
        </div>
      </div> 
      
      <div class="layout horizontal add-template-view-container">
        <div class="view-container layout horizontal flex-1"> 
          
          <div class="container layout vertical flex-1">
            <div class="basic-detail-title">Template name</div>
            <iron-input bind-value="{{_templateTitle}}">
               <input id="name" placeholder="eg. Getting out of Bed">
            </iron-input>
            <div class="basic-detail-title basic-detail-title-padding">Short description</div>
            <textarea id="description" rows="5" autocomplete="off" placeholder="Please add short description to describe the template"></textarea>
            <div class="basic-detail-title basic-detail-title-padding">Category</div>
            <ith-multi-select id="category" items="[[_eventTemplateCategories]]" 
              placeholder-text="eg Health & Nutrition, Patient Activity" default-text="eg Health & Nutrition, Patient Activity">
            </ith-multi-select>
          </div>


          <div class="add-info flex-1 layout vertical">
            <div class="basic-detail-title">Tag your template</div>
            <iron-input bind-value="{{_templateTag}}">
               <input id="tag" placeholder="eg. Dementia, Diabeties">
            </iron-input>
            <paper-radio-group selected="{{_selected}}">
              <paper-radio-button id="min" name="min">Min. vilolations</paper-radio-button>
              <paper-radio-button id="max" name="max">Min/Max vilolations</paper-radio-button>
            </paper-radio-group>
            <ith-dropdown-menu 
              hidden="[[!_hideMinMaxRadionBtn]]"
              class="minmum-dropdown" 
              label="Minimum:" 
              name="Minimum"
              id="minValue"
              items="[[_minMaxValue]]"
              value="10">
            </ith-dropdown-menu>
            <div class="layout horizontal">
              <ith-dropdown-menu
                hidden="[[_hideMinMaxRadionBtn]]"
                class="min-drop-down flex-1" 
                label="Minimum:" 
                name="Minimum"
                id="minMaxValue"
                items="[[_minMaxValue]]"
                value="1">
              </ith-dropdown-menu>
              <ith-dropdown-menu  
                hidden="[[_hideMinMaxRadionBtn]]"  
                class="drop-down flex-1" 
                label="Maximum:" 
                name="Maximum"
                id="maxValue"
                items="[[_minMaxValue]]"
                value="2">
              </ith-dropdown-menu>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  static get properties() {
    return {
      id: String,
      name: String,
      _minMaxValue: {
        type: Array,
        value: function(){
          return []
        }
      },
      _selected: {
        type: String,
        value: 'max',
        observer: '_onSelectedChanged'
      },

      _hideMinMaxRadionBtn: {
        type: Boolean,
        value: false
      },

       /**
       * Represents array of  event template categories list e.g. [{id: 1, name: 'Category  1'}, {id: 2, name: 'Category  2'}]
       */
      _eventTemplateCategories: {
        type: Array,
        value: [ { id: 'User Activities', name: 'User Activities'}, { id: 'Health & Nutrition', name: 'Health & Nutrition'}, { id: 'Security', name: 'Security'}, { id: 'Sensor Event', name: 'Sensor Event'} ]
      },

      _dayOfWeek: {
        type: Array,
        value: function(){
          return ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']
        }
      }
    }
  }
  
  connectedCallback(){
    super.connectedCallback()
    var elPaperRadioButton = this.shadowRoot.querySelectorAll('paper-radio-button');
    var number = [];
    var self = this;

    for(var i = 0 ; i < elPaperRadioButton.length ; i++){
      var elRadioContainer = elPaperRadioButton[i].shadowRoot.querySelector('#radioContainer');
      var onRadio = elRadioContainer.querySelector('#onRadio');
      var offRadio = elRadioContainer.querySelector('#offRadio');
      
      onRadio.style.backgroundColor= '#11367A';
      offRadio.style.backgroundColor= 'white';
    }
    for(var i=0;i<=60;i++){
      number.push(i)
    }
    this.set('_minMaxValue', number);
  }

  _stateChanged(state) {
    if (state.app.page === 'manage-events') {
      //this._eventTemplateCategories = getEventTemplateCategories(state);
    }
  }

  _onSelectedChanged(){
    if(this._selected === 'min'){
      this.set('_hideMinMaxRadionBtn', true);
      return;
    }

    this.set('_hideMinMaxRadionBtn', false);
  }

  getEvent() {
      var event = {};
      event.name = this.$.name.value;
      event.description = this.$.description.value;
      if (this.$.category.value.length > 0) {
          event.category = this.$.category.value[0];
      }
      event.tag = this.$.tag.value;
      event.appliesTo = "subscriber"; //for now, carehome not implemented
      event.eventType = "normal"; //current not modifiable?

      return event;
  }
}

window.customElements.define('ith-add-template-basic-details-view', IthAddTemplateBasicDetailsView);
