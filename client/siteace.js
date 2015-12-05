/////
// accounts config
/////

Accounts.ui.config({
	passwordSignupFields: "USERNAME_AND_EMAIL"
});

/////
// template helpers
/////

// helper function that returns all available websites
Template.website_list.helpers({
	websites:function(){
		return Websites.find({}, {sort: {votes: -1}});
	}
});


/////
// template events
/////

Template.website_item.events({
	"click .js-upvote":function(event){

		var website_id = this._id;

		// Add one vote
		if (Meteor.user()) {
			Websites.update(
				{_id:website_id},
				{$inc:{votes:1}}
			);
		}
		
		// Prevent page reload
		return false;
	},
	"click .js-downvote":function(event){

		var website_id = this._id;

		// Remove one vote
		if (Meteor.user()) {
			Websites.update(
				{_id:website_id},
				{$inc:{votes:-1}}
			);
		}
		
		return false;// prevent the button from reloading the page
	}
});

Template.website_form.events({
	"click .js-toggle-website-form":function(event){
		$("#website_form").toggle('slow');
	},
	"submit .js-save-website-form":function(event){
		
		var url = event.target.url.value;
		var title = event.target.title.value;
		var description = event.target.title.value;
		
		if (Meteor.user()) {
			Websites.insert({
				url:url,
				title:title,
				description:description,
				createdOn:new Date(),
				createdBy:Meteor.user()._id,
				votes:0
			});
		}
		
		// Hide the form div
		$("#website_form").toggle('slow');
		// Reset the form fields
		$("#website_form").find("form")[0].reset();
		
		// Prevent page reload
		return false;
	}
});