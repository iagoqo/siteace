///Method helpers
updateCounters = function(website_id){
	var website = Websites.findOne({_id:website_id});

	Websites.update(
		{_id:website_id},
		{
			$set:{
				upvotes:website.upvoters.length,
				downvotes:website.downvoters.length
			},
		}
	);
},

/// Methods
Meteor.methods({
	"upvote": function(user_id, website_id){
		Websites.update(
			{_id:website_id},
			{
				$pull:{downvoters:user_id},
				$addToSet:{upvoters:user_id}
			}
		);

		updateCounters(website_id);
	},

	"downvote": function(user_id, website_id){
		Websites.update(
			{_id:website_id},
			{
				$pull:{upvoters:user_id},
				$addToSet:{downvoters:user_id}
			}
		);

		updateCounters(website_id);
	},

	"addWebsite": function(url, title, description){
		Websites.insert({
			url:url,
			title:title,
			description:description,
			createdOn:new Date(),
			upvoters: [],
			upvotes: 0,
			downvoters: [],
			downvotes: 0
		});
	}
});