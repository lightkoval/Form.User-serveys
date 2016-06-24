/**
 * Created by svetlana on 23.06.2016.
 */
'use strict';
angular.module('app').directive('toggleClass', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.bind('click', function() {
                element.toggleClass(attrs.toggleClass);
            });
        }
    };
});