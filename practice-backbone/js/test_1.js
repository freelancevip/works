var MessageModel = Backbone.Model.extend({
	urlRoot: "/api/test_1.php",
	defaults: {
		message: "Test message"
	}
});

var MessageView = Backbone.View.extend({
	template: _.template($("#firstTemplate").html()),
	render : function(eventName) {
		$(this.el).html(this.template(this.model.toJSON()));
		return this;
	}
});

var MessageRouter = Backbone.Router.extend({
	routes: {
		"" : "displayMessage"
	},
	displayMessage : function() {
		var messageModel = new MessageModel();
		var messageView = new MessageView({
			model : messageModel
		});
		messageModel.fetch({
			success : function() {
				$("#msg").html(messageView.render().el);
			}
		});
	}
});

var messageRouter = new MessageRouter();
Backbone.history.start();