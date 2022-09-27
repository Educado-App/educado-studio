const mongoose = require("mongoose");

// Models
const { CourseModel } = require("../models/Courses")
const { SectionModel } = require("../models/Sections")
const { ComponentModel } = require("../models/Components")


const requireLogin = require("../middlewares/requireLogin");

// Routes are sorted into COURSE - SECTION - COMPONENT each with ASCII art, within each functions are in order of CRUD
// NOTE Files do NOT delete from the backend yet, on the TODO as of 03/2022

module.exports = (app) => {
  // ┻━┻︵ \(°□°)/ ︵ ┻━┻ (¯`·._.··¸.-~*´¨¯¨`*·~-.,-(COURSE ROUTING BELOW_)-,.-~*´¨¯¨`*·~-.¸··._.·´¯)┻━┻︵ \(°□°)/ ︵ ┻━┻
  // (>'-')> <('_'<) ^('_')\- \m/(-_-)\m/ <( '-')> \_( .")> <( ._.)-`(>'-')> <('_'<) ^('_')\- \m/(-_-)\m/ <( '-')> \_( .")> <( ._.)-`
  // (>'-')> <('_'<) ^('_')\- \m/(-_-)\m/ <( '-')> \_( .")> <( ._.)-`(>'-')> <('_'<) ^('_')\- \m/(-_-)\m/ <( '-')> \_( .")> <( ._.)-`
  // (>'-')> <('_'<) ^('_')\- \m/(-_-)\m/ <( '-')> \_( .")> <( ._.)-`(>'-')> <('_'<) ^('_')\- \m/(-_-)\m/ <( '-')> \_( .")> <( ._.)-`

  // Create course
  app.post("/api/course/create", requireLogin, async (req, res) => {
    const { title, description } = req.body;

    const course = new CourseModel({
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
    const dbCourse = await CourseModel.findByIdAndUpdate(
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
    const list = await CourseModel.find({ _user: req.user.id });
    res.send(list);
  });


  // Get all courses for user
  app.get("/api/course/eml/getall", async (req, res) => {
    const list = await CourseModel.find();
    res.send(list);
  });

  // Update course title
  app.post("/api/course/update/title", async (req, res) => {
    const { text, course_id } = req.body;

    // find object in database and update title to new value
    (await CourseModel.findOneAndUpdate({ _id: course_id }, { title: text })).save;
    course = await CourseModel.findById(course_id);

    // Send response
    res.send(course);
  });

  // Update course description
  app.post("/api/course/update/description", async (req, res) => {
    const { text, course_id } = req.body;

    // find object in database and update title to new value
    (await CourseModel.findOneAndUpdate({ _id: course_id }, { description: text }))
      .save;
    course = await CourseModel.findById(course_id);

    // Send response
    res.send(course);
  });

  // Update course category
  app.post("/api/course/update/category", async (req, res) => {
    const { text, course_id } = req.body;

    // find object in database and update title to new value
    (await CourseModel.findOneAndUpdate({ _id: course_id }, { category: text }))
      .save;
    course = await CourseModel.findById(course_id);

    // Send response
    res.send(course);
  });

  // Update course published state
  app.post("/api/course/update/published", async (req, res) => {
    const { published, course_id } = req.body;

    // find object in database and update title to new value
    (await CourseModel.findOneAndUpdate({ _id: course_id }, { published: published }))
      .save;
    course = await CourseModel.findById(course_id);

    // Send response
    res.send(course);
  });

  // Delete all documents for user - the Nueclear option.
  app.post("/api/course/delete", requireLogin, async (req, res) => {
    const { course_id } = req.body;
    let course;
    try {
      course = await CourseModel.findById(course_id).catch((err) => {
        console.log(err);
      });
    } catch (error) {
      res.status(422).send(err);
    }
    const sectionIds = course.sections;

    sectionIds.map(async (section_id, index) => {
      let section;
      try {
        section = await SectionModel.findById(section_id).catch((err) => {
          console.log(err);
        });
      } catch (error) {
        res.status(422).send(err);
      }
      const componentIds = section.components;
      componentIds.map(async (component_id, index) => {
        await ComponentModel.deleteOne({ _id: component_id }, (err) => {
          console.log(err);
        });
      });
      await SectionModel.deleteOne({ _id: section_id }, (err) => {
        console.log(err);
      });
    });

    await CourseModel.deleteOne({ _id: course_id }, (err) => {
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

    const section = new SectionModel({
      title: title,
      description: "",
      dateCreated: Date.now(),
      dateUpdated: Date.now(),
      components: [],
    });

    try {
      await section.save();
      course = await CourseModel.findById(course_id);
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
      const temp = await SectionModel.findOne({ _id: sections[i] });
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
    (await SectionModel.findOneAndUpdate({ _id: sectionId }, { title: value })).save;

    // Send response
    res.send("Completed");
  });

  // Update course description
  app.post("/api/section/update/title", async (req, res) => {
    const { text, section_id } = req.body;

    // find object in database and update title to new value
    (await SectionModel.findOneAndUpdate({ _id: section_id }, { title: text })).save;
    section = await SectionModel.findById(section_id);

    // Send response
    res.send(section);
  });

  // Update section description
  app.post("/api/section/update/description", async (req, res) => {
    const { text, section_id } = req.body;

    // find object in database and update title to new value
    (await SectionModel.findOneAndUpdate({ _id: section_id }, { description: text }))
      .save;
    section = await SectionModel.findById(section_id);

    // Send response
    res.send(section);
  });

  // Update sections order
  app.post("/api/course/update/sectionsorder", async (req, res) => {
    // Get sections from request
    const { sections, course_id } = req.body;
    // REPORT NOTE: Måske lav performance test, for om det giver bedst mening at wipe array og overskrive, eller tjekke 1 efter 1 om updates
    // Overwrite existing array
    (await CourseModel.findOneAndUpdate({ _id: course_id }, { sections: sections }))
      .save;

    course = await CourseModel.findById(course_id);

    // Send response
    res.send(course);
  });

  // Delete component for user
  app.post("/api/section/delete", requireLogin, async (req, res) => {
    const { section_id, course_id } = req.body;

    const course = await CourseModel.findById(course_id).catch((err) => {
      console.log(err);
    });

    let sectionIds = course.sections;

    let index = sectionIds.indexOf(section_id);
    if (index !== -1) {
      sectionIds.splice(index, 1);
    }

    (
      await CourseModel.findOneAndUpdate(
        { _id: course_id },
        { sections: sectionIds }
      )
    ).save;

    await SectionModel.deleteOne({ _id: section_id }, (err) => {
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

    const component = new ComponentModel({
      type: type,
      file: "",
      text: "",
      dateCreated: Date.now(),
      dateUpdated: Date.now(),
    });

    try {
      await component.save();
      section = await SectionModel.findById(section_id);
      await section.components.push(component._id);
      await section.save();
      res.send(section);
    } catch (err) {
      res.status(422).send(err);
    }
  });

  //Get all components
  app.post("/api/component/getallcomponents", async (req, res) => {
    const { components } = req.body;
    let list = [];
    for (let i = 0; i < components.length; i++) {
      const temp = await ComponentModel.findOne({ _id: components[i] });
      list.push(temp);
    }
    res.send(list);
  });

  //Update Component order
  app.post("/api/component/updatecomponentorder", async (req, res) => {
    // Get components from request
    const { components, section_id } = req.body;
    (
      await SectionModel.findOneAndUpdate(
        { _id: section_id },
        { components: components }
      )
    ).save;
    section = await SectionModel.findById(section_id);
    // Send response
    res.send(section);
  });

  // Update section title
  app.post("/api/component/text/update", async (req, res) => {
    const { text, component_id } = req.body;

    // find object in database and update title to new value
    (await ComponentModel.findOneAndUpdate({ _id: component_id }, { text: text }))
      .save;
    component = await ComponentModel.findById(component_id);

    // Send response
    res.send(component);
  });

  // Delete all documents for user
  app.post("/api/component/delete", requireLogin, async (req, res) => {
    const { component_id, section_id } = req.body;

    const section = await SectionModel.findById(section_id).catch((err) => {
      console.log(err);
    });

    let componentIds = section.components;

    let index = componentIds.indexOf(component_id);
    if (index !== -1) {
      componentIds.splice(index, 1);
    }

    (
      await SectionModel.findOneAndUpdate(
        { _id: section_id },
        { components: componentIds }
      )
    ).save;

    await ComponentModel.deleteOne({ _id: component_id }, (err) => {
      console.log(err);
    });

    res.send(componentIds);
  });

  app.post("/api/eml/course/getallsections", async (req, res) => {
    const { sections } = req.body;
    let list = [];
    for (let i = 0; i < sections.length; i++) {
      const temp = await SectionModel.findOne({ _id: sections[i] });
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
    await CourseModel.deleteMany({ _user: req.user.id }, (err) => {
      console.log(err);
    });
    await SectionModel.deleteMany({}, (err) => {
      console.log(err);
    });
    await ComponentModel.deleteMany({}, (err) => {
      console.log(err);
    });
    res.send("Completed");
  });
};
