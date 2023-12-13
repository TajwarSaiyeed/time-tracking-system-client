import { useState } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Table,
  InputGroup,
  FormControl,
  Card,
  Button,
} from "react-bootstrap";
import { Navigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

const WeeklyTimeViewScreen = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const [startDate, setStartDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [timesheetData, setTimesheetData] = useState([]);
  const [totalHours, setTotalHours] = useState(0);
  const [barChartData, setBarChartData] = useState([]);

  const fetchTimesheetData = async () => {
    const sDate = new Date(startDate);
    const endDate = new Date(
      sDate.getFullYear(),
      sDate.getMonth(),
      sDate.getDate() + 6
    );
    const response = await axios.post(
      `http://localhost:8000/api/time-entry/weekly?startDate=${sDate.toISOString()}&endDate=${endDate.toISOString()}`,
      {
        userId: userInfo.id,
      },
      {
        withCredentials: true,
      }
    );
    setTimesheetData(response.data);

    let total = 0;

    response.data.forEach((entry) => {
      const startTime = new Date(entry.startTime);
      const endTime = new Date(entry.endTime);
      total += Math.ceil((endTime - startTime) / (1000 * 60 * 60));
    });

    setTotalHours(total);

    const chartData = response.data.map((entry) => ({
      date: new Date(entry.date).toLocaleDateString(),
      hoursWorked: Math.ceil(
        (new Date(entry.endTime) - new Date(entry.startTime)) / (1000 * 60 * 60)
      ),
    }));
    setBarChartData(chartData);
  };

  if (!userInfo) {
    return <Navigate to="/" replace={true} />;
  }

  const handleDateChange = (e) => {
    setStartDate(e.target.value);
  };

  console.log(barChartData);

  return (
    <Card className="p-5 d-flex flex-column align-items-center hero-card bg-light w-75 mx-auto">
      <Container fluid>
        <Row>
          <h1>Weekly Timesheet</h1>
        </Row>
        <Row>
          <Col xs={12} md={6}>
            <p>Select a week:</p>
            <InputGroup>
              <FormControl
                type="date"
                id="week-start-date"
                value={startDate}
                onChange={handleDateChange}
              />
              <Button variant="primary" onClick={fetchTimesheetData}>
                Go
              </Button>
            </InputGroup>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Table striped bordered hover className="mt-2">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Start Time</th>
                  <th>End Time</th>
                  <th>Hours Worked</th>
                </tr>
              </thead>
              <tbody>
                {timesheetData.map((entry) => (
                  <tr key={entry.id}>
                    <td>{new Date(entry.date).toLocaleDateString()}</td>
                    <td>{new Date(entry.startTime).toLocaleTimeString()}</td>
                    <td>{new Date(entry.endTime).toLocaleTimeString()}</td>
                    <td>
                      {Math.ceil(
                        (new Date(entry.endTime) - new Date(entry.startTime)) /
                          (1000 * 60 * 60)
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          <Col xs={12} className="text-end">
            <p>Total Hours Worked: {totalHours}</p>
          </Col>
        </Row>
      </Container>
      <Col xs={12}>
        <Row>
          {/* Bar Chart */}
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={barChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="hoursWorked" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </Row>
      </Col>
    </Card>
  );
};

export default WeeklyTimeViewScreen;
