YUI.add('cropper-tests', function (Y) {

    var Assert = Y.Assert,
        cropper = new Y.ImageCropper({
            srcNode: '#imagecropper',
            width: 333,
            height: 500
        });

    var testCase = new Y.Test.Case({

        name: 'ImageCropper basic behavior',

        'module loaded': function () {
            Assert.isFunction(Y.ImageCropper, 'Y.ImageCropper should be defined');
        },

        'widget instantiation': function () {
            cropper.render();

            Assert.isInstanceOf(Y.Widget, cropper, 'cropper should be an instance of Y.Widget');
            Assert.isInstanceOf(Y.ImageCropper, cropper, 'croper should be an instance of Y.ImageCropper');
        },

        'changing source': function () {
            var newSource = 'assets/test-picture2.jpg';
            cropper.set('source', newSource);

            Assert.isTrue(cropper.get('contentBox').get('src').indexOf(newSource) > -1, 'contentBox should change src');
            Assert.isTrue(cropper.get('resizeKnob').getStyle('backgroundImage').indexOf(newSource) > -1, 'resizeKnob should change background image');
        },

        'ensure getCropCoords() returned object shape': function () {
            var coords = cropper.getCropCoords();

            Assert.isTrue('left'   in coords, 'getCropCoords() returned object should have a "left" property');
            Assert.isTrue('top'    in coords, 'getCropCoords() returned object should have a "top" property');
            Assert.isTrue('width'  in coords, 'getCropCoords() returned object should have a "width" property');
            Assert.isTrue('height' in coords, 'getCropCoords() returned object should have a "height" property');
            Assert.isTrue('image'  in coords, 'getCropCoords() returned object should have a "image" property');
        },

        'reset() returns everything to its default position': function () {
            var initialXY = cropper.get('initialXY'),
                initialWidth = cropper.get('initWidth'),
                initialHeight = cropper.get('initHeight'),
                resizeKnob = cropper.get('resizeKnob');

            cropper.reset();

            Assert.areEqual(initialXY[0], parseFloat(resizeKnob.getStyle('left')), 'left position should be equal to initial left position');
            Assert.areEqual(initialXY[1], parseFloat(resizeKnob.getStyle('top')), 'top position should be equal to initial top position');
            Assert.areEqual(initialWidth, parseFloat(resizeKnob.getStyle('width')), 'width should be equal to initial width');
            Assert.areEqual(initialHeight, parseFloat(resizeKnob.getStyle('height')), 'height should be equal to initial height');
        },

        'correct destruction of the widget': function () {
            var resizeKnobId = cropper.get('resizeKnob').get('id'),
                resizeMaskId = cropper.get('resizeMask').get('id'),
                cropMaskId = cropper.get('cropMask').get('id');

            cropper.destroy();
            
            Assert.isTrue(cropper.get('destroyed'), 'destroyed status of the widget should be true');
            Assert.isNull(cropper.drag, 'The imagecropper should not have a Drag instance');
            Assert.isNull(cropper.resize, 'The imagecropper should not have a Resize instance');

            // Memory management
            Assert.isUndefined(Y.Node._instances[resizeKnobId], 'resize knob should not be in the Y.Node cache anymore');
            Assert.isUndefined(Y.Node._instances[resizeMaskId], 'resize mask should not be in the Y.Node cache anymore');
            Assert.isUndefined(Y.Node._instances[cropMaskId], 'crop mask should not be in the Y.Node cache anymore');
        }
    });

    Y.Test.Runner.add(new Y.Test.Suite("ImageCropper").add(testCase));

}, '', {requires: ['gallery-imagecropper', 'test']});