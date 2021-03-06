/////
// routing
/////

Router.configure({
	layoutTemplate: "ApplicationLayout"
});

Router.route("/", function () {
	this.render(
		"website_form",
		{to: "top"}
	);
	this.render(
		"website_list",
		{to: "bottom"}
	);
});

Router.route("/:_id", function () {
	var website = Websites.findOne({_id:this.params._id});
	this.render(
		"details",
		{
			to: "top",
			data: website
		}
	);
	this.render(
		"comments",
		{
			to: "bottom",
			data: website
		}
	);
});

/////
// accounts config
/////

Accounts.ui.config({
	passwordSignupFields: "USERNAME_AND_EMAIL"
});

/////
// Comments config
/////

Comments.ui.config({
    template: 'bootstrap'
});

/////
// template helpers
/////

// helper function that returns all available websites
Template.website_list.helpers({
	websites:function(){
		return Websites.find({}, {sort: {upvotes: -1, downvotes: 1, createdOn: -1}});
	}
});

Template.website_item.helpers({
	formattedDate:function(){
		return formatDate(this.createdOn);
	}
});

Template.details.helpers({
	formattedDate:function(){
		return formatDate(this.createdOn);
	}
})

/////
// template events
/////

var voteEvents = {
	"click .js-upvote":function(event){

		var website_id = this._id;

		if (Meteor.user()) {
			Meteor.call("upvote", Meteor.userId(), website_id);
		}
		
		// Prevent page reload
		return false;
	},
	"click .js-downvote":function(event){

		var website_id = this._id;

		if (Meteor.user()) {
			Meteor.call("downvote", Meteor.userId(), website_id);
		}
		
		return false;// prevent the button from reloading the page
	}
}

Template.website_item.events(voteEvents);
Template.details.events(voteEvents);

Template.website_form.events({
	"click .js-toggle-website-form":function(event){
		$("#website_form").toggle('slow');
	},
	"submit .js-save-website-form":function(event){
		
		var url = event.target.url.value;
		var title = event.target.title.value;
		var description = event.target.description.value;
		
		if(url.substring(0,6) != "http://" || url.substring(0,7) != "https://"){
			url = "http://" + url;
		}
		
		if (Meteor.user()) {
			Meteor.call("addWebsite", url, title, description);
		}
		
		// Hide the form div
		$("#website_form").toggle('slow');
		// Reset the form fields
		$("#website_form").find("form")[0].reset();
		
		// Prevent page reload
		return false;
	}
});