var boxes = angular.module('boxes', []);

boxes.factory('Cart', function () {
  return [];
});

boxes.controller('CatalogCtrl', function($scope, $http, Cart) {
  $scope.boxes = [];
  $scope.cart = Cart;

  $http
    .get('http://tsljs.herokuapp.com/boxes.json')

    .success(function (results) {
      $scope.boxes = results;
    });

  $scope.addToCart = function(e, box) {
    e.preventDefault();
    $scope.cart.push(box);
  };

});

boxes.controller('CartCtrl', function ($scope, Cart) {
  var baseShipping = 10;

  $scope.cart = Cart;
  $scope.shipping = baseShipping;

  $scope.$watch('cart', function (newCart, oldCart) {
    var subtotal = 0;
    for(var i=0; i < newCart.length; i++) {
      subtotal += newCart[i].price;
    }

    $scope.subtotal = subtotal;
    $scope.shipping = subtotal > 20 ? 0 : baseShipping;
  }, true);

  $scope.removeFromCart = function($index){
    $scope.cart.splice($index, 1);
  };

});
