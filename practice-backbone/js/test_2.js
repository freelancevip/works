var MessageModel = Backbone.Model.extend({
	defaults : {
		code :  0,
		message : "Test message"
	}
});

var MessageCollection = Backbone.Collection.extend({
	model : MessageModel
});

var MessageRouter = Backbone.Router.extend({
	routes : {
		"" : "displayMessages"
	},
	displayMessages : function() {
		var msg1 = new MessageModel({code : 001, message : 'Registration Successfully'});
		var msg2 = new MessageModel({code : 002, message : 'Registration Failed'});
		var msg3 = new MessageModel({code : 003, message : 'Login Successfully'});
		var msg4 = new MessageModel({code : 004, message : 'Login Successfully'});
		
		var messageCollection = new MessageCollection([msg1, msg2, msg3, msg4]);
		_.each(messageCollection.models, function(msg) {
			console.log(msg.get("code") + "|" + msg.get("message") +"\n");
		})
	}
});

var messageRouter = new MessageRouter();
Backbone.history.start();