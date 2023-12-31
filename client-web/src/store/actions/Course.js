import axios from "axios";

// Fetch user action
export const CREATE_COURSE = "CREATE_COURSE";

export const createCourse = (title, description, category, published) => {
  const course = {
    title: title,
    description: description,
    category: category,
    published: false,
  };
  return async (dispatch) => {
    const res = await axios.post("/api/course/create", course);
    dispatch({ type: CREATE_COURSE, payload: res.data });
  };
};

// Get all courses
export const GET_ALL_COURSES = "GET_ALL_COURSES";

export const getAllCourses = () => {
  return async (dispatch) => {
    const res = await axios.get("/api/course/getall");
    dispatch({ type: GET_ALL_COURSES, payload: res.data });
  };
};

// Edit Course
export const EDIT_COURSE = "EDIT_COURSE";

export const editCourse = (course_id) => {
  return async (dispatch) => {
    dispatch({ type: EDIT_COURSE, payload: course_id });
  };
};

// Get all courses
export const DELETE_COURSE = "DELETE_COURSE";

export const deleteCourse = (course_id) => {
  const obj = {
    course_id: course_id,
  };

  return async (dispatch) => {
    await axios.post("/api/course/delete", obj);
    const res = await axios.get("/api/course/getall");
    dispatch({ type: GET_ALL_COURSES, payload: res.data });
  };
};

// Create new Section
export const CREATE_SECTION = "CREATE_SECTION";

export const createSection = (title, course_id) => {
  const obj = {
    title: title,
    description: "",
    course_id: course_id,
  };
  return async (dispatch) => {
    const res = await axios.post("/api/section/create", obj);
    return dispatch({ type: CREATE_SECTION, payload: res.data });
  };
};

// Get All Sections for corrosponding course
export const GET_ALL_SECTIONS = "GET_ALL_SECTIONS";

export const getAllSections = (sections) => {
  const obj = {
    sections: sections,
  };

  return async (dispatch) => {
    const res = await axios.post("/api/course/getallsections", obj);
    dispatch({ type: GET_ALL_SECTIONS, payload: res.data });
  };
};

// Get cover image
export const GET_COVER_IMG = "GET_COVER_IMG";

export const getCoverImg = (url) => {
  const obj = {
    url: url,
  };

  return async (dispatch) => {
    const res = await axios.post("/api/course/getcoverimg", obj);
    dispatch({ type: GET_ALL_SECTIONS, payload: res.data });
  };
};

// Get All Sections for corrosponding course
export const UPDATE_SECTIONS_ORDER = "UPDATE_SECTIONS_ORDER";

export const updateSectionsOrder = (sections, course_id) => {
  const obj = {
    sections: sections,
    course_id: course_id,
  };

  return async (dispatch) => {
    const res = await axios.post("/api/course/update/sectionsorder", obj);
    dispatch({ type: UPDATE_SECTIONS_ORDER, payload: res.data });
  };
};

// Edit section
export const EDIT_SECTION = "EDIT_SECTION";

export const editSection = (section_id) => {
  return async (dispatch) => {
    await dispatch({ type: EDIT_SECTION, payload: section_id });
  };
};

export const RESET_SECTION_TRIGGER = "RESET_SECTION_TRIGGER";

export const resetSectionTrigger = () => {
  return async (dispatch) => {
    await dispatch({ type: RESET_SECTION_TRIGGER });
  };
};

// Create New Component
export const CREATE_COMPONENT = "CREATE_COMPONENT";

export const createComponent = (type, section_id) => {
  const obj = {
    type: type,
    section_id: section_id,
  };
  return async (dispatch) => {
    const res = await axios.post("/api/component/create", obj);
    return dispatch({ type: CREATE_COMPONENT, payload: res.data });
  };
};

// Get All Components for corrosponding section
export const GET_ALL_COMPONENTS = "GET_ALL_COMPONENTS";

export const getAllComponents = (components) => {
  const obj = {
    components: components,
  };

  return async (dispatch) => {
    const res = await axios.post("/api/component/getallcomponents", obj);
    dispatch({ type: GET_ALL_COMPONENTS, payload: res.data });
  };
};

// Update order of componenets for given section
export const UPDATE_COMPONENTS_ORDER = "UPDATE_COMPONENTS_ORDER";

export const updateComponentsOrder = (components, section_id) => {
  const obj = {
    components: components,
    section_id: section_id,
  };

  return async (dispatch) => {
    const res = await axios.post("/api/component/updatecomponentorder", obj);
    dispatch({ type: UPDATE_COMPONENTS_ORDER, payload: res.data });
  };
};

// Save text
export const UPDATE_COMPONENT_TEXT = "UPDATE_COMPONENT_TEXT";

export const updateComponentText = (text, component_id) => {
  const obj = {
    text: text,
    component_id: component_id,
  };

  return async (dispatch) => {
    const res = await axios.post("/api/component/text/update", obj);
    dispatch({ type: UPDATE_COMPONENT_TEXT, payload: res.data });
  };
};

// Delete component
export const DELETE_COMPONENT = "DELETE_COMPONENT";

export const deleteComponent = (component_id, section_id) => {
  const obj = {
    component_id: component_id,
    section_id: section_id,
  };

  return async (dispatch) => {
    const resFromDelete = await axios.post("/api/component/delete", obj);

    const newObj = {
      components: resFromDelete.data,
    };

    const res = await axios.post("/api/component/getallcomponents", newObj);
    dispatch({ type: GET_ALL_COMPONENTS, payload: res.data });
  };
};

// Delete section
export const DELETE_SECTION = "DELETE_SECTION";

export const deleteSection = (section_id, course_id) => {
  const obj = {
    section_id: section_id,
    course_id: course_id,
  };

  return async (dispatch) => {
    const resFromDelete = await axios.post("/api/section/delete", obj);

    const newObj = {
      sections: resFromDelete.data,
    };

    const res = await axios.post("/api/course/getallsections", newObj);
    dispatch({ type: GET_ALL_SECTIONS, payload: res.data });
  };
};

// Update Course description
export const UPDATE_SECTION_DESCRIPTION = "UPDATE_SECTION_DESCRIPTION";

export const updateSectionDescription = (text, section_id) => {
  const obj = {
    text: text,
    section_id: section_id,
  };

  return async (dispatch) => {
    const res = await axios.post("/api/section/update/description", obj);
    dispatch({ type: UPDATE_SECTION_DESCRIPTION, payload: res.data });
  };
};

// Update Course Title
export const UPDATE_COURSE_TITLE = "UPDATE_COURSE_TITLE";

export const updateCourseTitle = (text, course_id) => {
  const obj = {
    text: text,
    course_id: course_id,
  };

  return async (dispatch) => {
    const res = await axios.post("/api/course/update/title", obj);
    dispatch({ type: UPDATE_COURSE_TITLE, payload: res.data });
  };
};

// Update Course description
export const UPDATE_COURSE_DESCRIPTION = "UPDATE_COURSE_DESCRIPTION";

export const updateCourseDescription = (text, course_id) => {
  const obj = {
    text: text,
    course_id: course_id,
  };

  return async (dispatch) => {
    const res = await axios.post("/api/course/update/description", obj);
    dispatch({ type: UPDATE_COURSE_DESCRIPTION, payload: res.data });
  };
};

export const UPDATE_COURSE_CATEGORY = "UPDATE_COURSE_CATEGORY";

export const updateCourseCategory = (text, course_id) => {
  const obj = {
    text: text,
    course_id: course_id,
  };

  return async (dispatch) => {
    const res = await axios.post("/api/course/update/category", obj);
    dispatch({ type: UPDATE_COURSE_CATEGORY, payload: res.data });
  };
};

export const UPDATE_PUBLISHED_SATE = "UPDATE_PUBLISHED_SATE";

export const updatePublishState = (published, course_id) => {
  const obj = {
    published: published,
    course_id: course_id,
  };

  return async (dispatch) => {
    const res = await axios.post("/api/course/update/published", obj);
    dispatch({ type: UPDATE_PUBLISHED_SATE, payload: res.data });
  };
};