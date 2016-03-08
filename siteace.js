Websites = new Mongo.Collection("websites");

if (Meteor.isClient) {

	/////
	// template helpers
	/////

	// helper function that returns all available websites
	Template.website_list.helpers({
		websites:function(){
			return Websites.find({}, {sort: {votes:-1}});
		}
	});


	/////
	// template events
	/////

	Template.website_item.events({
		"click .js-upvote":function(event){

			Websites.update(this._id, {
		    	$inc: {votes: 1}
		    });
			return false;// prevent the button from reloading the page
		},
		"click .js-downvote":function(event){

			Websites.update(this._id, {
		    	$inc: {votes: -1}
		    });

			return false;// prevent the button from reloading the page
		}
	})

	Template.website_form.events({
		"click .js-toggle-website-form":function(event){
			$("#website_form").toggle('slow');
		},
		"submit .js-save-website-form":function(event){

			var url = event.target.url.value,
				title = event.target.title.value,
				description = event.target.description.value;

			Websites.insert({
	      		title: title,
	      		url: url,
	      		description: description,
	      		createdOn:new Date(),
				owner: Meteor.userId()
      		});
			$(".js-save-website-form").trigger("reset");
			$("#website_form").toggle('slow');
			return false;// stop the form submit from reloading the page

		}
	});
}


if (Meteor.isServer) {
	// start up function that creates entries in the Websites databases.
  Meteor.startup(function () {
    // code to run on server at startup
    if (!Websites.findOne()){
    	console.log("No websites yet. Creating starter data.");
    	  Websites.insert({
    		title:"Goldsmiths Computing Department",
    		url:"http://www.gold.ac.uk/computing/",
    		description:"This is where this course was developed.",
    		createdOn:new Date()
    	});
    	 Websites.insert({
    		title:"University of London",
    		url:"http://www.londoninternational.ac.uk/courses/undergraduate/goldsmiths/bsc-creative-computing-bsc-diploma-work-entry-route",
    		description:"University of London International Programme.",
    		createdOn:new Date()
    	});
    	 Websites.insert({
    		title:"Coursera",
    		url:"http://www.coursera.org",
    		description:"Universal access to the world’s best education.",
    		createdOn:new Date()
    	});
    	Websites.insert({
    		title:"Google",
    		url:"http://www.google.com",
    		description:"Popular search engine.",
    		createdOn:new Date()
    	});
    }
  });
}
