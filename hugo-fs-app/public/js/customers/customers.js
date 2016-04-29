(function() {
  angular.module('customers')
  .controller('CustomerController', ['AuthService', '$http', '$location', 'ErrorService', 'ResourceService', CustomerController])
  .directive('customerHeader', function() {
    return {
      restrict: 'A',
      templateUrl: './templates/customer-header.html'
    };
  });

  function CustomerController (AuthService, $http, $location, ErrorService, ResourceService) {
    const customersRoute = 'http://localhost:3000/customers';
    const customerResource = ResourceService('customers');
    this.customers = [];
  //customer routes
    //get customers route
    this.getCustomers = function() {
      customerResource.getAll()
      .then((result) => {
        console.log(result.data);
        this.customers = result.data;
      }, function(error) {
        console.log('error in getting customers');
      });
    };
    //resets customer value in web form
    this.resetCustomer = function(customer) {
      console.log('reset customer hit!');
      $http.get(customersRoute + '/' + customer._id)
      .then((res) => {
        this.customers[this.customers.indexOf(customer)] = res.data;
      })
      .catch (err => console.log(err));
    };
    //post customers route
    this.createCustomer = function(customer) {
      customerResource.create(customer)
      .then((res) => {
        this.customers.push(customer);
        this.newCustomer = {};
      });
    };

    this.createCustomer.rendered = null;

    //put route
    this.updateCustomer = function(customer) {
      console.log(customer);
      customerResource.update(customer)
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
    };
    this.updateCustomer.rendered = null;
    //delete customers route
    this.removeCustomer = function(customer) {
      customerResource.remove(customer)
      .then((res) => {
        this.customers = this.customers.filter((c) => c._id != customer._id);
      });
    };
    this.signUp = function(user) {
      AuthService.createUser(user, function(err, res) {
        if (err) return this.error = ErrorService('problem creating user');
        this.error = ErrorService(null);
        $location.path('/customers');
      });
    };
    this.signOut = function() {
      AuthService.signOut(() => {
        $location.path('/signup');
      });
    };
    this.signIn = function(user) {
      AuthService.signIn(user, (err, res) => {
        if (err) return this.error = ErrorService('Problem signing in');
        this.error = ErrorService(null);
        $location.path('/customers');
      });
    };
    //toggle form goes here
  }


})();
