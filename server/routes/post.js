module.exports = (app, db) => {

  const Op = db.Sequelize.Op;
  
  app.get("/api/v1/post/:id", (req, res) => {
	console.log("Requested post " + req.params.id);
  	db.post.findOne({
  		where: {
  			id: req.params.id
  		},
		include: [db.user]
  	}).then( (result) => res.json(result) );
  });
  
  app.post("/api/v1/post/create", (req, res) => {
    console.log("Requested new post creation");
	console.log(req.body);
    db.post.create({
      title: req.body.title,
      category: req.body.category,
      body: req.body.body,
      userId: req.body.userId,
      rating: req.body.rating,
      createdAt: new Date(),
      updatedAt: new Date()
    }).then( (result) => res.json(result) );
  });

  // TEMPORARY ROUTE FOR TESTING - SHOULD DELETE OR MODIFY FOR FRIENDS
  app.get("/api/v1/posts/all", (req, res) => {
	console.log("Requested all posts");
    db.post.findAll({
  		where: {
  			id: {
				[Op.gt]: 0
			}
  		},
		include: [db.user]
	}).then( (result) => res.json(result) );
  });
}
