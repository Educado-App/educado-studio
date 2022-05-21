const passport = require("passport"); // Import passport library module

const mongoose = require("mongoose");
const Course = mongoose.model("courses");
const Section = mongoose.model("sections");
const Quiz = mongoose.model("quizzes");
const Component = mongoose.model("components");

const requireLogin = require("../middlewares/requireLogin");
const { exit } = require("cli");

// Routes are sorted into COURSE - SECTION - COMPONENT each with ASCII art, within each functions are in order of CRUD
// NOTE Files do NOT delete from the backend yet, on the TODO as of 03/2022

module.exports = (app) => {
  // ┻━┻︵ \(°□°)/ ︵ ┻━┻ (¯`·._.··¸.-~*´¨¯¨`*·~-.,-(COURSE ROUTING BELOW_)-,.-~*´¨¯¨`*·~-.¸··._.·´¯)┻━┻︵ \(°□°)/ ︵ ┻━┻
  // (>'-')> <('_'<) ^('_')\- \m/(-_-)\m/ <(   '-')> \_( .")> <( ._.)-`(>'-')> <('_'<) ^('_')\- \m/(-_-)\m/ <( '-')> \_( .")> <( ._.)-`
  // (>'-')> <('_'<) ^('_')\- \m/(-_-)\m/ <( '-')> \_( .")> <( ._.)-`(>'-')> <('_'<) ^('_')\- \m/(-_-)\m/ <( '-')> \_( .")> <( ._.)-`
  // (>'-')> <('_'<) ^('_')\- \m/(-_-)\m/ <( '-')> \_( .")> <( ._.)-`(>'-')> <('_'<) ^('_')\- \m/(-_-)\m/ <( '-')> \_( .")> <( ._.)-`

  // Create course
  app.post("/api/course/create", requireLogin, async (req, res) => {
    const { title, description } = req.body;

    const course = new Course({
      title: title,
      description: description,
      category: "",
      _user: req.user.id,
      dateCreated: Date.now(),
      dateUpdated: Date.now(),
      sections: [],
    });

    try {
      await course.save();
      res.send(course);
    } catch (err) {
      res.status(422).send(err);
    }
  });

  // Update Course
  app.post("/api/course/update", requireLogin, async (req, res) => {
    const { course } = req.body;
    const dbCourse = await Course.findByIdAndUpdate(
      course._id,
      {
        title: course.title,
        description: course.description,
        sections: course.sections,
      },
      function (err, docs) {
        if (err) {
          console.log("Error:", err);
          res.send(err);
        } else {
          console.log("Updated Course: ", docs);
        }
      }
    );
    res.send("Course Update Complete");
  });

  // Get all courses for user
  app.get("/api/course/getall", requireLogin, async (req, res) => {
    const list = await Course.find({ _user: req.user.id });
    res.send(list);
  });

  
  // Get all courses for user
  app.get("/api/course/eml/getall", async (req, res) => {
    const list = await Course.find();
    res.send(list);
  });

  // Update course title
  app.post("/api/course/update/title", async (req, res) => {
    const { text, course_id } = req.body;

    // find object in database and update title to new value
    (await Course.findOneAndUpdate({ _id: course_id }, { title: text })).save;
    course = await Course.findById(course_id);

    // Send response
    res.send(course);
  });

  // Update course description
  app.post("/api/course/update/description", async (req, res) => {
    const { text, course_id } = req.body;

    // find object in database and update title to new value
    (await Course.findOneAndUpdate({ _id: course_id }, { description: text }))
      .save;
    course = await Course.findById(course_id);

    // Send response
    res.send(course);
  });

  // Update course category
  app.post("/api/course/update/category", async (req, res) => {
    const { text, course_id } = req.body;

    // find object in database and update title to new value
    (await Course.findOneAndUpdate({ _id: course_id }, { category: text }))
      .save;
    course = await Course.findById(course_id);

    // Send response
    res.send(course);
  });

  // Update course published state
  app.post("/api/course/update/published", async (req, res) => {
    const { published, course_id } = req.body;

    // find object in database and update title to new value
    (await Course.findOneAndUpdate({ _id: course_id }, { published: published }))
      .save;
    course = await Course.findById(course_id);

    // Send response
    res.send(course);
  });

  // Delete all documents for user - the Nuclear option.
  app.post("/api/course/delete", requireLogin, async (req, res) => {
    const { course_id } = req.body;
    let course;
    try {
      course = await Course.findById(course_id).catch((err) => {
        console.log(err);
      });
    } catch (error) {
      res.status(422).send(err);
    }
    const sectionIds = course.sections;

    sectionIds.map(async (section_id, index) => {
      let section;
      try {
        section = await Section.findById(section_id).catch((err) => {
          console.log(err);
        });
      } catch (error) {
        res.status(422).send(err);
      }
      const componentIds = section.components;
      componentIds.map(async (component_id, index) => {
        await Component.deleteOne({ _id: component_id }, (err) => {
          console.log(err);
        });
      });
      await Section.deleteOne({ _id: section_id }, (err) => {
        console.log(err);
      });
    });

    await Course.deleteOne({ _id: course_id }, (err) => {
      console.log(err);
    });

    res.send("Completed");
  });

  // ┻━┻︵ \(°□°)/ ︵ ┻━┻ (¯`·._.··¸.-~*´¨¯¨`*·~-.,-(_SECTION ROUTING BELOW_)-,.-~*´¨¯¨`*·~-.¸··._.·´¯)┻━┻︵ \(°□°)/ ︵ ┻━┻
  // (>'-')> <('_'<) ^('_')\- \m/(-_-)\m/ <( '-')> \_( .")> <( ._.)-`(>'-')> <('_'<) ^('_')\- \m/(-_-)\m/ <( '-')> \_( .")> <( ._.)-`
  // (>'-')> <('_'<) ^('_')\- \m/(-_-)\m/ <( '-')> \_( .")> <( ._.)-`(>'-')> <('_'<) ^('_')\- \m/(-_-)\m/ <( '-')> \_( .")> <( ._.)-`
  // (>'-')> <('_'<) ^('_')\- \m/(-_-)\m/ <( '-')> \_( .")> <( ._.)-`(>'-')> <('_'<) ^('_')\- \m/(-_-)\m/ <( '-')> \_( .")> <( ._.)-`

  // CREATE SECTION and add to corrosponding course sections array
  app.post("/api/section/create", requireLogin, async (req, res) => {
    const { title, course_id } = req.body; // Or query?...

    const section = new Section({
      title: title,
      description: "",
      dateCreated: Date.now(),
      dateUpdated: Date.now(),
      components: [],
    });

    try {
      await section.save();
      course = await Course.findById(course_id);
      await course.sections.push(section._id);
      await course.save();
      res.send(course);
    } catch (err) {
      res.status(422).send(err);
    }
  });

  // Get all sections
  app.post("/api/course/getallsections", requireLogin, async (req, res) => {
    const { sections } = req.body;
    let list = [];
    for (let i = 0; i < sections.length; i++) {
      const temp = await Section.findOne({ _id: sections[i] });
      list.push(temp);
    }
    res.send(list);
  });

  // Update section title
  app.post("/api/course/update/sectiontitle", async (req, res) => {
    // ...
    // get new value & section ID
    const { value, sectionId } = req.body;

    // find object in database and update title to new value
    (await Section.findOneAndUpdate({ _id: sectionId }, { title: value })).save;

    // Send response
    res.send("Completed");
  });

  // Update course description
  app.post("/api/section/update/title", async (req, res) => {
    const { text, section_id } = req.body;

    // find object in database and update title to new value
    (await Section.findOneAndUpdate({ _id: section_id }, { title: text })).save;
    section = await Section.findById(section_id);

    // Send response
    res.send(section);
  });

  // Update section description
  app.post("/api/section/update/description", async (req, res) => {
    const { text, section_id } = req.body;

    // find object in database and update title to new value
    (await Section.findOneAndUpdate({ _id: section_id }, { description: text }))
      .save;
    section = await Section.findById(section_id);

    // Send response
    res.send(section);
  });

  // Update sections order
  app.post("/api/course/update/sectionsorder", async (req, res) => {
    // Get sections from request
    const { sections, course_id } = req.body;
    // REPORT NOTE: Måske lav performance test, for om det giver bedst mening at wipe array og overskrive, eller tjekke 1 efter 1 om updates
    // Overwrite existing array
    (await Course.findOneAndUpdate({ _id: course_id }, { sections: sections }))
      .save;

    course = await Course.findById(course_id);

    // Send response
    res.send(course);
  });

  // Delete component for user
  app.post("/api/section/delete", requireLogin, async (req, res) => {
    const { section_id, course_id } = req.body;

    const course = await Course.findById(course_id).catch((err) => {
      console.log(err);
    });

    let sectionIds = course.sections;

    let index = sectionIds.indexOf(section_id);
    if (index !== -1) {
      sectionIds.splice(index, 1);
    }

    (
      await Course.findOneAndUpdate(
        { _id: course_id },
        { sections: sectionIds }
      )
    ).save;

    await Section.deleteOne({ _id: section_id }, (err) => {
      console.log(err);
    });

    res.send(sectionIds);
  });

  // ┻━┻︵ \(°□°)/ ︵ ┻━┻ (¯`·._.··¸.-~*´¨¯¨`*·~-.,-(_COMPONENT ROUTING BELOW_)-,.-~*´¨¯¨`*·~-.¸··._.·´¯)┻━┻︵ \(°□°)/ ︵ ┻━┻
  // (>'-')> <('_'<) ^('_')\- \m/(-_-)\m/ <( '-')> \_( .")> <( ._.)-`(>'-')> <('_'<) ^('_')\- \m/(-_-)\m/ <( '-')> \_( .")> <( ._.)-`
  // (>'-')> <('_'<) ^('_')\- \m/(-_-)\m/ <( '-')> \_( .")> <( ._.)-`(>'-')> <('_'<) ^('_')\- \m/(-_-)\m/ <( '-')> \_( .")> <( ._.)-`
  // (>'-')> <('_'<) ^('_')\- \m/(-_-)\m/ <( '-')> \_( .")> <( ._.)-`(>'-')> <('_'<) ^('_')\- \m/(-_-)\m/ <( '-')> \_( .")> <( ._.)-`

  //Create Component
  app.post("/api/component/create", async (req, res) => {
    const { type, section_id } = req.body; // Or query?...

    const component = new Component({
      type: type,
      file: "",
      text: "",
      quizzes: [],
      dateCreated: Date.now(),
      dateUpdated: Date.now(),
    });

    try {
      await component.save();
      section = await Section.findById(section_id);
      await section.components.push(component._id);
      await section.save();
      res.send(section);
    } catch (err) {
      res.status(422).send(err);
    }
  });

  // Create quiz component
  // Does the same as create component except creating an entry for the quiz itself in mongodb
  // Also used for creating a new question linked to the same quiz component
  app.post("/api/component/quiz/create", async (req, res) => {
    const  componentObj  = req.body;

    const quizComponent = new Quiz({
      question: { textQuestion: "", audioQuestion: "" },
      answers: [{ textAnswer: "", audioAnswer: "", correctAnswer: false }],
      points: "",
      dateCreated: Date.now(),
      dateUpdated: Date.now(),
    });

    try {
      await quizComponent.save();
      component = await Component.findById(componentObj.component_id);
      await component.quizzes.push(quizComponent._id);
      await component.save();
      res.send(component);
    } catch (err) {
      res.status(422).send(err);
    }
  });

  //Create new answer related to question in quiz component
  // should be updated when solution for choosing which question to add the answer onto is found
  // currently just pushes it onto the first quiz found in the component's quizzes array
  app.post("/api/component/quiz/answer/create", async (req, res) => {
    const componentObj = req.body;

    const answerObject = {
      textAnswer: "",
      audioAnswer: "",
      correctAnswer: false,
    };

    try {
      component = await Component.findById(componentObj.component_id);
      // this line finds the quiz we're adding an answer to and updates it
      // $push appends a value to an array on mongodb, here we're appending a default answer object
      await Quiz.findOneAndUpdate({ _id: component.quizzes }, { $push: { answers: answerObject } });
      await component.save();
      res.send(component.quizzes);
    } catch (err) {
      res.status(422).send(err);
    }
  });
/*
  app.post("/api/component/quiz/update", async (req, res) => {
    const { quiz, component_id } = req.body;

    let qwas = [];

    component = await Component.findById(component_id);

    for (let i = 0; i < component.quizzes.length; i++) {
        qwas[i] = await Quiz.findById(component.quizzes[i]);
    }



    // Send response
    //res.send(component);
  });*/


  //Get all components
  app.post("/api/component/getallcomponents", async (req, res) => {
    const { components } = req.body;
    let list = [];
    for (let i = 0; i < components.length; i++) {
      const temp = await Component.findOne({ _id: components[i] });
      list.push(temp);
    }
    res.send(list);
  });

  // Get all quizzes 
  app.post("/api/component/quiz/getallquizzes", async (req, res) => {
    const { quizzes } = req.body;
    let list = [];
    for (let i = 0; i < quizzes.length; i++) {
      const temp = await Quiz.findOne({ _id: quizzes[i] });
      list.push(temp);
    }
    res.send(list);
  });

  // Delete question
  app.post("/api/component/quiz/deletequestion", async (req, res) => {
    const idObj = req.body;

    // find component and remove the question to be deleted
    component = await Component.findById(idObj.component);
    let quizIndex = component.quizzes.findIndex((quizId) => quizId == idObj.question);
    if (quizIndex !== -1 ) {
      component.quizzes.splice(quizIndex, 1);
    }

    // if question to be deleted was the only one, enter these lines of code
    if (component.quizzes.length < 1) {
      const section = await Section.findById(idObj.section).catch((err) => {
        console.log(err);
      });

      // find component in array of components and remove from array
      const sectionComponents = section.components;
      let index = sectionComponents.indexOf(idObj.component);
      if (index !== -1) {
        sectionComponents.splice(index, 1);
      }

      // find the section and update it with the new list of components
      await Section.findOneAndUpdate(
        { _id: section._id },
        { components: sectionComponents }
      );
      
      // remove question to be deleted and component said question was in
      await Quiz.findByIdAndDelete(idObj.question);
      await Component.findByIdAndDelete(idObj.component);

      let resObj = {
        sectionComponents: sectionComponents,
        getComps: true,
      };
      // send obj back with list of components and boolean used for checking (see Course.js) - then stop executing
      res.send(resObj);
      return;
    }

    // below only runs if question to be deleted wasn't the only one
    // update component with amount of questions (quizzes entry)
    (await Component.findByIdAndUpdate
      (
        { _id: component._id },
        { quizzes: component.quizzes }
      )
    );
  
    let resObj = {
      componentQuizzes: component.quizzes,
      getComps: false,
    };

    res.send(resObj);
  });

  // Delete Answer
  // should be rewritten in a way that makes the quiz re-render upon completion
  app.post("/api/component/quiz/deleteanswer", async (req, res) => {
    const { quiz_id, answer_id } = req.body;
    
    let quiz = await Quiz.findById(quiz_id);
    let answers = quiz.answers;
    let index = answers.findIndex((answer) => answer._id == answer_id);
    if (index !== -1) {
      answers.splice(index, 1);
    };

    await Quiz.findOneAndUpdate(
      { _id: quiz._id },
      { answers: answers }
    );
  })

  //Update Component order
  app.post("/api/component/updatecomponentorder", async (req, res) => {
    // Get components from request
    const { components, section_id } = req.body;
    (
      await Section.findOneAndUpdate(
        { _id: section_id },
        { components: components }
      )
    ).save;
    section = await Section.findById(section_id);
    // Send response
    res.send(section);
  });

  // Update section title
  app.post("/api/component/text/update", async (req, res) => {
    const { text, component_id } = req.body;

    // find object in database and update title to new value
    (await Component.findOneAndUpdate({ _id: component_id }, { text: text }))
      .save;
    component = await Component.findById(component_id);

    // Send response
    res.send(component);
  });

  // Delete all documents for user
  app.post("/api/component/delete", requireLogin, async (req, res) => {
    const { component_id, section_id } = req.body;

    const section = await Section.findById(section_id).catch((err) => {
      console.log(err);
    });

    let componentIds = section.components;
    let components = await Component.findById(componentIds);

    let index = componentIds.indexOf(component_id);
    if (index !== -1) {
      componentIds.splice(index, 1);
    }

    (
      await Section.findOneAndUpdate(
        { _id: section_id },
        { components: componentIds }
      )
    ).save;
    
    await Quiz.deleteMany({ _id: { $in: components.quizzes }}, (err) => {
      console.log(err);
    });

    await Component.deleteOne({ _id: component_id }, (err) => {
      console.log(err);
    });

    res.send(componentIds);
  });

  app.post("/api/eml/course/getallsections", async (req, res) => {
    const { sections } = req.body;
    let list = [];
    for (let i = 0; i < sections.length; i++) {
      const temp = await Section.findOne({ _id: sections[i] });
      list.push(temp);
    }
    res.send(list);
  });

  // ┻━┻︵ \(°□°)/ ︵ ┻━┻ (_ADMIN ROUTING BELOW_) ┻━┻︵ \(°□°)/ ︵ ┻━┻
  // (>'-')> <('_'<) ^('_')\- \m/(-_-)\m/ <( '-')> \_( .")> <( ._.)-`(>'-')> <('_'<) ^('_')\- \m/(-_-)\m/ <( '-')> \_( .")> <( ._.)-`
  // (>'-')> <('_'<) ^('_')\- \m/(-_-)\m/ <( '-')> \_( .")> <( ._.)-`(>'-')> <('_'<) ^('_')\- \m/(-_-)\m/ <( '-')> \_( .")> <( ._.)-`
  // (>'-')> <('_'<) ^('_')\- \m/(-_-)\m/ <( '-')> \_( .")> <( ._.)-`(>'-')> <('_'<) ^('_')\- \m/(-_-)\m/ <( '-')> \_( .")> <( ._.)-`

  // Delete all documents for user
  app.get("/api/course/delete_all", requireLogin, async (req, res) => {
    await Course.deleteMany({ _user: req.user.id }, (err) => {
      console.log(err);
    });
    await Section.deleteMany({}, (err) => {
      console.log(err);
    });
    await Component.deleteMany({}, (err) => {
      console.log(err);
    });
    res.send("Completed");
  });
};
