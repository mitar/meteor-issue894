if (Meteor.isServer) {
	Meteor.startup(function () {
		console.log("Starting");

		var require = __meteor_bootstrap__.require;
		var fs = require('fs')

		for (var i = 0; i < 10; i++) {
			console.log("Downloading");
			
			var result = Meteor.http.get('https://github.com/mozilla/pdf.js/raw/master/web/compressed.tracemonkey-pldi-09.pdf', {
				timeout: 10000
			});

			if (result.error) {
				throw result.error
			}
			else if (result.statusCode !== 200) {
				throw new Meteor.Error(500, "Downloading failed")
			}

			console.log("Saving");

			fs.writeFileSync('./public/out.bin', result.content)

			console.log("Saved");
		}

		console.log("Done");
	});
}
