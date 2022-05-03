import {
  CREATE_COURSE,
  GET_ALL_COURSES,
  EDIT_COURSE,
  UPDATE_COURSE_TITLE,
  UPDATE_COURSE_DESCRIPTION,
  GET_ALL_SECTIONS,
  CREATE_SECTION,
  UPDATE_SECTIONS_ORDER,
  UPDATE_SECTION_DESCRIPTION,
  EDIT_SECTION,
  UPDATE_COURSE_CATEGORY,
  UPDATE_PUBLISHED_SATE,
  CREATE_COMPONENT,
  GET_ALL_COMPONENTS,
  UPDATE_COMPONENTS_ORDER,
  UPDATE_COMPONENT_TEXT,
  UPDATE_COMPONENT_QUIZ,
  RESET_SECTION_TRIGGER,
} from "../actions/Course";

const initialState = {
  activeCourse: {},
  activeSection: {},
  activeSectionTrigger: false,
  userCourses: [{}],
  courseSections: [{}],
  sectionComponents: [{}],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_COURSE:
      return {
        ...state,
        activeCourse: action.payload,
      };

    case GET_ALL_COURSES:
      return {
        ...state,
        userCourses: action.payload,
      };

    case EDIT_COURSE:
      return {
        ...state,
        activeCourse: state.userCourses.find((course) => {
          return course._id === action.payload;
        }),
      };

    case UPDATE_COURSE_TITLE:
      return {
        ...state,
        activeCourse: action.payload,
      };

    case UPDATE_COURSE_DESCRIPTION:
      return {
        ...state,
        activeCourse: action.payload,
      };

    case UPDATE_COURSE_CATEGORY:
      return {
        ...state,
        activeCourse: action.payload,
      };
    
    case UPDATE_PUBLISHED_SATE:
      return {
        ...state,
        activeCourse: action.payload,
      };

    case EDIT_SECTION:
      return {
        ...state,
        activeSection: state.courseSections.find((section) => {
          return section._id === action.payload;
        }),
      };

    case RESET_SECTION_TRIGGER:
      return {
        ...state,
        activeSectionTrigger: false,
      };

    case CREATE_SECTION:
      return {
        ...state,
        activeCourse: action.payload,
      };

    case GET_ALL_SECTIONS:
      return {
        ...state,
        courseSections: action.payload,
      };

    case UPDATE_SECTIONS_ORDER:
      return {
        ...state,
        activeCourse: action.payload,
      };

    case UPDATE_SECTION_DESCRIPTION:
      return {
        ...state,
        activeSection: action.payload,
      };

    case CREATE_COMPONENT:
      return {
        ...state,
        activeSection: action.payload,
      };

    case GET_ALL_COMPONENTS:
      return {
        ...state,
        sectionComponents: action.payload,
      };

    case UPDATE_COMPONENTS_ORDER:
      return {
        ...state,
        activeSection: action.payload,
      };

    case UPDATE_COMPONENT_TEXT:
      const objIndex = state.sectionComponents.findIndex(
        (obj) => obj._id === action.payload._id
      );

      let tempState = state.sectionComponents;

      tempState[objIndex] = action.payload;

      return {
        ...state,
        sectionComponents: tempState,
      };

    case UPDATE_COMPONENT_QUIZ:
      const objectIndex = state.sectionComponents.findIndex(
        (obj) => obj._id === action.payload._id
      );

      let temporaryState = state.sectionComponents;

      temporaryState[objectIndex] = action.payload;

      return {
        ...state,
        sectionComponents: tempState,
      }

    default:
      return {
        ...state,
      };
  }
};

export default reducer;
