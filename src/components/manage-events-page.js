import {
  PolymerElement,
  html
} from '@polymer/polymer/polymer-element';
import '../shared-styles/shared-styles';
import './manage-event/ith-manage-event-search-view.js';
import './manage-event/ith-manage-event-search-list-view.js';
import './manage-event/ith-patient-event-template-list-view.js';
import './manage-event/ith-add-template-view.js';

import '../api/telehealthcareflow-searcheventtemplates.js';
import '../api/telehealthcareflow-getsubscribereventdefs.js';

class ManageEventsPage extends (PolymerElement) {
  static get template() {
    return html `
      <style include="iron-flex iron-flex-factors iron-flex-alignment">
        :host {
          display: block;
          position: relative;
          background-color: var(--pale-blue-grey);
          @apply --layout-vertical;
          margin: 26px 40px 0px 40px;
        }
        .search-result {
          display: none;
        }
        :host([_is-search-mode]) .search-result { 
          display: flex;          
          box-shadow: 0px -3px 0px rgba(47, 48, 66, 0.15);          
          background: white;
          padding: 92px 24px 34px 24px;
          margin: -80px 40px 40px 40px;
        }
        :host([_mode="ADVANCED_SEARCH"]) .search-result{          
          padding-top: 42px;          
          margin-top: -41px;        
        }
        :host([_is-search-mode]) .event-templates-list{
          display: none;
        }
        :host([_screen-size='small']){
           overflow: auto;
        }
        :host([_view="CREATE_TEMPLATE"]){
          background-color: var(--light-theme-background-color);
          margin-top: 11px;
        }
        @media (max-width: 767px) {
          :host {
           overflow-y: auto;
         }
         :host([_is-search-mode]) .search-result {
            box-shadow: none;
            margin: 0px 4px 4px 4px;
            padding: 8px 5px 5px 5px;
         }
         :host {
           margin: 8px;
         }
        }
      </style>
      <template is="dom-if" if="[[_isVisible(_view, 'LIST')]]">
        <ith-manage-event-search-view on-search-now="_search" on-search-close="_resetSearch" search-query="{{searchQuery}}" search-result="{{searchResult}}" 
                    on-show-createtemplate="_showCreateTemplate" mode="{{_mode}}"></ith-manage-event-search-view> 
        <ith-manage-event-search-list-view class="search-result"  subscriber="[[email]]" on-added-templates="_reloadData"
            search-query="{{searchQuery}}" search-result="{{searchResult}}" mode="{{_mode}}"></ith-manage-event-search-list-view>
        <ith-patient-event-template-list-view class="event-templates-list" event-templates="[[subscriberEvents]]"></ith-patient-event-template-list-view>
      </template>
      <template is="dom-if" if="[[_isVisible(_view, 'CREATE_TEMPLATE')]]">
        <ith-add-template-view on-hide-createtemplate="_showListView"></ith-add-template-view> 
      </template> 
      <telehealthcareflow-searcheventtemplates id="searchTemplates" on-events-result="_setupResult"></telehealthcareflow-searcheventtemplates>
      <telehealthcareflow-getsubscribereventdefs id="geteventdefs" on-subscriber-events="_setupData"></telehealthcareflow-getsubscribereventdefs>
    `;
  }

  static get properties() {
    return {
      active: {
        type: Boolean,
        observer: '_onActiveChanged'
      },
      searchQuery: String,
      _isSearchMode: {
        type: Boolean,
        reflectToAttribute: true,
        value: false,
        computed: '_computeIsSearchMode(searchQuery, _mode)'
      },
      _mode: {
        type: String,
        reflectToAttribute: true
      },

      _view: {
        type: String,
        reflectToAttribute: true,
        value: "LIST"
      },

      _screenSize: {
        type: String,
        reflectToAttribute: true
      },

      searchResult: {
          type: Array,
          reflectToAttribute: true,
          notify: true,
      },

      subscriberEvents: {
          type: Array,
          reflectToAttribute: true,
          notify: true
      },
      email: {
          type: String
      }

    }
  }

  _computeIsSearchMode() {
    return (this.searchQuery || this._mode === 'ADVANCED_SEARCH');
  }

  _onActiveChanged(newVal, oldVal){
    if(!newVal && oldVal){
    }
  }

  _isVisible(a, b){
    return a === b;
  }

  _search(event){
    this.searchQuery = event.detail.searchQuery;
    this.$.searchTemplates.search(this.searchQuery);
  }

  _setupResult(event) {
      this.searchResult = event.detail.events;
  }

  _resetSearch() {
      this.searchQuery = "";
      this.searchResult = undefined;
  }

  _showCreateTemplate() {
      this._view = "CREATE_TEMPLATE";
  }

  _showListView() {
      this._view = "LIST";
  }

  _reloadData() {
      this.loadData(this.email);
      this._resetSearch();
  }

  loadData(subscriber) {
      this.email = subscriber;
      this.$.geteventdefs.getEventdefs(subscriber);
  }

  _setupData(event) {
      this.subscriberEvents = event.detail.data;
  }
}

window.customElements.define('manage-events-page', ManageEventsPage);
