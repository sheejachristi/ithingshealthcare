import { PolymerElement, html } from '@polymer/polymer/polymer-element';
import  '@polymer/iron-flex-layout/iron-flex-layout-classes';
import '@vaadin/vaadin-combo-box/vaadin-combo-box.js';
import '../../shared-styles/shared-styles';
import '../../shared-styles/input-styles';
import '../../elements/ith-multi-select/ith-multi-select.js';
import '../../shared-styles/add-event-param-styles';
import '../../api/telehealthcareflow-searcheventtemplates.js';

class IthEventBasicDetailView extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles add-event-param-styles input-styles iron-flex iron-flex-factors iron-flex-alignment">
        input {
          font-size: 14px;
          padding-left: 6px;
        }
        .search-icon {
            float:right;
            position: relative;
            top: -40px;
            right: 0px;
        }
      </style>
      <div class="layout horizontal add-template-header center">
        <div class="add-template-header-title flex-1">Event Detail</div>
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
      <div class="add-template-view-container">
        <div class="event-params-basic-detail-view layout horizontal">
          <div class="flex-2">
            <div class="container layout vertical flex-1">
              <vaadin-combo-box id="eventName" label="Template title:" placeholder="eg., motion in bedroom" filtered-items="[[events]]" 
                         on-filter-changed="_searchTemplates" on-value-changed="_selectTemplate">
              </vaadin-combo-box>
              <div class="basic-detail-title basic-detail-title-padding">Short description:</div>
              <textarea id="eventDescription" rows="5" autocomplete="off" placeholder="Please add short description to describe the template" disabled></textarea>
              <div class="basic-detail-title basic-detail-title-padding">Category:</div>
              <iron-input   disabled >
                <input id="eventCategory" disabled 
                    placeholder="eg Health & Nutrition, Dementia"/>
              </iron-input>
              <div class="basic-detail-title basic-detail-title-padding">Sensor Used:</div>
              <iron-input disabled>
                  <input id="tag" disabled placeholder="eg., bedroomsensor"/>
              </iron-input>
            </div>
          </div>
          <div class="flex-1"></div>
        </div>
      </div>
    <telehealthcareflow-searcheventtemplates id="search" on-events-result="_saveResult"></telehealthcareflow-searcheventtemplates>
    `;
  }

  static get properties() {
    return { 
      events: {
          type: Array,
          value: []
      },
      searchedEvents: {
          type: Object,
          value: {}
      },
      searchQuery: {
          type: String
      },
      eventTemplate: Object,
      categories: Array,
      running: {
          type: Boolean,
          value: false
      }
    }
  }

  _searchTemplates(event) {
      var query = event.detail.value;
      if ((!this.runnin) && (query != undefined) && (query.length > 3)) {
          this.$.search.search(query);
          this.running = true;
      }
  }

  _saveResult(event) {
      var mapped = {};
      var evts = [];

      for (var i = 0; i < event.detail.events.length; i++) {
          var evt = event.detail.events[i];
          mapped[evt.name] = evt;
          evts.push(evt.name);
      }

      this.searchedEvents = mapped;
      this.events = evts;
      this.running = false;
  }

  _selectTemplate() {
      var val = this.$.eventName.value;
      this.eventTemplate = this.searchedEvents[val];
      if (this.eventTemplate != undefined) {
          this.$.eventDescription.value = this.eventTemplate.description;
          this.$.eventCategory.value = this.eventTemplate.category;
          this.$.tag.value = this.eventTemplate.tag;
      }
  }

  getEventTemplate() {
      return this.eventTemplate;
  }
}

window.customElements.define('ith-event-basic-detail-view', IthEventBasicDetailView);
