// start up function that creates entries in the Websites databases.
Meteor.startup(function () {
	// code to run on server at startup
	if (!Websites.findOne()){
		console.log("No websites yet. Creating starter data.");
		addWebsite(
			"http://www.gold.ac.uk/computing/",
			"Goldsmiths Computing Department",
			"This is where this course was developed."
		);
		addWebsite(
			"http://www.londoninternational.ac.uk/courses/undergraduate/goldsmiths/bsc-creative-computing-bsc-diploma-work-entry-route",
			"University of London",
			"University of London International Programme."
		);
		addWebsite(
			"http://www.coursera.org",
			"Coursera",
			"Universal access to the world’s best education."
		);
		addWebsite(
			"http://www.google.com",
			"Google",
			"Popular search engine."
		);
	}
});