if (typeof _yuitest_coverage == "undefined"){
    _yuitest_coverage = {};
    _yuitest_coverline = function(src, line){
        var coverage = _yuitest_coverage[src];
        if (!coverage.lines[line]){
            coverage.calledLines++;
        }
        coverage.lines[line]++;
    };
    _yuitest_coverfunc = function(src, name, line){
        var coverage = _yuitest_coverage[src],
            funcId = name + ":" + line;
        if (!coverage.functions[funcId]){
            coverage.calledFunctions++;
        }
        coverage.functions[funcId]++;
    };
}
_yuitest_coverage["C:\Workspace\yui3-gallery\src\gallery-imagecropper\build_tmp\gallery-imagecropper.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "C:\\Workspace\\yui3-gallery\\src\\gallery-imagecropper\\build_tmp\\gallery-imagecropper.js",
    code: []
};
_yuitest_coverage["C:\Workspace\yui3-gallery\src\gallery-imagecropper\build_tmp\gallery-imagecropper.js"].code=["YUI.add('gallery-imagecropper', function(Y) {","","/**","@description <p>Creates an Image Cropper control.</p>","@requires widget,dd-drag,dd-constrain,resize-base,resize-constrain","@module imagecropper","*/","","var Lang = Y.Lang,","    isNumber = Lang.isNumber,","    YArray = Y.Array,","    getClassName = Y.ClassNameManager.getClassName,","    IMAGE_CROPPER = 'imagecropper',","    RESIZE = 'resize',","    ","    _classNames = {","        cropMask: getClassName(IMAGE_CROPPER, 'mask'),","        resizeKnob: getClassName(IMAGE_CROPPER, RESIZE, 'knob'),","        resizeMask: getClassName(IMAGE_CROPPER, RESIZE, 'mask')","    };","","/**","@constructor","@class ImageCropper","@description <p>Creates an Image Cropper control.</p>","@extends Widget","@param {Object} config Object literal containing configuration parameters.","*/","function ImageCropper() {","    ImageCropper.superclass.constructor.apply(this, arguments);","}","Y.extend(ImageCropper, Y.Widget, {","    ","    /**","    Template that will contain the ImageCropper's mask.","    ","    @property ImageCropper.CROP_MASK_TEMPLATE","    @type {HTML}","    @default &lt;div class=\"[...-mask]\">&lt;/div>","    */","    CROP_MASK_TEMPLATE: '<div class=\"' + _classNames.cropMask + '\"></div>',","    /**","    Template that will contain the ImageCropper's resize node.","    ","    @property ImageCropper.RESIZE_KNOB_TEMPLATE","    @type {HTML}","    @default &lt;div class=\"[...-resize-knob]\" tabindex=\"0\">&lt;/div>","    */","    RESIZE_KNOB_TEMPLATE: '<div class=\"' + _classNames.resizeKnob + '\" tabindex=\"0\"></div>',","    /**","    Template that will contain the ImageCropper's resize mask.","    ","    @property ImageCropper.RESIZE_MASK_TEMPLATE","    @type {HTML}","    @default &lt;div class=\"[...-resize-mask]\">&lt;/div>","    */","    RESIZE_MASK_TEMPLATE: '<div class=\"' + _classNames.resizeMask + '\"></div>',","    ","    CONTENT_TEMPLATE: '<img/>',","    ","    /**","    An object containing the classnames used for all nodes in ImageCropper.","    Note that changing this object doesn't change the classnames in the","    default templates or in HTML_PARSER.","","    @property CLASS_NAMES","    @type {Object}","    */","    CLASS_NAMES: _classNames,","    ","","    /**","    @method _defCropMaskValueFn","    @protected","    */","    _defCropMaskValueFn: function () {","        return Y.Node.create(this.CROP_MASK_TEMPLATE);","    },","","    /**","    @method _defResizeKnobValueFn","    @protected","    */","    _defResizeKnobValueFn: function () {","        return Y.Node.create(this.RESIZE_KNOB_TEMPLATE);","    },","","    /**","    @method _defResizeMaskValueFn","    @protected","    */","    _defResizeMaskValueFn: function () {","        return Y.Node.create(this.RESIZE_MASK_TEMPLATE);","    },","","    /**","    @method _defResizeMaskValueFn","    @protected","    */","    _defInitWidthSetter: function (value) {","        var minHeight = this.get('minHeight');","        return value < minHeight ? minHeight : value;","    },","","    /**","    @method _defInitHeightSetter","    @protected","    */","    _defInitHeightSetter: function (value) {","        var minWidth = this.get('minWidth');","        return value < minWidth ? minWidth : value;","    },","","    /**","    @method _defStatusGetter","    @protected","    */","    _defStatusGetter: function () {","        var resizing = this.resize ? this.resize.get('resizing') : false,","            dragging = this.drag ? this.drag.get('dragging') : false;","        return resizing || dragging;","    },","    ","    /**","    @method _renderCropMask","    @param {Node} boundingBox","    @protected","    */","    _renderCropMask: function (boundingBox) {","        var node = this.get('cropMask').addClass(this.CLASS_NAMES.cropMask);","        if (!node.inDoc()) {","            boundingBox.append(node);","        }","    },","","    /**","    @method _renderResizeKnob","    @param {Node} boundingBox","    @protected","    */","    _renderResizeKnob: function (boundingBox) {","        var node = this.get('resizeKnob').addClass(this.CLASS_NAMES.resizeKnob);","        if (!node.inDoc()) {","            boundingBox.append(node);","        }","        node.setStyle('backgroundImage', 'url(' + this.get('source') + ')');","    },","","    /**","    @method _renderResizeKnob","    @protected","    */","    _renderResizeMask: function () {","        var node = this.get('resizeMask').addClass(this.CLASS_NAMES.resizeMask);","        if (!node.inDoc()) {","            this.get('resizeKnob').append(node);","        }","    },","","    /**","    Handles the `sourceChange` event.","    Sets the corresponding source to the image being cropped.","","    @method _handleSrcChange","    @param {EventFacade} e","    @private","    */","    _handleSrcChange: function (e) {","        this.get('contentBox').set('src', e.newVal);","        this.get('resizeKnob').setStyle('backgroundImage', 'url(' + e.newVal + ')');","    },","    ","    /**","    @method _syncResizeKnob","    @private","    */","    _syncResizeKnob: function () {","        var initialXY = this.get('initialXY');","        ","        this.get('resizeKnob').setStyles({","            left: initialXY[0],","            top: initialXY[1],","            width: this.get('initWidth'),","            height: this.get('initHeight')","        });","    },","    ","    /**","    @method _syncResizeMask","    @private","    */","    _syncResizeMask: function () {","        var resizeKnob = this.get('resizeKnob');","        resizeKnob.setStyle('backgroundPosition',","            (-resizeKnob.get('offsetLeft')) + 'px ' + ","            (-resizeKnob.get('offsetTop')) + 'px'","        );","    },","    ","    /**","    @method _syncResizeAttr","    @private","    */","    _syncResizeAttr: function (e) {","        var resizeKnob = this.get('resizeKnob');","        if (resizeKnob.resize) {","            resizeKnob.resize.con.set(e.attrName, e.newVal);","        }","    },","","    _syncControlsVisibility: function (e) {","        var hidden = !e.newVal,","            hiddenClass = this.getClassName('controls', 'hidden');","","        this.get('resizeKnob').toggleClass(hiddenClass, hidden);","        this.get('cropMask').toggleClass(hiddenClass, hidden);","    },","","    _syncSize: function (e) {","        this.get('cropMask').setStyle(e.attrName, e.newVal);","        this.get('contentBox').setStyle(e.attrName, e.newVal);","    },","    ","    _icEventProxy: function (target, ns, eventType) {","        var sourceEvent = ns + ':' + eventType,","            resizeKnob = this.get('resizeKnob');","            ","        target.on(sourceEvent, function (e) {","            ","            var o = {","                width: resizeKnob.get('offsetWidth'),","                height: resizeKnob.get('offsetHeight'),","                left: resizeKnob.get('offsetLeft'),","                top: resizeKnob.get('offsetTop')","            };","            o[ns + 'Event'] = e;","            ","            /**","           @event resize:start","           @description Relay of the Resize utility event.","           @param {EventFacade} event An Event Facade object with the following specific property added:","           <dl>","           <dt>resizeEvent</dt><dd>The Event Facade object provided by the Resize utility.</dd>","           </dl>","           @type {CustomEvent}","           */","            /**","           @event resize:resize","           @description Relay of the Resize utility event.","           @param {EventFacade} event An Event Facade object with the following specific property added:","           <dl>","           <dt>resizeEvent</dt><dd>The Event Facade object provided by the Resize utility.</dd>","           </dl>","           @type {CustomEvent}","           */","            /**","           @event resize:end","           @description Relay of the Resize utility event.","           @param {EventFacade} event An Event Facade object with the following specific property added:","           <dl>","           <dt>resizeEvent</dt><dd>The Event Facade object provided by the Resize utility.</dd>","           </dl>","           @type {CustomEvent}","           */","            /**","           @event drag:start","           @description Relay of the Drag utility event.","           @param {EventFacade} event An Event Facade object with the following specific property added:","           <dl>","           <dt>drag</dt><dd>The Event Facade object provided by the Drag utility.</dd>","           </dl>","           @type {CustomEvent}","           */","            /**","           @event drag:resize","           @description Relay of the Drag utility event.","           @param {EventFacade} event An Event Facade object with the following specific property added:","           <dl>","           <dt>drag</dt><dd>The Event Facade object provided by the Drag utility.</dd>","           </dl>","           @type {CustomEvent}","           */","            /**","           @event drag:end","           @description Relay of the Drag utility event.","           @param {EventFacade} event An Event Facade object with the following specific property added:","           <dl>","           <dt>drag</dt><dd>The Event Facade object provided by the Drag utility.</dd>","           </dl>","           @type {CustomEvent}","           */","            this.fire(sourceEvent, o);","            ","            o.sourceEvent = sourceEvent;","            ","            /**","           @event crop:start","           @description Fires at the start of a crop operation. Unifies drag:start and and resize:start.","           @param {EventFacade} event An Event Facade object with the following specific property added:","           <dl>","           <dt>left</dt><dd>The current X position of the crop area relative to the base image.</dd>","           <dt>top</dt><dd>The current Y position of the crop area relative to the base image.</dd>","           <dt>width</dt><dd>The new width of the crop area.</dd>","           <dt>height</dt><dd>The new height of the crop area.</dd>","           </dl>","           @type {CustomEvent}","           */","            /**","           @event crop:crop","           @description Fires every time the crop area changes. Unifies drag:drag and resize:resize.","           @param {EventFacade} event An Event Facade object with the following specific property added:","           <dl>","           <dt>left</dt><dd>The current X position of the crop area relative to the base image.</dd>","           <dt>top</dt><dd>The current Y position of the crop area relative to the base image.</dd>","           <dt>width</dt><dd>The new width of the crop area.</dd>","           <dt>height</dt><dd>The new height of the crop area.</dd>","           </dl>","           @type {CustomEvent}","           */","            /**","           @event crop:end","           @description Fires at the end of a crop operation. Unifies drag:end and resize:end.","           @param {EventFacade} event An Event Facade object with the following specific property added:","           <dl>","           <dt>left</dt><dd>The current X position of the crop area relative to the base image.</dd>","           <dt>top</dt><dd>The current Y position of the crop area relative to the base image.</dd>","           <dt>width</dt><dd>The new width of the crop area.</dd>","           <dt>height</dt><dd>The new height of the crop area.</dd>","           </dl>","           @type {CustomEvent}","           */","            this.fire('crop:' + (eventType == ns ? 'crop' : eventType), o);","            ","        }, this);","    },","    ","    _bindResize: function (resizeKnob, contentBox) {","        var resize = this.resize = new Y.Resize({","            node: resizeKnob","        });","        resize.on('resize:resize', this._syncResizeMask, this);","        resize.plug(Y.Plugin.ResizeConstrained, {","            constrain: contentBox,","            minHeight: this.get('minHeight'),","            minWidth: this.get('minWidth'),","            preserveRatio: this.get('preserveRatio')","        });","        YArray.each(Y.ImageCropper.RESIZE_EVENTS, Y.bind(this._icEventProxy, this, resize, 'resize'));","    },","    ","    _bindDrag: function (resizeKnob, contentBox) {","        var drag = this.drag = new Y.DD.Drag({","            node: resizeKnob,","            handles: [this.get('resizeMask')]","        });","        drag.after('drag:drag', this._syncResizeMask, this);","        drag.plug(Y.Plugin.DDConstrained, {","            constrain2node: contentBox","        });","        YArray.each(Y.ImageCropper.DRAG_EVENTS, Y.bind(this._icEventProxy, this, drag, 'drag'));","    },","    ","    initializer: function () {","        this.set('initialXY', this.get('initialXY') || [10, 10]);","        this.set('initWidth', this.get('initWidth'));","        this.set('initHeight', this.get('initHeight'));","","        this.after('sourceChange', this._handleSrcChange);","        this.after('visibleControlsChange', this._syncControlsVisibility);","        this.after(['widthChange', 'heightChange'], this._syncSize);","        ","        YArray.each(Y.ImageCropper.RESIZE_ATTRS, function (attr) {","            this.after(attr + 'Change', this._syncResizeAttr);","        }, this);","    },","    ","    renderUI: function () {","        var boundingBox = this.get('boundingBox');","        ","        this._renderCropMask(boundingBox);","        this._renderResizeKnob(boundingBox);","        this._renderResizeMask();","    },","    ","    bindUI: function () {","        var contentBox = this.get('contentBox'),","            resizeKnob = this.get('resizeKnob');","            ","        this._bindResize(resizeKnob, contentBox);","        this._bindDrag(resizeKnob, contentBox);","    },","    ","    syncUI: function () {","        this.get('contentBox').set('src', this.get('source'));","        ","        this._syncResizeKnob();","        this._syncResizeMask();","        this._syncControlsVisibility({newVal: this.get('visibleControls')});","    },","    ","    /**","    Returns the coordinates needed to crop the image","    ","    @method getCropCoords","    @return {Object} The top, left, height, width and image url of the image being cropped","    */","    getCropCoords: function () {","        var resizeKnob = this.get('resizeKnob'),","            result, xy;","        ","        if (resizeKnob.inDoc()) {","            result = {","                left: resizeKnob.get('offsetLeft'),","                top: resizeKnob.get('offsetTop'),","                width: resizeKnob.get('offsetWidth'),","                height: resizeKnob.get('offsetHeight')","            };","        } else {","            xy = this.get('initialXY');","            result = {","                left: xy[0],","                top: xy[1],","                width: this.get('initWidth'),","                height: this.get('initHeight')","            };","        }","        result.image = this.get('source');","        ","        return result;","    },","    ","    /**","    Resets the crop element back to it's original position","    ","    @method reset","    @chainable","    */","    reset: function () {","        var initialXY = this.get('initialXY');","        this.get('resizeKnob').setStyles({","            left: initialXY[0],","            top: initialXY[1],","            width: this.get('initWidth'),","            height: this.get('initHeight')","        });","        this._syncResizeMask();","        return this;","    },","    ","    destructor: function () {","        if (this.resize) {","            this.resize.destroy();","        }","        if (this.drag) {","            this.drag.destroy();","        }","        ","        this.drag = null;","        this.resize = null;","    }","    ","}, {","","    /**","    The identity of the widget.","","    @property ImageCropper.NAME","    @type String","    @default 'imagecropper'","    @readOnly","    @protected","    @static","    */","    NAME: IMAGE_CROPPER,","    ","    /**","    Array of events to relay from the Resize utility to the ImageCropper ","    ","    @property ImageCropper.RESIZE_EVENTS","    @type {Array}","    @private","    @static","    */","    RESIZE_EVENTS: ['start', 'resize', 'end'],","    /**","    Array of attributes to relay from the ImageCropper to the Resize utility ","","    @property ImageCropper.RESIZE_ATTRS","    @type {Array}","    @private","    @static","    */","    RESIZE_ATTRS: ['minWidth', 'minHeight', 'preserveRatio'],","    /**","    Array of events to relay from the Drag utility to the ImageCropper ","","    @property ImageCropper.DRAG_EVENTS","    @type {Array}","    @private","    @static","    */","    DRAG_EVENTS: ['start', 'drag', 'end'],","    ","    HTML_PARSER: {","        ","        source: function (srcNode) {","            return srcNode.get('src');","        },","        ","        cropMask: '.' + _classNames.cropMask,","        resizeKnob: '.' + _classNames.resizeKnob,","        resizeMask: '.' + _classNames.resizeMask","        ","    },","    ","    /**","    Static property used to define the default attribute configuration of","    the Widget.","","    @property ImageCropper.ATTRS","    @type {Object}","    @protected","    @static","    */","    ATTRS: {","        ","        /**","        The source attribute of the image we are cropping","","        @attribute source","        @type {String}","        */","        source: { value: '' },","        ","        /**","        The resize mask used to highlight the crop area","","        @attribute resizeMask","        @type {Node}","        */","        resizeMask: {","            setter: Y.one,","            valueFn: '_defResizeMaskValueFn'","        },","        ","        /**","        The resized element","","        @attribute resizeKnob","        @type {Node|Selector}","        */","        resizeKnob: {","            setter: Y.one,","            valueFn: '_defResizeKnobValueFn'","        },","        ","        /**","        Element used to shadow the part of the image we're not cropping","","        @attribute cropMask","        @type {Node|Selector}","        */","        cropMask: {","            setter: Y.one,","            valueFn: '_defCropMaskValueFn'","        },","        ","        /**","        Array of the XY position that we need to set the crop element to when we build it","","        @attribute initialXY","        @type {Array}","        @default [10, 10]","        */","        initialXY: {","            validator: Lang.isArray","        },","        ","        /**","        Show the Resize and Drag utilities status","","        @attribute status","        @type {Boolean}","        @readOnly","        */","        status: {","            readOnly: true,","            getter: '_defStatusGetter'","        },","        ","        /**","        MinHeight of the crop area","","        @attribute minHeight","        @type {Number}","        @default 50","        */","        minHeight: {","            value: 50,","            validator: isNumber","        },","        ","        /**","        MinWidth of the crop area","","        @attribute minWidth","        @type {Number}","        @default 50","        */","        minWidth: {","            value: 50,","            validator: isNumber","        },","        ","        /**","        Set the preserveRatio config option of the Resize Utlility","","        @attribute preserveRatio","        @type {Boolean}","        @default false","        */","        preserveRatio: {","            value: false,","            validator: Lang.isBoolean","        },","        ","        /**","        Set the initlal height of the crop area, defaults to minHeight","        ","        @attribute initHeight","        @type {Number}","        */","        initHeight: {","            value: 0,","            validator: isNumber,","            setter: '_defInitHeightSetter'","        },","        ","        /**","        Set the initlal width of the crop area, defaults to minWidth","        ","        @attribute initWidth","        @type {Number}","        */","        initWidth: {","            value: 0,","            validator: isNumber,","            setter: '_defInitWidthSetter'","        },","","        visibleControls: {","            value: true,","            validator: Lang.isBoolean","        }","        ","    }","    ","});","","Y.ImageCropper = ImageCropper;","","","","}, '@VERSION@' ,{requires:['widget','dd-drag','dd-constrain','resize-base','resize-constrain'], skinnable:true});"];
_yuitest_coverage["C:\Workspace\yui3-gallery\src\gallery-imagecropper\build_tmp\gallery-imagecropper.js"].lines = {"1":0,"9":0,"29":0,"30":0,"32":0,"77":0,"85":0,"93":0,"101":0,"102":0,"110":0,"111":0,"119":0,"121":0,"130":0,"131":0,"132":0,"142":0,"143":0,"144":0,"146":0,"154":0,"155":0,"156":0,"169":0,"170":0,"178":0,"180":0,"193":0,"194":0,"205":0,"206":0,"207":0,"212":0,"215":0,"216":0,"220":0,"221":0,"225":0,"228":0,"230":0,"236":0,"292":0,"294":0,"332":0,"338":0,"341":0,"342":0,"348":0,"352":0,"356":0,"357":0,"360":0,"364":0,"365":0,"366":0,"368":0,"369":0,"370":0,"372":0,"373":0,"378":0,"380":0,"381":0,"382":0,"386":0,"389":0,"390":0,"394":0,"396":0,"397":0,"398":0,"408":0,"411":0,"412":0,"419":0,"420":0,"427":0,"429":0,"439":0,"440":0,"446":0,"447":0,"451":0,"452":0,"454":0,"455":0,"458":0,"459":0,"507":0,"660":0};
_yuitest_coverage["C:\Workspace\yui3-gallery\src\gallery-imagecropper\build_tmp\gallery-imagecropper.js"].functions = {"ImageCropper:29":0,"_defCropMaskValueFn:76":0,"_defResizeKnobValueFn:84":0,"_defResizeMaskValueFn:92":0,"_defInitWidthSetter:100":0,"_defInitHeightSetter:109":0,"_defStatusGetter:118":0,"_renderCropMask:129":0,"_renderResizeKnob:141":0,"_renderResizeMask:153":0,"_handleSrcChange:168":0,"_syncResizeKnob:177":0,"_syncResizeMask:192":0,"_syncResizeAttr:204":0,"_syncControlsVisibility:211":0,"_syncSize:219":0,"(anonymous 2):228":0,"_icEventProxy:224":0,"_bindResize:337":0,"_bindDrag:351":0,"(anonymous 3):372":0,"initializer:363":0,"renderUI:377":0,"bindUI:385":0,"syncUI:393":0,"getCropCoords:407":0,"reset:438":0,"destructor:450":0,"source:506":0,"(anonymous 1):1":0};
_yuitest_coverage["C:\Workspace\yui3-gallery\src\gallery-imagecropper\build_tmp\gallery-imagecropper.js"].coveredLines = 91;
_yuitest_coverage["C:\Workspace\yui3-gallery\src\gallery-imagecropper\build_tmp\gallery-imagecropper.js"].coveredFunctions = 30;
_yuitest_coverline("C:\Workspace\yui3-gallery\src\gallery-imagecropper\build_tmp\gallery-imagecropper.js", 1);
YUI.add('gallery-imagecropper', function(Y) {

/**
@description <p>Creates an Image Cropper control.</p>
@requires widget,dd-drag,dd-constrain,resize-base,resize-constrain
@module imagecropper
*/

_yuitest_coverfunc("C:\Workspace\yui3-gallery\src\gallery-imagecropper\build_tmp\gallery-imagecropper.js", "(anonymous 1)", 1);
_yuitest_coverline("C:\Workspace\yui3-gallery\src\gallery-imagecropper\build_tmp\gallery-imagecropper.js", 9);
var Lang = Y.Lang,
    isNumber = Lang.isNumber,
    YArray = Y.Array,
    getClassName = Y.ClassNameManager.getClassName,
    IMAGE_CROPPER = 'imagecropper',
    RESIZE = 'resize',
    
    _classNames = {
        cropMask: getClassName(IMAGE_CROPPER, 'mask'),
        resizeKnob: getClassName(IMAGE_CROPPER, RESIZE, 'knob'),
        resizeMask: getClassName(IMAGE_CROPPER, RESIZE, 'mask')
    };

/**
@constructor
@class ImageCropper
@description <p>Creates an Image Cropper control.</p>
@extends Widget
@param {Object} config Object literal containing configuration parameters.
*/
_yuitest_coverline("C:\Workspace\yui3-gallery\src\gallery-imagecropper\build_tmp\gallery-imagecropper.js", 29);
function ImageCropper() {
    _yuitest_coverfunc("C:\Workspace\yui3-gallery\src\gallery-imagecropper\build_tmp\gallery-imagecropper.js", "ImageCropper", 29);
_yuitest_coverline("C:\Workspace\yui3-gallery\src\gallery-imagecropper\build_tmp\gallery-imagecropper.js", 30);
ImageCropper.superclass.constructor.apply(this, arguments);
}
_yuitest_coverline("C:\Workspace\yui3-gallery\src\gallery-imagecropper\build_tmp\gallery-imagecropper.js", 32);
Y.extend(ImageCropper, Y.Widget, {
    
    /**
    Template that will contain the ImageCropper's mask.
    
    @property ImageCropper.CROP_MASK_TEMPLATE
    @type {HTML}
    @default &lt;div class="[...-mask]">&lt;/div>
    */
    CROP_MASK_TEMPLATE: '<div class="' + _classNames.cropMask + '"></div>',
    /**
    Template that will contain the ImageCropper's resize node.
    
    @property ImageCropper.RESIZE_KNOB_TEMPLATE
    @type {HTML}
    @default &lt;div class="[...-resize-knob]" tabindex="0">&lt;/div>
    */
    RESIZE_KNOB_TEMPLATE: '<div class="' + _classNames.resizeKnob + '" tabindex="0"></div>',
    /**
    Template that will contain the ImageCropper's resize mask.
    
    @property ImageCropper.RESIZE_MASK_TEMPLATE
    @type {HTML}
    @default &lt;div class="[...-resize-mask]">&lt;/div>
    */
    RESIZE_MASK_TEMPLATE: '<div class="' + _classNames.resizeMask + '"></div>',
    
    CONTENT_TEMPLATE: '<img/>',
    
    /**
    An object containing the classnames used for all nodes in ImageCropper.
    Note that changing this object doesn't change the classnames in the
    default templates or in HTML_PARSER.

    @property CLASS_NAMES
    @type {Object}
    */
    CLASS_NAMES: _classNames,
    

    /**
    @method _defCropMaskValueFn
    @protected
    */
    _defCropMaskValueFn: function () {
        _yuitest_coverfunc("C:\Workspace\yui3-gallery\src\gallery-imagecropper\build_tmp\gallery-imagecropper.js", "_defCropMaskValueFn", 76);
_yuitest_coverline("C:\Workspace\yui3-gallery\src\gallery-imagecropper\build_tmp\gallery-imagecropper.js", 77);
return Y.Node.create(this.CROP_MASK_TEMPLATE);
    },

    /**
    @method _defResizeKnobValueFn
    @protected
    */
    _defResizeKnobValueFn: function () {
        _yuitest_coverfunc("C:\Workspace\yui3-gallery\src\gallery-imagecropper\build_tmp\gallery-imagecropper.js", "_defResizeKnobValueFn", 84);
_yuitest_coverline("C:\Workspace\yui3-gallery\src\gallery-imagecropper\build_tmp\gallery-imagecropper.js", 85);
return Y.Node.create(this.RESIZE_KNOB_TEMPLATE);
    },

    /**
    @method _defResizeMaskValueFn
    @protected
    */
    _defResizeMaskValueFn: function () {
        _yuitest_coverfunc("C:\Workspace\yui3-gallery\src\gallery-imagecropper\build_tmp\gallery-imagecropper.js", "_defResizeMaskValueFn", 92);
_yuitest_coverline("C:\Workspace\yui3-gallery\src\gallery-imagecropper\build_tmp\gallery-imagecropper.js", 93);
return Y.Node.create(this.RESIZE_MASK_TEMPLATE);
    },

    /**
    @method _defResizeMaskValueFn
    @protected
    */
    _defInitWidthSetter: function (value) {
        _yuitest_coverfunc("C:\Workspace\yui3-gallery\src\gallery-imagecropper\build_tmp\gallery-imagecropper.js", "_defInitWidthSetter", 100);
_yuitest_coverline("C:\Workspace\yui3-gallery\src\gallery-imagecropper\build_tmp\gallery-imagecropper.js", 101);
var minHeight = this.get('minHeight');
        _yuitest_coverline("C:\Workspace\yui3-gallery\src\gallery-imagecropper\build_tmp\gallery-imagecropper.js", 102);
return value < minHeight ? minHeight : value;
    },

    /**
    @method _defInitHeightSetter
    @protected
    */
    _defInitHeightSetter: function (value) {
        _yuitest_coverfunc("C:\Workspace\yui3-gallery\src\gallery-imagecropper\build_tmp\gallery-imagecropper.js", "_defInitHeightSetter", 109);
_yuitest_coverline("C:\Workspace\yui3-gallery\src\gallery-imagecropper\build_tmp\gallery-imagecropper.js", 110);
var minWidth = this.get('minWidth');
        _yuitest_coverline("C:\Workspace\yui3-gallery\src\gallery-imagecropper\build_tmp\gallery-imagecropper.js", 111);
return value < minWidth ? minWidth : value;
    },

    /**
    @method _defStatusGetter
    @protected
    */
    _defStatusGetter: function () {
        _yuitest_coverfunc("C:\Workspace\yui3-gallery\src\gallery-imagecropper\build_tmp\gallery-imagecropper.js", "_defStatusGetter", 118);
_yuitest_coverline("C:\Workspace\yui3-gallery\src\gallery-imagecropper\build_tmp\gallery-imagecropper.js", 119);
var resizing = this.resize ? this.resize.get('resizing') : false,
            dragging = this.drag ? this.drag.get('dragging') : false;
        _yuitest_coverline("C:\Workspace\yui3-gallery\src\gallery-imagecropper\build_tmp\gallery-imagecropper.js", 121);
return resizing || dragging;
    },
    
    /**
    @method _renderCropMask
    @param {Node} boundingBox
    @protected
    */
    _renderCropMask: function (boundingBox) {
        _yuitest_coverfunc("C:\Workspace\yui3-gallery\src\gallery-imagecropper\build_tmp\gallery-imagecropper.js", "_renderCropMask", 129);
_yuitest_coverline("C:\Workspace\yui3-gallery\src\gallery-imagecropper\build_tmp\gallery-imagecropper.js", 130);
var node = this.get('cropMask').addClass(this.CLASS_NAMES.cropMask);
        _yuitest_coverline("C:\Workspace\yui3-gallery\src\gallery-imagecropper\build_tmp\gallery-imagecropper.js", 131);
if (!node.inDoc()) {
            _yuitest_coverline("C:\Workspace\yui3-gallery\src\gallery-imagecropper\build_tmp\gallery-imagecropper.js", 132);
boundingBox.append(node);
        }
    },

    /**
    @method _renderResizeKnob
    @param {Node} boundingBox
    @protected
    */
    _renderResizeKnob: function (boundingBox) {
        _yuitest_coverfunc("C:\Workspace\yui3-gallery\src\gallery-imagecropper\build_tmp\gallery-imagecropper.js", "_renderResizeKnob", 141);
_yuitest_coverline("C:\Workspace\yui3-gallery\src\gallery-imagecropper\build_tmp\gallery-imagecropper.js", 142);
var node = this.get('resizeKnob').addClass(this.CLASS_NAMES.resizeKnob);
        _yuitest_coverline("C:\Workspace\yui3-gallery\src\gallery-imagecropper\build_tmp\gallery-imagecropper.js", 143);
if (!node.inDoc()) {
            _yuitest_coverline("C:\Workspace\yui3-gallery\src\gallery-imagecropper\build_tmp\gallery-imagecropper.js", 144);
boundingBox.append(node);
        }
        _yuitest_coverline("C:\Workspace\yui3-gallery\src\gallery-imagecropper\build_tmp\gallery-imagecropper.js", 146);
node.setStyle('backgroundImage', 'url(' + this.get('source') + ')');
    },

    /**
    @method _renderResizeKnob
    @protected
    */
    _renderResizeMask: function () {
        _yuitest_coverfunc("C:\Workspace\yui3-gallery\src\gallery-imagecropper\build_tmp\gallery-imagecropper.js", "_renderResizeMask", 153);
_yuitest_coverline("C:\Workspace\yui3-gallery\src\gallery-imagecropper\build_tmp\gallery-imagecropper.js", 154);
var node = this.get('resizeMask').addClass(this.CLASS_NAMES.resizeMask);
        _yuitest_coverline("C:\Workspace\yui3-gallery\src\gallery-imagecropper\build_tmp\gallery-imagecropper.js", 155);
if (!node.inDoc()) {
            _yuitest_coverline("C:\Workspace\yui3-gallery\src\gallery-imagecropper\build_tmp\gallery-imagecropper.js", 156);
this.get('resizeKnob').append(node);
        }
    },

    /**
    Handles the `sourceChange` event.
    Sets the corresponding source to the image being cropped.

    @method _handleSrcChange
    @param {EventFacade} e
    @private
    */
    _handleSrcChange: function (e) {
        _yuitest_coverfunc("C:\Workspace\yui3-gallery\src\gallery-imagecropper\build_tmp\gallery-imagecropper.js", "_handleSrcChange", 168);
_yuitest_coverline("C:\Workspace\yui3-gallery\src\gallery-imagecropper\build_tmp\gallery-imagecropper.js", 169);
this.get('contentBox').set('src', e.newVal);
        _yuitest_coverline("C:\Workspace\yui3-gallery\src\gallery-imagecropper\build_tmp\gallery-imagecropper.js", 170);
this.get('resizeKnob').setStyle('backgroundImage', 'url(' + e.newVal + ')');
    },
    
    /**
    @method _syncResizeKnob
    @private
    */
    _syncResizeKnob: function () {
        _yuitest_coverfunc("C:\Workspace\yui3-gallery\src\gallery-imagecropper\build_tmp\gallery-imagecropper.js", "_syncResizeKnob", 177);
_yuitest_coverline("C:\Workspace\yui3-gallery\src\gallery-imagecropper\build_tmp\gallery-imagecropper.js", 178);
var initialXY = this.get('initialXY');
        
        _yuitest_coverline("C:\Workspace\yui3-gallery\src\gallery-imagecropper\build_tmp\gallery-imagecropper.js", 180);
this.get('resizeKnob').setStyles({
            left: initialXY[0],
            top: initialXY[1],
            width: this.get('initWidth'),
            height: this.get('initHeight')
        });
    },
    
    /**
    @method _syncResizeMask
    @private
    */
    _syncResizeMask: function () {
        _yuitest_coverfunc("C:\Workspace\yui3-gallery\src\gallery-imagecropper\build_tmp\gallery-imagecropper.js", "_syncResizeMask", 192);
_yuitest_coverline("C:\Workspace\yui3-gallery\src\gallery-imagecropper\build_tmp\gallery-imagecropper.js", 193);
var resizeKnob = this.get('resizeKnob');
        _yuitest_coverline("C:\Workspace\yui3-gallery\src\gallery-imagecropper\build_tmp\gallery-imagecropper.js", 194);
resizeKnob.setStyle('backgroundPosition',
            (-resizeKnob.get('offsetLeft')) + 'px ' + 
            (-resizeKnob.get('offsetTop')) + 'px'
        );
    },
    
    /**
    @method _syncResizeAttr
    @private
    */
    _syncResizeAttr: function (e) {
        _yuitest_coverfunc("C:\Workspace\yui3-gallery\src\gallery-imagecropper\build_tmp\gallery-imagecropper.js", "_syncResizeAttr", 204);
_yuitest_coverline("C:\Workspace\yui3-gallery\src\gallery-imagecropper\build_tmp\gallery-imagecropper.js", 205);
var resizeKnob = this.get('resizeKnob');
        _yuitest_coverline("C:\Workspace\yui3-gallery\src\gallery-imagecropper\build_tmp\gallery-imagecropper.js", 206);
if (resizeKnob.resize) {
            _yuitest_coverline("C:\Workspace\yui3-gallery\src\gallery-imagecropper\build_tmp\gallery-imagecropper.js", 207);
resizeKnob.resize.con.set(e.attrName, e.newVal);
        }
    },

    _syncControlsVisibility: function (e) {
        _yuitest_coverfunc("C:\Workspace\yui3-gallery\src\gallery-imagecropper\build_tmp\gallery-imagecropper.js", "_syncControlsVisibility", 211);
_yuitest_coverline("C:\Workspace\yui3-gallery\src\gallery-imagecropper\build_tmp\gallery-imagecropper.js", 212);
var hidden = !e.newVal,
            hiddenClass = this.getClassName('controls', 'hidden');

        _yuitest_coverline("C:\Workspace\yui3-gallery\src\gallery-imagecropper\build_tmp\gallery-imagecropper.js", 215);
this.get('resizeKnob').toggleClass(hiddenClass, hidden);
        _yuitest_coverline("C:\Workspace\yui3-gallery\src\gallery-imagecropper\build_tmp\gallery-imagecropper.js", 216);
this.get('cropMask').toggleClass(hiddenClass, hidden);
    },

    _syncSize: function (e) {
        _yuitest_coverfunc("C:\Workspace\yui3-gallery\src\gallery-imagecropper\build_tmp\gallery-imagecropper.js", "_syncSize", 219);
_yuitest_coverline("C:\Workspace\yui3-gallery\src\gallery-imagecropper\build_tmp\gallery-imagecropper.js", 220);
this.get('cropMask').setStyle(e.attrName, e.newVal);
        _yuitest_coverline("C:\Workspace\yui3-gallery\src\gallery-imagecropper\build_tmp\gallery-imagecropper.js", 221);
this.get('contentBox').setStyle(e.attrName, e.newVal);
    },
    
    _icEventProxy: function (target, ns, eventType) {
        _yuitest_coverfunc("C:\Workspace\yui3-gallery\src\gallery-imagecropper\build_tmp\gallery-imagecropper.js", "_icEventProxy", 224);
_yuitest_coverline("C:\Workspace\yui3-gallery\src\gallery-imagecropper\build_tmp\gallery-imagecropper.js", 225);
var sourceEvent = ns + ':' + eventType,
            resizeKnob = this.get('resizeKnob');
            
        _yuitest_coverline("C:\Workspace\yui3-gallery\src\gallery-imagecropper\build_tmp\gallery-imagecropper.js", 228);
target.on(sourceEvent, function (e) {
            
            _yuitest_coverfunc("C:\Workspace\yui3-gallery\src\gallery-imagecropper\build_tmp\gallery-imagecropper.js", "(anonymous 2)", 228);
_yuitest_coverline("C:\Workspace\yui3-gallery\src\gallery-imagecropper\build_tmp\gallery-imagecropper.js", 230);
var o = {
                width: resizeKnob.get('offsetWidth'),
                height: resizeKnob.get('offsetHeight'),
                left: resizeKnob.get('offsetLeft'),
                top: resizeKnob.get('offsetTop')
            };
            _yuitest_coverline("C:\Workspace\yui3-gallery\src\gallery-imagecropper\build_tmp\gallery-imagecropper.js", 236);
o[ns + 'Event'] = e;
            
            /**
           @event resize:start
           @description Relay of the Resize utility event.
           @param {EventFacade} event An Event Facade object with the following specific property added:
           <dl>
           <dt>resizeEvent</dt><dd>The Event Facade object provided by the Resize utility.</dd>
           </dl>
           @type {CustomEvent}
           */
            /**
           @event resize:resize
           @description Relay of the Resize utility event.
           @param {EventFacade} event An Event Facade object with the following specific property added:
           <dl>
           <dt>resizeEvent</dt><dd>The Event Facade object provided by the Resize utility.</dd>
           </dl>
           @type {CustomEvent}
           */
            /**
           @event resize:end
           @description Relay of the Resize utility event.
           @param {EventFacade} event An Event Facade object with the following specific property added:
           <dl>
           <dt>resizeEvent</dt><dd>The Event Facade object provided by the Resize utility.</dd>
           </dl>
           @type {CustomEvent}
           */
            /**
           @event drag:start
           @description Relay of the Drag utility event.
           @param {EventFacade} event An Event Facade object with the following specific property added:
           <dl>
           <dt>drag</dt><dd>The Event Facade object provided by the Drag utility.</dd>
           </dl>
           @type {CustomEvent}
           */
            /**
           @event drag:resize
           @description Relay of the Drag utility event.
           @param {EventFacade} event An Event Facade object with the following specific property added:
           <dl>
           <dt>drag</dt><dd>The Event Facade object provided by the Drag utility.</dd>
           </dl>
           @type {CustomEvent}
           */
            /**
           @event drag:end
           @description Relay of the Drag utility event.
           @param {EventFacade} event An Event Facade object with the following specific property added:
           <dl>
           <dt>drag</dt><dd>The Event Facade object provided by the Drag utility.</dd>
           </dl>
           @type {CustomEvent}
           */
            _yuitest_coverline("C:\Workspace\yui3-gallery\src\gallery-imagecropper\build_tmp\gallery-imagecropper.js", 292);
this.fire(sourceEvent, o);
            
            _yuitest_coverline("C:\Workspace\yui3-gallery\src\gallery-imagecropper\build_tmp\gallery-imagecropper.js", 294);
o.sourceEvent = sourceEvent;
            
            /**
           @event crop:start
           @description Fires at the start of a crop operation. Unifies drag:start and and resize:start.
           @param {EventFacade} event An Event Facade object with the following specific property added:
           <dl>
           <dt>left</dt><dd>The current X position of the crop area relative to the base image.</dd>
           <dt>top</dt><dd>The current Y position of the crop area relative to the base image.</dd>
           <dt>width</dt><dd>The new width of the crop area.</dd>
           <dt>height</dt><dd>The new height of the crop area.</dd>
           </dl>
           @type {CustomEvent}
           */
            /**
           @event crop:crop
           @description Fires every time the crop area changes. Unifies drag:drag and resize:resize.
           @param {EventFacade} event An Event Facade object with the following specific property added:
           <dl>
           <dt>left</dt><dd>The current X position of the crop area relative to the base image.</dd>
           <dt>top</dt><dd>The current Y position of the crop area relative to the base image.</dd>
           <dt>width</dt><dd>The new width of the crop area.</dd>
           <dt>height</dt><dd>The new height of the crop area.</dd>
           </dl>
           @type {CustomEvent}
           */
            /**
           @event crop:end
           @description Fires at the end of a crop operation. Unifies drag:end and resize:end.
           @param {EventFacade} event An Event Facade object with the following specific property added:
           <dl>
           <dt>left</dt><dd>The current X position of the crop area relative to the base image.</dd>
           <dt>top</dt><dd>The current Y position of the crop area relative to the base image.</dd>
           <dt>width</dt><dd>The new width of the crop area.</dd>
           <dt>height</dt><dd>The new height of the crop area.</dd>
           </dl>
           @type {CustomEvent}
           */
            _yuitest_coverline("C:\Workspace\yui3-gallery\src\gallery-imagecropper\build_tmp\gallery-imagecropper.js", 332);
this.fire('crop:' + (eventType == ns ? 'crop' : eventType), o);
            
        }, this);
    },
    
    _bindResize: function (resizeKnob, contentBox) {
        _yuitest_coverfunc("C:\Workspace\yui3-gallery\src\gallery-imagecropper\build_tmp\gallery-imagecropper.js", "_bindResize", 337);
_yuitest_coverline("C:\Workspace\yui3-gallery\src\gallery-imagecropper\build_tmp\gallery-imagecropper.js", 338);
var resize = this.resize = new Y.Resize({
            node: resizeKnob
        });
        _yuitest_coverline("C:\Workspace\yui3-gallery\src\gallery-imagecropper\build_tmp\gallery-imagecropper.js", 341);
resize.on('resize:resize', this._syncResizeMask, this);
        _yuitest_coverline("C:\Workspace\yui3-gallery\src\gallery-imagecropper\build_tmp\gallery-imagecropper.js", 342);
resize.plug(Y.Plugin.ResizeConstrained, {
            constrain: contentBox,
            minHeight: this.get('minHeight'),
            minWidth: this.get('minWidth'),
            preserveRatio: this.get('preserveRatio')
        });
        _yuitest_coverline("C:\Workspace\yui3-gallery\src\gallery-imagecropper\build_tmp\gallery-imagecropper.js", 348);
YArray.each(Y.ImageCropper.RESIZE_EVENTS, Y.bind(this._icEventProxy, this, resize, 'resize'));
    },
    
    _bindDrag: function (resizeKnob, contentBox) {
        _yuitest_coverfunc("C:\Workspace\yui3-gallery\src\gallery-imagecropper\build_tmp\gallery-imagecropper.js", "_bindDrag", 351);
_yuitest_coverline("C:\Workspace\yui3-gallery\src\gallery-imagecropper\build_tmp\gallery-imagecropper.js", 352);
var drag = this.drag = new Y.DD.Drag({
            node: resizeKnob,
            handles: [this.get('resizeMask')]
        });
        _yuitest_coverline("C:\Workspace\yui3-gallery\src\gallery-imagecropper\build_tmp\gallery-imagecropper.js", 356);
drag.after('drag:drag', this._syncResizeMask, this);
        _yuitest_coverline("C:\Workspace\yui3-gallery\src\gallery-imagecropper\build_tmp\gallery-imagecropper.js", 357);
drag.plug(Y.Plugin.DDConstrained, {
            constrain2node: contentBox
        });
        _yuitest_coverline("C:\Workspace\yui3-gallery\src\gallery-imagecropper\build_tmp\gallery-imagecropper.js", 360);
YArray.each(Y.ImageCropper.DRAG_EVENTS, Y.bind(this._icEventProxy, this, drag, 'drag'));
    },
    
    initializer: function () {
        _yuitest_coverfunc("C:\Workspace\yui3-gallery\src\gallery-imagecropper\build_tmp\gallery-imagecropper.js", "initializer", 363);
_yuitest_coverline("C:\Workspace\yui3-gallery\src\gallery-imagecropper\build_tmp\gallery-imagecropper.js", 364);
this.set('initialXY', this.get('initialXY') || [10, 10]);
        _yuitest_coverline("C:\Workspace\yui3-gallery\src\gallery-imagecropper\build_tmp\gallery-imagecropper.js", 365);
this.set('initWidth', this.get('initWidth'));
        _yuitest_coverline("C:\Workspace\yui3-gallery\src\gallery-imagecropper\build_tmp\gallery-imagecropper.js", 366);
this.set('initHeight', this.get('initHeight'));

        _yuitest_coverline("C:\Workspace\yui3-gallery\src\gallery-imagecropper\build_tmp\gallery-imagecropper.js", 368);
this.after('sourceChange', this._handleSrcChange);
        _yuitest_coverline("C:\Workspace\yui3-gallery\src\gallery-imagecropper\build_tmp\gallery-imagecropper.js", 369);
this.after('visibleControlsChange', this._syncControlsVisibility);
        _yuitest_coverline("C:\Workspace\yui3-gallery\src\gallery-imagecropper\build_tmp\gallery-imagecropper.js", 370);
this.after(['widthChange', 'heightChange'], this._syncSize);
        
        _yuitest_coverline("C:\Workspace\yui3-gallery\src\gallery-imagecropper\build_tmp\gallery-imagecropper.js", 372);
YArray.each(Y.ImageCropper.RESIZE_ATTRS, function (attr) {
            _yuitest_coverfunc("C:\Workspace\yui3-gallery\src\gallery-imagecropper\build_tmp\gallery-imagecropper.js", "(anonymous 3)", 372);
_yuitest_coverline("C:\Workspace\yui3-gallery\src\gallery-imagecropper\build_tmp\gallery-imagecropper.js", 373);
this.after(attr + 'Change', this._syncResizeAttr);
        }, this);
    },
    
    renderUI: function () {
        _yuitest_coverfunc("C:\Workspace\yui3-gallery\src\gallery-imagecropper\build_tmp\gallery-imagecropper.js", "renderUI", 377);
_yuitest_coverline("C:\Workspace\yui3-gallery\src\gallery-imagecropper\build_tmp\gallery-imagecropper.js", 378);
var boundingBox = this.get('boundingBox');
        
        _yuitest_coverline("C:\Workspace\yui3-gallery\src\gallery-imagecropper\build_tmp\gallery-imagecropper.js", 380);
this._renderCropMask(boundingBox);
        _yuitest_coverline("C:\Workspace\yui3-gallery\src\gallery-imagecropper\build_tmp\gallery-imagecropper.js", 381);
this._renderResizeKnob(boundingBox);
        _yuitest_coverline("C:\Workspace\yui3-gallery\src\gallery-imagecropper\build_tmp\gallery-imagecropper.js", 382);
this._renderResizeMask();
    },
    
    bindUI: function () {
        _yuitest_coverfunc("C:\Workspace\yui3-gallery\src\gallery-imagecropper\build_tmp\gallery-imagecropper.js", "bindUI", 385);
_yuitest_coverline("C:\Workspace\yui3-gallery\src\gallery-imagecropper\build_tmp\gallery-imagecropper.js", 386);
var contentBox = this.get('contentBox'),
            resizeKnob = this.get('resizeKnob');
            
        _yuitest_coverline("C:\Workspace\yui3-gallery\src\gallery-imagecropper\build_tmp\gallery-imagecropper.js", 389);
this._bindResize(resizeKnob, contentBox);
        _yuitest_coverline("C:\Workspace\yui3-gallery\src\gallery-imagecropper\build_tmp\gallery-imagecropper.js", 390);
this._bindDrag(resizeKnob, contentBox);
    },
    
    syncUI: function () {
        _yuitest_coverfunc("C:\Workspace\yui3-gallery\src\gallery-imagecropper\build_tmp\gallery-imagecropper.js", "syncUI", 393);
_yuitest_coverline("C:\Workspace\yui3-gallery\src\gallery-imagecropper\build_tmp\gallery-imagecropper.js", 394);
this.get('contentBox').set('src', this.get('source'));
        
        _yuitest_coverline("C:\Workspace\yui3-gallery\src\gallery-imagecropper\build_tmp\gallery-imagecropper.js", 396);
this._syncResizeKnob();
        _yuitest_coverline("C:\Workspace\yui3-gallery\src\gallery-imagecropper\build_tmp\gallery-imagecropper.js", 397);
this._syncResizeMask();
        _yuitest_coverline("C:\Workspace\yui3-gallery\src\gallery-imagecropper\build_tmp\gallery-imagecropper.js", 398);
this._syncControlsVisibility({newVal: this.get('visibleControls')});
    },
    
    /**
    Returns the coordinates needed to crop the image
    
    @method getCropCoords
    @return {Object} The top, left, height, width and image url of the image being cropped
    */
    getCropCoords: function () {
        _yuitest_coverfunc("C:\Workspace\yui3-gallery\src\gallery-imagecropper\build_tmp\gallery-imagecropper.js", "getCropCoords", 407);
_yuitest_coverline("C:\Workspace\yui3-gallery\src\gallery-imagecropper\build_tmp\gallery-imagecropper.js", 408);
var resizeKnob = this.get('resizeKnob'),
            result, xy;
        
        _yuitest_coverline("C:\Workspace\yui3-gallery\src\gallery-imagecropper\build_tmp\gallery-imagecropper.js", 411);
if (resizeKnob.inDoc()) {
            _yuitest_coverline("C:\Workspace\yui3-gallery\src\gallery-imagecropper\build_tmp\gallery-imagecropper.js", 412);
result = {
                left: resizeKnob.get('offsetLeft'),
                top: resizeKnob.get('offsetTop'),
                width: resizeKnob.get('offsetWidth'),
                height: resizeKnob.get('offsetHeight')
            };
        } else {
            _yuitest_coverline("C:\Workspace\yui3-gallery\src\gallery-imagecropper\build_tmp\gallery-imagecropper.js", 419);
xy = this.get('initialXY');
            _yuitest_coverline("C:\Workspace\yui3-gallery\src\gallery-imagecropper\build_tmp\gallery-imagecropper.js", 420);
result = {
                left: xy[0],
                top: xy[1],
                width: this.get('initWidth'),
                height: this.get('initHeight')
            };
        }
        _yuitest_coverline("C:\Workspace\yui3-gallery\src\gallery-imagecropper\build_tmp\gallery-imagecropper.js", 427);
result.image = this.get('source');
        
        _yuitest_coverline("C:\Workspace\yui3-gallery\src\gallery-imagecropper\build_tmp\gallery-imagecropper.js", 429);
return result;
    },
    
    /**
    Resets the crop element back to it's original position
    
    @method reset
    @chainable
    */
    reset: function () {
        _yuitest_coverfunc("C:\Workspace\yui3-gallery\src\gallery-imagecropper\build_tmp\gallery-imagecropper.js", "reset", 438);
_yuitest_coverline("C:\Workspace\yui3-gallery\src\gallery-imagecropper\build_tmp\gallery-imagecropper.js", 439);
var initialXY = this.get('initialXY');
        _yuitest_coverline("C:\Workspace\yui3-gallery\src\gallery-imagecropper\build_tmp\gallery-imagecropper.js", 440);
this.get('resizeKnob').setStyles({
            left: initialXY[0],
            top: initialXY[1],
            width: this.get('initWidth'),
            height: this.get('initHeight')
        });
        _yuitest_coverline("C:\Workspace\yui3-gallery\src\gallery-imagecropper\build_tmp\gallery-imagecropper.js", 446);
this._syncResizeMask();
        _yuitest_coverline("C:\Workspace\yui3-gallery\src\gallery-imagecropper\build_tmp\gallery-imagecropper.js", 447);
return this;
    },
    
    destructor: function () {
        _yuitest_coverfunc("C:\Workspace\yui3-gallery\src\gallery-imagecropper\build_tmp\gallery-imagecropper.js", "destructor", 450);
_yuitest_coverline("C:\Workspace\yui3-gallery\src\gallery-imagecropper\build_tmp\gallery-imagecropper.js", 451);
if (this.resize) {
            _yuitest_coverline("C:\Workspace\yui3-gallery\src\gallery-imagecropper\build_tmp\gallery-imagecropper.js", 452);
this.resize.destroy();
        }
        _yuitest_coverline("C:\Workspace\yui3-gallery\src\gallery-imagecropper\build_tmp\gallery-imagecropper.js", 454);
if (this.drag) {
            _yuitest_coverline("C:\Workspace\yui3-gallery\src\gallery-imagecropper\build_tmp\gallery-imagecropper.js", 455);
this.drag.destroy();
        }
        
        _yuitest_coverline("C:\Workspace\yui3-gallery\src\gallery-imagecropper\build_tmp\gallery-imagecropper.js", 458);
this.drag = null;
        _yuitest_coverline("C:\Workspace\yui3-gallery\src\gallery-imagecropper\build_tmp\gallery-imagecropper.js", 459);
this.resize = null;
    }
    
}, {

    /**
    The identity of the widget.

    @property ImageCropper.NAME
    @type String
    @default 'imagecropper'
    @readOnly
    @protected
    @static
    */
    NAME: IMAGE_CROPPER,
    
    /**
    Array of events to relay from the Resize utility to the ImageCropper 
    
    @property ImageCropper.RESIZE_EVENTS
    @type {Array}
    @private
    @static
    */
    RESIZE_EVENTS: ['start', 'resize', 'end'],
    /**
    Array of attributes to relay from the ImageCropper to the Resize utility 

    @property ImageCropper.RESIZE_ATTRS
    @type {Array}
    @private
    @static
    */
    RESIZE_ATTRS: ['minWidth', 'minHeight', 'preserveRatio'],
    /**
    Array of events to relay from the Drag utility to the ImageCropper 

    @property ImageCropper.DRAG_EVENTS
    @type {Array}
    @private
    @static
    */
    DRAG_EVENTS: ['start', 'drag', 'end'],
    
    HTML_PARSER: {
        
        source: function (srcNode) {
            _yuitest_coverfunc("C:\Workspace\yui3-gallery\src\gallery-imagecropper\build_tmp\gallery-imagecropper.js", "source", 506);
_yuitest_coverline("C:\Workspace\yui3-gallery\src\gallery-imagecropper\build_tmp\gallery-imagecropper.js", 507);
return srcNode.get('src');
        },
        
        cropMask: '.' + _classNames.cropMask,
        resizeKnob: '.' + _classNames.resizeKnob,
        resizeMask: '.' + _classNames.resizeMask
        
    },
    
    /**
    Static property used to define the default attribute configuration of
    the Widget.

    @property ImageCropper.ATTRS
    @type {Object}
    @protected
    @static
    */
    ATTRS: {
        
        /**
        The source attribute of the image we are cropping

        @attribute source
        @type {String}
        */
        source: { value: '' },
        
        /**
        The resize mask used to highlight the crop area

        @attribute resizeMask
        @type {Node}
        */
        resizeMask: {
            setter: Y.one,
            valueFn: '_defResizeMaskValueFn'
        },
        
        /**
        The resized element

        @attribute resizeKnob
        @type {Node|Selector}
        */
        resizeKnob: {
            setter: Y.one,
            valueFn: '_defResizeKnobValueFn'
        },
        
        /**
        Element used to shadow the part of the image we're not cropping

        @attribute cropMask
        @type {Node|Selector}
        */
        cropMask: {
            setter: Y.one,
            valueFn: '_defCropMaskValueFn'
        },
        
        /**
        Array of the XY position that we need to set the crop element to when we build it

        @attribute initialXY
        @type {Array}
        @default [10, 10]
        */
        initialXY: {
            validator: Lang.isArray
        },
        
        /**
        Show the Resize and Drag utilities status

        @attribute status
        @type {Boolean}
        @readOnly
        */
        status: {
            readOnly: true,
            getter: '_defStatusGetter'
        },
        
        /**
        MinHeight of the crop area

        @attribute minHeight
        @type {Number}
        @default 50
        */
        minHeight: {
            value: 50,
            validator: isNumber
        },
        
        /**
        MinWidth of the crop area

        @attribute minWidth
        @type {Number}
        @default 50
        */
        minWidth: {
            value: 50,
            validator: isNumber
        },
        
        /**
        Set the preserveRatio config option of the Resize Utlility

        @attribute preserveRatio
        @type {Boolean}
        @default false
        */
        preserveRatio: {
            value: false,
            validator: Lang.isBoolean
        },
        
        /**
        Set the initlal height of the crop area, defaults to minHeight
        
        @attribute initHeight
        @type {Number}
        */
        initHeight: {
            value: 0,
            validator: isNumber,
            setter: '_defInitHeightSetter'
        },
        
        /**
        Set the initlal width of the crop area, defaults to minWidth
        
        @attribute initWidth
        @type {Number}
        */
        initWidth: {
            value: 0,
            validator: isNumber,
            setter: '_defInitWidthSetter'
        },

        visibleControls: {
            value: true,
            validator: Lang.isBoolean
        }
        
    }
    
});

_yuitest_coverline("C:\Workspace\yui3-gallery\src\gallery-imagecropper\build_tmp\gallery-imagecropper.js", 660);
Y.ImageCropper = ImageCropper;



}, '@VERSION@' ,{requires:['widget','dd-drag','dd-constrain','resize-base','resize-constrain'], skinnable:true});
