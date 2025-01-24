/*! elementor - v3.27.0 - 07-01-2025 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "../assets/dev/js/editor/components/validator/base.js":
/*!************************************************************!*\
  !*** ../assets/dev/js/editor/components/validator/base.js ***!
  \************************************************************/
/***/ ((module) => {

"use strict";


module.exports = elementorModules.Module.extend({
  errors: [],
  __construct: function __construct(settings) {
    var customValidationMethod = settings.customValidationMethod;
    if (customValidationMethod) {
      this.validationMethod = customValidationMethod;
    }
  },
  getDefaultSettings: function getDefaultSettings() {
    return {
      validationTerms: {}
    };
  },
  isValid: function isValid() {
    var validationErrors = this.validationMethod.apply(this, arguments);
    if (validationErrors.length) {
      this.errors = validationErrors;
      return false;
    }
    return true;
  },
  validationMethod: function validationMethod(newValue) {
    var validationTerms = this.getSettings('validationTerms'),
      errors = [];
    if (validationTerms.required) {
      if (!('' + newValue).length) {
        errors.push('Required value is empty');
      }
    }
    return errors;
  }
});

/***/ }),

/***/ "../assets/dev/js/editor/elements/collections/elements.js":
/*!****************************************************************!*\
  !*** ../assets/dev/js/editor/elements/collections/elements.js ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");
var _elementTypeNotFound = _interopRequireDefault(__webpack_require__(/*! elementor-editor/errors/element-type-not-found */ "../assets/dev/js/editor/errors/element-type-not-found.js"));
var ElementsCollection = Backbone.Collection.extend({
  add: function add(models, options, isCorrectSet) {
    if ((!options || !options.silent) && !isCorrectSet) {
      throw 'Call Error: Adding model to element collection is allowed only by the dedicated addChildModel() method.';
    }
    return Backbone.Collection.prototype.add.call(this, models, options);
  },
  model: function model(attrs, options) {
    var ModelClass = Backbone.Model;
    if (attrs.elType) {
      var elementType = attrs.widgetType || attrs.elType,
        elementTypeClass = elementor.elementsManager.getElementTypeClass(elementType);
      if (!elementTypeClass) {
        throw new _elementTypeNotFound.default(elementType);
      }
      ModelClass = elementor.hooks.applyFilters('element/model', elementTypeClass.getModel(), attrs);
    }
    return new ModelClass(attrs, options);
  },
  clone: function clone() {
    var tempCollection = Backbone.Collection.prototype.clone.apply(this, arguments),
      newCollection = new ElementsCollection();
    tempCollection.forEach(function (model) {
      newCollection.add(model.clone(), null, true);
    });
    return newCollection;
  }
});
ElementsCollection.prototype.sync = ElementsCollection.prototype.fetch = ElementsCollection.prototype.save = _.noop;
module.exports = ElementsCollection;

/***/ }),

/***/ "../assets/dev/js/editor/elements/models/base-element-model.js":
/*!*********************************************************************!*\
  !*** ../assets/dev/js/editor/elements/models/base-element-model.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../node_modules/@babel/runtime/helpers/classCallCheck.js"));
var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../node_modules/@babel/runtime/helpers/createClass.js"));
var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));
var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../node_modules/@babel/runtime/helpers/getPrototypeOf.js"));
var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../node_modules/@babel/runtime/helpers/inherits.js"));
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2.default)(o), (0, _possibleConstructorReturn2.default)(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2.default)(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
/**
 * @typedef {import('elementor/assets/lib/backbone/backbone.marionette')} Backbone
 */
/**
 * The class purpose is to share the common methods and properties between all available models.
 */
var BaseElementModel = exports["default"] = /*#__PURE__*/function (_Backbone$Model) {
  function BaseElementModel() {
    (0, _classCallCheck2.default)(this, BaseElementModel);
    return _callSuper(this, BaseElementModel, arguments);
  }
  (0, _inherits2.default)(BaseElementModel, _Backbone$Model);
  return (0, _createClass2.default)(BaseElementModel, [{
    key: "isValidChild",
    value:
    // eslint-disable-next-line jsdoc/require-returns-check
    /**
     * Function isValidChild().
     *
     * Validates if `childModel` can be added to this model as a child.
     * Each model should have its own implementation of this method against all possible child models.
     *
     * @param {Backbone.Model} childModel
     *
     * @return {boolean} Whether the child model is valid or not.
     */
    function isValidChild(childModel) {
      // eslint-disable-line no-unused-vars
      elementorModules.ForceMethodImplementation({
        attributes: this.attributes
      });
    }
  }]);
}(Backbone.Model);

/***/ }),

/***/ "../assets/dev/js/editor/elements/models/column-settings.js":
/*!******************************************************************!*\
  !*** ../assets/dev/js/editor/elements/models/column-settings.js ***!
  \******************************************************************/
/***/ ((module) => {

"use strict";


module.exports = elementorModules.editor.elements.models.BaseSettings.extend({
  defaults: {
    _column_size: 100
  }
});

/***/ }),

/***/ "../assets/dev/js/editor/elements/models/element.js":
/*!**********************************************************!*\
  !*** ../assets/dev/js/editor/elements/models/element.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ "../node_modules/@babel/runtime/helpers/typeof.js"));
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../node_modules/@babel/runtime/helpers/defineProperty.js"));
var _baseElementModel = _interopRequireDefault(__webpack_require__(/*! ./base-element-model */ "../assets/dev/js/editor/elements/models/base-element-model.js"));
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2.default)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var ColumnSettingsModel = __webpack_require__(/*! elementor-elements/models/column-settings */ "../assets/dev/js/editor/elements/models/column-settings.js"),
  ElementModel;

/**
 * @name ElementModel
 */
ElementModel = _baseElementModel.default.extend({
  defaults: {
    id: '',
    elType: '',
    isInner: false,
    isLocked: false,
    settings: {},
    defaultEditSettings: {
      defaultEditRoute: 'content'
    }
  },
  remoteRender: false,
  _htmlCache: null,
  _jqueryXhr: null,
  renderOnLeave: false,
  initialize: function initialize(options) {
    var elType = this.get('elType'),
      elements = this.get('elements');
    if (undefined !== elements) {
      var ElementsCollection = __webpack_require__(/*! elementor-elements/collections/elements */ "../assets/dev/js/editor/elements/collections/elements.js");
      this.set('elements', new ElementsCollection(elements));
    }
    if ('widget' === elType) {
      this.remoteRender = true;
      this.setHtmlCache(options.htmlCache || '');
    }

    // No need this variable anymore
    delete options.htmlCache;

    // Make call to remote server as throttle function
    this.renderRemoteServer = _.throttle(this.renderRemoteServer, 1000);
    this.initSettings();
    this.initEditSettings();
    this.on({
      destroy: this.onDestroy,
      'editor:close': this.onCloseEditor
    });
  },
  initSettings: function initSettings() {
    var elType = this.get('elType'),
      settings = this.get('settings'),
      settingModels = {
        column: ColumnSettingsModel
      },
      SettingsModel = settingModels[elType] || elementorModules.editor.elements.models.BaseSettings;
    if (jQuery.isEmptyObject(settings)) {
      settings = structuredClone(settings);
    }
    if ('widget' === elType) {
      settings.widgetType = this.get('widgetType');
    }
    settings = _objectSpread(_objectSpread({}, settings), {}, {
      elType: elType
    }); // Create a shallow copy as elType is sometimes read only when trying to drop a widget preset.
    settings.isInner = this.get('isInner');

    // Allow passing custom `_title` from model.
    var customTitle = this.get('_title');
    if (customTitle) {
      settings._title = customTitle;
    }
    settings = new SettingsModel(settings, {
      controls: elementor.getElementControls(this)
    });
    this.set('settings', settings);
    elementorFrontend.config.elements.data[this.cid] = settings;
  },
  initEditSettings: function initEditSettings() {
    var editSettings = new Backbone.Model(this.get('defaultEditSettings'));
    this.set('editSettings', editSettings);
    elementorFrontend.config.elements.editSettings[this.cid] = editSettings;
  },
  setSetting: function setSetting(key, value) {
    var settings = this.get('settings');
    if ('object' !== (0, _typeof2.default)(key)) {
      var keyParts = key.split('.'),
        isRepeaterKey = 3 === keyParts.length;
      key = keyParts[0];
      if (isRepeaterKey) {
        settings = settings.get(key).models[keyParts[1]];
        key = keyParts[2];
      }
    }
    settings.setExternalChange(key, value);
  },
  getSetting: function getSetting(key) {
    var keyParts = key.split('.'),
      isRepeaterKey = 3 === keyParts.length,
      settings = this.get('settings');
    key = keyParts[0];
    var value = settings.get(key);
    if (undefined === value) {
      return '';
    }
    if (isRepeaterKey) {
      value = value.models[keyParts[1]].get(keyParts[2]);
    }
    return value;
  },
  setHtmlCache: function setHtmlCache(htmlCache) {
    this._htmlCache = htmlCache;
  },
  getHtmlCache: function getHtmlCache() {
    return this._htmlCache;
  },
  getDefaultTitle: function getDefaultTitle() {
    return elementor.getElementData(this).title;
  },
  getTitle: function getTitle() {
    var _custom$isPreset;
    var title = this.getSetting('_title') || this.getSetting('presetTitle');
    var custom = this.get('custom');
    if (!title && ((_custom$isPreset = custom === null || custom === void 0 ? void 0 : custom.isPreset) !== null && _custom$isPreset !== void 0 ? _custom$isPreset : false)) {
      return this.get('title') || title;
    }
    if (!title) {
      title = this.getDefaultTitle();
    }
    return title;
  },
  getIcon: function getIcon() {
    var _custom$isPreset2;
    var mainIcon = elementor.getElementData(this).icon,
      custom = this.get('custom');
    if ((_custom$isPreset2 = custom === null || custom === void 0 ? void 0 : custom.isPreset) !== null && _custom$isPreset2 !== void 0 ? _custom$isPreset2 : false) {
      return this.attributes.custom.preset_settings.presetIcon || mainIcon;
    }
    var savedPresetIcon = this.getSetting('presetIcon');
    if ('string' === typeof savedPresetIcon && '' !== savedPresetIcon.trim()) {
      return savedPresetIcon;
    }
    return mainIcon;
  },
  createRemoteRenderRequest: function createRemoteRenderRequest() {
    var data = this.toJSON();
    return elementorCommon.ajax.addRequest('render_widget', {
      unique_id: this.cid,
      data: {
        data: data
      },
      success: this.onRemoteGetHtml.bind(this)
    }, true).jqXhr;
  },
  renderRemoteServer: function renderRemoteServer() {
    if (!this.remoteRender) {
      return;
    }
    this.renderOnLeave = false;
    this.trigger('before:remote:render');
    if (this.isRemoteRequestActive()) {
      this._jqueryXhr.abort();
    }
    this._jqueryXhr = this.createRemoteRenderRequest();
  },
  isRemoteRequestActive: function isRemoteRequestActive() {
    return this._jqueryXhr && 4 !== this._jqueryXhr.readyState;
  },
  onRemoteGetHtml: function onRemoteGetHtml(data) {
    this.setHtmlCache(data.render);
    this.trigger('remote:render');
  },
  clone: function clone() {
    var newModel = new this.constructor(elementorCommon.helpers.cloneObject(this.attributes));
    newModel.set('id', elementorCommon.helpers.getUniqueId());
    newModel.setHtmlCache(this.getHtmlCache());
    var elements = this.get('elements');
    if (!_.isEmpty(elements)) {
      newModel.set('elements', elements.clone());
    }
    return newModel;
  },
  toJSON: function toJSON(options) {
    options = options || {};

    // Call parent's toJSON method
    var data = Backbone.Model.prototype.toJSON.call(this);
    _.each(data, function (attribute, key) {
      if (attribute && attribute.toJSON) {
        data[key] = attribute.toJSON(options);
      }
    });
    if (options.copyHtmlCache) {
      data.htmlCache = this.getHtmlCache();
    } else {
      delete data.htmlCache;
    }
    if (options.remove) {
      options.remove.forEach(function (key) {
        return delete data[key];
      });
    }
    return data;
  },
  onCloseEditor: function onCloseEditor() {
    if (this.renderOnLeave) {
      this.renderRemoteServer();
    }
  },
  onDestroy: function onDestroy() {
    // Clean the memory for all use instances
    var settings = this.get('settings'),
      elements = this.get('elements');
    if (undefined !== elements) {
      _.each(_.clone(elements.models), function (model) {
        model.destroy();
      });
    }
    settings.destroy();
  }
});
ElementModel.prototype.sync = ElementModel.prototype.fetch = ElementModel.prototype.save = _.noop;
module.exports = ElementModel;

/***/ }),

/***/ "../assets/dev/js/editor/elements/views/base.js":
/*!******************************************************!*\
  !*** ../assets/dev/js/editor/elements/views/base.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var sprintf = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n")["sprintf"];
/* provided dependency */ var __ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n")["__"];


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");
var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ "../node_modules/@babel/runtime/regenerator/index.js"));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "../node_modules/@babel/runtime/helpers/asyncToGenerator.js"));
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ "../node_modules/@babel/runtime/helpers/typeof.js"));
var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "../node_modules/@babel/runtime/helpers/toConsumableArray.js"));
var _environment = _interopRequireDefault(__webpack_require__(/*! elementor-common/utils/environment */ "../core/common/assets/js/utils/environment.js"));
var _elementTypeNotFound = _interopRequireDefault(__webpack_require__(/*! elementor-editor/errors/element-type-not-found */ "../assets/dev/js/editor/errors/element-type-not-found.js"));
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
var ControlsCSSParser = __webpack_require__(/*! elementor-editor-utils/controls-css-parser */ "../assets/dev/js/editor/utils/controls-css-parser.js"),
  Validator = __webpack_require__(/*! elementor-validator/base */ "../assets/dev/js/editor/components/validator/base.js"),
  BaseContainer = __webpack_require__(/*! elementor-views/base-container */ "../assets/dev/js/editor/views/base-container.js"),
  BaseElementView;

/**
 * @typedef {{}} DataBinding
 * @property {DOMStringMap} dataset The dataset of the element.
 * @property {HTMLElement}  el      The element.
 */

/**
 * @name BaseElementView
 * @augments {BaseContainer}
 */
BaseElementView = BaseContainer.extend({
  tagName: 'div',
  controlsCSSParser: null,
  allowRender: true,
  toggleEditTools: false,
  renderAttributes: {},
  isRendering: false,
  className: function className() {
    var classes = 'elementor-element elementor-element-edit-mode ' + this.getElementUniqueID();
    if (this.toggleEditTools) {
      classes += ' elementor-element--toggle-edit-tools';
    }
    return classes;
  },
  attributes: function attributes() {
    return {
      'data-id': this.getID(),
      'data-element_type': this.model.get('elType'),
      'data-model-cid': this.model.cid
    };
  },
  ui: function ui() {
    return {
      tools: '> .elementor-element-overlay > .elementor-editor-element-settings',
      editButton: '> .elementor-element-overlay .elementor-editor-element-edit',
      duplicateButton: '> .elementor-element-overlay .elementor-editor-element-duplicate',
      addButton: '> .elementor-element-overlay .elementor-editor-element-add',
      removeButton: '> .elementor-element-overlay .elementor-editor-element-remove'
    };
  },
  behaviors: function behaviors() {
    var elementType = this.options.model.get('elType');
    var groups = elementor.hooks.applyFilters("elements/".concat(elementType, "/contextMenuGroups"), this.getContextMenuGroups(), this);
    var behaviors = {
      contextMenu: {
        behaviorClass: __webpack_require__(/*! elementor-behaviors/context-menu */ "../assets/dev/js/editor/elements/views/behaviors/context-menu.js"),
        groups: groups
      }
    };
    return elementor.hooks.applyFilters('elements/base/behaviors', behaviors, this);
  },
  getBehavior: function getBehavior(name) {
    return this._behaviors[Object.keys(this.behaviors()).indexOf(name)];
  },
  events: function events() {
    return {
      mousedown: 'onMouseDown',
      'click @ui.editButton': 'onEditButtonClick',
      'click @ui.duplicateButton': 'onDuplicateButtonClick',
      'click @ui.addButton': 'onAddButtonClick',
      'click @ui.removeButton': 'onRemoveButtonClick'
    };
  },
  getElementType: function getElementType() {
    return this.model.get('elType');
  },
  getIDInt: function getIDInt() {
    return parseInt(this.getID(), 16);
  },
  getChildType: function getChildType() {
    return elementor.helpers.getElementChildType(this.getElementType());
  },
  getChildView: function getChildView(model) {
    var elementType = model.get('widgetType') || model.get('elType'),
      elementTypeClass = elementor.elementsManager.getElementTypeClass(elementType);
    if (!elementTypeClass) {
      throw new _elementTypeNotFound.default(elementType);
    }
    return elementor.hooks.applyFilters('element/view', elementTypeClass.getView(), model, this);
  },
  getTemplateType: function getTemplateType() {
    return 'js';
  },
  getEditModel: function getEditModel() {
    return this.model;
  },
  getContainer: function getContainer() {
    if (!this.container) {
      var settingsModel = this.model.get('settings');
      this.container = new elementorModules.editor.Container({
        type: this.model.get('elType'),
        id: this.model.id,
        model: this.model,
        settings: settingsModel,
        view: this,
        parent: this._parent ? this._parent.getContainer() : false,
        label: elementor.helpers.getModelLabel(this.model),
        controls: settingsModel.options.controls
      });
    }
    return this.container;
  },
  getContextMenuGroups: function getContextMenuGroups() {
    var _this = this;
    var controlSign = _environment.default.mac ? '&#8984;' : '^';
    var groups = [{
      name: 'general',
      actions: [{
        name: 'edit',
        icon: 'eicon-edit',
        /* Translators: %s: Element Name. */
        title: function title() {
          return sprintf(__('Edit %s', 'elementor'), elementor.selection.isMultiple() ? '' : _this.options.model.getTitle());
        },
        isEnabled: function isEnabled() {
          return !elementor.selection.isMultiple();
        },
        callback: function callback() {
          return $e.run('document/elements/select', {
            container: _this.getContainer()
          });
        }
      }, {
        name: 'duplicate',
        icon: 'eicon-clone',
        title: __('Duplicate', 'elementor'),
        shortcut: controlSign + '+D',
        isEnabled: function isEnabled() {
          return elementor.selection.isSameType() && !_this.getContainer().isLocked();
        },
        callback: function callback() {
          return $e.run('document/elements/duplicate', {
            containers: elementor.selection.getElements(_this.getContainer())
          });
        }
      }]
    }, {
      name: 'clipboard',
      actions: [{
        name: 'copy',
        title: __('Copy', 'elementor'),
        shortcut: controlSign + '+C',
        isEnabled: function isEnabled() {
          return elementor.selection.isSameType() && !_this.getContainer().isLocked();
        },
        callback: function callback() {
          return $e.run('document/elements/copy', {
            containers: elementor.selection.getElements(_this.getContainer())
          });
        }
      }, {
        name: 'paste',
        title: __('Paste', 'elementor'),
        shortcut: controlSign + '+V',
        isEnabled: function isEnabled() {
          return $e.components.get('document/elements').utils.isPasteEnabled(_this.getContainer()) && elementor.selection.isSameType();
        },
        callback: function callback() {
          return $e.run('document/ui/paste', {
            container: _this.getContainer()
          });
        }
      }, {
        name: 'pasteStyle',
        title: __('Paste style', 'elementor'),
        shortcut: controlSign + '+⇧+V',
        isEnabled: function isEnabled() {
          return !!elementorCommon.storage.get('clipboard');
        },
        callback: function callback() {
          return $e.run('document/elements/paste-style', {
            containers: elementor.selection.getElements(_this.getContainer())
          });
        }
      }, {
        name: 'pasteArea',
        icon: 'eicon-import-export',
        title: __('Paste from other site', 'elementor'),
        callback: function callback() {
          return $e.run('document/elements/paste-area', {
            container: _this.getContainer()
          });
        }
      }, {
        name: 'resetStyle',
        title: __('Reset style', 'elementor'),
        callback: function callback() {
          return $e.run('document/elements/reset-style', {
            containers: elementor.selection.getElements(_this.getContainer())
          });
        }
      }]
    }];
    var customGroups = [];

    /**
     * Filter Additional Context Menu Groups.
     *
     * This filter allows adding new context menu groups to elements.
     *
     * @param array  customGroups - An array of group objects.
     * @param string elementType - The current element type.
     */
    customGroups = elementor.hooks.applyFilters('elements/context-menu/groups', customGroups, this.options.model.get('elType'));
    if (customGroups.length) {
      groups = [].concat((0, _toConsumableArray2.default)(groups), (0, _toConsumableArray2.default)(customGroups));
    }
    groups.push({
      name: 'delete',
      actions: [{
        name: 'delete',
        icon: 'eicon-trash',
        title: function title() {
          if (elementor.selection.isMultiple()) {
            // Translators: %d: Elements count.
            return sprintf(__('Delete %d items', 'elementor'), elementor.selection.getElements().length);
          }
          return __('Delete', 'elementor');
        },
        shortcut: '⌦',
        callback: function callback() {
          return $e.run('document/elements/delete', {
            containers: elementor.selection.getElements(_this.getContainer())
          });
        },
        isEnabled: function isEnabled() {
          return !_this.getContainer().isLocked();
        }
      }]
    });
    return groups;
  },
  getEditButtons: function getEditButtons() {
    return {};
  },
  initialize: function initialize() {
    var _this2 = this;
    BaseContainer.prototype.initialize.apply(this, arguments);
    var editModel = this.getEditModel();
    if (this.collection && this.onCollectionChanged) {
      elementorDevTools.deprecation.deprecated('onCollectionChanged', '2.8.0', '$e.hooks');
      this.listenTo(this.collection, 'add remove reset', this.onCollectionChanged, this);
    }
    if (this.onSettingsChanged) {
      elementorDevTools.deprecation.deprecated('onSettingsChanged', '2.8.0', '$e.hooks');
      this.listenTo(editModel.get('settings'), 'change', this.onSettingsChanged);
    }
    this.listenTo(editModel.get('editSettings'), 'change', this.onEditSettingsChanged).listenTo(this.model, 'request:edit', this.onEditRequest).listenTo(this.model, 'request:toggleVisibility', this.toggleVisibility);
    this.initControlsCSSParser();
    if (!this.onDynamicServerRequestEnd) {
      this.onDynamicServerRequestEnd = _.debounce(function () {
        _this2.render();
        _this2.$el.removeClass('elementor-loading');
      }, 100);
    }
  },
  getHandlesOverlay: function getHandlesOverlay() {
    var elementType = this.getElementType(),
      $handlesOverlay = jQuery('<div>', {
        class: 'elementor-element-overlay'
      }),
      $overlayList = jQuery('<ul>', {
        class: "elementor-editor-element-settings elementor-editor-".concat(elementType, "-settings")
      }),
      editButtonsEnabled = elementor.getPreferences('edit_buttons'),
      elementData = elementor.getElementData(this.model);
    var editButtons = this.getEditButtons();

    // We should only allow external modification to edit buttons if the user enabled edit buttons.
    if (editButtonsEnabled) {
      /**
       * Filter edit buttons.
       *
       * This filter allows adding edit buttons to all element types.
       *
       * @since 3.5.0
       *
       * @param array editButtons An array of buttons.
       */
      editButtons = elementor.hooks.applyFilters("elements/edit-buttons", editButtons);

      /**
       * Filter edit buttons.
       *
       * This filter allows adding edit buttons only to a specific element type.
       *
       * The dynamic portion of the hook name, `elementType`, refers to element type (widget, column, section).
       *
       * @since 3.5.0
       *
       * @param array editButtons An array of buttons.
       */
      editButtons = elementor.hooks.applyFilters("elements/edit-buttons/".concat(elementType), editButtons);
    }

    // Only sections always have the remove button, even if the Editing Handles preference is off.
    if ('section' === elementType || editButtonsEnabled) {
      editButtons.remove = {
        /* Translators: %s: Element Name. */
        title: sprintf(__('Delete %s', 'elementor'), elementData.title),
        icon: 'close'
      };
    }
    jQuery.each(editButtons, function (toolName, tool) {
      var $item = jQuery('<li>', {
        class: "elementor-editor-element-setting elementor-editor-element-".concat(toolName),
        title: tool.title,
        'aria-label': tool.title
      });
      var $icon = jQuery('<i>', {
        class: "eicon-".concat(tool.icon),
        'aria-hidden': true
      });
      $item.append($icon);
      $overlayList.append($item);
    });
    $handlesOverlay.append($overlayList);
    return $handlesOverlay;
  },
  attachElContent: function attachElContent(html) {
    this.$el.empty().append(this.getHandlesOverlay(), html);
  },
  isStyleTransferControl: function isStyleTransferControl(control) {
    if (undefined !== control.style_transfer) {
      return control.style_transfer;
    }
    return 'content' !== control.tab || control.selectors || control.prefix_class;
  },
  toggleVisibility: function toggleVisibility() {
    this.model.set('hidden', !this.model.get('hidden'));
    this.toggleVisibilityClass();
  },
  toggleVisibilityClass: function toggleVisibilityClass() {
    this.$el.toggleClass('elementor-edit-hidden', !!this.model.get('hidden'));
  },
  addElementFromPanel: function addElementFromPanel(options) {
    options = options || {};
    var elementView = elementor.channels.panelElements.request('element:selected'),
      model = {
        elType: elementView.model.get('elType')
      };
    if (elementor.helpers.maybeDisableWidget()) {
      return;
    }
    if ('widget' === model.elType) {
      model.widgetType = elementView.model.get('widgetType');
    } else if ('section' === model.elType) {
      model.isInner = true;
    } else if ('container' !== model.elType) {
      // Don't allow adding anything other than widget, inner-section or a container.
      return;
    }

    // Don't allow adding inner-sections inside inner-sections.
    if ('section' === model.elType && this.isInner()) {
      return;
    }
    var customData = elementView.model.get('custom');
    if (customData) {
      jQuery.extend(model, customData);
    }

    // Reset the selected element cache.
    elementor.channels.panelElements.reply('element:selected', null);
    return $e.run('document/elements/create', {
      container: this.getContainer(),
      model: model,
      options: options
    });
  },
  // TODO: Unused function.
  addControlValidator: function addControlValidator(controlName, validationCallback) {
    validationCallback = validationCallback.bind(this);
    var validator = new Validator({
        customValidationMethod: validationCallback
      }),
      validators = this.getEditModel().get('settings').validators;
    if (!validators[controlName]) {
      validators[controlName] = [];
    }
    validators[controlName].push(validator);
  },
  addRenderAttribute: function addRenderAttribute(element, key, value, overwrite) {
    var self = this;
    if ('object' === (0, _typeof2.default)(element)) {
      jQuery.each(element, function (elementKey, elementValue) {
        self.addRenderAttribute(elementKey, elementValue, null, overwrite);
      });
      return self;
    }
    if ('object' === (0, _typeof2.default)(key)) {
      jQuery.each(key, function (attributeKey, attributeValue) {
        self.addRenderAttribute(element, attributeKey, attributeValue, overwrite);
      });
      return self;
    }
    if (!self.renderAttributes[element]) {
      self.renderAttributes[element] = {};
    }
    if (!self.renderAttributes[element][key]) {
      self.renderAttributes[element][key] = [];
    }
    if (!Array.isArray(value)) {
      value = [value];
    }
    if (overwrite) {
      self.renderAttributes[element][key] = value;
    } else {
      self.renderAttributes[element][key] = self.renderAttributes[element][key].concat(value);
    }
  },
  getRenderAttributeString: function getRenderAttributeString(element) {
    if (!this.renderAttributes[element]) {
      return '';
    }
    var renderAttributes = this.renderAttributes[element],
      attributes = [];
    jQuery.each(renderAttributes, function (attributeKey, attributeValue) {
      attributes.push(attributeKey + '="' + _.escape(attributeValue.join(' ')) + '"');
    });
    return attributes.join(' ');
  },
  isInner: function isInner() {
    return !!this.model.get('isInner');
  },
  initControlsCSSParser: function initControlsCSSParser() {
    this.controlsCSSParser = new ControlsCSSParser({
      id: this.model.get('id'),
      context: this,
      settingsModel: this.getEditModel().get('settings'),
      dynamicParsing: this.getDynamicParsingSettings()
    });
  },
  enqueueFonts: function enqueueFonts() {
    var editModel = this.getEditModel(),
      settings = editModel.get('settings');

    // Enqueue Icon Fonts
    jQuery.each(settings.getIconsControls(), function (index, control) {
      var iconType = editModel.getSetting(control.name);
      if (!iconType || !iconType.library) {
        return;
      }
      elementor.helpers.enqueueIconFonts(iconType.library);
    });
  },
  renderStyles: function renderStyles(settings) {
    if (!settings) {
      settings = this.getEditModel().get('settings');
    }
    this.controlsCSSParser.stylesheet.empty();
    this.controlsCSSParser.addStyleRules(settings.getStyleControls(), settings.attributes, this.getEditModel().get('settings').controls, [/{{ID}}/g, /{{WRAPPER}}/g], [this.getID(), '.elementor-' + elementor.config.document.id + ' .elementor-element.' + this.getElementUniqueID()]);
    this.controlsCSSParser.addStyleToDocument();
  },
  renderCustomClasses: function renderCustomClasses() {
    var self = this;
    var settings = self.getEditModel().get('settings'),
      classControls = settings.getClassControls();

    // Remove all previous classes
    _.each(classControls, function (control) {
      var previousClassValue = settings.previous(control.name);
      if (control.classes_dictionary) {
        if (undefined !== control.classes_dictionary[previousClassValue]) {
          previousClassValue = control.classes_dictionary[previousClassValue];
        }
      }
      self.$el.removeClass(control.prefix_class + previousClassValue);
    });

    // Add new classes
    _.each(classControls, function (control) {
      var value = settings.attributes[control.name];
      var classValue = value;
      if (control.classes_dictionary) {
        if (undefined !== control.classes_dictionary[value]) {
          classValue = control.classes_dictionary[value];
        }
      }
      var isVisible = elementor.helpers.isActiveControl(control, settings.attributes, settings.controls);
      if (isVisible && (classValue || 0 === classValue)) {
        self.$el.addClass(control.prefix_class + classValue);
      }
    });
    self.$el.addClass(_.result(self, 'className'));
    self.toggleVisibilityClass();
  },
  renderCustomElementID: function renderCustomElementID() {
    var customElementID = this.getEditModel().get('settings').get('_element_id');
    if (customElementID) {
      this.$el.attr('id', customElementID);
    }
  },
  renderUI: function renderUI() {
    this.renderStyles();
    this.renderCustomClasses();
    this.renderCustomElementID();
    this.enqueueFonts();
  },
  runReadyTrigger: function runReadyTrigger() {
    var self = this;
    _.defer(function () {
      elementorFrontend.elementsHandler.runReadyTrigger(self.el);
      if (!elementorFrontend.isEditMode()) {
        return;
      }

      // In edit mode - handle an external elements that loaded by another elements like shortcode etc.
      self.$el.find('.elementor-element.elementor-' + self.model.get('elType') + ':not(.elementor-element-edit-mode)').each(function () {
        elementorFrontend.elementsHandler.runReadyTrigger(this);
      });
    });
  },
  getID: function getID() {
    return this.model.get('id');
  },
  getElementUniqueID: function getElementUniqueID() {
    return 'elementor-element-' + this.getID();
  },
  renderHTML: function renderHTML() {
    var templateType = this.getTemplateType(),
      editModel = this.getEditModel();
    if ('js' === templateType) {
      this.getEditModel().setHtmlCache();
      this.render();
      editModel.renderOnLeave = true;
    } else {
      editModel.renderRemoteServer();
    }
  },
  renderChanges: function renderChanges(settings) {
    // Make sure is correct model
    if (settings instanceof elementorModules.editor.elements.models.BaseSettings) {
      var hasChanged = settings.hasChanged();
      var isContentChanged = !hasChanged,
        isRenderRequired = !hasChanged;
      _.each(settings.changedAttributes(), function (settingValue, settingKey) {
        if ('_column_size' === settingKey) {
          isRenderRequired = true;
          return;
        }
        var control = settings.getControl(settingKey);
        if (!control) {
          isRenderRequired = true;
          isContentChanged = true;
          return;
        }
        if ('none' !== control.render_type) {
          isRenderRequired = true;
        }
        if (-1 !== ['none', 'ui'].indexOf(control.render_type)) {
          return;
        }
        if ('template' === control.render_type || !settings.isStyleControl(settingKey) && !settings.isClassControl(settingKey) && '_element_id' !== settingKey) {
          isContentChanged = true;
        }
      });
      if (!isRenderRequired) {
        return;
      }
      if (!isContentChanged) {
        this.renderUI();
        return;
      }
    }
    this.renderHTML();
  },
  isAtomicDynamic: function isAtomicDynamic(changedSettings, dataBinding, changedControl) {
    return '__dynamic__' in changedSettings && dataBinding.el.hasAttribute('data-binding-dynamic') && elementorCommon.config.experimentalFeatures.e_nested_atomic_repeaters && dataBinding.el.getAttribute('data-binding-setting') === changedControl;
  },
  getDynamicValue: function getDynamicValue(settings, changedControlKey, bindingSetting) {
    var _this3 = this;
    return (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee() {
      var dynamicSettings, valueToParse;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            dynamicSettings = {
              active: true
            }, valueToParse = _this3.getChangedData(settings, changedControlKey, bindingSetting);
            if (valueToParse) {
              _context.next = 3;
              break;
            }
            return _context.abrupt("return", settings.attributes[changedControlKey]);
          case 3:
            _context.next = 5;
            return _this3.getDataFromCacheOrBackend(valueToParse, dynamicSettings);
          case 5:
            return _context.abrupt("return", _context.sent);
          case 6:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }))();
  },
  findUniqueKey: function findUniqueKey(obj1, obj2) {
    if ('object' !== (0, _typeof2.default)(obj1) || 'object' !== (0, _typeof2.default)(obj2)) {
      return false;
    }
    var keys1 = Object.keys(obj1),
      keys2 = Object.keys(obj2);
    var allKeys = keys1.concat(keys2);
    return allKeys.filter(function (item, index, arr) {
      return arr.indexOf(item) === arr.lastIndexOf(item);
    });
  },
  /**
   * Function linkDataBindings().
   *
   * Link data to allow partial render, instead of full re-render
   *
   * How to use?
   *  If the element which should be rendered for a setting key is known in advance, it's possible to add the following attributes to the element to avoid full re-render:
   *  Example for repeater item:
   * 'data-binding-type': 'repeater-item',               // Type of binding (to know how to behave).
   * 'data-binding-setting': 'tab_title',                // Setting key that effect the binding.
   * 'data-binding-index': tabCount,                     // Index is required for repeater items.
   *
   * Example for content:
   * 'data-binding-type': 'content',                     // Type of binding.
   * 'data-binding-setting': 'testimonial_content',      // Setting change to capture, the value will replace the link.
   *
   * By adding the following example attributes inside the widget the element innerHTML will be linked to the 'testimonial_content' setting value.
   *
   *
   * Current Limitation:
   * Not working with dynamics, will required full re-render.
   * UPDATE: Support for dynamics has experimentally been added in v3.23
   */
  linkDataBindings: function linkDataBindings() {
    var _this4 = this;
    /**
     * @type {Array.<DataBinding>}
     */
    this.dataBindings = [];
    var id = this.$el.data('id');
    if (!id) {
      return;
    }
    var $dataBinding = this.$el.find('[data-binding-type]');
    if (!$dataBinding.length) {
      return;
    }
    $dataBinding.each(function (index, current) {
      // To support nested data-binding bypass nested data-binding that are not part of the current.
      if (jQuery(current).closest('.elementor-element').data('id') === id) {
        if (current.dataset.bindingType) {
          _this4.dataBindings.push({
            el: current,
            dataset: current.dataset
          });
        }
      }
    });
  },
  /**
   * Function renderDataBindings().
   *
   * Render linked data.
   *
   * @param {Object}              settings
   * @param {Array.<DataBinding>} dataBindings
   *
   * @return {boolean} - false on fail.
   */
  renderDataBindings: function renderDataBindings(settings, dataBindings) {
    var _this$dataBindings,
      _this5 = this;
    if (!((_this$dataBindings = this.dataBindings) !== null && _this$dataBindings !== void 0 && _this$dataBindings.length)) {
      return false;
    }
    var changed = false;
    var renderDataBinding = /*#__PURE__*/function () {
      var _ref = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee2(dataBinding) {
        var bindingSetting, changedControl, change, dynamicValue;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              bindingSetting = dataBinding.dataset.bindingSetting, changedControl = _this5.getChangedDynamicControlKey(settings);
              change = settings.changed[bindingSetting];
              if (!_this5.isAtomicDynamic(settings.changed, dataBinding, changedControl)) {
                _context2.next = 7;
                break;
              }
              _context2.next = 5;
              return _this5.getDynamicValue(settings, changedControl, bindingSetting);
            case 5:
              dynamicValue = _context2.sent;
              if (dynamicValue) {
                change = dynamicValue;
              }
            case 7:
              if (!(change !== undefined)) {
                _context2.next = 10;
                break;
              }
              dataBinding.el.innerHTML = change;
              return _context2.abrupt("return", true);
            case 10:
              return _context2.abrupt("return", false);
            case 11:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }));
      return function renderDataBinding(_x) {
        return _ref.apply(this, arguments);
      };
    }();
    var _iterator = _createForOfIteratorHelper(dataBindings),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var dataBinding = _step.value;
        switch (dataBinding.dataset.bindingType) {
          case 'repeater-item':
            {
              var _container$parent;
              var repeater = this.container.repeaters[dataBinding.dataset.bindingRepeaterName];
              if (!repeater) {
                break;
              }
              var container = repeater.children.find(function (i) {
                return i.id === settings.attributes._id;
              });
              if ((container === null || container === void 0 || (_container$parent = container.parent) === null || _container$parent === void 0 ? void 0 : _container$parent.children.indexOf(container)) + 1 === parseInt(dataBinding.dataset.bindingIndex)) {
                changed = renderDataBinding(dataBinding);
              } else if (dataBindings.indexOf(dataBinding) + 1 === this.getRepeaterItemActiveIndex()) {
                changed = this.tryHandleDynamicCoverSettings(dataBinding, settings);
              }
            }
            break;
          case 'content':
            {
              changed = renderDataBinding(dataBinding);
            }
            break;
        }
        if (changed) {
          break;
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    return changed;
  },
  /**
   * Function renderOnChange().
   *
   * Render the changes in the settings according to the current situation.
   *
   * @param {Object} settings
   */
  renderOnChange: function renderOnChange(settings) {
    var _this6 = this;
    if (!this.allowRender) {
      return;
    }
    if (this.isRendering) {
      this.isRendering = false;
      return;
    }
    var renderResult = this.renderDataBindings(settings, this.dataBindings);
    if (renderResult instanceof Promise) {
      renderResult.then(function (result) {
        if (!result) {
          _this6.renderChanges(settings);
        }
      });
    }
    if (!renderResult) {
      this.renderChanges(settings);
    }
  },
  getDynamicParsingSettings: function getDynamicParsingSettings() {
    var self = this;
    return {
      onServerRequestStart: function onServerRequestStart() {
        self.$el.addClass('elementor-loading');
      },
      onServerRequestEnd: self.onDynamicServerRequestEnd
    };
  },
  serializeData: function serializeData() {
    var data = BaseContainer.prototype.serializeData.apply(this, arguments);
    data.settings = this.getEditModel().get('settings').parseDynamicSettings(data.settings, this.getDynamicParsingSettings());
    return data;
  },
  save: function save() {
    $e.route('library/save-template', {
      model: this.model
    });
  },
  onBeforeRender: function onBeforeRender() {
    this.renderAttributes = {};
  },
  render: function render() {
    this.getContainer();
    BaseContainer.prototype.render.apply(this, arguments);
  },
  onRender: function onRender() {
    var _this7 = this;
    this.linkDataBindings();
    this.renderUI();
    this.runReadyTrigger();
    if (this.toggleEditTools) {
      var editButton = this.ui.editButton;

      // Since this.ui.tools does not exist while testing.
      if (this.ui.tools) {
        this.ui.tools.hoverIntent(function () {
          editButton.addClass('elementor-active');
        }, function () {
          editButton.removeClass('elementor-active');
        }, {
          timeout: 500
        });
      }
    }

    // Defer to wait for all of the children to render.
    setTimeout(function () {
      _this7.initDraggable();
      _this7.dispatchElementLifeCycleEvent('rendered');
      elementorFrontend.elements.$window.on('elementor/elements/link-data-bindings', _this7.linkDataBindings.bind(_this7));
    });
  },
  dispatchElementLifeCycleEvent: function dispatchElementLifeCycleEvent(eventType) {
    var event;

    // Event name set like this for maintainability.
    switch (eventType) {
      case 'rendered':
        event = 'elementor/editor/element-rendered';
        break;
      case 'destroyed':
        event = 'elementor/editor/element-destroyed';
        break;
    }
    var renderedEvent = new CustomEvent(event, {
      detail: {
        elementView: this
      }
    });
    elementor.$preview[0].contentWindow.dispatchEvent(renderedEvent);
    window.top.dispatchEvent(renderedEvent);
  },
  onEditSettingsChanged: function onEditSettingsChanged(changedModel) {
    elementor.channels.editor.trigger('change:editSettings', changedModel, this);
  },
  onEditButtonClick: function onEditButtonClick(event) {
    this.model.trigger('request:edit', {
      append: event.ctrlKey || event.metaKey
    });
  },
  onEditRequest: function onEditRequest() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    if (!this.container.isEditable()) {
      return;
    }
    var model = this.getEditModel(),
      panel = elementor.getPanelView();
    if ($e.routes.isPartOf('panel/editor') && panel.getCurrentPageView().model === model) {
      return;
    }
    if (options.scrollIntoView) {
      elementor.helpers.scrollToView(this.$el, 200);
    }
    $e.run('document/elements/toggle-selection', {
      container: this.getContainer(),
      append: options.append
    });
  },
  /**
   * Select current element.
   */
  select: function select() {
    this.$el.addClass('elementor-element-editable');
  },
  /**
   * Deselect current element.
   */
  deselect: function deselect() {
    this.$el.removeClass('elementor-element-editable');
  },
  onDuplicateButtonClick: function onDuplicateButtonClick(event) {
    event.stopPropagation();
    $e.run('document/elements/duplicate', {
      container: this.getContainer()
    });
  },
  onRemoveButtonClick: function onRemoveButtonClick(event) {
    event.stopPropagation();
    $e.run('document/elements/delete', {
      container: this.getContainer()
    });
  },
  /* jQuery ui sortable preventing any `mousedown` event above any element, and as a result is preventing the `blur`
   * event on the currently active element. Therefor, we need to blur the active element manually.
   */
  onMouseDown: function onMouseDown(event) {
    if (jQuery(event.target).closest('.elementor-inline-editing').length) {
      return;
    }
    elementorFrontend.elements.window.document.activeElement.blur();
  },
  onDestroy: function onDestroy() {
    var _this8 = this;
    if (this.dataBindings) {
      delete this.dataBindings;
    }
    this.controlsCSSParser.removeStyleFromDocument();
    this.getEditModel().get('settings').validators = {};
    elementor.channels.data.trigger('element:destroy', this.model);

    // Defer so the event is fired after the element is removed from the DOM.
    setTimeout(function () {
      return _this8.dispatchElementLifeCycleEvent('destroyed');
    });
  },
  // eslint-disable-next-line jsdoc/require-returns-check
  /**
   * On `$el` drag start event.
   * Used inside `Draggable` and can be overridden by the extending views.
   */
  onDragStart: function onDragStart() {
    // TODO: Override if needed.
  },
  /**
   * On `$el` drag end event.
   * Used inside `Draggable` and can be overridden by the extending views.
   */
  onDragEnd: function onDragEnd() {
    // TODO: Override if needed.
  },
  /**
   * Create a drag helper element.
   * Copied from `behaviors/sortable.js` with some refactor.
   *
   * @return {HTMLDivElement} helper
   */
  getDraggableHelper: function getDraggableHelper() {
    var model = this.getEditModel();
    var helper = document.createElement('div');
    helper.classList.add('elementor-sortable-helper', "elementor-sortable-helper-".concat(model.get('elType')));
    helper.innerHTML = "\n\t\t\t<div class=\"icon\">\n\t\t\t\t<i class=\"".concat(model.getIcon(), "\"></i>\n\t\t\t</div>\n\t\t\t<div class=\"title-wrapper\">\n\t\t\t\t<div class=\"title\">").concat(model.getTitle(), "</div>\n\t\t\t</div>\n\t\t");
    return helper;
  },
  getDraggableElement: function getDraggableElement() {
    return this.$el;
  },
  /**
   * Initialize the Droppable instance.
   */
  initDraggable: function initDraggable() {
    var _this9 = this;
    if (!elementor.userCan('design')) {
      return;
    }

    // Init the draggable only for Containers and their children.
    if (!this.$el.hasClass('.e-con') && !this.$el.parents('.e-con').length) {
      return;
    }
    this.getDraggableElement().html5Draggable({
      onDragStart: function onDragStart(e) {
        var _this9$options$dragga;
        e.stopPropagation();
        if (_this9.getContainer().isLocked()) {
          e.originalEvent.preventDefault();
          return;
        }

        // Need to stop this event when the element is absolute since it clashes with this one.
        // See `behaviors/widget-draggable.js`.
        if ((_this9$options$dragga = _this9.options.draggable) !== null && _this9$options$dragga !== void 0 && _this9$options$dragga.isActive) {
          return;
        }
        var helper = _this9.getDraggableHelper();
        _this9.$el[0].appendChild(helper);

        // Set the x & y coordinates of the helper the same as the legacy jQuery sortable.
        e.originalEvent.dataTransfer.setDragImage(helper, 25, 20);

        // Remove the helper element as soon as it's set as a drag image, since the element must be
        // rendered for at least a fraction of a second in order to set it as a drag image.
        setTimeout(function () {
          helper.remove();
        });
        _this9.onDragStart(e);
        elementor.channels.editor.reply('element:dragged', _this9);
      },
      onDragEnd: function onDragEnd(e) {
        e.stopPropagation();
        _this9.onDragEnd(e);
      },
      groups: ['elementor-element']
    });
  },
  getDataFromCacheOrBackend: function getDataFromCacheOrBackend(valueToParse, dynamicSettings) {
    return (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee3() {
      return _regenerator.default.wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            return _context3.abrupt("return", elementor.dynamicTags.parseTagsText(valueToParse, dynamicSettings, elementor.dynamicTags.getTagDataContent));
          case 4:
            _context3.prev = 4;
            _context3.t0 = _context3["catch"](0);
            _context3.next = 8;
            return new Promise(function (resolve) {
              elementor.dynamicTags.refreshCacheFromServer(function () {
                resolve();
              });
            });
          case 8:
            return _context3.abrupt("return", !_.isEmpty(elementor.dynamicTags.cache) ? elementor.dynamicTags.parseTagsText(valueToParse, dynamicSettings, elementor.dynamicTags.getTagDataContent) : false);
          case 9:
          case "end":
            return _context3.stop();
        }
      }, _callee3, null, [[0, 4]]);
    }))();
  },
  getChangedDynamicControlKey: function getChangedDynamicControlKey(settings) {
    var _settings$changed, _settings$_previousAt;
    var changedControlKey = this.findUniqueKey(settings === null || settings === void 0 || (_settings$changed = settings.changed) === null || _settings$changed === void 0 ? void 0 : _settings$changed.__dynamic__, settings === null || settings === void 0 || (_settings$_previousAt = settings._previousAttributes) === null || _settings$_previousAt === void 0 ? void 0 : _settings$_previousAt.__dynamic__)[0];
    if (changedControlKey) {
      return changedControlKey;
    }
    return Object.keys(settings.changed)[0] !== '__dynamic__' ? Object.keys(settings.changed)[0] : Object.keys(settings.changed.__dynamic__)[0];
  },
  getChangedDataForRemovedItem: function getChangedDataForRemovedItem(settings, changedControlKey, bindingSetting) {
    var _settings$attributes, _settings$attributes2;
    return ((_settings$attributes = settings.attributes) === null || _settings$attributes === void 0 || (_settings$attributes = _settings$attributes[changedControlKey]) === null || _settings$attributes === void 0 ? void 0 : _settings$attributes[bindingSetting]) || ((_settings$attributes2 = settings.attributes) === null || _settings$attributes2 === void 0 ? void 0 : _settings$attributes2[changedControlKey]);
  },
  getChangedDataForAddedItem: function getChangedDataForAddedItem(settings, changedControlKey, bindingSetting) {
    var _settings$attributes3, _settings$attributes4;
    return ((_settings$attributes3 = settings.attributes) === null || _settings$attributes3 === void 0 || (_settings$attributes3 = _settings$attributes3.__dynamic__) === null || _settings$attributes3 === void 0 || (_settings$attributes3 = _settings$attributes3[changedControlKey]) === null || _settings$attributes3 === void 0 ? void 0 : _settings$attributes3[bindingSetting]) || ((_settings$attributes4 = settings.attributes) === null || _settings$attributes4 === void 0 || (_settings$attributes4 = _settings$attributes4.__dynamic__) === null || _settings$attributes4 === void 0 ? void 0 : _settings$attributes4[changedControlKey]);
  },
  getChangedData: function getChangedData(settings, changedControlKey, bindingSetting) {
    var changedDataForRemovedItem = this.getChangedDataForRemovedItem(settings, changedControlKey, bindingSetting),
      changedDataForAddedItem = this.getChangedDataForAddedItem(settings, changedControlKey, bindingSetting);
    return changedDataForAddedItem || changedDataForRemovedItem;
  },
  /**
   * Function getTitleWithAdvancedValues().
   *
   * Renders before / after / fallback for dynamic item titles.
   *
   * @param {Object} settings
   * @param {string} text
   */
  getTitleWithAdvancedValues: function getTitleWithAdvancedValues(settings, text) {
    var attributes = settings.attributes,
      previousAttributes = settings._previousAttributes;
    if (this.compareSettings(attributes, previousAttributes, 'fallback')) {
      text = text.replace(new RegExp(previousAttributes.fallback), '');
    }
    if (!text || attributes.fallback === text) {
      return attributes.fallback || '';
    }
    if (this.compareSettings(attributes, previousAttributes, 'before')) {
      text = text.replace(previousAttributes.before, '');
    }
    if (this.compareSettings(attributes, previousAttributes, 'after')) {
      text = text.replace(new RegExp(previousAttributes.after + '$'), '');
    }
    if (!text) {
      return attributes.fallback || '';
    }
    var newBefore = this.getNewSettingsValue(attributes, previousAttributes, 'before'),
      newAfter = this.getNewSettingsValue(attributes, previousAttributes, 'after');
    text = newBefore + text;
    text += newAfter;
    return text;
  },
  compareSettings: function compareSettings(attributes, previousAttributes, key) {
    return previousAttributes[key] && previousAttributes[key] !== attributes[key];
  },
  getNewSettingsValue: function getNewSettingsValue(attributes, previousAttributes, key) {
    return previousAttributes[key] !== attributes[key] ? attributes[key] || '' : '';
  },
  getRepeaterItemActiveIndex: function getRepeaterItemActiveIndex() {
    return this.getContainer().renderer.view.model.changed.editSettings.changed.activeItemIndex || this.getContainer().renderer.view.model.changed.editSettings.attributes.activeItemIndex;
  },
  tryHandleDynamicCoverSettings: function tryHandleDynamicCoverSettings(dataBinding, settings) {
    if (!this.isAdvancedDynamicSettings(settings.attributes)) {
      return false;
    }
    this.isRendering = true;
    dataBinding.el.textContent = this.getTitleWithAdvancedValues(settings, dataBinding.el.textContent);
    return true;
  },
  isAdvancedDynamicSettings: function isAdvancedDynamicSettings(attributes) {
    return 'before' in attributes && 'after' in attributes && 'fallback' in attributes;
  }
});
module.exports = BaseElementView;

/***/ }),

/***/ "../assets/dev/js/editor/elements/views/behaviors/context-menu.js":
/*!************************************************************************!*\
  !*** ../assets/dev/js/editor/elements/views/behaviors/context-menu.js ***!
  \************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var __ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n")["__"];


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");
var _environment = _interopRequireDefault(__webpack_require__(/*! elementor-common/utils/environment */ "../core/common/assets/js/utils/environment.js"));
var _base = _interopRequireDefault(__webpack_require__(/*! elementor-views/add-section/base */ "../assets/dev/js/editor/views/add-section/base.js"));
var ContextMenu = __webpack_require__(/*! elementor-editor-utils/context-menu */ "../assets/dev/js/editor/utils/context-menu.js");
module.exports = Marionette.Behavior.extend({
  defaults: {
    context: 'preview',
    groups: [],
    eventTargets: ['el']
  },
  events: function events() {
    var events = {};
    this.getOption('eventTargets').forEach(function (eventTarget) {
      var eventName = 'contextmenu';
      if ('el' !== eventTarget) {
        eventName += ' ' + eventTarget;
      }
      events[eventName] = 'onContextMenu';
    });
    return events;
  },
  initialize: function initialize() {
    this.listenTo(this.view.options.model, 'request:contextmenu', this.onRequestContextMenu);
  },
  initContextMenu: function initContextMenu() {
    var _this = this;
    var controlSign = _environment.default.mac ? '&#8984;' : '^';
    var contextMenuGroups = this.getOption('groups'),
      deleteGroup = _.findWhere(contextMenuGroups, {
        name: 'delete'
      }),
      afterGroupIndex = contextMenuGroups.indexOf(deleteGroup);
    if (-1 === afterGroupIndex) {
      afterGroupIndex = contextMenuGroups.length;
    }
    if ('preview' === this.getOption('context') && $e.components.get('document/elements').utils.showNavigator()) {
      contextMenuGroups.splice(afterGroupIndex, 0, {
        name: 'tools',
        actions: [{
          name: 'navigator',
          icon: 'eicon-navigator',
          title: elementorCommon.config.experimentalFeatures.editor_v2 ? __('Structure', 'elementor') : __('Navigator', 'elementor'),
          shortcut: controlSign + '+I',
          callback: function callback() {
            return $e.route('navigator', {
              reOpen: true,
              model: _this.view.model
            });
          }
        }]
      });
    }
    this.contextMenu = new ContextMenu({
      groups: contextMenuGroups,
      context: this.getOption('context')
    });
    this.contextMenu.getModal().on('hide', function () {
      return _this.onContextMenuHide();
    });
  },
  getContextMenu: function getContextMenu() {
    var _this$view$getContain, _this$view;
    if (!this.contextMenu) {
      this.initContextMenu();
    }
    if ('preview' === this.getOption('context') && !elementor.selection.has((_this$view$getContain = (_this$view = this.view).getContainer) === null || _this$view$getContain === void 0 ? void 0 : _this$view$getContain.call(_this$view))) {
      $e.run('document/elements/deselect-all');
    }
    return this.contextMenu;
  },
  onContextMenu: function onContextMenu(event) {
    if ($e.shortcuts.isControlEvent(event)) {
      return;
    }
    if ('preview' === this.getOption('context')) {
      var isAddSectionView = this.view instanceof _base.default;
      if (!isAddSectionView && (!this.view.container || !this.view.container.isDesignable())) {
        return;
      }
    }
    event.preventDefault();
    event.stopPropagation();

    // Disable sortable when context menu opened
    // TODO: Should be in UI hook when the context menu will move to command
    if (this.view._parent) {
      this.view._parent.triggerMethod('toggleSortMode', false);
    }
    this.getContextMenu().show(event);
    elementor.channels.editor.reply('contextMenu:targetView', this.view);
  },
  onRequestContextMenu: function onRequestContextMenu(event) {
    var modal = this.getContextMenu().getModal(),
      iframe = modal.getSettings('iframe'),
      toolsGroup = _.findWhere(this.contextMenu.getSettings('groups'), {
        name: 'tools'
      });
    toolsGroup.isVisible = false;
    modal.setSettings('iframe', null);
    this.onContextMenu(event);
    toolsGroup.isVisible = true;
    modal.setSettings('iframe', iframe);
  },
  onContextMenuHide: function onContextMenuHide() {
    // Enable sortable when context menu closed
    // TODO: Should be in UI hook when the context menu will move to command
    if (this.view._parent) {
      this.view._parent.triggerMethod('toggleSortMode', true);
    }
    elementor.channels.editor.reply('contextMenu:targetView', null);
  },
  onDestroy: function onDestroy() {
    if (this.contextMenu) {
      this.contextMenu.destroy();
    }
  }
});

/***/ }),

/***/ "../assets/dev/js/editor/elements/views/behaviors/sortable.js":
/*!********************************************************************!*\
  !*** ../assets/dev/js/editor/elements/views/behaviors/sortable.js ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../node_modules/@babel/runtime/helpers/defineProperty.js"));
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2.default)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var SortableBehavior;

/**
 * @typedef {import('../../../container/container')} Container
 */
SortableBehavior = Marionette.Behavior.extend({
  defaults: {
    elChildType: 'widget'
  },
  events: {
    sortstart: 'onSortStart',
    sortreceive: 'onSortReceive',
    sortupdate: 'onSortUpdate',
    sortover: 'onSortOver',
    sortout: 'onSortOut'
  },
  initialize: function initialize() {
    this.listenTo(elementor.channels.dataEditMode, 'switch', this.onEditModeSwitched).listenTo(this.view.options.model, 'request:sort:start', this.startSort).listenTo(this.view.options.model, 'request:sort:update', this.updateSort).listenTo(this.view.options.model, 'request:sort:receive', this.receiveSort);
  },
  onEditModeSwitched: function onEditModeSwitched(activeMode) {
    this.onToggleSortMode('edit' === activeMode);
  },
  refresh: function refresh() {
    this.onEditModeSwitched(elementor.channels.dataEditMode.request('activeMode'));
  },
  onRender: function onRender() {
    var _this = this;
    this.view.collection.on('update', function () {
      return _this.refresh();
    });
    _.defer(function () {
      return _this.refresh();
    });
  },
  onDestroy: function onDestroy() {
    this.deactivate();
  },
  /**
   * Create an item placeholder in order to avoid UI jumps due to flex.
   *
   * @param {Object}  $element  - jQuery element instance to create placeholder for.
   * @param {string}  className - Placeholder class.
   * @param {boolean} hide      - Whether to hide the original element.
   *
   * @return {void}
   */
  createPlaceholder: function createPlaceholder($element) {
    var className = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var hide = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    // Get the actual item size.
    $element.css('display', '');
    var _$element$ = $element[0],
      width = _$element$.clientWidth,
      height = _$element$.clientHeight;
    if (hide) {
      $element.css('display', 'none');
    }
    jQuery('<div />').css(_objectSpread(_objectSpread({}, $element.css(['flex-basis', 'flex-grow', 'flex-shrink', 'position'])), {}, {
      width: width,
      height: height
    })).addClass(className).insertAfter($element);
  },
  /**
   * Return a settings object for jQuery UI sortable to make it swappable.
   *
   * @return {{stop: Function, start: Function}} options
   */
  getSwappableOptions: function getSwappableOptions() {
    var _this2 = this;
    var $childViewContainer = this.getChildViewContainer(),
      placeholderClass = 'e-swappable--item-placeholder';
    return {
      start: function start(event, ui) {
        $childViewContainer.sortable('refreshPositions');

        // TODO: Find a better solution than this hack.
        // Used in order to prevent dragging a container into itself.
        _this2.createPlaceholder(ui.item, placeholderClass);
      },
      stop: function stop() {
        // Cleanup.
        $childViewContainer.find(".".concat(placeholderClass)).remove();
      }
    };
  },
  onToggleSortMode: function onToggleSortMode(isActive) {
    if (isActive) {
      this.activate();
    } else {
      this.deactivate();
    }
  },
  applySortable: function applySortable() {
    if (!elementor.userCan('design')) {
      return;
    }
    var $childViewContainer = this.getChildViewContainer(),
      defaultSortableOptions = {
        placeholder: 'elementor-sortable-placeholder elementor-' + this.getOption('elChildType') + '-placeholder',
        cursorAt: {
          top: 20,
          left: 25
        },
        helper: this._getSortableHelper.bind(this),
        cancel: 'input, textarea, button, select, option, .elementor-inline-editing, .elementor-tab-title',
        // Fix: Sortable - Unable to drag and drop sections with huge height.
        start: function start() {
          $childViewContainer.sortable('refreshPositions');
        }
      };
    var sortableOptions = _.extend(defaultSortableOptions, this.view.getSortableOptions());

    // Add a swappable behavior (used for flex containers).
    if (this.isSwappable()) {
      $childViewContainer.addClass('e-swappable');
      sortableOptions = _.extend(sortableOptions, this.getSwappableOptions());
    }

    // TODO: Temporary hack for Container.
    //  Will be removed in the future when the Navigator will use React.
    if (sortableOptions.preventInit) {
      return;
    }
    $childViewContainer.sortable(sortableOptions);
  },
  /**
   * Enable sorting for this element, and generate sortable instance for it unless already generated.
   */
  activate: function activate() {
    if (!this.getChildViewContainer().sortable('instance')) {
      // Generate sortable instance for this element. Since fresh instances of sortable already allowing sorting,
      // we can return.
      this.applySortable();
      return;
    }
    this.getChildViewContainer().sortable('enable');
  },
  _getSortableHelper: function _getSortableHelper(event, $item) {
    var model = this.view.collection.get({
      cid: $item.data('model-cid')
    });
    return '<div style="height: 84px; width: 125px;" class="elementor-sortable-helper elementor-sortable-helper-' + model.get('elType') + '"><div class="icon"><i class="' + model.getIcon() + '"></i></div><div class="title-wrapper"><div class="title">' + model.getTitle() + '</div></div></div>';
  },
  getChildViewContainer: function getChildViewContainer() {
    return this.view.getChildViewContainer(this.view);
  },
  // The natural widget index in the column is wrong, since there are other elements
  // at the beginning of the column (background-overlay, element-overlay, resizeable-handle)
  getSortedElementNewIndex: function getSortedElementNewIndex($element) {
    var widgets = Object.values($element.parent().find('> .elementor-element'));
    return widgets.indexOf($element[0]);
  },
  /**
   * Disable sorting of the element unless no sortable instance exists, in which case there is already no option to
   * sort.
   */
  deactivate: function deactivate() {
    var childViewContainer = this.getChildViewContainer();
    if (childViewContainer.sortable('instance')) {
      childViewContainer.sortable('disable');
    }
  },
  /**
   * Determine if the current instance of Sortable is swappable.
   *
   * @return {boolean} is swappable
   */
  isSwappable: function isSwappable() {
    return !!this.view.getSortableOptions().swappable;
  },
  startSort: function startSort(event, ui) {
    event.stopPropagation();
    var container = elementor.getContainer(ui.item.attr('data-id'));
    elementor.channels.data.reply('dragging:model', container.model).reply('dragging:view', container.view).reply('dragging:parent:view', this.view).trigger('drag:start', container.model).trigger(container.model.get('elType') + ':drag:start');
  },
  // On sorting element
  updateSort: function updateSort(ui, newIndex) {
    if (undefined === newIndex) {
      newIndex = ui.item.index();
    }
    var child = elementor.channels.data.request('dragging:view').getContainer();
    this.moveChild(child, newIndex);
  },
  // On receiving element from another container
  receiveSort: function receiveSort(event, ui, newIndex) {
    event.stopPropagation();
    if (this.view.isCollectionFilled()) {
      jQuery(ui.sender).sortable('cancel');
      return;
    }
    var model = elementor.channels.data.request('dragging:model'),
      draggedElType = model.get('elType'),
      draggedIsInnerSection = 'section' === draggedElType && model.get('isInner'),
      targetIsInnerColumn = 'column' === this.view.getElementType() && this.view.isInner();
    if (draggedIsInnerSection && targetIsInnerColumn) {
      jQuery(ui.sender).sortable('cancel');
      return;
    }
    if (undefined === newIndex) {
      newIndex = ui.item.index();
    }
    var child = elementor.channels.data.request('dragging:view').getContainer();
    this.moveChild(child, newIndex);
  },
  onSortStart: function onSortStart(event, ui) {
    if ('column' === this.options.elChildType) {
      var uiData = ui.item.data('sortableItem'),
        uiItems = uiData.items,
        itemHeight = 0;
      uiItems.forEach(function (item) {
        if (item.item[0] === ui.item[0]) {
          itemHeight = item.height;
          return false;
        }
      });
      ui.placeholder.height(itemHeight);
    }
    this.startSort(event, ui);
  },
  onSortOver: function onSortOver(event) {
    event.stopPropagation();
    var model = elementor.channels.data.request('dragging:model');
    jQuery(event.target).addClass('elementor-draggable-over').attr({
      'data-dragged-element': model.get('elType'),
      'data-dragged-is-inner': model.get('isInner')
    });
    this.$el.addClass('elementor-dragging-on-child');
  },
  onSortOut: function onSortOut(event) {
    event.stopPropagation();
    jQuery(event.target).removeClass('elementor-draggable-over').removeAttr('data-dragged-element data-dragged-is-inner');
    this.$el.removeClass('elementor-dragging-on-child');
  },
  onSortReceive: function onSortReceive(event, ui) {
    this.receiveSort(event, ui, this.getSortedElementNewIndex(ui.item));
  },
  onSortUpdate: function onSortUpdate(event, ui) {
    event.stopPropagation();
    if (this.getChildViewContainer()[0] !== ui.item.parent()[0]) {
      return;
    }
    this.updateSort(ui, this.getSortedElementNewIndex(ui.item));
  },
  onAddChild: function onAddChild(view) {
    view.$el.attr('data-model-cid', view.model.cid);
  },
  /**
   * Move a child container to another position.
   *
   * @param {Container}     child - The child container to move.
   * @param {number|string} index - New index.
   *
   * @return {void}
   */
  moveChild: function moveChild(child, index) {
    $e.run('document/elements/move', {
      container: child,
      target: this.view.getContainer(),
      options: {
        at: index
      }
    });
  }
});
module.exports = SortableBehavior;

/***/ }),

/***/ "../assets/dev/js/editor/elements/views/container/empty-component.js":
/*!***************************************************************************!*\
  !*** ../assets/dev/js/editor/elements/views/container/empty-component.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = EmptyComponent;
var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
function EmptyComponent() {
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "elementor-first-add"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "elementor-icon eicon-plus",
    onClick: function onClick() {
      return $e.route('panel/elements/categories');
    }
  }));
}

/***/ }),

/***/ "../assets/dev/js/editor/errors/element-type-not-found.js":
/*!****************************************************************!*\
  !*** ../assets/dev/js/editor/errors/element-type-not-found.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = exports.ElementTypeNotFound = void 0;
var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../node_modules/@babel/runtime/helpers/createClass.js"));
var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../node_modules/@babel/runtime/helpers/classCallCheck.js"));
var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));
var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../node_modules/@babel/runtime/helpers/getPrototypeOf.js"));
var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../node_modules/@babel/runtime/helpers/inherits.js"));
var _wrapNativeSuper2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/wrapNativeSuper */ "../node_modules/@babel/runtime/helpers/wrapNativeSuper.js"));
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2.default)(o), (0, _possibleConstructorReturn2.default)(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2.default)(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var ElementTypeNotFound = exports.ElementTypeNotFound = /*#__PURE__*/function (_Error) {
  function ElementTypeNotFound(elementType) {
    (0, _classCallCheck2.default)(this, ElementTypeNotFound);
    return _callSuper(this, ElementTypeNotFound, ["Element type not found: '".concat(elementType, "'")]);
  }
  (0, _inherits2.default)(ElementTypeNotFound, _Error);
  return (0, _createClass2.default)(ElementTypeNotFound);
}(/*#__PURE__*/(0, _wrapNativeSuper2.default)(Error));
var _default = exports["default"] = ElementTypeNotFound;

/***/ }),

/***/ "../assets/dev/js/editor/utils/container-helper.js":
/*!*********************************************************!*\
  !*** ../assets/dev/js/editor/utils/container-helper.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var __ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n")["__"];


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = exports.ContainerHelper = void 0;
var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../node_modules/@babel/runtime/helpers/classCallCheck.js"));
var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../node_modules/@babel/runtime/helpers/createClass.js"));
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../node_modules/@babel/runtime/helpers/defineProperty.js"));
var _ContainerHelper;
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2.default)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
/**
 * @typedef {import('../container/container')} Container
 */
/**
 * Container element helper functions.
 */
var ContainerHelper = exports.ContainerHelper = /*#__PURE__*/function () {
  function ContainerHelper() {
    (0, _classCallCheck2.default)(this, ContainerHelper);
  }
  return (0, _createClass2.default)(ContainerHelper, null, [{
    key: "createContainers",
    value:
    /**
     * Create multiple container elements.
     *
     * @param {number}    count    - Count of Containers to create.
     * @param {Object}    settings - Settings to set to each Container.
     * @param {Container} target   - The Container object to create the new Container elements inside.
     * @param {Object}    options  - Additional command options.
     *
     * @return {Container[]} - Array of the newly created Containers.
     */
    function createContainers(count, settings) {
      var target = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      var containers = [];
      for (var i = 0; i < count; i++) {
        containers.push(this.createContainer(settings, target, options));
      }
      return containers;
    }

    /**
     * Create a Container element.
     *
     * @param {Object}    settings        - Settings to set to each Container.
     * @param {Container} target          - The Container object to create the new Container elements inside.
     * @param {Object}    options         - Additional command options.
     * @param {Object}    modelAttributes - Additional model attributes.
     *
     * @return {Container} - The newly created Container.
     */
  }, {
    key: "createContainer",
    value: function createContainer() {
      var settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var target = arguments.length > 1 ? arguments[1] : undefined;
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var modelAttributes = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      return $e.run('document/elements/create', {
        container: target,
        model: _objectSpread({
          elType: 'container',
          settings: settings
        }, modelAttributes),
        options: options
      });
    }

    /**
     * Change Container settings.
     *
     * @param {Object}    settings  - New settings.
     * @param {Container} container - Container to set the settings to.
     *
     * @return {void}
     */
  }, {
    key: "setContainerSettings",
    value: function setContainerSettings(settings, container) {
      $e.run('document/elements/settings', {
        container: container,
        settings: settings,
        options: {
          external: true
        }
      });
    }

    /**
     * Create a Container element based on a sizes.
     *
     * @param {Array}     sizes                        - Preset sizes.
     * @param {Container} target                       - The target of new created element.
     * @param {Object}    options                      - Additional command options.
     * @param {boolean}   [options.createWrapper=true] - Create a wrapper container for the preset.
     *
     * @return {Container} - Container created on.
     */
  }, {
    key: "createContainerFromSizes",
    value: function createContainerFromSizes(sizes, target) {
      var _this = this;
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var _options$createWrappe = options.createWrapper,
        createWrapper = _options$createWrappe === void 0 ? true : _options$createWrappe,
        sizesMap = {
          33: '33.3333',
          66: '66.6666'
        },
        sizesSum = sizes.reduce(function (sum, size) {
          return sum + parseInt(size);
        }, 0),
        shouldWrap = sizesSum > 100,
        settings = _objectSpread(_objectSpread({
          flex_direction: this.DIRECTION_ROW
        }, shouldWrap ? {
          flex_wrap: 'wrap'
        } : {}), {}, {
          flex_gap: {
            unit: 'px',
            size: 0,
            // Set the gap to 0 to override the default inherited from `Site Settings`.
            column: '0',
            row: '0'
          }
        });

      // Create a parent container to contain all of the sub containers.
      var parentContainer;

      // The `createWrapper` false option is used in nested-modules for creating containers from preset for custom target(s).
      if (!createWrapper) {
        $e.run('document/elements/settings', {
          container: target,
          settings: settings
        });
        parentContainer = target;
      } else {
        parentContainer = this.createContainer(settings, target, options);
      }

      // Create all sub containers using the sizes array.
      // Use flex basis to make the sizes explicit.
      sizes.forEach(function (size) {
        size = sizesMap[size] || size;
        _this.createContainer({
          flex_direction: _this.DIRECTION_COLUMN,
          content_width: 'full',
          width: {
            unit: '%',
            size: size
          }
        }, parentContainer, {
          edit: false
        });
      });
      return parentContainer;
    }

    /**
     * Create a Container element based on a preset.
     *
     * @param {string}    preset                       - Preset structure of the sub containers (e.g. `33-66-66-33`).
     * @param {Container} target                       - The target container of the newly created Container.
     * @param {Object}    options                      - Additional command options.
     * @param {boolean}   [options.createWrapper=true] - Create a wrapper container for the preset.
     *
     * @return {Container} - Container created on.
     */
  }, {
    key: "createContainerFromPreset",
    value: function createContainerFromPreset(preset) {
      var target = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : elementor.getPreviewContainer();
      var options = arguments.length > 2 ? arguments[2] : undefined;
      var historyId = $e.internal('document/history/start-log', {
          type: 'add',
          title: __('Container', 'elementor')
        }),
        _options$createWrappe2 = options.createWrapper,
        createWrapper = _options$createWrappe2 === void 0 ? true : _options$createWrappe2;
      var newContainer, settings;
      try {
        switch (preset) {
          // Single column Container without sub Containers.
          case 'c100':
            newContainer = ContainerHelper.createContainer({
              flex_direction: ContainerHelper.DIRECTION_COLUMN
            }, target, options);
            break;

          // Single row Container without sub Containers.
          case 'r100':
            newContainer = ContainerHelper.createContainer({
              flex_direction: ContainerHelper.DIRECTION_ROW
            }, target, options);
            break;

          // Exceptional preset.
          case 'c100-c50-50':
            {
              settings = {
                flex_direction: ContainerHelper.DIRECTION_ROW,
                flex_gap: {
                  unit: 'px',
                  size: 0,
                  // Set the gap to 0 to override the default inherited from `Site Settings`.
                  column: '0',
                  row: '0'
                }
              };
              if (!createWrapper) {
                $e.run('document/elements/settings', {
                  container: target,
                  settings: settings
                });
                newContainer = target;
              } else {
                newContainer = ContainerHelper.createContainer(settings, target, options);
              }
              settings = {
                content_width: 'full',
                width: {
                  unit: '%',
                  size: '50'
                }
              };
              ContainerHelper.createContainer(settings, newContainer, {
                edit: false
              });
              var rightContainer = ContainerHelper.createContainer(_objectSpread(_objectSpread({}, settings), {}, {
                padding: {
                  unit: 'px',
                  top: 0,
                  right: 0,
                  bottom: 0,
                  left: 0,
                  isLinked: true
                },
                // Create the right Container with 0 padding (default is 10px).
                flex_gap: {
                  unit: 'px',
                  size: 0,
                  // Set the gap to 0 to override the default inherited from `Site Settings`.
                  column: '0',
                  row: '0'
                }
              }), newContainer, {
                edit: false
              });
              ContainerHelper.createContainers(2, {}, rightContainer, {
                edit: false
              });
              break;
            }
          // Containers by preset.
          default:
            {
              var sizes = preset.split('-');
              newContainer = ContainerHelper.createContainerFromSizes(sizes, target, options);
            }
        }
        $e.internal('document/history/end-log', {
          id: historyId
        });
      } catch (e) {
        $e.internal('document/history/delete-log', {
          id: historyId
        });
      }
      return newContainer;
    }

    /**
     * Open edit mode of a Container.
     *
     * @param {Container} container - Container to open edit mode for.
     */
  }, {
    key: "openEditMode",
    value: function openEditMode(container) {
      $e.run('document/elements/select', {
        container: container
      });
    }
  }]);
}();
_ContainerHelper = ContainerHelper;
// Flex directions.
(0, _defineProperty2.default)(ContainerHelper, "DIRECTION_ROW", 'row');
(0, _defineProperty2.default)(ContainerHelper, "DIRECTION_COLUMN", 'column');
(0, _defineProperty2.default)(ContainerHelper, "DIRECTION_ROW_REVERSED", 'row-reverse');
(0, _defineProperty2.default)(ContainerHelper, "DIRECTION_COLUMN_REVERSED", 'column-reverse');
(0, _defineProperty2.default)(ContainerHelper, "DIRECTION_DEFAULT", _ContainerHelper.DIRECTION_COLUMN);
(0, _defineProperty2.default)(ContainerHelper, "CONTAINER_TYPE_GRID", 'grid');
var _default = exports["default"] = ContainerHelper;

/***/ }),

/***/ "../assets/dev/js/editor/utils/context-menu.js":
/*!*****************************************************!*\
  !*** ../assets/dev/js/editor/utils/context-menu.js ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";


module.exports = elementorModules.Module.extend({
  getDefaultSettings: function getDefaultSettings() {
    return {
      context: 'preview',
      actions: {},
      classes: {
        list: 'elementor-context-menu-list',
        group: 'elementor-context-menu-list__group',
        groupPrefix: 'elementor-context-menu-list__group-',
        item: 'elementor-context-menu-list__item',
        itemTypePrefix: 'elementor-context-menu-list__item-',
        itemTitle: 'elementor-context-menu-list__item__title',
        itemShortcut: 'elementor-context-menu-list__item__shortcut',
        iconShortcut: 'elementor-context-menu-list__item__icon',
        itemDisabled: 'elementor-context-menu-list__item--disabled',
        divider: 'elementor-context-menu-list__divider',
        hidden: 'elementor-hidden',
        promotionLink: 'elementor-context-menu-list__item__shortcut--link-fullwidth'
      }
    };
  },
  buildActionItem: function buildActionItem(action) {
    var self = this,
      classes = self.getSettings('classes'),
      $item = jQuery('<div>', {
        class: classes.item + ' ' + classes.itemTypePrefix + action.name,
        role: 'menuitem',
        tabindex: '0'
      }),
      $itemTitle = jQuery('<div>', {
        class: classes.itemTitle
      }).text(action.title),
      $itemIcon = jQuery('<div>', {
        class: classes.iconShortcut
      });
    if (action.icon) {
      $itemIcon.html(jQuery('<i>', {
        class: action.icon
      }));
    }
    $item.append($itemIcon, $itemTitle);
    if (action.shortcut) {
      var $itemShortcut = jQuery('<div>', {
        class: classes.itemShortcut
      }).html(action.shortcut);
      $item.append($itemShortcut);
    }
    if (action.callback) {
      $item.on('click', function () {
        self.runAction(action);
      });
      $item.on('keyup', function (event) {
        var ENTER_KEY = 13,
          SPACE_KEY = 32;
        if (ENTER_KEY === event.keyCode || SPACE_KEY === event.keyCode) {
          self.runAction(action);
        }
      });
    }
    action.$item = $item;
    return $item;
  },
  buildActionsList: function buildActionsList() {
    var self = this,
      classes = self.getSettings('classes'),
      groups = self.getSettings('groups'),
      $list = jQuery('<div>', {
        class: classes.list,
        role: 'menu'
      });
    groups.forEach(function (group) {
      var $group = jQuery('<div>', {
        class: classes.group + ' ' + classes.groupPrefix + group.name,
        role: 'group'
      });
      group.actions.forEach(function (action) {
        $group.append(self.buildActionItem(action));
      });
      $list.append($group);
      group.$item = $group;
    });
    return $list;
  },
  toggleGroupVisibility: function toggleGroupVisibility(group, state) {
    group.$item.toggleClass(this.getSettings('classes.hidden'), !state);
  },
  toggleActionVisibility: function toggleActionVisibility(action, state) {
    action.$item.toggleClass(this.getSettings('classes.hidden'), !state);
  },
  toggleActionUsability: function toggleActionUsability(action, state) {
    this.maybeAddPromotionLink(action);
    action.$item.toggleClass(this.getSettings('classes.itemDisabled'), !state);
  },
  maybeAddPromotionLink: function maybeAddPromotionLink(action) {
    if (this.shouldAddPromotionLink(action)) {
      var iconContainer = action.$item.find('div.elementor-context-menu-list__item__shortcut')[0];
      iconContainer.insertAdjacentHTML('beforeend', "<a href='".concat(action.promotionURL, "' target=\"_blank\" class=\"").concat(this.getSettings('classes.promotionLink'), "\"></a>"));
    }
  },
  shouldAddPromotionLink: function shouldAddPromotionLink(action) {
    return !!(action.promotionURL && !action.$item.find('a.elementor-context-menu-list__item__shortcut--link-fullwidth')[0] && action.$item.find('i.eicon-pro-icon')[0]);
  },
  /**
   * Update the action title.
   *
   * Sometimes the action title should dynamically change. This can be done by passing a function as the `title`
   * property when initializing the context-menu, and here it actually invoked and assigned as the title.
   *
   * @param {*} action
   */
  updateActionTitle: function updateActionTitle(action) {
    if ('function' === typeof action.title) {
      action.$item.find('.' + this.getSettings('classes').itemTitle).text(action.title());
    }
  },
  isActionEnabled: function isActionEnabled(action) {
    if (!action.callback && !action.groups) {
      return false;
    }
    return action.isEnabled ? action.isEnabled() : true;
  },
  isActionVisible: function isActionVisible(action) {
    if ('function' === typeof action.isVisible) {
      return action.isVisible();
    }
    return false !== action.isVisible;
  },
  runAction: function runAction(action) {
    if (!this.isActionEnabled(action) || !this.isActionVisible(action)) {
      return;
    }
    action.callback();
    this.getModal().hide();
  },
  initModal: function initModal() {
    var modal;
    this.getModal = function () {
      if (!modal) {
        modal = elementorCommon.dialogsManager.createWidget('simple', {
          className: 'elementor-context-menu',
          message: this.buildActionsList(),
          iframe: 'preview' === this.getSettings('context') ? elementor.$preview : null,
          effects: {
            hide: 'hide',
            show: 'show'
          },
          hide: {
            onOutsideContextMenu: true
          },
          position: {
            my: (elementorCommon.config.isRTL ? 'right' : 'left') + ' top',
            collision: 'fit'
          }
        });
      }
      return modal;
    };
  },
  show: function show(event) {
    var self = this,
      modal = self.getModal();
    modal.setSettings('position', {
      of: event
    });
    self.getSettings('groups').forEach(function (group) {
      var isGroupVisible = false !== group.isVisible;
      self.toggleGroupVisibility(group, isGroupVisible);
      if (isGroupVisible) {
        group.actions.forEach(function (action) {
          var isActionVisible = self.isActionVisible(action);
          self.toggleActionVisibility(action, isActionVisible);
          self.updateActionTitle(action);
          if (isActionVisible) {
            self.toggleActionUsability(action, self.isActionEnabled(action));
          }
        });
      }
    });
    modal.show();
  },
  destroy: function destroy() {
    this.getModal().destroy();
  },
  onInit: function onInit() {
    this.initModal();
  }
});

/***/ }),

/***/ "../assets/dev/js/editor/utils/controls-css-parser.js":
/*!************************************************************!*\
  !*** ../assets/dev/js/editor/utils/controls-css-parser.js ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");
var _slicedToArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "../node_modules/@babel/runtime/helpers/slicedToArray.js"));
var Stylesheet = __webpack_require__(/*! elementor-editor-utils/stylesheet */ "../assets/dev/js/editor/utils/stylesheet.js"),
  ControlsCSSParser;
ControlsCSSParser = elementorModules.ViewModule.extend({
  stylesheet: null,
  getDefaultSettings: function getDefaultSettings() {
    return {
      id: 0,
      context: null,
      settingsModel: null,
      dynamicParsing: {}
    };
  },
  getDefaultElements: function getDefaultElements() {
    var id = "elementor-style-".concat(this.getSettings('id'));
    var $stylesheet = elementor.$previewContents.find("#".concat(id));
    if (!$stylesheet.length) {
      $stylesheet = jQuery('<style>', {
        id: id
      });
    }
    return {
      $stylesheetElement: $stylesheet
    };
  },
  initStylesheet: function initStylesheet() {
    var _this = this;
    var breakpoints = elementorFrontend.config.responsive.activeBreakpoints;
    this.stylesheet = new Stylesheet();
    Object.entries(breakpoints).forEach(function (_ref) {
      var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
        breakpointName = _ref2[0],
        breakpointConfig = _ref2[1];
      _this.stylesheet.addDevice(breakpointName, breakpointConfig.value);
    });
  },
  addStyleRules: function addStyleRules(styleControls, values, controls, placeholders, replacements) {
    var _this2 = this;
    // If the current element contains dynamic values, parse these values
    var dynamicParsedValues = this.getSettings('settingsModel').parseDynamicSettings(values, this.getSettings('dynamicParsing'), styleControls);
    _.each(styleControls, function (control) {
      var _control$dynamic, _values$__dynamic__;
      if (control.styleFields && control.styleFields.length) {
        _this2.addRepeaterControlsStyleRules(values[control.name], control.styleFields, control.fields, placeholders, replacements);
      }

      // If a dynamic tag includes controls with CSS implementations, Take their CSS and apply it.
      if ((_control$dynamic = control.dynamic) !== null && _control$dynamic !== void 0 && _control$dynamic.active && (_values$__dynamic__ = values.__dynamic__) !== null && _values$__dynamic__ !== void 0 && _values$__dynamic__[control.name]) {
        _this2.addDynamicControlStyleRules(values.__dynamic__[control.name], control);
      }
      if (!control.selectors) {
        return;
      }
      var context = _this2.getSettings('context');
      var globalKeys;
      if (context) {
        globalKeys = context.model.get('settings').get('__globals__');
      }
      _this2.addControlStyleRules(control, dynamicParsedValues, controls, placeholders, replacements, globalKeys);
    });
  },
  addControlStyleRules: function addControlStyleRules(control, values, controls, placeholders, replacements, globalKeys) {
    var _this3 = this;
    var globalKey;
    if (globalKeys) {
      var controlGlobalKey = control.name;
      if (control.groupType) {
        controlGlobalKey = control.groupPrefix + control.groupType;
      }
      globalKey = globalKeys[controlGlobalKey];
    }
    var value;
    if (!globalKey) {
      value = this.getStyleControlValue(control, values);
      if (undefined === value) {
        return;
      }
    }
    _.each(control.selectors, function (cssProperty, selector) {
      var outputCssProperty;
      if (globalKey) {
        var selectorGlobalValue = _this3.getSelectorGlobalValue(control, globalKey);
        if (selectorGlobalValue) {
          if ('font' === control.type) {
            $e.data.get(globalKey).then(function (response) {
              elementor.helpers.enqueueFont(response.data.value.typography_font_family);
            });
          }

          // This regex handles a case where a control's selector property value includes more than one CSS selector.
          // Example: 'selector' => 'background: {{VALUE}}; background-color: {{VALUE}};'.
          outputCssProperty = cssProperty.replace(/(:)[^;]+(;?)/g, '$1' + selectorGlobalValue + '$2');
        }
      } else {
        try {
          if (_this3.unitHasCustomSelector(control, value)) {
            cssProperty = control.unit_selectors_dictionary[value.unit];
          }
          if (_this3.shouldDoUpgradeMap(control, value)) {
            var _control$upgrade_conv;
            (_control$upgrade_conv = control.upgrade_conversion_map) === null || _control$upgrade_conv === void 0 || _control$upgrade_conv.new_keys.forEach(function (key) {
              value[key] = '' + value[control.upgrade_conversion_map.old_key];
            });
          }
          outputCssProperty = cssProperty.replace(/{{(?:([^.}]+)\.)?([^}| ]*)(?: *\|\| *(?:([^.}]+)\.)?([^}| ]*) *)*}}/g, function (originalPhrase, controlName, placeholder, fallbackControlName, fallbackValue) {
            var externalControlMissing = controlName && !controls[controlName];
            var parsedValue = '';
            if (!externalControlMissing) {
              parsedValue = _this3.parsePropertyPlaceholder(control, value, controls, values, placeholder, controlName);
            }
            if (!parsedValue && 0 !== parsedValue) {
              if (fallbackValue) {
                parsedValue = fallbackValue;
                var stringValueMatches = parsedValue.match(/^(['"])(.*)\1$/);
                if (stringValueMatches) {
                  parsedValue = stringValueMatches[2];
                } else if (!isFinite(parsedValue)) {
                  if (fallbackControlName && !controls[fallbackControlName]) {
                    return '';
                  }
                  parsedValue = _this3.parsePropertyPlaceholder(control, value, controls, values, fallbackValue, fallbackControlName);
                }
              }
              if (!parsedValue && 0 !== parsedValue) {
                if (externalControlMissing) {
                  return '';
                }
                throw '';
              }
            }
            if ('font' === control.type) {
              elementor.helpers.enqueueFont(parsedValue);
            }
            if ('__EMPTY__' === parsedValue) {
              parsedValue = '';
            }
            return parsedValue;
          });
        } catch (e) {
          return;
        }
      }
      if (_.isEmpty(outputCssProperty)) {
        return;
      }
      var devicePattern = /^(?:\([^)]+\)){1,2}/,
        deviceRules = selector.match(devicePattern),
        query = {};
      if (deviceRules) {
        deviceRules = deviceRules[0];
        selector = selector.replace(devicePattern, '');
        var pureDevicePattern = /\(([^)]+)\)/g,
          pureDeviceRules = [],
          matches;
        matches = pureDevicePattern.exec(deviceRules);
        while (matches) {
          pureDeviceRules.push(matches[1]);
          matches = pureDevicePattern.exec(deviceRules);
        }
        _.each(pureDeviceRules, function (deviceRule) {
          if ('desktop' === deviceRule) {
            return;
          }
          var device = deviceRule.replace(/\+$/, ''),
            endPoint = device === deviceRule ? 'max' : 'min';
          query[endPoint] = device;
        });
      }
      _.each(placeholders, function (placeholder, index) {
        // Check if it's a RegExp
        var regexp = placeholder.source ? placeholder.source : placeholder,
          placeholderPattern = new RegExp(regexp, 'g');
        selector = selector.replace(placeholderPattern, replacements[index]);
      });
      if (!Object.keys(query).length && control.responsive) {
        query = _.pick(elementorCommon.helpers.cloneObject(control.responsive), ['min', 'max']);
        if ('desktop' === query.max) {
          delete query.max;
        }
      }
      _this3.stylesheet.addRules(selector, outputCssProperty, query);
    });
  },
  unitHasCustomSelector: function unitHasCustomSelector(control, value) {
    return control.unit_selectors_dictionary && undefined !== control.unit_selectors_dictionary[value.unit];
  },
  shouldDoUpgradeMap: function shouldDoUpgradeMap(control, value) {
    return control.upgrade_conversion_map && !!value.hasOwnProperty(control.upgrade_conversion_map.old_key) && '' !== value[control.upgrade_conversion_map.old_key] && !value.hasOwnProperty(control.upgrade_conversion_map.new_keys[0]);
  },
  parsePropertyPlaceholder: function parsePropertyPlaceholder(control, value, controls, values, placeholder, parserControlName) {
    if (parserControlName) {
      if (control.responsive && controls[parserControlName]) {
        var _$findWhere;
        var deviceSuffix = elementor.conditions.getResponsiveControlDeviceSuffix(control.responsive);
        control = (_$findWhere = _.findWhere(controls, {
          name: parserControlName + deviceSuffix
        })) !== null && _$findWhere !== void 0 ? _$findWhere : _.findWhere(controls, {
          name: parserControlName
        });
      } else {
        control = _.findWhere(controls, {
          name: parserControlName
        });
      }
      value = this.getStyleControlValue(control, values);
    }
    return elementor.getControlView(control.type).getStyleValue(placeholder, value, control);
  },
  getStyleControlValue: function getStyleControlValue(control, values) {
    var _this$getSettings, _values$__globals__, _control$global;
    var container = (_this$getSettings = this.getSettings()) === null || _this$getSettings === void 0 || (_this$getSettings = _this$getSettings.context) === null || _this$getSettings === void 0 ? void 0 : _this$getSettings.container,
      isGlobalApplied = container === null || container === void 0 ? void 0 : container.isGlobalApplied(control.name),
      globalKey = ((_values$__globals__ = values.__globals__) === null || _values$__globals__ === void 0 ? void 0 : _values$__globals__[control.name]) || ((_control$global = control.global) === null || _control$global === void 0 ? void 0 : _control$global.default);

    // Set a global value only if it is applied.
    if (isGlobalApplied && globalKey) {
      // When the control itself has no global value, but it refers to another control global value
      return this.getSelectorGlobalValue(control, globalKey);
    }
    var value = values[control.name];
    if (control.selectors_dictionary) {
      value = control.selectors_dictionary[value] || value;
    }
    if (!_.isNumber(value) && _.isEmpty(value)) {
      return;
    }
    return value;
  },
  getSelectorGlobalValue: function getSelectorGlobalValue(control, globalKey) {
    var globalArgs = $e.data.commandExtractArgs(globalKey),
      data = $e.data.getCache($e.components.get('globals'), globalArgs.command, globalArgs.args.query);
    if (!(data !== null && data !== void 0 && data.value)) {
      return;
    }
    var id = data.id;
    var value;

    // It's a global settings with additional controls in group.
    if (control.groupType) {
      // A regex containing all of the active breakpoints' prefixes ('_mobile', '_tablet' etc.).
      var responsivePrefixRegex = elementor.breakpoints.getActiveMatchRegex();
      var propertyName = control.name.replace(control.groupPrefix, '').replace(responsivePrefixRegex, '');
      if (!data.value[elementor.config.kit_config.typography_prefix + propertyName]) {
        return;
      }
      propertyName = propertyName.replace('_', '-');
      value = "var( --e-global-".concat(control.groupType, "-").concat(id, "-").concat(propertyName, " )");
      if (elementor.config.ui.defaultGenericFonts && control.groupPrefix + 'font_family' === control.name) {
        value += ", ".concat(elementor.config.ui.defaultGenericFonts);
      }
    } else {
      value = "var( --e-global-".concat(control.type, "-").concat(id, " )");
    }
    return value;
  },
  addRepeaterControlsStyleRules: function addRepeaterControlsStyleRules(repeaterValues, repeaterControlsItems, controls, placeholders, replacements) {
    var _this4 = this;
    repeaterControlsItems.forEach(function (item, index) {
      var itemModel = repeaterValues.models[index];
      _this4.addStyleRules(item, itemModel.attributes, controls, placeholders.concat(['{{CURRENT_ITEM}}']), replacements.concat(['.elementor-repeater-item-' + itemModel.get('_id')]));
    });
  },
  addDynamicControlStyleRules: function addDynamicControlStyleRules(value, control) {
    var self = this;
    elementor.dynamicTags.parseTagsText(value, control.dynamic, function (id, name, settings) {
      var tag = elementor.dynamicTags.createTag(id, name, settings);
      if (!tag) {
        return;
      }
      var tagSettingsModel = tag.model,
        styleControls = tagSettingsModel.getStyleControls();
      if (!styleControls.length) {
        return;
      }
      self.addStyleRules(tagSettingsModel.getStyleControls(), tagSettingsModel.attributes, tagSettingsModel.controls, ['{{WRAPPER}}'], ['#elementor-tag-' + id]);
    });
  },
  addStyleToDocument: function addStyleToDocument(position) {
    var $head = elementor.$previewContents.find('head');
    var insertMethod = 'append',
      $insertBy = $head;
    if (position) {
      var $targetElement = $head.children(position.of);
      if ($targetElement.length) {
        insertMethod = position.at;
        $insertBy = $targetElement;
      }
    }
    $insertBy[insertMethod](this.elements.$stylesheetElement);
    var extraCSS = elementor.hooks.applyFilters('editor/style/styleText', '', this.getSettings('context'));
    this.elements.$stylesheetElement.text(this.stylesheet + extraCSS);
  },
  removeStyleFromDocument: function removeStyleFromDocument() {
    this.elements.$stylesheetElement.remove();
  },
  onInit: function onInit() {
    elementorModules.ViewModule.prototype.onInit.apply(this, arguments);
    this.initStylesheet();
  }
});
module.exports = ControlsCSSParser;

/***/ }),

/***/ "../assets/dev/js/editor/utils/stylesheet.js":
/*!***************************************************!*\
  !*** ../assets/dev/js/editor/utils/stylesheet.js ***!
  \***************************************************/
/***/ ((module) => {

"use strict";


(function ($) {
  var _Stylesheet = function Stylesheet() {
    var self = this,
      rules = {},
      rawCSS = {},
      devices = {};
    var queryToHash = function queryToHash(query) {
      var hash = [];
      $.each(query, function (endPoint) {
        hash.push(endPoint + '_' + this);
      });
      return hash.join('-');
    };
    var hashToQuery = function hashToQuery(hash) {
      var query = {};
      hash = hash.split('-').filter(String);
      hash.forEach(function (singleQuery) {
        // Split {max}/{min}_{device name} to separate strings
        var queryParts = singleQuery.split(/_(.+)/),
          endPoint = queryParts[0],
          deviceName = queryParts[1];
        query[endPoint] = 'max' === endPoint ? devices[deviceName] : elementorFrontend.breakpoints.getDeviceMinBreakpoint(deviceName);
      });
      return query;
    };
    var addQueryHash = function addQueryHash(queryHash) {
      rules[queryHash] = {};
      var hashes = Object.keys(rules);
      if (hashes.length < 2) {
        return;
      }

      // Sort the devices from narrowest to widest
      hashes.sort(function (a, b) {
        var _aQuery$max, _bQuery$max;
        if ('all' === a) {
          return -1;
        }
        if ('all' === b) {
          return 1;
        }
        var aQuery = hashToQuery(a),
          bQuery = hashToQuery(b);

        // Calculation should be either `max - max` or `min - min`.
        // Caused when the `min_affected_device` is equal to the current responsive control.
        // (e.g. `min_affected_device = tablet`, and the user is changing a tablet control).
        if (aQuery.max && bQuery.max) {
          return bQuery.max - aQuery.max;
        }
        if (aQuery.min && bQuery.min) {
          return bQuery.min - aQuery.min;
        }

        // If one of the queries has only `min` and the other has only `max`.
        var aQueryValue = (_aQuery$max = aQuery.max) !== null && _aQuery$max !== void 0 ? _aQuery$max : aQuery.min;
        var bQueryValue = (_bQuery$max = bQuery.max) !== null && _bQuery$max !== void 0 ? _bQuery$max : bQuery.min;
        return bQueryValue - aQueryValue;
      });
      var sortedRules = {};
      hashes.forEach(function (deviceName) {
        sortedRules[deviceName] = rules[deviceName];
      });
      rules = sortedRules;
    };
    var getQueryHashStyleFormat = function getQueryHashStyleFormat(queryHash) {
      var query = hashToQuery(queryHash),
        styleFormat = [];
      $.each(query, function (endPoint) {
        styleFormat.push('(' + endPoint + '-width:' + this + 'px)');
      });
      return '@media' + styleFormat.join(' and ');
    };
    this.addDevice = function (newDeviceName, deviceValue) {
      devices[newDeviceName] = deviceValue;
      var deviceNames = Object.keys(devices);
      if (deviceNames.length < 2) {
        return self;
      }

      // Sort the devices from narrowest to widest
      deviceNames.sort(function (a, b) {
        return devices[a] - devices[b];
      });
      var sortedDevices = {};
      deviceNames.forEach(function (deviceName) {
        sortedDevices[deviceName] = devices[deviceName];
      });
      devices = sortedDevices;
      return self;
    };
    this.addRawCSS = function (key, css) {
      rawCSS[key] = css;
    };
    this.addRules = function (selector, styleRules, query) {
      var queryHash = 'all';
      if (!_.isEmpty(query)) {
        queryHash = queryToHash(query);
      }
      if (!rules[queryHash]) {
        addQueryHash(queryHash);
      }
      if (!styleRules) {
        var parsedRules = selector.match(/[^{]+\{[^}]+}/g);
        $.each(parsedRules, function () {
          var parsedRule = this.match(/([^{]+)\{([^}]+)}/);
          if (parsedRule) {
            self.addRules(parsedRule[1].trim(), parsedRule[2].trim(), query);
          }
        });
        return;
      }
      if (!rules[queryHash][selector]) {
        rules[queryHash][selector] = {};
      }
      if ('string' === typeof styleRules) {
        styleRules = styleRules.split(';').filter(String);
        var orderedRules = {};
        try {
          $.each(styleRules, function () {
            var property = this.split(/:(.*)?/);
            orderedRules[property[0].trim()] = property[1].trim().replace(';', '');
          });
        } catch (error) {
          // At least one of the properties is incorrect
          return;
        }
        styleRules = orderedRules;
      }
      $.extend(rules[queryHash][selector], styleRules);
      return self;
    };
    this.getRules = function () {
      return rules;
    };
    this.empty = function () {
      rules = {};
      rawCSS = {};
    };
    this.toString = function () {
      var styleText = '';
      $.each(rules, function (queryHash) {
        var deviceText = _Stylesheet.parseRules(this);
        if ('all' !== queryHash) {
          deviceText = getQueryHashStyleFormat(queryHash) + '{' + deviceText + '}';
        }
        styleText += deviceText;
      });
      $.each(rawCSS, function () {
        styleText += this;
      });
      return styleText;
    };
  };
  _Stylesheet.parseRules = function (rules) {
    var parsedRules = '';
    $.each(rules, function (selector) {
      var selectorContent = _Stylesheet.parseProperties(this);
      if (selectorContent) {
        parsedRules += selector + '{' + selectorContent + '}';
      }
    });
    return parsedRules;
  };
  _Stylesheet.parseProperties = function (properties) {
    var parsedProperties = '';
    $.each(properties, function (propertyKey) {
      if (this) {
        parsedProperties += propertyKey + ':' + this + ';';
      }
    });
    return parsedProperties;
  };
  module.exports = _Stylesheet;
})(jQuery);

/***/ }),

/***/ "../assets/dev/js/editor/views/add-section/base.js":
/*!*********************************************************!*\
  !*** ../assets/dev/js/editor/views/add-section/base.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var __ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n")["__"];


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _readOnlyError2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/readOnlyError */ "../node_modules/@babel/runtime/helpers/readOnlyError.js"));
var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../node_modules/@babel/runtime/helpers/classCallCheck.js"));
var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../node_modules/@babel/runtime/helpers/createClass.js"));
var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));
var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../node_modules/@babel/runtime/helpers/getPrototypeOf.js"));
var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../node_modules/@babel/runtime/helpers/inherits.js"));
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../node_modules/@babel/runtime/helpers/defineProperty.js"));
var _containerHelper = _interopRequireDefault(__webpack_require__(/*! elementor-editor-utils/container-helper */ "../assets/dev/js/editor/utils/container-helper.js"));
var _environment = _interopRequireDefault(__webpack_require__(/*! elementor-common/utils/environment */ "../core/common/assets/js/utils/environment.js"));
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2.default)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2.default)(o), (0, _possibleConstructorReturn2.default)(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2.default)(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
/**
 * @typedef {import('../../container/container')} Container
 */
var AddSectionBase = /*#__PURE__*/function (_Marionette$ItemView) {
  function AddSectionBase() {
    (0, _classCallCheck2.default)(this, AddSectionBase);
    return _callSuper(this, AddSectionBase, arguments);
  }
  (0, _inherits2.default)(AddSectionBase, _Marionette$ItemView);
  return (0, _createClass2.default)(AddSectionBase, [{
    key: "template",
    value: function template() {
      return Marionette.TemplateCache.get('#tmpl-elementor-add-section');
    }
  }, {
    key: "attributes",
    value: function attributes() {
      return {
        'aria-label': __('Add new layout element', 'elementor'),
        'data-view': AddSectionBase.VIEW_CHOOSE_ACTION
      };
    }
  }, {
    key: "ui",
    value: function ui() {
      return {
        addNewSection: '.elementor-add-new-section',
        closeButton: '.elementor-add-section-close',
        backButton: '.elementor-add-section-back',
        addSectionButton: '.elementor-add-section-button',
        addTemplateButton: '.elementor-add-template-button',
        selectPreset: '.elementor-select-preset',
        presets: '.elementor-preset',
        flexPresetButton: '.flex-preset-button',
        gridPresetButton: '.grid-preset-button',
        chooseFlexPreset: '.e-con-select-preset-flex .e-con-preset',
        chooseGridPreset: '.e-con-select-preset-grid .e-con-preset'
      };
    }
  }, {
    key: "events",
    value: function events() {
      var _this = this;
      return {
        'click @ui.addSectionButton': 'onAddSectionButtonClick',
        'click @ui.addTemplateButton': 'onAddTemplateButtonClick',
        'click @ui.closeButton': 'onCloseButtonClick',
        'click @ui.backButton': function click_UiBackButton() {
          return _this.setView(AddSectionBase.getSelectType());
        },
        'click @ui.presets': 'onPresetSelected',
        'click @ui.flexPresetButton': function click_UiFlexPresetButton() {
          return _this.setView(AddSectionBase.VIEW_CONTAINER_FLEX_PRESET);
        },
        'click @ui.gridPresetButton': function click_UiGridPresetButton() {
          return _this.setView(AddSectionBase.VIEW_CONTAINER_GRID_PRESET);
        },
        'click @ui.chooseFlexPreset': 'onFlexPresetSelected',
        'click @ui.chooseGridPreset': 'onGridPresetSelected'
      };
    }
  }, {
    key: "behaviors",
    value: function behaviors() {
      var behaviors = {
        contextMenu: {
          behaviorClass: __webpack_require__(/*! elementor-behaviors/context-menu */ "../assets/dev/js/editor/elements/views/behaviors/context-menu.js"),
          groups: this.getContextMenuGroups(),
          eventTargets: ['.elementor-add-section-inner']
        }
      };
      return elementor.hooks.applyFilters('views/add-section/behaviors', behaviors, this);
    }
  }, {
    key: "tagName",
    value: function tagName() {
      return 'section';
    }
  }, {
    key: "className",
    value: function className() {
      return 'elementor-add-section elementor-visible-desktop';
    }
  }, {
    key: "setView",
    value: function setView(view) {
      this.$el.attr('data-view', view);
    }
  }, {
    key: "showSelectPresets",
    value: function showSelectPresets() {
      this.setView(AddSectionBase.getSelectType());
    }
  }, {
    key: "closeSelectPresets",
    value: function closeSelectPresets() {
      this.setView(AddSectionBase.VIEW_CHOOSE_ACTION);
    }
  }, {
    key: "getTemplatesModalOptions",
    value: function getTemplatesModalOptions() {
      return {
        importOptions: {
          at: this.getOption('at')
        }
      };
    }
  }, {
    key: "getContextMenuGroups",
    value: function getContextMenuGroups() {
      var _this2 = this;
      var hasContent = function hasContent() {
        return elementor.elements.length > 0;
      };
      var controlSign = _environment.default.mac ? '&#8984;' : '^';
      return [{
        name: 'paste',
        actions: [{
          name: 'paste',
          title: __('Paste', 'elementor'),
          shortcut: controlSign + '+V',
          isEnabled: function isEnabled() {
            return $e.components.get('document/elements').utils.isPasteEnabled(elementor.getPreviewContainer());
          },
          callback: function callback() {
            return $e.run('document/ui/paste', {
              container: elementor.getPreviewContainer(),
              options: {
                at: _this2.getOption('at'),
                rebuild: true
              },
              onAfter: function onAfter() {
                return _this2.onAfterPaste();
              }
            });
          }
        }, {
          name: 'paste_area',
          icon: 'eicon-import-export',
          title: __('Paste from other site', 'elementor'),
          callback: function callback() {
            return $e.run('document/elements/paste-area', {
              container: elementor.getPreviewContainer(),
              options: {
                at: _this2.getOption('at'),
                rebuild: true
              }
            });
          }
        }]
      }, {
        name: 'content',
        actions: [{
          name: 'copy_all_content',
          title: __('Copy All Content', 'elementor'),
          isEnabled: hasContent,
          callback: function callback() {
            return $e.run('document/elements/copy-all');
          }
        }, {
          name: 'delete_all_content',
          title: __('Delete All Content', 'elementor'),
          isEnabled: hasContent,
          callback: function callback() {
            return $e.run('document/elements/empty');
          }
        }]
      }];
    }
  }, {
    key: "onAddSectionButtonClick",
    value: function onAddSectionButtonClick() {
      this.showSelectPresets();
    }
  }, {
    key: "onAddTemplateButtonClick",
    value: function onAddTemplateButtonClick() {
      $e.run('library/open', this.getTemplatesModalOptions());
    }
  }, {
    key: "onRender",
    value: function onRender() {
      this.$el.html5Droppable(_objectSpread({
        axis: ['vertical'],
        groups: ['elementor-element'],
        placeholder: false,
        currentElementClass: 'elementor-html5dnd-current-element',
        hasDraggingOnChildClass: 'elementor-dragging-on-child'
      }, this.getDroppableOptions()));
    }
  }, {
    key: "getDroppableOptions",
    value: function getDroppableOptions() {
      var _this3 = this;
      return {
        isDroppingAllowed: function isDroppingAllowed() {
          var _elementor$channels$e;
          return !((_elementor$channels$e = elementor.channels.editor.request('element:dragged')) !== null && _elementor$channels$e !== void 0 && (_elementor$channels$e = _elementor$channels$e.el) !== null && _elementor$channels$e !== void 0 && (_elementor$channels$e = _elementor$channels$e.dataset) !== null && _elementor$channels$e !== void 0 && _elementor$channels$e.id);
        },
        onDropping: function onDropping(side, event) {
          elementor.getPreviewView().onDrop(event, {
            side: side,
            at: _this3.getOption('at')
          });
        }
      };
    }
  }, {
    key: "onGridPresetSelected",
    value: function onGridPresetSelected(event) {
      this.closeSelectPresets();
      var selectedStructure = event.currentTarget.dataset.structure,
        parsedStructure = elementor.presetsFactory.getParsedGridStructure(selectedStructure),
        isAddedAboveAnotherContainer = !!this.options.at || 0 === this.options.at;
      var newContainer = _containerHelper.default.createContainer({
        container_type: _containerHelper.default.CONTAINER_TYPE_GRID,
        grid_columns_grid: {
          unit: 'fr',
          size: parsedStructure.columns
        },
        grid_rows_grid: {
          unit: 'fr',
          size: parsedStructure.rows
        },
        grid_rows_grid_mobile: {
          unit: 'fr',
          size: parsedStructure.rows
        }
      }, elementor.getPreviewContainer(), this.options, {
        title: __('Grid', 'elementor'),
        custom: {
          isPreset: true,
          preset_settings: {
            presetIcon: 'eicon-container-grid'
          }
        }
      });
      if (isAddedAboveAnotherContainer) {
        this.destroy();
      }
      return newContainer;
    }
  }, {
    key: "onPresetSelected",
    value: function onPresetSelected(event) {
      this.closeSelectPresets();
      var selectedStructure = event.currentTarget.dataset.structure,
        parsedStructure = elementor.presetsFactory.getParsedStructure(selectedStructure);
      $e.run('document/elements/create', {
        model: {
          elType: 'section'
        },
        container: elementor.getPreviewContainer(),
        columns: parsedStructure.columnsCount,
        structure: selectedStructure,
        options: Object.assign({}, this.options)
      });
    }

    /**
     * Create a Container preset when the user chooses a preset.
     *
     * @param {MouseEvent} e - Click event.
     *
     * @return {Container} container
     */
  }, {
    key: "onFlexPresetSelected",
    value: function onFlexPresetSelected(e) {
      this.closeSelectPresets();
      return _containerHelper.default.createContainerFromPreset(e.currentTarget.dataset.preset, elementor.getPreviewContainer(), this.options);
    }
  }, {
    key: "onDropping",
    value: function onDropping() {
      elementor.getPreviewView().addElementFromPanel();
    }
  }, {
    key: "onAfterPaste",
    value: function onAfterPaste() {}
  }], [{
    key: "getSelectType",
    value: function getSelectType() {
      return AddSectionBase.IS_CONTAINER_ACTIVE ? AddSectionBase.getSelectTypePreset() : 'select-preset';
    }
  }, {
    key: "getSelectTypePreset",
    value: function getSelectTypePreset() {
      return AddSectionBase.IS_CONTAINER_ACTIVE ? 'select-type' : 'select-container-preset';
    }
  }]);
}(Marionette.ItemView);
(0, _defineProperty2.default)(AddSectionBase, "IS_CONTAINER_ACTIVE", !!elementorCommon.config.experimentalFeatures.container);
// Views.
(0, _defineProperty2.default)(AddSectionBase, "VIEW_CHOOSE_ACTION", 'choose-action');
(0, _defineProperty2.default)(AddSectionBase, "VIEW_CONTAINER_FLEX_PRESET", 'select-container-preset');
(0, _defineProperty2.default)(AddSectionBase, "VIEW_CONTAINER_GRID_PRESET", 'select-container-preset-grid');
var _default = exports["default"] = AddSectionBase;

/***/ }),

/***/ "../assets/dev/js/editor/views/add-section/inline.js":
/*!***********************************************************!*\
  !*** ../assets/dev/js/editor/views/add-section/inline.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../node_modules/@babel/runtime/helpers/classCallCheck.js"));
var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../node_modules/@babel/runtime/helpers/createClass.js"));
var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));
var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../node_modules/@babel/runtime/helpers/getPrototypeOf.js"));
var _get2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/get */ "../node_modules/@babel/runtime/helpers/get.js"));
var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../node_modules/@babel/runtime/helpers/inherits.js"));
var _base = _interopRequireDefault(__webpack_require__(/*! ./base */ "../assets/dev/js/editor/views/add-section/base.js"));
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2.default)(o), (0, _possibleConstructorReturn2.default)(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2.default)(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _superPropGet(t, o, e, r) { var p = (0, _get2.default)((0, _getPrototypeOf2.default)(1 & r ? t.prototype : t), o, e); return 2 & r && "function" == typeof p ? function (t) { return p.apply(e, t); } : p; }
var AddSectionView = /*#__PURE__*/function (_BaseAddSectionView) {
  function AddSectionView() {
    (0, _classCallCheck2.default)(this, AddSectionView);
    return _callSuper(this, AddSectionView, arguments);
  }
  (0, _inherits2.default)(AddSectionView, _BaseAddSectionView);
  return (0, _createClass2.default)(AddSectionView, [{
    key: "className",
    value: function className() {
      return _superPropGet(AddSectionView, "className", this, 3)([]) + ' elementor-add-section-inline';
    }
  }, {
    key: "fadeToDeath",
    value: function fadeToDeath() {
      var self = this;
      self.$el.slideUp(function () {
        self.destroy();
      });
    }
  }, {
    key: "onAfterPaste",
    value: function onAfterPaste() {
      _superPropGet(AddSectionView, "onAfterPaste", this, 3)([]);
      this.destroy();
    }
  }, {
    key: "onCloseButtonClick",
    value: function onCloseButtonClick() {
      this.fadeToDeath();
    }
  }, {
    key: "onPresetSelected",
    value: function onPresetSelected(event) {
      _superPropGet(AddSectionView, "onPresetSelected", this, 3)([event]);
      this.destroy();
    }
  }, {
    key: "onFlexPresetSelected",
    value: function onFlexPresetSelected(e) {
      _superPropGet(AddSectionView, "onFlexPresetSelected", this, 3)([e]);
      this.destroy();
    }
  }, {
    key: "onAddTemplateButtonClick",
    value: function onAddTemplateButtonClick() {
      _superPropGet(AddSectionView, "onAddTemplateButtonClick", this, 3)([]);
      this.destroy();
    }
  }, {
    key: "getDroppableOptions",
    value: function getDroppableOptions() {
      var _this = this;
      return {
        onDropping: function onDropping(side, event) {
          _superPropGet(AddSectionView, "getDroppableOptions", _this, 3)([]).onDropping(side, event);
          _this.destroy();
        }
      };
    }
  }, {
    key: "onDropping",
    value: function onDropping() {
      var droppableOptions = this.getDroppableOptions();
      _superPropGet(AddSectionView, "onDropping", this, 3)([]);
      if (droppableOptions.onDropping) {
        droppableOptions.onDropping();
      }
    }
  }]);
}(_base.default);
var _default = exports["default"] = AddSectionView;

/***/ }),

/***/ "../assets/dev/js/editor/views/base-container.js":
/*!*******************************************************!*\
  !*** ../assets/dev/js/editor/views/base-container.js ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");
var _slicedToArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "../node_modules/@babel/runtime/helpers/slicedToArray.js"));
/**
 * @typedef {import('elementor/assets/lib/backbone/backbone.marionette')} Marionette
 * @name BaseContainer
 * @augments {Marionette.CompositeView}
 */
module.exports = Marionette.CompositeView.extend({
  templateHelpers: function templateHelpers() {
    return {
      view: this
    };
  },
  getBehavior: function getBehavior(name) {
    return this._behaviors[Object.keys(this.behaviors()).indexOf(name)];
  },
  initialize: function initialize() {
    this.collection = this.model.get('elements');
  },
  addChildModel: function addChildModel(model, options) {
    return this.collection.add(model, options, true);
  },
  addElement: function addElement(data, options) {
    if (this.isCollectionFilled()) {
      return;
    }
    options = jQuery.extend({
      trigger: false,
      edit: true,
      onBeforeAdd: null,
      onAfterAdd: null
    }, options);
    var childTypes = this.getChildType();
    var newItem, elType;
    if (data instanceof Backbone.Model) {
      newItem = data;
      elType = newItem.get('elType');
    } else {
      newItem = {
        id: elementorCommon.helpers.getUniqueId(),
        elType: childTypes[0],
        settings: {},
        elements: []
      };
      if (data) {
        jQuery.extend(newItem, data);
      }
      elType = newItem.elType;
    }
    if (-1 === childTypes.indexOf(elType)) {
      return this.children.last().addElement(newItem, options);
    }
    if (options.clone) {
      newItem = this.cloneItem(newItem);
    }
    if (options.trigger) {
      elementor.channels.data.trigger(options.trigger.beforeAdd, newItem);
    }
    if (options.onBeforeAdd) {
      options.onBeforeAdd();
    }
    if (this.filterSettings) {
      this.filterSettings(newItem);
    }
    var newModel = this.addChildModel(newItem, {
        at: options.at
      }),
      newView = this.children.findByModel(newModel);
    if (options.onAfterAdd) {
      options.onAfterAdd(newModel, newView);
    }
    if (options.trigger) {
      elementor.channels.data.trigger(options.trigger.afterAdd, newItem);
    }
    if (options.edit && elementor.documents.getCurrent().history.getActive()) {
      // Ensure container is created. TODO: Open editor via UI hook after `document/elements/create`.
      newView.getContainer();
      newModel.trigger('request:edit', {
        scrollIntoView: options.scrollIntoView
      });
    }
    return newView;
  },
  createElementFromContainer: function createElementFromContainer(container) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return this.createElementFromModel(container.model, options);
  },
  createElementFromModel: function createElementFromModel(model) {
    var _model$isPreset, _model;
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    if (model instanceof Backbone.Model) {
      model = model.toJSON();
    }
    if (elementor.helpers.maybeDisableWidget(model.widgetType)) {
      return;
    }
    model = Object.assign(model, model.custom);

    // Check whether the container cannot contain a section, in which case we should use an inner-section.
    if ('section' === model.elType) {
      model.isInner = true;
    }
    if ((_model$isPreset = (_model = model) === null || _model === void 0 ? void 0 : _model.isPreset) !== null && _model$isPreset !== void 0 ? _model$isPreset : false) {
      model.settings = model.preset_settings;
    }
    var historyId = $e.internal('document/history/start-log', {
      type: this.getHistoryType(options.event),
      title: elementor.helpers.getModelLabel(model)
    });
    var container = this.getContainer();
    if (options.shouldWrap) {
      var containerExperiment = elementorCommon.config.experimentalFeatures.container;
      container = $e.run('document/elements/create', {
        model: {
          elType: containerExperiment ? 'container' : 'section'
        },
        container: container,
        columns: Number(!containerExperiment),
        options: {
          at: options.at,
          scrollIntoView: options.scrollIntoView
        }
      });

      // Since wrapping an element with container doesn't produce a column, we shouldn't try to access it.
      if (!containerExperiment) {
        container = container.view.children.findByIndex(0).getContainer();
      }
    }

    // Create the element in column.
    var widget = $e.run('document/elements/create', {
      container: container,
      model: model,
      options: options
    });
    $e.internal('document/history/end-log', {
      id: historyId
    });
    return widget;
  },
  onDrop: function onDrop(event, options) {
    var _elementor$channels$p;
    var input = event.originalEvent.dataTransfer.files;
    if (input.length) {
      $e.run('editor/browser-import/import', {
        input: input,
        target: this.getContainer(),
        options: {
          event: event,
          target: {
            at: options.at
          }
        }
      });
      return;
    }
    var args = {};
    args.model = Object.fromEntries(Object.entries((_elementor$channels$p = elementor.channels.panelElements.request('element:selected')) === null || _elementor$channels$p === void 0 ? void 0 : _elementor$channels$p.model.attributes)
    // The `custom` property is responsible for storing global-widgets related data.
    .filter(function (_ref) {
      var _ref2 = (0, _slicedToArray2.default)(_ref, 1),
        key = _ref2[0];
      return ['elType', 'widgetType', 'custom'].includes(key);
    }));
    args.container = this.getContainer();
    args.options = options;
    $e.run('preview/drop', args);
  },
  getHistoryType: function getHistoryType(event) {
    if (event) {
      if (event.originalEvent) {
        event = event.originalEvent;
      }
      switch (event.constructor.name) {
        case 'DragEvent':
          return 'import';
        case 'ClipboardEvent':
          return 'paste';
      }
    }
    return 'add';
  },
  cloneItem: function cloneItem(item) {
    var self = this;
    if (item instanceof Backbone.Model) {
      return item.clone();
    }
    item.id = elementorCommon.helpers.getUniqueId();
    item.settings._element_id = '';
    item.elements.forEach(function (childItem, index) {
      item.elements[index] = self.cloneItem(childItem);
    });
    return item;
  },
  lookup: function lookup() {
    var element = this;
    if (element.isDisconnected()) {
      element = $e.components.get('document').utils.findViewById(element.model.id);
    }
    return element;
  },
  isDisconnected: function isDisconnected() {
    return this.isDestroyed || !this.el.isConnected;
  },
  isCollectionFilled: function isCollectionFilled() {
    return false;
  }
});

/**
 * Source: https://marionettejs.com/docs/v2.4.5/marionette.collectionview.html#collectionviews-buildchildview
 *
 * Since Elementor created custom container(bridge) between view, model, settings, children, parent and so on,
 * the container requires the parent view for proper work, but in 'marionettejs', the parent view is not available
 * during the `buildChildView` method, but actually exist, Elementor modified the `buildChildView` method to
 * set the parent view as a property `_parent` of the child view.
 * Anyways later, the `_parent` property is set by: 'marionettejs' to same view.
 */

/**
 * @inheritDoc
 */
Marionette.CollectionView.prototype.buildChildView = function (child, ChildViewClass, childViewOptions) {
  var options = _.extend({
      model: child
    }, childViewOptions),
    childView = new ChildViewClass(options);

  // `ELEMENTOR EDITING`: Fix `_parent` not available on render.
  childView._parent = this;
  Marionette.MonitorDOMRefresh(childView);
  return childView;
};

/**
 * This function overrides the original Marionette `attachBuffer` function.
 * This modification targets nested widgets that should contain a container within a wrapper.
 * The goal is to load the container inside the wrapper when initially loading in the editor.
 * This function updates the `buffer.childNodes` content by checking if an item should be interlaced.
 * If interlacing is needed, it places the container inside the widget's `child_container_placeholder_selector`.
 */

/**
 * @inheritDoc
 */
Marionette.CompositeView.prototype.attachBuffer = function (compositeView, buffer) {
  var _this$model, _this$model2;
  var $container = this.getChildViewContainer(compositeView);
  if ((_this$model = this.model) !== null && _this$model !== void 0 && (_this$model = _this$model.config) !== null && _this$model !== void 0 && _this$model.support_improved_repeaters && (_this$model2 = this.model) !== null && _this$model2 !== void 0 && (_this$model2 = _this$model2.config) !== null && _this$model2 !== void 0 && _this$model2.is_interlaced) {
    var _this$model3;
    var $items = $container.find((_this$model3 = this.model) === null || _this$model3 === void 0 || (_this$model3 = _this$model3.config) === null || _this$model3 === void 0 || (_this$model3 = _this$model3.defaults) === null || _this$model3 === void 0 ? void 0 : _this$model3.child_container_placeholder_selector);
    _.each($items, function (item) {
      item.appendChild(buffer.childNodes[0]);
      buffer.appendChild(item);
    });
  }
  $container.append(buffer);
};

/***/ }),

/***/ "../assets/dev/js/utils/react.js":
/*!***************************************!*\
  !*** ../assets/dev/js/utils/react.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _typeof = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "../node_modules/@babel/runtime/helpers/typeof.js");
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var React = _interopRequireWildcard(__webpack_require__(/*! react */ "react"));
var ReactDOM = _interopRequireWildcard(__webpack_require__(/*! react-dom */ "react-dom"));
var _client = __webpack_require__(/*! react-dom/client */ "../node_modules/react-dom/client.js");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/**
 * Support conditional rendering of a React App to the DOM, based on the React version.
 * We use `createRoot` when available, but fallback to `ReactDOM.render` for older versions.
 *
 * @param { React.ReactElement } app        The app to render.
 * @param { HTMLElement }        domElement The DOM element to render the app into.
 *
 * @return {{ unmount: () => void }} The unmount function.
 */
function render(app, domElement) {
  var unmountFunction;
  try {
    var root = (0, _client.createRoot)(domElement);
    root.render(app);
    unmountFunction = function unmountFunction() {
      root.unmount();
    };
  } catch (e) {
    // eslint-disable-next-line react/no-deprecated
    ReactDOM.render(app, domElement);
    unmountFunction = function unmountFunction() {
      // eslint-disable-next-line react/no-deprecated
      ReactDOM.unmountComponentAtNode(domElement);
    };
  }
  return {
    unmount: unmountFunction
  };
}
var _default = exports["default"] = {
  render: render
};

/***/ }),

/***/ "../core/common/assets/js/utils/environment.js":
/*!*****************************************************!*\
  !*** ../core/common/assets/js/utils/environment.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var matchUserAgent = function matchUserAgent(UserAgentStr) {
    return userAgent.indexOf(UserAgentStr) >= 0;
  },
  userAgent = navigator.userAgent,
  // Solution influenced by https://stackoverflow.com/questions/9847580/how-to-detect-safari-chrome-ie-firefox-and-opera-browser

  // Opera 8.0+
  isOpera = !!window.opr && !!opr.addons || !!window.opera || matchUserAgent(' OPR/'),
  // Firefox 1.0+
  isFirefox = matchUserAgent('Firefox'),
  // Safari 3.0+ "[object HTMLElementConstructor]"
  isSafari = /^((?!chrome|android).)*safari/i.test(userAgent) || /constructor/i.test(window.HTMLElement) || function (p) {
    return '[object SafariRemoteNotification]' === p.toString();
  }(!window.safari || typeof safari !== 'undefined' && safari.pushNotification),
  // Internet Explorer 6-11
  isIE = /Trident|MSIE/.test(userAgent) && (/* @cc_on!@*/ false || !!document.documentMode),
  // Edge 20+
  isEdge = !isIE && !!window.StyleMedia || matchUserAgent('Edg'),
  // Google Chrome (Not accurate)
  isChrome = !!window.chrome && matchUserAgent('Chrome') && !(isEdge || isOpera),
  // Blink engine
  isBlink = matchUserAgent('Chrome') && !!window.CSS,
  // Apple Webkit engine
  isAppleWebkit = matchUserAgent('AppleWebKit') && !isBlink,
  isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0,
  environment = {
    isTouchDevice: isTouchDevice,
    appleWebkit: isAppleWebkit,
    blink: isBlink,
    chrome: isChrome,
    edge: isEdge,
    firefox: isFirefox,
    ie: isIE,
    mac: matchUserAgent('Macintosh'),
    opera: isOpera,
    safari: isSafari,
    webkit: matchUserAgent('AppleWebKit')
  };
var _default = exports["default"] = environment;

/***/ }),

/***/ "../modules/atomic-widgets/assets/js/editor/atomic-widget-type.js":
/*!************************************************************************!*\
  !*** ../modules/atomic-widgets/assets/js/editor/atomic-widget-type.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.AtomicWidgetType = void 0;
var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../node_modules/@babel/runtime/helpers/classCallCheck.js"));
var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../node_modules/@babel/runtime/helpers/createClass.js"));
var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));
var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../node_modules/@babel/runtime/helpers/getPrototypeOf.js"));
var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../node_modules/@babel/runtime/helpers/inherits.js"));
var _atomicWidgetView = __webpack_require__(/*! ./atomic-widget-view */ "../modules/atomic-widgets/assets/js/editor/atomic-widget-view.js");
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2.default)(o), (0, _possibleConstructorReturn2.default)(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2.default)(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _classPrivateFieldInitSpec(e, t, a) { _checkPrivateRedeclaration(e, t), t.set(e, a); }
function _checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function _classPrivateFieldGet(s, a) { return s.get(_assertClassBrand(s, a)); }
function _classPrivateFieldSet(s, a, r) { return s.set(_assertClassBrand(s, a), r), r; }
function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }
var _type = /*#__PURE__*/new WeakMap();
var AtomicWidgetType = exports.AtomicWidgetType = /*#__PURE__*/function (_elementor$modules$el) {
  function AtomicWidgetType(type) {
    var _this;
    (0, _classCallCheck2.default)(this, AtomicWidgetType);
    _this = _callSuper(this, AtomicWidgetType);
    _classPrivateFieldInitSpec(_this, _type, void 0);
    _classPrivateFieldSet(_type, _this, type);
    return _this;
  }
  (0, _inherits2.default)(AtomicWidgetType, _elementor$modules$el);
  return (0, _createClass2.default)(AtomicWidgetType, [{
    key: "getType",
    value: function getType() {
      return _classPrivateFieldGet(_type, this);
    }
  }, {
    key: "getView",
    value: function getView() {
      return _atomicWidgetView.AtomicWidgetView;
    }
  }]);
}(elementor.modules.elements.types.Widget);

/***/ }),

/***/ "../modules/atomic-widgets/assets/js/editor/atomic-widget-view.js":
/*!************************************************************************!*\
  !*** ../modules/atomic-widgets/assets/js/editor/atomic-widget-view.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.AtomicWidgetView = void 0;
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../node_modules/@babel/runtime/helpers/defineProperty.js"));
var _slicedToArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "../node_modules/@babel/runtime/helpers/slicedToArray.js"));
var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../node_modules/@babel/runtime/helpers/classCallCheck.js"));
var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../node_modules/@babel/runtime/helpers/createClass.js"));
var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));
var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../node_modules/@babel/runtime/helpers/getPrototypeOf.js"));
var _get2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/get */ "../node_modules/@babel/runtime/helpers/get.js"));
var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../node_modules/@babel/runtime/helpers/inherits.js"));
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2.default)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2.default)(o), (0, _possibleConstructorReturn2.default)(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2.default)(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _superPropGet(t, o, e, r) { var p = (0, _get2.default)((0, _getPrototypeOf2.default)(1 & r ? t.prototype : t), o, e); return 2 & r && "function" == typeof p ? function (t) { return p.apply(e, t); } : p; }
function _classPrivateMethodInitSpec(e, a) { _checkPrivateRedeclaration(e, a), a.add(e); }
function _checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }
var _AtomicWidgetView_brand = /*#__PURE__*/new WeakSet();
var AtomicWidgetView = exports.AtomicWidgetView = /*#__PURE__*/function (_elementor$modules$el) {
  function AtomicWidgetView() {
    var _this;
    (0, _classCallCheck2.default)(this, AtomicWidgetView);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, AtomicWidgetView, [].concat(args));
    _classPrivateMethodInitSpec(_this, _AtomicWidgetView_brand);
    return _this;
  }
  (0, _inherits2.default)(AtomicWidgetView, _elementor$modules$el);
  return (0, _createClass2.default)(AtomicWidgetView, [{
    key: "onRender",
    value:
    // Dispatch `render` event so the overlay layer will be updated
    function onRender() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }
      _superPropGet(AtomicWidgetView, "onRender", this, 3)(args);
      _assertClassBrand(_AtomicWidgetView_brand, this, _dispatchEvent).call(this, 'elementor/preview/atomic-widget/render');
    }

    // Dispatch `destroy` event so the overlay layer will be updated
  }, {
    key: "onDestroy",
    value: function onDestroy() {
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }
      _superPropGet(AtomicWidgetView, "onDestroy", this, 3)(args);
      _assertClassBrand(_AtomicWidgetView_brand, this, _dispatchEvent).call(this, 'elementor/preview/atomic-widget/destroy');
    }

    // Removes behaviors that are not needed for atomic widgets (that are implemented in the overlay layer).
  }, {
    key: "behaviors",
    value: function behaviors() {
      var disabledBehaviors = ['InlineEditing', 'Draggable', 'Resizable'];
      var behaviorsAsEntries = Object.entries(_superPropGet(AtomicWidgetView, "behaviors", this, 3)([])).filter(function (_ref) {
        var _ref2 = (0, _slicedToArray2.default)(_ref, 1),
          key = _ref2[0];
        return !disabledBehaviors.includes(key);
      });
      return Object.fromEntries(behaviorsAsEntries);
    }

    // Change the drag handle because the $el is not the draggable element (`display: contents`).
  }, {
    key: "getDraggableElement",
    value: function getDraggableElement() {
      return this.$el.find(':first-child');
    }

    // Remove the overlay, so we can use the new overlay layer.
  }, {
    key: "getHandlesOverlay",
    value: function getHandlesOverlay() {
      return null;
    }
  }, {
    key: "attributes",
    value: function attributes() {
      return _objectSpread(_objectSpread({}, _superPropGet(AtomicWidgetView, "attributes", this, 3)([])), {}, {
        // Mark the widget as atomic, so the overlay layer can identify it.
        'data-atomic': '',
        // Make the wrapper non-existent in terms of CSS to mimic the frontend DOM tree.
        style: 'display: contents !important;'
      });
    }
  }]);
}(elementor.modules.elements.views.Widget);
function _dispatchEvent(type) {
  window.top.dispatchEvent(new CustomEvent(type, {
    detail: {
      id: this.model.get('id')
    }
  }));
}

/***/ }),

/***/ "../modules/atomic-widgets/assets/js/editor/commands-internal/create-style.js":
/*!************************************************************************************!*\
  !*** ../modules/atomic-widgets/assets/js/editor/commands-internal/create-style.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var sprintf = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n")["sprintf"];


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = exports.CreateStyle = void 0;
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../node_modules/@babel/runtime/helpers/defineProperty.js"));
var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "../node_modules/@babel/runtime/helpers/toConsumableArray.js"));
var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../node_modules/@babel/runtime/helpers/classCallCheck.js"));
var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../node_modules/@babel/runtime/helpers/createClass.js"));
var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));
var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../node_modules/@babel/runtime/helpers/getPrototypeOf.js"));
var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../node_modules/@babel/runtime/helpers/inherits.js"));
var _i18n = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2.default)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2.default)(o), (0, _possibleConstructorReturn2.default)(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2.default)(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var PROP_TYPE_CLASSES = 'classes';

/**
 * @typedef {import('elementor/assets/dev/js/editor/container/container')} Container
 */
var CreateStyle = exports.CreateStyle = /*#__PURE__*/function (_$e$modules$editor$Co) {
  function CreateStyle() {
    (0, _classCallCheck2.default)(this, CreateStyle);
    return _callSuper(this, CreateStyle, arguments);
  }
  (0, _inherits2.default)(CreateStyle, _$e$modules$editor$Co);
  return (0, _createClass2.default)(CreateStyle, [{
    key: "validateArgs",
    value: function validateArgs(args) {
      this.requireContainer(args);
      this.requireArgumentConstructor('bind', String, args);
      if ('label' in args) {
        var isValidLabel = 'string' === typeof args.label && args.label.length > 0;
        if (!isValidLabel) {
          throw new Error('Invalid label arg');
        }
      }
    }
  }, {
    key: "randomId",
    value: function randomId(containerId) {
      return "s-".concat(containerId, "-").concat(elementorCommon.helpers.getUniqueId());
    }
  }, {
    key: "apply",
    value: function apply(args) {
      var _container$settings$g;
      var container = args.container,
        styleDefID = args.styleDefID,
        bind = args.bind,
        label = args.label;
      var oldStyles = container.model.get('styles') || {};
      var newStyle = {
        id: styleDefID !== null && styleDefID !== void 0 ? styleDefID : this.randomId(container.id),
        /* Translators: 1: container label, 2: number of old styles */
        label: label !== null && label !== void 0 ? label : sprintf((0, _i18n.__)('%1$s Style %2$s', 'elementor'), container.label, Object.keys(oldStyles).length + 1),
        type: 'class',
        variants: []
      };
      var oldBindSetting = (_container$settings$g = container.settings.get(bind)) !== null && _container$settings$g !== void 0 ? _container$settings$g : {
        $$type: PROP_TYPE_CLASSES,
        value: []
      };
      if (oldBindSetting.$$type !== PROP_TYPE_CLASSES || !Array.isArray(oldBindSetting.value)) {
        throw new Error('Invalid bind setting prop type');
      }
      var newBindSetting = (0, _defineProperty2.default)({}, bind, {
        $$type: PROP_TYPE_CLASSES,
        value: [].concat((0, _toConsumableArray2.default)(oldBindSetting.value), [newStyle.id])
      });
      $e.internal('document/elements/set-settings', {
        container: container,
        settings: newBindSetting
      });
      var newStyles = _objectSpread(_objectSpread({}, oldStyles), {}, (0, _defineProperty2.default)({}, newStyle.id, newStyle));
      container.model.set('styles', newStyles);
      return newStyle;
    }
  }]);
}($e.modules.editor.CommandContainerInternalBase);
var _default = exports["default"] = CreateStyle;

/***/ }),

/***/ "../modules/atomic-widgets/assets/js/editor/commands-internal/create-variant.js":
/*!**************************************************************************************!*\
  !*** ../modules/atomic-widgets/assets/js/editor/commands-internal/create-variant.js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = exports.CreateVariant = void 0;
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../node_modules/@babel/runtime/helpers/defineProperty.js"));
var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../node_modules/@babel/runtime/helpers/classCallCheck.js"));
var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../node_modules/@babel/runtime/helpers/createClass.js"));
var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));
var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../node_modules/@babel/runtime/helpers/getPrototypeOf.js"));
var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../node_modules/@babel/runtime/helpers/inherits.js"));
var _getVariants = __webpack_require__(/*! ../utils/get-variants */ "../modules/atomic-widgets/assets/js/editor/utils/get-variants.js");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2.default)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2.default)(o), (0, _possibleConstructorReturn2.default)(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2.default)(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
/**
 * @typedef {import('elementor/assets/dev/js/editor/container/container')} Container
 */
var CreateVariant = exports.CreateVariant = /*#__PURE__*/function (_$e$modules$editor$Co) {
  function CreateVariant() {
    (0, _classCallCheck2.default)(this, CreateVariant);
    return _callSuper(this, CreateVariant, arguments);
  }
  (0, _inherits2.default)(CreateVariant, _$e$modules$editor$Co);
  return (0, _createClass2.default)(CreateVariant, [{
    key: "validateArgs",
    value: function validateArgs(args) {
      this.requireContainer(args);
      this.requireArgumentConstructor('styleDefID', String, args);
      this.requireArgumentConstructor('meta', Object, args);
      if (!('breakpoint' in args.meta && 'state' in args.meta)) {
        throw new Error('Invalid meta arg');
      }
    }
  }, {
    key: "apply",
    value: function apply(args) {
      var container = args.container,
        styleDefID = args.styleDefID,
        meta = args.meta;
      var oldStyles = container.model.get('styles') || {};
      if (!oldStyles[styleDefID]) {
        throw new Error('Style Def not found');
      }
      var style = oldStyles[styleDefID];
      if ((0, _getVariants.getVariantByMeta)(style.variants, meta)) {
        throw new Error('Style Variant already exits');
      }
      style.variants.push({
        meta: meta,
        props: {}
      });
      var newStyles = _objectSpread(_objectSpread({}, oldStyles), {}, (0, _defineProperty2.default)({}, styleDefID, style));
      container.model.set('styles', newStyles);
    }
  }]);
}($e.modules.editor.CommandContainerInternalBase);
var _default = exports["default"] = CreateVariant;

/***/ }),

/***/ "../modules/atomic-widgets/assets/js/editor/commands-internal/delete-style.js":
/*!************************************************************************************!*\
  !*** ../modules/atomic-widgets/assets/js/editor/commands-internal/delete-style.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = exports.DeleteStyle = void 0;
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../node_modules/@babel/runtime/helpers/defineProperty.js"));
var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../node_modules/@babel/runtime/helpers/classCallCheck.js"));
var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../node_modules/@babel/runtime/helpers/createClass.js"));
var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));
var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../node_modules/@babel/runtime/helpers/getPrototypeOf.js"));
var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../node_modules/@babel/runtime/helpers/inherits.js"));
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2.default)(o), (0, _possibleConstructorReturn2.default)(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2.default)(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
/**
 * @typedef {import('elementor/assets/dev/js/editor/container/container')} Container
 */
var DeleteStyle = exports.DeleteStyle = /*#__PURE__*/function (_$e$modules$editor$Co) {
  function DeleteStyle() {
    (0, _classCallCheck2.default)(this, DeleteStyle);
    return _callSuper(this, DeleteStyle, arguments);
  }
  (0, _inherits2.default)(DeleteStyle, _$e$modules$editor$Co);
  return (0, _createClass2.default)(DeleteStyle, [{
    key: "validateArgs",
    value: function validateArgs(args) {
      this.requireContainer(args);
      this.requireArgumentConstructor('styleDefID', String, args);
      this.requireArgumentConstructor('bind', String, args);
    }
  }, {
    key: "apply",
    value: function apply(args) {
      var container = args.container,
        styleDefID = args.styleDefID,
        bind = args.bind;
      var oldBindSetting = container.settings.get(bind);
      if (!oldBindSetting) {
        throw new Error('Setting not found');
      }
      var newBindSetting = (0, _defineProperty2.default)({}, bind, {
        $$type: 'classes',
        value: oldBindSetting.value.filter(function (id) {
          return id !== styleDefID;
        })
      });
      $e.internal('document/elements/set-settings', {
        container: container,
        settings: newBindSetting
      });
      var styles = container.model.get('styles') || {};
      delete styles[styleDefID];
      container.model.set('styles', styles);
    }
  }]);
}($e.modules.editor.CommandContainerInternalBase);
var _default = exports["default"] = DeleteStyle;

/***/ }),

/***/ "../modules/atomic-widgets/assets/js/editor/commands-internal/delete-variant.js":
/*!**************************************************************************************!*\
  !*** ../modules/atomic-widgets/assets/js/editor/commands-internal/delete-variant.js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = exports.DeleteVariant = void 0;
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../node_modules/@babel/runtime/helpers/defineProperty.js"));
var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../node_modules/@babel/runtime/helpers/classCallCheck.js"));
var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../node_modules/@babel/runtime/helpers/createClass.js"));
var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));
var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../node_modules/@babel/runtime/helpers/getPrototypeOf.js"));
var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../node_modules/@babel/runtime/helpers/inherits.js"));
var _getVariants = __webpack_require__(/*! ../utils/get-variants */ "../modules/atomic-widgets/assets/js/editor/utils/get-variants.js");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2.default)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2.default)(o), (0, _possibleConstructorReturn2.default)(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2.default)(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
/**
 * @typedef {import('elementor/assets/dev/js/editor/container/container')} Container
 */
var DeleteVariant = exports.DeleteVariant = /*#__PURE__*/function (_$e$modules$editor$Co) {
  function DeleteVariant() {
    (0, _classCallCheck2.default)(this, DeleteVariant);
    return _callSuper(this, DeleteVariant, arguments);
  }
  (0, _inherits2.default)(DeleteVariant, _$e$modules$editor$Co);
  return (0, _createClass2.default)(DeleteVariant, [{
    key: "validateArgs",
    value: function validateArgs(args) {
      this.requireContainer(args);
      this.requireArgumentConstructor('styleDefID', String, args);
      this.requireArgumentConstructor('meta', Object, args);
      if (!('breakpoint' in args.meta && 'state' in args.meta)) {
        throw new Error('Invalid meta arg');
      }
    }
  }, {
    key: "apply",
    value: function apply(args) {
      var container = args.container,
        styleDefID = args.styleDefID,
        meta = args.meta;
      var oldStyles = container.model.get('styles') || {};
      var style = {};
      if (!oldStyles[styleDefID]) {
        throw new Error('Style Def not found');
      }
      style = oldStyles[styleDefID];
      style.variants = (0, _getVariants.getVariantsWithoutMeta)(style.variants, meta);
      var newStyles = _objectSpread(_objectSpread({}, oldStyles), {}, (0, _defineProperty2.default)({}, style.id, style));
      container.model.set('styles', newStyles);
    }
  }]);
}($e.modules.editor.CommandContainerInternalBase);
var _default = exports["default"] = DeleteVariant;

/***/ }),

/***/ "../modules/atomic-widgets/assets/js/editor/commands-internal/index.js":
/*!*****************************************************************************!*\
  !*** ../modules/atomic-widgets/assets/js/editor/commands-internal/index.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
Object.defineProperty(exports, "CreateStyle", ({
  enumerable: true,
  get: function get() {
    return _createStyle.CreateStyle;
  }
}));
Object.defineProperty(exports, "CreateVariant", ({
  enumerable: true,
  get: function get() {
    return _createVariant.CreateVariant;
  }
}));
Object.defineProperty(exports, "DeleteStyle", ({
  enumerable: true,
  get: function get() {
    return _deleteStyle.DeleteStyle;
  }
}));
Object.defineProperty(exports, "DeleteVariant", ({
  enumerable: true,
  get: function get() {
    return _deleteVariant.DeleteVariant;
  }
}));
Object.defineProperty(exports, "UpdateProps", ({
  enumerable: true,
  get: function get() {
    return _updateProps.UpdateProps;
  }
}));
var _updateProps = __webpack_require__(/*! ./update-props */ "../modules/atomic-widgets/assets/js/editor/commands-internal/update-props.js");
var _createStyle = __webpack_require__(/*! ./create-style */ "../modules/atomic-widgets/assets/js/editor/commands-internal/create-style.js");
var _deleteStyle = __webpack_require__(/*! ./delete-style */ "../modules/atomic-widgets/assets/js/editor/commands-internal/delete-style.js");
var _createVariant = __webpack_require__(/*! ./create-variant */ "../modules/atomic-widgets/assets/js/editor/commands-internal/create-variant.js");
var _deleteVariant = __webpack_require__(/*! ./delete-variant */ "../modules/atomic-widgets/assets/js/editor/commands-internal/delete-variant.js");

/***/ }),

/***/ "../modules/atomic-widgets/assets/js/editor/commands-internal/update-props.js":
/*!************************************************************************************!*\
  !*** ../modules/atomic-widgets/assets/js/editor/commands-internal/update-props.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = exports.UpdateProps = void 0;
var _slicedToArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "../node_modules/@babel/runtime/helpers/slicedToArray.js"));
var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../node_modules/@babel/runtime/helpers/classCallCheck.js"));
var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../node_modules/@babel/runtime/helpers/createClass.js"));
var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));
var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../node_modules/@babel/runtime/helpers/getPrototypeOf.js"));
var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../node_modules/@babel/runtime/helpers/inherits.js"));
var _getVariants = __webpack_require__(/*! ../utils/get-variants */ "../modules/atomic-widgets/assets/js/editor/utils/get-variants.js");
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2.default)(o), (0, _possibleConstructorReturn2.default)(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2.default)(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
/**
 * @typedef {import('elementor/assets/dev/js/editor/container/container')} Container
 */
var UpdateProps = exports.UpdateProps = /*#__PURE__*/function (_$e$modules$editor$Co) {
  function UpdateProps() {
    (0, _classCallCheck2.default)(this, UpdateProps);
    return _callSuper(this, UpdateProps, arguments);
  }
  (0, _inherits2.default)(UpdateProps, _$e$modules$editor$Co);
  return (0, _createClass2.default)(UpdateProps, [{
    key: "validateArgs",
    value: function validateArgs(args) {
      this.requireContainer(args);
      this.requireArgumentConstructor('styleDefID', String, args);
      this.requireArgumentConstructor('meta', Object, args);
      this.requireArgumentConstructor('props', Object, args);
      if (!('breakpoint' in args.meta && 'state' in args.meta)) {
        throw new Error('Invalid meta arg');
      }
      if (0 === Object.keys(args.props).length) {
        throw new Error('Props are empty');
      }
    }
  }, {
    key: "updateExistingVariant",
    value: function updateExistingVariant(variant, props) {
      Object.entries(props).forEach(function (_ref) {
        var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
          key = _ref2[0],
          value = _ref2[1];
        if (null === value || undefined === value) {
          delete variant.props[key];
          return;
        }
        variant.props[key] = value;
      });
    }
  }, {
    key: "apply",
    value: function apply(args) {
      var container = args.container,
        styleDefID = args.styleDefID,
        meta = args.meta,
        props = args.props;
      var styles = container.model.get('styles') || {};
      var style = styles[styleDefID];
      if (!style) {
        throw new Error('Style Def not found');
      }
      var variant = (0, _getVariants.getVariantByMeta)(style.variants, meta);
      if (!variant) {
        throw new Error('Style Variant not found');
      }
      this.updateExistingVariant(variant, props);
    }
  }]);
}($e.modules.editor.CommandContainerInternalBase);
var _default = exports["default"] = UpdateProps;

/***/ }),

/***/ "../modules/atomic-widgets/assets/js/editor/commands/index.js":
/*!********************************************************************!*\
  !*** ../modules/atomic-widgets/assets/js/editor/commands/index.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
Object.defineProperty(exports, "Styles", ({
  enumerable: true,
  get: function get() {
    return _styles.Styles;
  }
}));
var _styles = __webpack_require__(/*! ./styles */ "../modules/atomic-widgets/assets/js/editor/commands/styles.js");

/***/ }),

/***/ "../modules/atomic-widgets/assets/js/editor/commands/styles.js":
/*!*********************************************************************!*\
  !*** ../modules/atomic-widgets/assets/js/editor/commands/styles.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var __ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n")["__"];


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = exports.Styles = void 0;
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../node_modules/@babel/runtime/helpers/defineProperty.js"));
var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../node_modules/@babel/runtime/helpers/classCallCheck.js"));
var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../node_modules/@babel/runtime/helpers/createClass.js"));
var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));
var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../node_modules/@babel/runtime/helpers/getPrototypeOf.js"));
var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../node_modules/@babel/runtime/helpers/inherits.js"));
var _getVariants = __webpack_require__(/*! ../utils/get-variants */ "../modules/atomic-widgets/assets/js/editor/utils/get-variants.js");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2.default)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2.default)(o), (0, _possibleConstructorReturn2.default)(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2.default)(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
/**
 * @typedef {import('elementor/assets/dev/js/editor/container/container')} Container
 */
var Styles = exports.Styles = /*#__PURE__*/function (_$e$modules$editor$do) {
  function Styles() {
    (0, _classCallCheck2.default)(this, Styles);
    return _callSuper(this, Styles, arguments);
  }
  (0, _inherits2.default)(Styles, _$e$modules$editor$do);
  return (0, _createClass2.default)(Styles, [{
    key: "validateArgs",
    value: function validateArgs(args) {
      this.requireContainer(args);
      if (!args.bind && !args.styleDefID) {
        throw new Error('Missing bind or styleDefID');
      }
      if (args.bind && 'string' !== typeof args.bind) {
        throw new Error('Invalid bind arg');
      }
      if (args.styleDefID && 'string' !== typeof args.styleDefID) {
        throw new Error('Invalid styleDefID arg');
      }
    }

    /**
     * Function restore().
     *
     * Redo/Restore.
     *
     * @param {{}}      historyItem
     * @param {boolean} isRedo
     */
  }, {
    key: "addToHistory",
    value:
    /**
     * Function addToHistory().
     *
     * @param {Container}        container
     * @param {string}           bind
     * @param {string}           styleDefID
     * @param {{}}               meta
     * @param {{}}               props
     * @param {{}}               oldProps
     * @param {string|undefined} label
     */
    function addToHistory(container, bind, styleDefID, meta, props, oldProps, label) {
      var newPropsEmpty = Object.keys(props).reduce(function (emptyValues, key) {
        emptyValues[key] = undefined;
        return emptyValues;
      }, {});
      var changes = (0, _defineProperty2.default)({}, container.id, {
          bind: bind,
          styleDefID: styleDefID,
          meta: meta,
          label: label,
          old: {
            props: _objectSpread(_objectSpread({}, newPropsEmpty), oldProps)
          },
          new: {
            props: props
          }
        }),
        historyItem = {
          container: container,
          data: {
            changes: changes
          },
          type: 'change',
          restore: Styles.restore
        };
      $e.internal('document/history/add-transaction', historyItem);
    }
  }, {
    key: "getHistory",
    value: function getHistory(args) {
      var container = args.container,
        subTitle = this.constructor.getSubTitle(args);
      return {
        container: container,
        subTitle: subTitle,
        type: 'change'
      };
    }
  }, {
    key: "apply",
    value: function apply(args) {
      var _args$styleDefID, _container$model$get;
      var container = args.container;
      var bind = args.bind,
        meta = args.meta,
        props = args.props,
        label = args.label;
      container = container.lookup();
      var styleDefID = (_args$styleDefID = args.styleDefID) !== null && _args$styleDefID !== void 0 ? _args$styleDefID : null;
      var currentStyle = (_container$model$get = container.model.get('styles')) !== null && _container$model$get !== void 0 ? _container$model$get : {};

      // Saving a deep clone of the style before it mutates, as part of this command
      var oldStyle = this.isHistoryActive() ? structuredClone(currentStyle) : null;
      var style = {};
      if (!styleDefID) {
        // Create a new style definition for the first time
        style = $e.internal('document/atomic-widgets/create-style', {
          label: label,
          container: container,
          bind: bind
        });
        styleDefID = style.id;
      } else if (!currentStyle[styleDefID]) {
        // Create a new style definition with the given ID
        // used when the style is deleted and then re-applied (i.e. history undo/redo)
        style = $e.internal('document/atomic-widgets/create-style', {
          label: label,
          container: container,
          styleDefID: styleDefID,
          bind: bind
        });
      } else {
        // Use the existing style definition
        style = currentStyle[styleDefID];
      }
      var currentVariant = (0, _getVariants.getVariantByMeta)(style.variants, meta);
      if (!currentVariant) {
        $e.internal('document/atomic-widgets/create-variant', {
          container: container,
          styleDefID: styleDefID,
          meta: meta
        });
      }
      var nonEmptyValues = Object.values(_objectSpread(_objectSpread({}, currentVariant === null || currentVariant === void 0 ? void 0 : currentVariant.props), props)).filter(function (value) {
        return value !== undefined;
      });
      if (0 === nonEmptyValues.length) {
        // Doesn't have any props to use for this variant
        $e.internal('document/atomic-widgets/delete-variant', {
          container: container,
          styleDefID: styleDefID,
          meta: meta
        });
        var newStyles = container.model.get('styles');
        var newVariants = newStyles[styleDefID].variants;
        if (0 === newVariants.length) {
          // After deleting the variant, there are no variants left
          $e.internal('document/atomic-widgets/delete-style', {
            container: container,
            styleDefID: styleDefID,
            bind: bind
          });
        }
      } else {
        // Has valid props in the current variant
        $e.internal('document/atomic-widgets/update-props', {
          container: container,
          styleDefID: styleDefID,
          bind: bind,
          meta: meta,
          props: props
        });
      }
      if (null !== oldStyle) {
        var _getVariantByMeta;
        var oldStyleDef = oldStyle[styleDefID];
        var oldProps = oldStyleDef !== null && oldStyleDef !== void 0 && oldStyleDef.variants ? (_getVariantByMeta = (0, _getVariants.getVariantByMeta)(oldStyleDef.variants, meta)) === null || _getVariantByMeta === void 0 ? void 0 : _getVariantByMeta.props : {};
        this.addToHistory(container, bind, styleDefID, meta, props, oldProps, label);
      }
    }
  }], [{
    key: "getSubTitle",
    value: function getSubTitle() {
      return __('Style', 'elementor');
    }
  }, {
    key: "restore",
    value: function restore(historyItem, isRedo) {
      var container = historyItem.get('container');
      var changes = historyItem.get('data').changes[container.id];
      var bind = changes.bind,
        styleDefID = changes.styleDefID,
        meta = changes.meta,
        label = changes.label;
      var _ref = isRedo ? changes.new : changes.old,
        props = _ref.props;
      $e.run('document/atomic-widgets/styles', {
        container: container,
        bind: bind,
        styleDefID: styleDefID,
        meta: meta,
        props: props,
        label: label
      });
    }
  }]);
}($e.modules.editor.document.CommandHistoryDebounceBase);
var _default = exports["default"] = Styles;

/***/ }),

/***/ "../modules/atomic-widgets/assets/js/editor/component.js":
/*!***************************************************************!*\
  !*** ../modules/atomic-widgets/assets/js/editor/component.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");
var _typeof = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "../node_modules/@babel/runtime/helpers/typeof.js");
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../node_modules/@babel/runtime/helpers/classCallCheck.js"));
var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../node_modules/@babel/runtime/helpers/createClass.js"));
var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));
var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../node_modules/@babel/runtime/helpers/getPrototypeOf.js"));
var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../node_modules/@babel/runtime/helpers/inherits.js"));
var commands = _interopRequireWildcard(__webpack_require__(/*! ./commands/ */ "../modules/atomic-widgets/assets/js/editor/commands/index.js"));
var commandsInternal = _interopRequireWildcard(__webpack_require__(/*! ./commands-internal/ */ "../modules/atomic-widgets/assets/js/editor/commands-internal/index.js"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2.default)(o), (0, _possibleConstructorReturn2.default)(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2.default)(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var Component = exports["default"] = /*#__PURE__*/function (_$e$modules$Component) {
  function Component() {
    (0, _classCallCheck2.default)(this, Component);
    return _callSuper(this, Component, arguments);
  }
  (0, _inherits2.default)(Component, _$e$modules$Component);
  return (0, _createClass2.default)(Component, [{
    key: "getNamespace",
    value: function getNamespace() {
      return 'document/atomic-widgets';
    }
  }, {
    key: "defaultCommands",
    value: function defaultCommands() {
      return this.importCommands(commands);
    }
  }, {
    key: "defaultCommandsInternal",
    value: function defaultCommandsInternal() {
      return this.importCommands(commandsInternal);
    }
  }]);
}($e.modules.ComponentBase);

/***/ }),

/***/ "../modules/atomic-widgets/assets/js/editor/container/div-block-empty-view.js":
/*!************************************************************************************!*\
  !*** ../modules/atomic-widgets/assets/js/editor/container/div-block-empty-view.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));
var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../node_modules/@babel/runtime/helpers/classCallCheck.js"));
var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../node_modules/@babel/runtime/helpers/createClass.js"));
var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));
var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../node_modules/@babel/runtime/helpers/getPrototypeOf.js"));
var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../node_modules/@babel/runtime/helpers/inherits.js"));
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../node_modules/@babel/runtime/helpers/defineProperty.js"));
var _react2 = _interopRequireDefault(__webpack_require__(/*! elementor-utils/react */ "../assets/dev/js/utils/react.js"));
var _emptyComponent = _interopRequireDefault(__webpack_require__(/*! elementor-elements/views/container/empty-component */ "../assets/dev/js/editor/elements/views/container/empty-component.js"));
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2.default)(o), (0, _possibleConstructorReturn2.default)(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2.default)(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var DivBlockEmptyView = exports["default"] = /*#__PURE__*/function (_Marionette$ItemView) {
  function DivBlockEmptyView() {
    var _this;
    (0, _classCallCheck2.default)(this, DivBlockEmptyView);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, DivBlockEmptyView, [].concat(args));
    (0, _defineProperty2.default)(_this, "template", '<div></div>');
    (0, _defineProperty2.default)(_this, "className", 'elementor-empty-view');
    return _this;
  }
  (0, _inherits2.default)(DivBlockEmptyView, _Marionette$ItemView);
  return (0, _createClass2.default)(DivBlockEmptyView, [{
    key: "renderReactDefaultElement",
    value: function renderReactDefaultElement(container) {
      var _ReactUtils$render = _react2.default.render(/*#__PURE__*/_react.default.createElement(_emptyComponent.default, {
          container: container
        }), this.el),
        unmount = _ReactUtils$render.unmount;
      this.unmount = unmount;
    }
  }, {
    key: "onRender",
    value: function onRender() {
      this.$el.addClass(this.className);
      this.renderReactDefaultElement();
    }
  }, {
    key: "onDestroy",
    value: function onDestroy() {
      this.unmount();
    }
  }]);
}(Marionette.ItemView);

/***/ }),

/***/ "../modules/atomic-widgets/assets/js/editor/div-block-model.js":
/*!*********************************************************************!*\
  !*** ../modules/atomic-widgets/assets/js/editor/div-block-model.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../node_modules/@babel/runtime/helpers/classCallCheck.js"));
var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../node_modules/@babel/runtime/helpers/createClass.js"));
var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));
var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../node_modules/@babel/runtime/helpers/getPrototypeOf.js"));
var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../node_modules/@babel/runtime/helpers/inherits.js"));
var _element = _interopRequireDefault(__webpack_require__(/*! elementor-elements/models/element */ "../assets/dev/js/editor/elements/models/element.js"));
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2.default)(o), (0, _possibleConstructorReturn2.default)(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2.default)(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var AtomicContainer = exports["default"] = /*#__PURE__*/function (_ElementModel) {
  function AtomicContainer() {
    (0, _classCallCheck2.default)(this, AtomicContainer);
    return _callSuper(this, AtomicContainer, arguments);
  }
  (0, _inherits2.default)(AtomicContainer, _ElementModel);
  return (0, _createClass2.default)(AtomicContainer, [{
    key: "isValidChild",
    value:
    /**
     * Do not allow section, column or container be placed in the Atomic container.
     *
     * @param {*} childModel
     */
    function isValidChild(childModel) {
      var elType = childModel.get('elType');
      return 'section' !== elType && 'column' !== elType && 'container' !== elType;
    }
  }]);
}(_element.default);

/***/ }),

/***/ "../modules/atomic-widgets/assets/js/editor/div-block-type.js":
/*!********************************************************************!*\
  !*** ../modules/atomic-widgets/assets/js/editor/div-block-type.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../node_modules/@babel/runtime/helpers/classCallCheck.js"));
var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../node_modules/@babel/runtime/helpers/createClass.js"));
var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));
var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../node_modules/@babel/runtime/helpers/getPrototypeOf.js"));
var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../node_modules/@babel/runtime/helpers/inherits.js"));
var _emptyComponent = _interopRequireDefault(__webpack_require__(/*! elementor-elements/views/container/empty-component */ "../assets/dev/js/editor/elements/views/container/empty-component.js"));
var _divBlockModel = _interopRequireDefault(__webpack_require__(/*! ./div-block-model */ "../modules/atomic-widgets/assets/js/editor/div-block-model.js"));
var _divBlockView = _interopRequireDefault(__webpack_require__(/*! ./div-block-view */ "../modules/atomic-widgets/assets/js/editor/div-block-view.js"));
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2.default)(o), (0, _possibleConstructorReturn2.default)(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2.default)(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var AtomicContainer = exports["default"] = /*#__PURE__*/function (_elementor$modules$el) {
  function AtomicContainer() {
    (0, _classCallCheck2.default)(this, AtomicContainer);
    return _callSuper(this, AtomicContainer, arguments);
  }
  (0, _inherits2.default)(AtomicContainer, _elementor$modules$el);
  return (0, _createClass2.default)(AtomicContainer, [{
    key: "getType",
    value: function getType() {
      return 'div-block';
    }
  }, {
    key: "getView",
    value: function getView() {
      return _divBlockView.default;
    }
  }, {
    key: "getEmptyView",
    value: function getEmptyView() {
      return _emptyComponent.default;
    }
  }, {
    key: "getModel",
    value: function getModel() {
      return _divBlockModel.default;
    }
  }]);
}(elementor.modules.elements.types.Base);

/***/ }),

/***/ "../modules/atomic-widgets/assets/js/editor/div-block-view.js":
/*!********************************************************************!*\
  !*** ../modules/atomic-widgets/assets/js/editor/div-block-view.js ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var sprintf = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n")["sprintf"];
/* provided dependency */ var __ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n")["__"];


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");
var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "../node_modules/@babel/runtime/helpers/toConsumableArray.js"));
var _divBlockEmptyView = _interopRequireDefault(__webpack_require__(/*! ./container/div-block-empty-view */ "../modules/atomic-widgets/assets/js/editor/container/div-block-empty-view.js"));
var _inline = _interopRequireDefault(__webpack_require__(/*! elementor-views/add-section/inline */ "../assets/dev/js/editor/views/add-section/inline.js"));
var BaseElementView = __webpack_require__(/*! elementor-elements/views/base */ "../assets/dev/js/editor/elements/views/base.js");
var DivBlockView = BaseElementView.extend({
  template: Marionette.TemplateCache.get('#tmpl-elementor-div-block-content'),
  emptyView: _divBlockEmptyView.default,
  tagName: function tagName() {
    return this.model.getSetting('tag') || 'div';
  },
  getChildViewContainer: function getChildViewContainer() {
    this.childViewContainer = '';
    return Marionette.CompositeView.prototype.getChildViewContainer.apply(this, arguments);
  },
  className: function className() {
    return "".concat(BaseElementView.prototype.className.apply(this), " e-con e-div-block").concat(this.getClassString());
  },
  // TODO: Copied from `views/column.js`.
  ui: function ui() {
    var ui = BaseElementView.prototype.ui.apply(this, arguments);
    ui.percentsTooltip = '> .elementor-element-overlay .elementor-column-percents-tooltip';
    return ui;
  },
  // TODO: Copied from `views/column.js`.
  attachElContent: function attachElContent() {
    BaseElementView.prototype.attachElContent.apply(this, arguments);
    var $tooltip = jQuery('<div>', {
      class: 'elementor-column-percents-tooltip',
      'data-side': elementorCommon.config.isRTL ? 'right' : 'left'
    });
    this.$el.children('.elementor-element-overlay').append($tooltip);
  },
  // TODO: Copied from `views/column.js`.
  getPercentSize: function getPercentSize(size) {
    if (!size) {
      size = this.el.getBoundingClientRect().width;
    }
    return +(size / this.$el.parent().width() * 100).toFixed(3);
  },
  // TODO: Copied from `views/column.js`.
  getPercentsForDisplay: function getPercentsForDisplay() {
    var width = +this.model.getSetting('width') || this.getPercentSize();
    return width.toFixed(1) + '%';
  },
  renderOnChange: function renderOnChange() {
    BaseElementView.prototype.renderOnChange.apply(this, arguments);
    this.$el.addClass(this.getClasses());
  },
  onRender: function onRender() {
    var _this = this;
    BaseElementView.prototype.onRender.apply(this, arguments);

    // Defer to wait for everything to render.
    setTimeout(function () {
      _this.droppableInitialize();
    });
  },
  droppableInitialize: function droppableInitialize() {
    this.$el.html5Droppable(this.getDroppableOptions());
  },
  isDroppingAllowed: function isDroppingAllowed() {
    return true;
  },
  behaviors: function behaviors() {
    var behaviors = BaseElementView.prototype.behaviors.apply(this, arguments);
    _.extend(behaviors, {
      Sortable: {
        behaviorClass: __webpack_require__(/*! elementor-behaviors/sortable */ "../assets/dev/js/editor/elements/views/behaviors/sortable.js"),
        elChildType: 'widget'
      }
    });
    return elementor.hooks.applyFilters('elements/div-block/behaviors', behaviors, this);
  },
  /**
   * @return {{}} options
   */
  getSortableOptions: function getSortableOptions() {
    return {
      preventInit: true
    };
  },
  getDroppableOptions: function getDroppableOptions() {
    var _this2 = this;
    var items = '> .elementor-element, > .elementor-empty-view .elementor-first-add';
    return {
      items: items,
      groups: ['elementor-element'],
      horizontalThreshold: 5,
      isDroppingAllowed: this.isDroppingAllowed.bind(this),
      currentElementClass: 'elementor-html5dnd-current-element',
      placeholderClass: 'elementor-sortable-placeholder elementor-widget-placeholder',
      hasDraggingOnChildClass: 'e-dragging-over',
      getDropContainer: function getDropContainer() {
        return _this2.getContainer();
      },
      onDropping: function onDropping(side, event) {
        event.stopPropagation();

        // Triggering drag end manually, since it won't fired above iframe
        elementor.getPreviewView().onPanelElementDragEnd();
        var draggedView = elementor.channels.editor.request('element:dragged'),
          draggingInSameParent = (draggedView === null || draggedView === void 0 ? void 0 : draggedView.parent) === _this2,
          containerSelector = event.currentTarget.parentElement;
        var $elements = jQuery(containerSelector).find('> .elementor-element');

        // Exclude the dragged element from the indexing calculations.
        if (draggingInSameParent) {
          $elements = $elements.not(draggedView.$el);
        }
        var widgetsArray = Object.values($elements);
        var newIndex = widgetsArray.indexOf(event.currentTarget);

        // Plus one in order to insert it after the current target element.
        if (_this2.shouldIncrementIndex(side)) {
          newIndex++;
        }

        // User is sorting inside a Container.
        if (draggedView) {
          // Prevent the user from dragging a parent container into its own child container
          var draggedId = draggedView.getContainer().id;
          var currentTargetParentContainer = _this2.container;
          while (currentTargetParentContainer) {
            if (currentTargetParentContainer.id === draggedId) {
              return;
            }
            currentTargetParentContainer = currentTargetParentContainer.parent;
          }

          // Reset the dragged element cache.
          elementor.channels.editor.reply('element:dragged', null);
          $e.run('document/elements/move', {
            container: draggedView.getContainer(),
            target: _this2.getContainer(),
            options: {
              at: newIndex
            }
          });
          return;
        }

        // User is dragging an element from the panel.
        _this2.onDrop(event, {
          at: newIndex
        });
      }
    };
  },
  getEditButtons: function getEditButtons() {
    var elementData = elementor.getElementData(this.model),
      editTools = {};
    if ($e.components.get('document/elements').utils.allowAddingWidgets()) {
      editTools.add = {
        /* Translators: %s: Element Name. */
        title: sprintf(__('Add %s', 'elementor'), elementData.title),
        icon: 'plus'
      };
      editTools.edit = {
        /* Translators: %s: Element Name. */
        title: sprintf(__('Edit %s', 'elementor'), elementData.title),
        icon: 'handle'
      };
    }
    if (!this.getContainer().isLocked()) {
      if (elementor.getPreferences('edit_buttons') && $e.components.get('document/elements').utils.allowAddingWidgets()) {
        editTools.duplicate = {
          /* Translators: %s: Element Name. */
          title: sprintf(__('Duplicate %s', 'elementor'), elementData.title),
          icon: 'clone'
        };
      }
      editTools.remove = {
        /* Translators: %s: Element Name. */
        title: sprintf(__('Delete %s', 'elementor'), elementData.title),
        icon: 'close'
      };
    }
    return editTools;
  },
  shouldIncrementIndex: function shouldIncrementIndex(side) {
    if (!this.draggingOnBottomOrRightSide(side)) {
      return false;
    }
    return !this.emptyViewIsCurrentlyBeingDraggedOver();
  },
  draggingOnBottomOrRightSide: function draggingOnBottomOrRightSide(side) {
    return ['bottom', 'right'].includes(side);
  },
  emptyViewIsCurrentlyBeingDraggedOver: function emptyViewIsCurrentlyBeingDraggedOver() {
    return this.$el.find('> .elementor-empty-view > .elementor-first-add.elementor-html5dnd-current-element').length > 0;
  },
  /**
   * Toggle the `New Section` view when clicking the `add` button in the edit tools.
   *
   * @return {void}
   */
  onAddButtonClick: function onAddButtonClick() {
    if (this.addSectionView && !this.addSectionView.isDestroyed) {
      this.addSectionView.fadeToDeath();
      return;
    }
    var addSectionView = new _inline.default({
      at: this.model.collection.indexOf(this.model)
    });
    addSectionView.render();
    this.$el.before(addSectionView.$el);
    addSectionView.$el.hide();

    // Delaying the slide down for slow-render browsers (such as FF)
    setTimeout(function () {
      addSectionView.$el.slideDown(null, function () {
        // Remove inline style, for preview mode.
        jQuery(this).css('display', '');
      });
    });
    this.addSectionView = addSectionView;
  },
  getClasses: function getClasses() {
    var _this$options;
    return ((_this$options = this.options) === null || _this$options === void 0 || (_this$options = _this$options.model) === null || _this$options === void 0 || (_this$options = _this$options.getSetting('classes')) === null || _this$options === void 0 ? void 0 : _this$options.value) || [];
  },
  getClassString: function getClassString() {
    var classes = this.getClasses();
    return classes.length ? [''].concat((0, _toConsumableArray2.default)(classes)).join(' ') : '';
  }
});
module.exports = DivBlockView;

/***/ }),

/***/ "../modules/atomic-widgets/assets/js/editor/utils/get-variants.js":
/*!************************************************************************!*\
  !*** ../modules/atomic-widgets/assets/js/editor/utils/get-variants.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.getVariantByMeta = getVariantByMeta;
exports.getVariantsWithoutMeta = getVariantsWithoutMeta;
function getVariantByMeta(variants, meta) {
  return variants.find(function (variant) {
    return variant.meta.breakpoint === meta.breakpoint && variant.meta.state === meta.state;
  });
}
function getVariantsWithoutMeta(variants, meta) {
  return variants.filter(function (variant) {
    return variant.meta.breakpoint !== meta.breakpoint || variant.meta.state !== meta.state;
  });
}

/***/ }),

/***/ "../node_modules/react-dom/client.js":
/*!*******************************************!*\
  !*** ../node_modules/react-dom/client.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var m = __webpack_require__(/*! react-dom */ "react-dom");
if (false) {} else {
  var i = m.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  exports.createRoot = function(c, o) {
    i.usingClientEntryPoint = true;
    try {
      return m.createRoot(c, o);
    } finally {
      i.usingClientEntryPoint = false;
    }
  };
  exports.hydrateRoot = function(c, h, o) {
    i.usingClientEntryPoint = true;
    try {
      return m.hydrateRoot(c, h, o);
    } finally {
      i.usingClientEntryPoint = false;
    }
  };
}


/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = React;

/***/ }),

/***/ "react-dom":
/*!***************************!*\
  !*** external "ReactDOM" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = ReactDOM;

/***/ }),

/***/ "@wordpress/i18n":
/*!**************************!*\
  !*** external "wp.i18n" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = wp.i18n;

/***/ }),

/***/ "../node_modules/@babel/runtime/helpers/arrayLikeToArray.js":
/*!******************************************************************!*\
  !*** ../node_modules/@babel/runtime/helpers/arrayLikeToArray.js ***!
  \******************************************************************/
/***/ ((module) => {

function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
module.exports = _arrayLikeToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "../node_modules/@babel/runtime/helpers/arrayWithHoles.js":
/*!****************************************************************!*\
  !*** ../node_modules/@babel/runtime/helpers/arrayWithHoles.js ***!
  \****************************************************************/
/***/ ((module) => {

function _arrayWithHoles(r) {
  if (Array.isArray(r)) return r;
}
module.exports = _arrayWithHoles, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "../node_modules/@babel/runtime/helpers/arrayWithoutHoles.js":
/*!*******************************************************************!*\
  !*** ../node_modules/@babel/runtime/helpers/arrayWithoutHoles.js ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var arrayLikeToArray = __webpack_require__(/*! ./arrayLikeToArray.js */ "../node_modules/@babel/runtime/helpers/arrayLikeToArray.js");
function _arrayWithoutHoles(r) {
  if (Array.isArray(r)) return arrayLikeToArray(r);
}
module.exports = _arrayWithoutHoles, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "../node_modules/@babel/runtime/helpers/assertThisInitialized.js":
/*!***********************************************************************!*\
  !*** ../node_modules/@babel/runtime/helpers/assertThisInitialized.js ***!
  \***********************************************************************/
/***/ ((module) => {

function _assertThisInitialized(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
module.exports = _assertThisInitialized, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "../node_modules/@babel/runtime/helpers/asyncToGenerator.js":
/*!******************************************************************!*\
  !*** ../node_modules/@babel/runtime/helpers/asyncToGenerator.js ***!
  \******************************************************************/
/***/ ((module) => {

function asyncGeneratorStep(n, t, e, r, o, a, c) {
  try {
    var i = n[a](c),
      u = i.value;
  } catch (n) {
    return void e(n);
  }
  i.done ? t(u) : Promise.resolve(u).then(r, o);
}
function _asyncToGenerator(n) {
  return function () {
    var t = this,
      e = arguments;
    return new Promise(function (r, o) {
      var a = n.apply(t, e);
      function _next(n) {
        asyncGeneratorStep(a, r, o, _next, _throw, "next", n);
      }
      function _throw(n) {
        asyncGeneratorStep(a, r, o, _next, _throw, "throw", n);
      }
      _next(void 0);
    });
  };
}
module.exports = _asyncToGenerator, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "../node_modules/@babel/runtime/helpers/classCallCheck.js":
/*!****************************************************************!*\
  !*** ../node_modules/@babel/runtime/helpers/classCallCheck.js ***!
  \****************************************************************/
/***/ ((module) => {

function _classCallCheck(a, n) {
  if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}
module.exports = _classCallCheck, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "../node_modules/@babel/runtime/helpers/construct.js":
/*!***********************************************************!*\
  !*** ../node_modules/@babel/runtime/helpers/construct.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isNativeReflectConstruct = __webpack_require__(/*! ./isNativeReflectConstruct.js */ "../node_modules/@babel/runtime/helpers/isNativeReflectConstruct.js");
var setPrototypeOf = __webpack_require__(/*! ./setPrototypeOf.js */ "../node_modules/@babel/runtime/helpers/setPrototypeOf.js");
function _construct(t, e, r) {
  if (isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments);
  var o = [null];
  o.push.apply(o, e);
  var p = new (t.bind.apply(t, o))();
  return r && setPrototypeOf(p, r.prototype), p;
}
module.exports = _construct, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "../node_modules/@babel/runtime/helpers/createClass.js":
/*!*************************************************************!*\
  !*** ../node_modules/@babel/runtime/helpers/createClass.js ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toPropertyKey = __webpack_require__(/*! ./toPropertyKey.js */ "../node_modules/@babel/runtime/helpers/toPropertyKey.js");
function _defineProperties(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t];
    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, toPropertyKey(o.key), o);
  }
}
function _createClass(e, r, t) {
  return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e;
}
module.exports = _createClass, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "../node_modules/@babel/runtime/helpers/defineProperty.js":
/*!****************************************************************!*\
  !*** ../node_modules/@babel/runtime/helpers/defineProperty.js ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toPropertyKey = __webpack_require__(/*! ./toPropertyKey.js */ "../node_modules/@babel/runtime/helpers/toPropertyKey.js");
function _defineProperty(e, r, t) {
  return (r = toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[r] = t, e;
}
module.exports = _defineProperty, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "../node_modules/@babel/runtime/helpers/get.js":
/*!*****************************************************!*\
  !*** ../node_modules/@babel/runtime/helpers/get.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var superPropBase = __webpack_require__(/*! ./superPropBase.js */ "../node_modules/@babel/runtime/helpers/superPropBase.js");
function _get() {
  return module.exports = _get = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function (e, t, r) {
    var p = superPropBase(e, t);
    if (p) {
      var n = Object.getOwnPropertyDescriptor(p, t);
      return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value;
    }
  }, module.exports.__esModule = true, module.exports["default"] = module.exports, _get.apply(null, arguments);
}
module.exports = _get, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "../node_modules/@babel/runtime/helpers/getPrototypeOf.js":
/*!****************************************************************!*\
  !*** ../node_modules/@babel/runtime/helpers/getPrototypeOf.js ***!
  \****************************************************************/
/***/ ((module) => {

function _getPrototypeOf(t) {
  return module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
    return t.__proto__ || Object.getPrototypeOf(t);
  }, module.exports.__esModule = true, module.exports["default"] = module.exports, _getPrototypeOf(t);
}
module.exports = _getPrototypeOf, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "../node_modules/@babel/runtime/helpers/inherits.js":
/*!**********************************************************!*\
  !*** ../node_modules/@babel/runtime/helpers/inherits.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var setPrototypeOf = __webpack_require__(/*! ./setPrototypeOf.js */ "../node_modules/@babel/runtime/helpers/setPrototypeOf.js");
function _inherits(t, e) {
  if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
  t.prototype = Object.create(e && e.prototype, {
    constructor: {
      value: t,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(t, "prototype", {
    writable: !1
  }), e && setPrototypeOf(t, e);
}
module.exports = _inherits, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js":
/*!***********************************************************************!*\
  !*** ../node_modules/@babel/runtime/helpers/interopRequireDefault.js ***!
  \***********************************************************************/
/***/ ((module) => {

function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    "default": e
  };
}
module.exports = _interopRequireDefault, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "../node_modules/@babel/runtime/helpers/isNativeFunction.js":
/*!******************************************************************!*\
  !*** ../node_modules/@babel/runtime/helpers/isNativeFunction.js ***!
  \******************************************************************/
/***/ ((module) => {

function _isNativeFunction(t) {
  try {
    return -1 !== Function.toString.call(t).indexOf("[native code]");
  } catch (n) {
    return "function" == typeof t;
  }
}
module.exports = _isNativeFunction, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "../node_modules/@babel/runtime/helpers/isNativeReflectConstruct.js":
/*!**************************************************************************!*\
  !*** ../node_modules/@babel/runtime/helpers/isNativeReflectConstruct.js ***!
  \**************************************************************************/
/***/ ((module) => {

function _isNativeReflectConstruct() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
  } catch (t) {}
  return (module.exports = _isNativeReflectConstruct = function _isNativeReflectConstruct() {
    return !!t;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports)();
}
module.exports = _isNativeReflectConstruct, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "../node_modules/@babel/runtime/helpers/iterableToArray.js":
/*!*****************************************************************!*\
  !*** ../node_modules/@babel/runtime/helpers/iterableToArray.js ***!
  \*****************************************************************/
/***/ ((module) => {

function _iterableToArray(r) {
  if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
}
module.exports = _iterableToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "../node_modules/@babel/runtime/helpers/iterableToArrayLimit.js":
/*!**********************************************************************!*\
  !*** ../node_modules/@babel/runtime/helpers/iterableToArrayLimit.js ***!
  \**********************************************************************/
/***/ ((module) => {

function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = !0,
      o = !1;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
    } catch (r) {
      o = !0, n = r;
    } finally {
      try {
        if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
module.exports = _iterableToArrayLimit, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "../node_modules/@babel/runtime/helpers/nonIterableRest.js":
/*!*****************************************************************!*\
  !*** ../node_modules/@babel/runtime/helpers/nonIterableRest.js ***!
  \*****************************************************************/
/***/ ((module) => {

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
module.exports = _nonIterableRest, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "../node_modules/@babel/runtime/helpers/nonIterableSpread.js":
/*!*******************************************************************!*\
  !*** ../node_modules/@babel/runtime/helpers/nonIterableSpread.js ***!
  \*******************************************************************/
/***/ ((module) => {

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
module.exports = _nonIterableSpread, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "../node_modules/@babel/runtime/helpers/possibleConstructorReturn.js":
/*!***************************************************************************!*\
  !*** ../node_modules/@babel/runtime/helpers/possibleConstructorReturn.js ***!
  \***************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _typeof = (__webpack_require__(/*! ./typeof.js */ "../node_modules/@babel/runtime/helpers/typeof.js")["default"]);
var assertThisInitialized = __webpack_require__(/*! ./assertThisInitialized.js */ "../node_modules/@babel/runtime/helpers/assertThisInitialized.js");
function _possibleConstructorReturn(t, e) {
  if (e && ("object" == _typeof(e) || "function" == typeof e)) return e;
  if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
  return assertThisInitialized(t);
}
module.exports = _possibleConstructorReturn, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "../node_modules/@babel/runtime/helpers/readOnlyError.js":
/*!***************************************************************!*\
  !*** ../node_modules/@babel/runtime/helpers/readOnlyError.js ***!
  \***************************************************************/
/***/ ((module) => {

function _readOnlyError(r) {
  throw new TypeError('"' + r + '" is read-only');
}
module.exports = _readOnlyError, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "../node_modules/@babel/runtime/helpers/regeneratorRuntime.js":
/*!********************************************************************!*\
  !*** ../node_modules/@babel/runtime/helpers/regeneratorRuntime.js ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _typeof = (__webpack_require__(/*! ./typeof.js */ "../node_modules/@babel/runtime/helpers/typeof.js")["default"]);
function _regeneratorRuntime() {
  "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */
  module.exports = _regeneratorRuntime = function _regeneratorRuntime() {
    return e;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  var t,
    e = {},
    r = Object.prototype,
    n = r.hasOwnProperty,
    o = Object.defineProperty || function (t, e, r) {
      t[e] = r.value;
    },
    i = "function" == typeof Symbol ? Symbol : {},
    a = i.iterator || "@@iterator",
    c = i.asyncIterator || "@@asyncIterator",
    u = i.toStringTag || "@@toStringTag";
  function define(t, e, r) {
    return Object.defineProperty(t, e, {
      value: r,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), t[e];
  }
  try {
    define({}, "");
  } catch (t) {
    define = function define(t, e, r) {
      return t[e] = r;
    };
  }
  function wrap(t, e, r, n) {
    var i = e && e.prototype instanceof Generator ? e : Generator,
      a = Object.create(i.prototype),
      c = new Context(n || []);
    return o(a, "_invoke", {
      value: makeInvokeMethod(t, r, c)
    }), a;
  }
  function tryCatch(t, e, r) {
    try {
      return {
        type: "normal",
        arg: t.call(e, r)
      };
    } catch (t) {
      return {
        type: "throw",
        arg: t
      };
    }
  }
  e.wrap = wrap;
  var h = "suspendedStart",
    l = "suspendedYield",
    f = "executing",
    s = "completed",
    y = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  var p = {};
  define(p, a, function () {
    return this;
  });
  var d = Object.getPrototypeOf,
    v = d && d(d(values([])));
  v && v !== r && n.call(v, a) && (p = v);
  var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p);
  function defineIteratorMethods(t) {
    ["next", "throw", "return"].forEach(function (e) {
      define(t, e, function (t) {
        return this._invoke(e, t);
      });
    });
  }
  function AsyncIterator(t, e) {
    function invoke(r, o, i, a) {
      var c = tryCatch(t[r], t, o);
      if ("throw" !== c.type) {
        var u = c.arg,
          h = u.value;
        return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) {
          invoke("next", t, i, a);
        }, function (t) {
          invoke("throw", t, i, a);
        }) : e.resolve(h).then(function (t) {
          u.value = t, i(u);
        }, function (t) {
          return invoke("throw", t, i, a);
        });
      }
      a(c.arg);
    }
    var r;
    o(this, "_invoke", {
      value: function value(t, n) {
        function callInvokeWithMethodAndArg() {
          return new e(function (e, r) {
            invoke(t, n, e, r);
          });
        }
        return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      }
    });
  }
  function makeInvokeMethod(e, r, n) {
    var o = h;
    return function (i, a) {
      if (o === f) throw Error("Generator is already running");
      if (o === s) {
        if ("throw" === i) throw a;
        return {
          value: t,
          done: !0
        };
      }
      for (n.method = i, n.arg = a;;) {
        var c = n.delegate;
        if (c) {
          var u = maybeInvokeDelegate(c, n);
          if (u) {
            if (u === y) continue;
            return u;
          }
        }
        if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) {
          if (o === h) throw o = s, n.arg;
          n.dispatchException(n.arg);
        } else "return" === n.method && n.abrupt("return", n.arg);
        o = f;
        var p = tryCatch(e, r, n);
        if ("normal" === p.type) {
          if (o = n.done ? s : l, p.arg === y) continue;
          return {
            value: p.arg,
            done: n.done
          };
        }
        "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg);
      }
    };
  }
  function maybeInvokeDelegate(e, r) {
    var n = r.method,
      o = e.iterator[n];
    if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y;
    var i = tryCatch(o, e.iterator, r.arg);
    if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y;
    var a = i.arg;
    return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y);
  }
  function pushTryEntry(t) {
    var e = {
      tryLoc: t[0]
    };
    1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e);
  }
  function resetTryEntry(t) {
    var e = t.completion || {};
    e.type = "normal", delete e.arg, t.completion = e;
  }
  function Context(t) {
    this.tryEntries = [{
      tryLoc: "root"
    }], t.forEach(pushTryEntry, this), this.reset(!0);
  }
  function values(e) {
    if (e || "" === e) {
      var r = e[a];
      if (r) return r.call(e);
      if ("function" == typeof e.next) return e;
      if (!isNaN(e.length)) {
        var o = -1,
          i = function next() {
            for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next;
            return next.value = t, next.done = !0, next;
          };
        return i.next = i;
      }
    }
    throw new TypeError(_typeof(e) + " is not iterable");
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", {
    value: GeneratorFunctionPrototype,
    configurable: !0
  }), o(GeneratorFunctionPrototype, "constructor", {
    value: GeneratorFunction,
    configurable: !0
  }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) {
    var e = "function" == typeof t && t.constructor;
    return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name));
  }, e.mark = function (t) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t;
  }, e.awrap = function (t) {
    return {
      __await: t
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () {
    return this;
  }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) {
    void 0 === i && (i = Promise);
    var a = new AsyncIterator(wrap(t, r, n, o), i);
    return e.isGeneratorFunction(r) ? a : a.next().then(function (t) {
      return t.done ? t.value : a.next();
    });
  }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () {
    return this;
  }), define(g, "toString", function () {
    return "[object Generator]";
  }), e.keys = function (t) {
    var e = Object(t),
      r = [];
    for (var n in e) r.push(n);
    return r.reverse(), function next() {
      for (; r.length;) {
        var t = r.pop();
        if (t in e) return next.value = t, next.done = !1, next;
      }
      return next.done = !0, next;
    };
  }, e.values = values, Context.prototype = {
    constructor: Context,
    reset: function reset(e) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t);
    },
    stop: function stop() {
      this.done = !0;
      var t = this.tryEntries[0].completion;
      if ("throw" === t.type) throw t.arg;
      return this.rval;
    },
    dispatchException: function dispatchException(e) {
      if (this.done) throw e;
      var r = this;
      function handle(n, o) {
        return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o;
      }
      for (var o = this.tryEntries.length - 1; o >= 0; --o) {
        var i = this.tryEntries[o],
          a = i.completion;
        if ("root" === i.tryLoc) return handle("end");
        if (i.tryLoc <= this.prev) {
          var c = n.call(i, "catchLoc"),
            u = n.call(i, "finallyLoc");
          if (c && u) {
            if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
            if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
          } else if (c) {
            if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
          } else {
            if (!u) throw Error("try statement without catch or finally");
            if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
          }
        }
      }
    },
    abrupt: function abrupt(t, e) {
      for (var r = this.tryEntries.length - 1; r >= 0; --r) {
        var o = this.tryEntries[r];
        if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) {
          var i = o;
          break;
        }
      }
      i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null);
      var a = i ? i.completion : {};
      return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a);
    },
    complete: function complete(t, e) {
      if ("throw" === t.type) throw t.arg;
      return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y;
    },
    finish: function finish(t) {
      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
        var r = this.tryEntries[e];
        if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y;
      }
    },
    "catch": function _catch(t) {
      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
        var r = this.tryEntries[e];
        if (r.tryLoc === t) {
          var n = r.completion;
          if ("throw" === n.type) {
            var o = n.arg;
            resetTryEntry(r);
          }
          return o;
        }
      }
      throw Error("illegal catch attempt");
    },
    delegateYield: function delegateYield(e, r, n) {
      return this.delegate = {
        iterator: values(e),
        resultName: r,
        nextLoc: n
      }, "next" === this.method && (this.arg = t), y;
    }
  }, e;
}
module.exports = _regeneratorRuntime, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "../node_modules/@babel/runtime/helpers/setPrototypeOf.js":
/*!****************************************************************!*\
  !*** ../node_modules/@babel/runtime/helpers/setPrototypeOf.js ***!
  \****************************************************************/
/***/ ((module) => {

function _setPrototypeOf(t, e) {
  return module.exports = _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
    return t.__proto__ = e, t;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports, _setPrototypeOf(t, e);
}
module.exports = _setPrototypeOf, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "../node_modules/@babel/runtime/helpers/slicedToArray.js":
/*!***************************************************************!*\
  !*** ../node_modules/@babel/runtime/helpers/slicedToArray.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var arrayWithHoles = __webpack_require__(/*! ./arrayWithHoles.js */ "../node_modules/@babel/runtime/helpers/arrayWithHoles.js");
var iterableToArrayLimit = __webpack_require__(/*! ./iterableToArrayLimit.js */ "../node_modules/@babel/runtime/helpers/iterableToArrayLimit.js");
var unsupportedIterableToArray = __webpack_require__(/*! ./unsupportedIterableToArray.js */ "../node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js");
var nonIterableRest = __webpack_require__(/*! ./nonIterableRest.js */ "../node_modules/@babel/runtime/helpers/nonIterableRest.js");
function _slicedToArray(r, e) {
  return arrayWithHoles(r) || iterableToArrayLimit(r, e) || unsupportedIterableToArray(r, e) || nonIterableRest();
}
module.exports = _slicedToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "../node_modules/@babel/runtime/helpers/superPropBase.js":
/*!***************************************************************!*\
  !*** ../node_modules/@babel/runtime/helpers/superPropBase.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getPrototypeOf = __webpack_require__(/*! ./getPrototypeOf.js */ "../node_modules/@babel/runtime/helpers/getPrototypeOf.js");
function _superPropBase(t, o) {
  for (; !{}.hasOwnProperty.call(t, o) && null !== (t = getPrototypeOf(t)););
  return t;
}
module.exports = _superPropBase, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "../node_modules/@babel/runtime/helpers/toConsumableArray.js":
/*!*******************************************************************!*\
  !*** ../node_modules/@babel/runtime/helpers/toConsumableArray.js ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var arrayWithoutHoles = __webpack_require__(/*! ./arrayWithoutHoles.js */ "../node_modules/@babel/runtime/helpers/arrayWithoutHoles.js");
var iterableToArray = __webpack_require__(/*! ./iterableToArray.js */ "../node_modules/@babel/runtime/helpers/iterableToArray.js");
var unsupportedIterableToArray = __webpack_require__(/*! ./unsupportedIterableToArray.js */ "../node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js");
var nonIterableSpread = __webpack_require__(/*! ./nonIterableSpread.js */ "../node_modules/@babel/runtime/helpers/nonIterableSpread.js");
function _toConsumableArray(r) {
  return arrayWithoutHoles(r) || iterableToArray(r) || unsupportedIterableToArray(r) || nonIterableSpread();
}
module.exports = _toConsumableArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "../node_modules/@babel/runtime/helpers/toPrimitive.js":
/*!*************************************************************!*\
  !*** ../node_modules/@babel/runtime/helpers/toPrimitive.js ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _typeof = (__webpack_require__(/*! ./typeof.js */ "../node_modules/@babel/runtime/helpers/typeof.js")["default"]);
function toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
module.exports = toPrimitive, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "../node_modules/@babel/runtime/helpers/toPropertyKey.js":
/*!***************************************************************!*\
  !*** ../node_modules/@babel/runtime/helpers/toPropertyKey.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _typeof = (__webpack_require__(/*! ./typeof.js */ "../node_modules/@babel/runtime/helpers/typeof.js")["default"]);
var toPrimitive = __webpack_require__(/*! ./toPrimitive.js */ "../node_modules/@babel/runtime/helpers/toPrimitive.js");
function toPropertyKey(t) {
  var i = toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : i + "";
}
module.exports = toPropertyKey, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "../node_modules/@babel/runtime/helpers/typeof.js":
/*!********************************************************!*\
  !*** ../node_modules/@babel/runtime/helpers/typeof.js ***!
  \********************************************************/
/***/ ((module) => {

function _typeof(o) {
  "@babel/helpers - typeof";

  return module.exports = _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports, _typeof(o);
}
module.exports = _typeof, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "../node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js":
/*!****************************************************************************!*\
  !*** ../node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js ***!
  \****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var arrayLikeToArray = __webpack_require__(/*! ./arrayLikeToArray.js */ "../node_modules/@babel/runtime/helpers/arrayLikeToArray.js");
function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? arrayLikeToArray(r, a) : void 0;
  }
}
module.exports = _unsupportedIterableToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "../node_modules/@babel/runtime/helpers/wrapNativeSuper.js":
/*!*****************************************************************!*\
  !*** ../node_modules/@babel/runtime/helpers/wrapNativeSuper.js ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getPrototypeOf = __webpack_require__(/*! ./getPrototypeOf.js */ "../node_modules/@babel/runtime/helpers/getPrototypeOf.js");
var setPrototypeOf = __webpack_require__(/*! ./setPrototypeOf.js */ "../node_modules/@babel/runtime/helpers/setPrototypeOf.js");
var isNativeFunction = __webpack_require__(/*! ./isNativeFunction.js */ "../node_modules/@babel/runtime/helpers/isNativeFunction.js");
var construct = __webpack_require__(/*! ./construct.js */ "../node_modules/@babel/runtime/helpers/construct.js");
function _wrapNativeSuper(t) {
  var r = "function" == typeof Map ? new Map() : void 0;
  return module.exports = _wrapNativeSuper = function _wrapNativeSuper(t) {
    if (null === t || !isNativeFunction(t)) return t;
    if ("function" != typeof t) throw new TypeError("Super expression must either be null or a function");
    if (void 0 !== r) {
      if (r.has(t)) return r.get(t);
      r.set(t, Wrapper);
    }
    function Wrapper() {
      return construct(t, arguments, getPrototypeOf(this).constructor);
    }
    return Wrapper.prototype = Object.create(t.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: !1,
        writable: !0,
        configurable: !0
      }
    }), setPrototypeOf(Wrapper, t);
  }, module.exports.__esModule = true, module.exports["default"] = module.exports, _wrapNativeSuper(t);
}
module.exports = _wrapNativeSuper, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "../node_modules/@babel/runtime/regenerator/index.js":
/*!***********************************************************!*\
  !*** ../node_modules/@babel/runtime/regenerator/index.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// TODO(Babel 8): Remove this file.

var runtime = __webpack_require__(/*! ../helpers/regeneratorRuntime */ "../node_modules/@babel/runtime/helpers/regeneratorRuntime.js")();
module.exports = runtime;

// Copied from https://github.com/facebook/regenerator/blob/main/packages/runtime/runtime.js#L736=
try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  if (typeof globalThis === "object") {
    globalThis.regeneratorRuntime = runtime;
  } else {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
/*!************************************************************!*\
  !*** ../modules/atomic-widgets/assets/js/editor/module.js ***!
  \************************************************************/


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js");
var _slicedToArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "../node_modules/@babel/runtime/helpers/slicedToArray.js"));
var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../node_modules/@babel/runtime/helpers/classCallCheck.js"));
var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../node_modules/@babel/runtime/helpers/createClass.js"));
var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));
var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../node_modules/@babel/runtime/helpers/getPrototypeOf.js"));
var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../node_modules/@babel/runtime/helpers/inherits.js"));
var _component = _interopRequireDefault(__webpack_require__(/*! ./component */ "../modules/atomic-widgets/assets/js/editor/component.js"));
var _atomicWidgetType = __webpack_require__(/*! ./atomic-widget-type */ "../modules/atomic-widgets/assets/js/editor/atomic-widget-type.js");
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2.default)(o), (0, _possibleConstructorReturn2.default)(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2.default)(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var Module = /*#__PURE__*/function (_elementorModules$edi) {
  function Module() {
    (0, _classCallCheck2.default)(this, Module);
    return _callSuper(this, Module, arguments);
  }
  (0, _inherits2.default)(Module, _elementorModules$edi);
  return (0, _createClass2.default)(Module, [{
    key: "onInit",
    value: function onInit() {
      $e.components.register(new _component.default());
      this.registerAtomicWidgetTypes();
    }
  }, {
    key: "registerAtomicWidgetTypes",
    value: function registerAtomicWidgetTypes() {
      var _elementor$widgetsCac;
      Object.entries((_elementor$widgetsCac = elementor.widgetsCache) !== null && _elementor$widgetsCac !== void 0 ? _elementor$widgetsCac : {}).filter(function (_ref) {
        var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
          widget = _ref2[1];
        return !!widget.atomic;
      }).forEach(function (_ref3) {
        var _ref4 = (0, _slicedToArray2.default)(_ref3, 1),
          type = _ref4[0];
        return elementor.elementsManager.registerElementType(new _atomicWidgetType.AtomicWidgetType(type));
      });
      this.registerAtomicDivBlockType();
    }
  }, {
    key: "registerAtomicDivBlockType",
    value: function registerAtomicDivBlockType() {
      var DivBlock = (__webpack_require__(/*! ./div-block-type */ "../modules/atomic-widgets/assets/js/editor/div-block-type.js")["default"]);
      elementor.elementsManager.registerElementType(new DivBlock());
    }
  }]);
}(elementorModules.editor.utils.Module);
new Module();
})();

/******/ })()
;
//# sourceMappingURL=atomic-widgets-editor.js.map