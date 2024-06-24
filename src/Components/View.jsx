import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Form, Col, Row, InputGroup, Button, Container } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { useNavigate } from 'react-router-dom';

function View() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showTotalDays, setShowTotalDays] = useState(false);
  const [displayLimit, setDisplayLimit] = useState(10);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://admin-backend-8x2p.onrender.com/getattendanceModel')
      .then(response => {
        setUsers(response.data);
        setFilteredUsers(response.data);
        localStorage.setItem('users', JSON.stringify(response.data));
      })
      .catch(error => console.log(error));
  }, []);

  const filterData = () => {
    const filtered = users.filter(user => {
      const [year, month, day] = user.loginDate.split('-');
      const formattedLoginDate = `${day}-${month}-${year}`;
      const loginDate = new Date(formattedLoginDate);

      const startDateObject = startDate ? new Date(startDate) : null;
      const endDateObject = endDate ? new Date(endDate) : null;

      const dateInRange = (!startDateObject || loginDate >= startDateObject) && (!endDateObject || loginDate <= endDateObject);
      const emailMatch = searchQuery ? user.email.toLowerCase().startsWith(searchQuery.toLowerCase()) : true;

      return dateInRange && emailMatch;
    });

    setFilteredUsers(filtered);
  };

  useEffect(() => {
    filterData();
  }, [searchQuery, startDate, endDate, users]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setStartDate(null);
    setEndDate(null);
  };

  const handleButtonClick = () => {
    setShowTotalDays(!showTotalDays);
    if (!showTotalDays) {
      navigate('/totaldays');
    }
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    const tableColumn = ["Login Time", "Email", "Total Time"];
    const tableRows = [];

    filteredUsers.forEach(user => {
      const userData = [
        user.loginDate,
        user.email,
        user.totalTimeSpent,
      ];
      tableRows.push(userData);
    });

    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.text("User Attendance", 14, 15);
    doc.save("user_attendance.pdf");
  };

  const downloadExcel = () => {
    const columns = [
      { label: "Login Time", key: "loginDate" },
      { label: "Email", key: "email" },
      { label: "Total Time", key: "totalTimeSpent" },
    ];

    const dataToExport = filteredUsers.map(user => {
      const row = {};
      columns.forEach(col => {
        row[col.label] = user[col.key];
      });
      return row;
    });

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");

    XLSX.writeFile(workbook, "user_attendance.xlsx");
  };

  const handleShowMore = () => {
    setDisplayLimit(displayLimit + 10);
  };

  const handleShowLess = () => {
    setDisplayLimit(displayLimit - 10);
  };

  const handleSelectUser = (userId) => {
    setSelectedUsers(prevSelected => 
      prevSelected.includes(userId) 
        ? prevSelected.filter(id => id !== userId) 
        : [...prevSelected, userId]
    );
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map(user => user._id));
    }
    setSelectAll(!selectAll);
  };

  const handleDeleteUsers = () => {
    axios.delete('https://admin-backend-8x2p.onrender.com/deleteUsers', { data: { ids: selectedUsers } })
    .then(response => {
      console.log(response.data.message); // Log the response message
      setUsers(users.filter(user => !selectedUsers.includes(user._id)));
      setSelectedUsers([]);
    })
    .catch(error => console.log(error));
  };

  return (
    <Container fluid>
      <style jsx>{`
        .equal-width-table th,
        .equal-width-table td {
          width: calc(100% / 5); /* Updated width for new checkbox column */
          text-align: center;
        }
        .table-container {
          max-height: 500px;
          overflow-y: auto;
        }
      `}</style>
      <Row>
        <Col md={showTotalDays ? 7 : 12}>
          <Form>
            <Row className="mb-3">
              <Col>
                <Form.Control
                  type="text"
                  placeholder="Search by email"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </Col>
              <Col>
                <InputGroup>
                  <InputGroup.Text>Date</InputGroup.Text>
                  <DatePicker
                    selected={startDate}
                    onChange={handleStartDateChange}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="Start Date"
                    className="form-control"
                  />
                  <DatePicker
                    selected={endDate}
                    onChange={handleEndDateChange}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="End Date"
                    className="form-control ms-2"
                  />
                </InputGroup>
              </Col>
              <Col>
                <Button onClick={handleClearFilters}>
                  Clear Filters
                </Button>
              </Col>
            </Row>
          </Form>

          <div className="d-flex justify-content-between mb-3">
            <InputGroup>
              <InputGroup.Text>Download as</InputGroup.Text>
              <Button variant="outline-danger" onClick={downloadPDF}>
                PDF
              </Button>
              <Button variant="outline-success" onClick={downloadExcel}>
                Excel
              </Button>
            </InputGroup>
          </div>

          <div className="table-container">
            <Table striped bordered hover className="equal-width-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Email</th>
                  <th>Total Time</th>
                  <th>Present</th>
                  <th>
                    <Form.Check 
                      type="checkbox"
                      checked={selectAll}
                      onChange={handleSelectAll}
                    />
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.slice(0, displayLimit).map(user => (
                  <tr key={user._id}>
                    <td>{user.loginDate}</td>
                    <td>{user.email}</td>
                    <td>{user.totalTimeSpent}</td>
                    <td>{user.totalDays}</td>
                    <td>
                      <Form.Check 
                        type="checkbox"
                        checked={selectedUsers.includes(user._id)}
                        onChange={() => handleSelectUser(user._id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          {filteredUsers.length > displayLimit && (
            <Button onClick={handleShowMore} variant="link">
              Show More
            </Button>
          )}
          {displayLimit > 10 && (
            <Button onClick={handleShowLess} variant="link">
              Show Less
            </Button>
          )}

          <Button onClick={handleDeleteUsers} className="mt-3" variant="danger">
            Delete Selected
          </Button>

          <Button onClick={handleButtonClick} className="mt-3">
            {showTotalDays ? 'Hide Total Days' : 'View Total Days Worked'}
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default View;
