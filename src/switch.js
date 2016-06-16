/**
 * Created by hjzheng on 16/6/16.
 */
(function() {
	angular.module('uiSwitch', []).directive('uiSwitch', function() {
		return {
			restrict: 'E',
			templateUrl: './switch.html',
			replace: true,
			scope: {
				size: '@',
				color: '@',
				on: '@',
				off: '@',
				trueValue: '@',
				falseValue: '@',
				disabled: '@',
				ngModel: '='
			},
			require: 'ngModel',
			bindToController: true,
			controller: function() {
				var vm = this;
				vm.size = vm.size || 'default';
				vm.color = vm.color || 'green';
			},
			controllerAs: 'vm',
			link: function(scope, element, attrs, ngModelCtrl) {
				// model -> UI
				ngModelCtrl.$render = function() {
					element.toggleClass('check', angular.equals(ngModelCtrl.$modelValue, (attrs.trueValue || true)));
				};

				// UI - model
				element.on('click', function() {
					if (attrs.disabled) {
						return;
					}

					var isActive = element.hasClass('check');

					scope.$apply(function() {
						ngModelCtrl.$setViewValue(!isActive ? attrs.trueValue || true : attrs.falseValue || false);
						ngModelCtrl.$render();
					});
				});

			}
		};
	});
}());
