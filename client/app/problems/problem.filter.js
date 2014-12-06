'use strict';

angular.module('probleeApp')
  .filter('code_html', function($sce, $interpolate) {
    return function (text) {
    	text = text.replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;');
    	//text = $interpolate("{{}}")
    	//text += '<div class="field field0" data-drop="true" ng-model="answerFields[0][\'submitted\']" jqyoui-droppable="{index: 0}" ng-click="popWord(0)"> <div class="btn btn-info btn-draggable" ng-repeat="item in answerFields[0][\'submitted\']" ng-show="item.title" data-drag="{{item.drag}}" data-jqyoui-options="{revert: \'invalid\'}" ng-model="answerFields[0][\'submitted\']" jqyoui-draggable="{index: {{$index}},placeholder:true,animate:true}">{{probTitle}}</div></div>;';
    	return $sce.trustAsHtml(text);
    };
  });
