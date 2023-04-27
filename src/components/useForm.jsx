import { useState, useReducer, useEffect } from "react";
import { fetchAPI, submitAPI } from "../utils/apiMock";
import { useFormContext } from "../store/FormContext";

const initialState = {
  name: "",
  email: "",
  date: "",
  time: "",
  numberOfGuests: 1,
  tablePreference: "",
  occasion: "",
  message: "",
};

const ACTION_TYPES = {
  NAME: 0,
  EMAIL: 1,
  DATE: 2,
  TIME: 3,
  NUMBEROFGUESTS: 4,
  TABLEPREFERENCE: 5,
  OCCASION: 6,
  MESSAGE: 7,
};

function formReducer(state, action) {
  switch (action.type) {
    case ACTION_TYPES.NAME:
      return {
        ...state,
        name: action.payload,
      };
    case ACTION_TYPES.EMAIL:
      return {
        ...state,
        email: action.payload,
      };
    case ACTION_TYPES.DATE:
      return {
        ...state,
        date: action.payload,
      };
    case ACTION_TYPES.TIME:
      return {
        ...state,
        time: action.payload,
      };
    case ACTION_TYPES.NUMBEROFGUESTS:
      return {
        ...state,
        numberOfGuests: action.payload,
      };
    case ACTION_TYPES.TABLEPREFERENCE:
      return {
        ...state,
        tablePreference: action.payload,
      };
    case ACTION_TYPES.OCCASION:
      return {
        ...state,
        occasion: action.payload,
      };
    case ACTION_TYPES.MESSAGE:
      return {
        ...state,
        message: action.payload,
      };
    default:
      return state;
  }
}

const useForm = () => {
  const [form, dispatch] = useReducer(formReducer, initialState);
  const [timeSlots, setTimeslots] = useState(["Choose date first"]);
  const [isFormValid, setFormValid] = useState(false);
  const [touches, updateTouches] = useState({
    name: false,
    email: false,
    date: false,
    time: false,
    // numberOfGuests: false,
  });
  const [formErrors, setFormErrors] = useState({});
  const formContext = useFormContext();

  useEffect(() => {
    const errs = {};
    if (touches.name) {
      if (!form.name) {
        errs.name = "Name cannont be blank";
      }
      if (form.name && form.name.length < 3) {
        errs.name = "Name cannont be leeser tahn 3 chars";
      }
    }
    if (touches.email) {
      if (!form.email) {
        errs.email = "Email cannont be blank";
      }
      if (form.email && !form.email.includes("@")) {
        errs.email = "Email is not valid";
      }
      if (form.email && !form.email.includes(".")) {
        errs.email = "Email is not valid";
      }
    }

    if (touches.date && !form.date) {
      errs.date = "Date not selected";
    }
    if (touches.time && !form.time) {
      errs.time = "Time not selected";
    }
    if (touches.numberOfGuests && !form.numberOfGuests) {
      errs.numberOfGuests = "Number of Guests not specified";
    }
    setFormErrors(errs);

    const isValidForm =
      Object.keys(touches).every((k) => touches[k]) &&
      Object.keys(errs).length === 0;
    setFormValid(isValidForm);
  }, [form, touches]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === "date") {
      setTimeslots(fetchAPI(new Date(e.target.value)));
    }
    dispatch({ type: ACTION_TYPES[name.toUpperCase()], payload: value });
  };

  const handleBlur = (e) => {
    const name = e.target.name;
    updateTouches({ ...touches, [name]: true });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    let response;

    if (isFormValid) {
      response = submitAPI(form);
      formContext.setForm(form);
    }
    return response ? true : false;
  };

  return {
    form,
    timeSlots,
    isFormValid,
    handleChange,
    handleBlur,
    submitHandler,
    touches,
    formErrors,
  };
};

export default useForm;
