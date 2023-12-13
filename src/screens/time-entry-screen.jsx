import { useState } from "react";
import FormContainer from "../components/form-container";
import { Form, Button } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const TimeEntryScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [notes, setNotes] = useState("");

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  if (!userInfo) {
    return <Navigate to="/" replace={true} />;
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const data = {
        date,
        startTime,
        endTime,
        notes,
        userId: userInfo.id,
      };

      await axios.post("http://localhost:8000/api/time-entry/create", data);
      toast.success("Time Entry Created Successfully");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormContainer>
      <h1>Time Entry Form</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="my-2">
          <Form.Label>Date:</Form.Label>
          <Form.Control
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="my-2">
          <Form.Label>Start Time:</Form.Label>
          <Form.Control
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="my-2">
          <Form.Label>End Time:</Form.Label>
          <Form.Control
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="my-2">
          <Form.Label>Notes:</Form.Label>
          <Form.Control
            as="textarea"
            rows="3"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </Form.Group>

        <Button type="submit" variant="primary" className="my-3">
          {isLoading ? "Submitting..." : "Save"}
        </Button>
      </Form>
    </FormContainer>
  );
};

export default TimeEntryScreen;
