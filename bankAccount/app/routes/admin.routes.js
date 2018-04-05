module.exports = (app) => {

	var admin = require("../api/admin.api.js");

	app.get("/admin/users", admin.findAll);

	app.put("/admin/:user_id", admin.update);

	app.delete("/admin/", admin.delete);
}