var express = require('express');
const AdminJS = require('adminjs');
const AdminJSExpress = require('@adminjs/express');




const app = express();
// Very basic configuration of AdminJS.
const adminJs = new AdminJS({
    databases: [], // We don’t have any resources connected yet.
    rootPath: "/admin", // Path to the AdminJS dashboard.
});


// Build and use a router to handle AdminJS routes.
const router = AdminJSExpress.buildRouter(adminJs);
app.use(adminJs.options.rootPath, router);
// Run the server.
app.listen(8080, () =>
    console.log(`Example app listening on port 8080!`)
);

module.exports = router;


//code here is to include database, but gives error that i can debug atm

/*var express = require('express');
const AdminJS = require('adminjs');
const AdminJSExpress = require('@adminjs/express');
const mongoose = require('mongoose');



const { Database, Resource } = ('@adminjs/typeorm') // or any other adapter

AdminJS.registerAdapter({ Database, Resource })
const start = async () => {
  const mongooseDb = await mongoose.connect('mongodb+srv://admin:syhvy8-byvwot-kofguB@cluster0.tk8pi.mongodb.net/colibri-dev?retryWrites=true&w=majority');

  const app = express();
  // Very basic configuration of AdminJS.
  const adminJs = new AdminJS({
    databases: [mongooseDb],
    rootPath: "/admin", // Path to the AdminJS dashboard.
  });


  // Build and use a router to handle AdminJS routes.
  const router = AdminJSExpress.buildRouter(adminJs);
  app.use(adminJs.options.rootPath, router);
  // Run the server.
  app.listen(8080, () =>
    console.log(`Example app listening on port 8080!`)
  );



  return router
}

module.exports = start();*/





