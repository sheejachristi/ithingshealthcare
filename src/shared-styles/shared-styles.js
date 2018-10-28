import '@polymer/polymer/polymer-element';
import '@polymer/paper-styles/typography';
import "@polymer/iron-flex-layout/iron-flex-layout-classes";
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="shared-styles">
  <template>
    <style include="iron-flex iron-flex-alignment iron-positioning">
    .three-line-ellipsis {
      white-space: pre-wrap;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      word-wrap: break-word;
    }
    .ellipsis {
      white-space: pre-wrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .card-header {
        height: 45px;
        color: #fff;
        font-size: 18px;
        background-color: #11367A;
        margin: 0px;
        padding-left: 25px;
        padding-top: 10px;
    }
    .card-content {
        background-color: #ECF2F6;
        margin: 0px;
        padding: 0px;
        width: 100%;
    }
    .content-single {
        margin: 20px;
        padding-left: 45px;
        padding-right: 45px;
        padding-bottom: 20px;
        padding-top: 20px;
        background-color: #fff;
        min-height: 390px;
        @apply --layout-vertical;
    }

    .content-single .row .element {
        width: 60%;
    }

    .content-two {
        margin: 20px;
        padding-left: 45px;
        padding-right: 45px;
        padding-bottom: 20px;
        padding-top: 20px;
        background-color: #fff;
        min-height: 390px;
        @apply --layout-vertical;
    }

    .content-two .row {
        width: 100%;
        @apply --layout-horizontal;
    }
    .content-two .row .element {
        width: 45%;
    }

    .content-two .row .spacer {
        @apply --layout-flex;
    }

    .card-buttons {
        background-color: #11367A;
        padding-right: 20px;
        padding-top: 20px;
        padding-bottom: 20px;
    }
    .inputlabel {
        font-size: 14px;
        color: #2f3042;
        font-family: 'Roboto-Regular';
        padding-top: 20px;
    }

    .content-title h2 {
        font-size: 24px;
        color: #11367A;
    }
    </style>
  </template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);

