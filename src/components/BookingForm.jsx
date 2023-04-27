import React from "react";
import "./BookingForm.css";
import useForm from "./useForm";

const BookingForm = ({ navigate }) => {
  const {
    form,
    timeSlots,
    isFormValid,
    handleChange,
    handleBlur,
    submitHandler,
    formErrors,
  } = useForm();

  function handleSubmit(e) {
    const response = submitHandler(e);
    return response ? navigate("/booking-confirmation") : null;
  }

  return (
    <form onSubmit={handleSubmit} className="reservation-form">
      <div className="column">
        <label htmlFor="name">
          <p>Your Name</p>
          <input
            value={form.name}
            onChange={handleChange}
            onBlur={handleBlur}
            type="text"
            id="name"
            name="name"
          />
          {formErrors.name && <p className="error">{formErrors.name}</p>}
        </label>
        <label htmlFor="email">
          <p>Your Email</p>
          <input
            value={form.email}
            // onChange={changeEmailHandler}
            onChange={handleChange}
            onBlur={handleBlur}
            type="email"
            id="email"
            name="email"
          />
          {formErrors.email && <p className="error">{formErrors.email}</p>}
        </label>
        <label htmlFor="res-date">
          <p>Choose date</p>
          <input
            value={form.date}
            onChange={handleChange}
            onBlur={handleBlur}
            type="date"
            id="res-date"
            placeholder="Date"
            name="date"
          />
          {formErrors.date && <p className="error">{formErrors.date}</p>}
        </label>
        <label htmlFor="res-time">
          <p>Choose time</p>
          <select
            onChange={handleChange}
            onBlur={handleBlur}
            value={form.time}
            id="res-time"
            name="time"
          >
            {timeSlots.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
          {formErrors.time && <p className="error">{formErrors.time}</p>}
        </label>
      </div>
      <div className="column">
        <label htmlFor="guests">
          <p>Number of guests</p>
          <input
            value={form.numberOfGuests}
            onChange={handleChange}
            type="number"
            placeholder="1"
            min="1"
            max="10"
            id="guests"
            required
            name="numberOfGuests"
          />
        </label>
        <label htmlFor="occasion">
          <p>Occasion</p>
          <select
            value={form.occasion}
            onChange={handleChange}
            id="occasion"
            name="occasion"
          >
            <option value="">None</option>
            <option value="birthday">Birthday</option>
            <option value="engagement">Engagement</option>
            <option value="anniversary">Anniversary</option>
          </select>
        </label>
        <label htmlFor="table">
          <p>Table preference</p>
          <select
            value={form.tablePreference}
            onChange={handleChange}
            id="tablePreference"
            name="tablePreference"
          >
            <option value="">None</option>
            <option value="inside">Inside</option>
            <option value="outside">Outside</option>
          </select>
        </label>
      </div>
      <div className="column">
        <label htmlFor="message">
          <p>Additional requests</p>
          <textarea
            value={form.message}
            onChange={handleChange}
            name="message"
            id="message"
            cols="30"
            rows="10"
          ></textarea>
        </label>
      </div>
      <div className="submit-container">
        <button disabled={!isFormValid}>Make Reservation</button>
      </div>
    </form>
  );
};

export default BookingForm;
