import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import Booking from "./pages/Booking";
import BookingConfirmation from "./pages/BookingConfirmation ";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/booking" element={<Booking />} />
          <Route
            path="/booking-confirmation"
            element={<BookingConfirmation />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
