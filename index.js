const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

$(document).ready(function() { 
    var customerViewModel = function() {
        var self = this;

        self.firstName = ko.observable("");
        self.lastName = ko.observable("");
        self.emailId = ko.observable("");
        self.searchKey = ko.observable("");

        self.getCustomerDetails = function () {      
            $.ajax({
                crossDomain: true,
                url: 'https://c7m17o0qpj.execute-api.us-west-2.amazonaws.com/Dev/getcustomerdetailsbyemail',
                cache: false,
                type: 'GET',                   
                data: { "EmailID": self.searchKey() },
                success: function (data) {              
                    self.firstName(data.Item.FirstName)
                    self.lastName(data.Item.LastName),
                    self.emailId(data.Item.EmailID)
                }
            });
        }
    }
    var viewModel = new customerViewModel();
    ko.applyBindings(viewModel);
 });

 $(document).ready(function() {
    var customerDetailsViewModel = function() {
    var self = this;

    self.EmailID = ko.observable("");
    self.FirstName = ko.observable("");
    self.LastName = ko.observable("");
    self.SuccessMessage = ko.observable("");
    
    self.SaveCustomerDetails = function () {     
        var CustomerDetail = {
            EmailID: self.EmailID(),
            FirstName: self.FirstName(),
            LastName: self.LastName()
        }
        
        $.ajax({
            crossDomain: true,
            url: 'https://w5fr5lidcd.execute-api.us-west-2.amazonaws.com/dev/postcustomerdetails',
            cache: false,
            type: 'POST',
            contentType: 'application/json; charset=utf-8', 
            data: ko.toJSON(CustomerDetail),
            success: function (data) {              
                self.SuccessMessage(data)
                    self.EmailID('');
                    self.FirstName('');
                    self.LastName('');
            }
            }).fail(
                function(xhr, textStatus, err){
                    alert("Error happened "+err);
                });
    };
    }

    var viewModel = new customerDetailsViewModel();
    ko.applyBindings(viewModel);
 });


signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});