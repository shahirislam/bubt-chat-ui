"use client";

import React, { useState } from 'react';
import './style.css'; // Import the shimmer styles

function Chat() {
  const [intake, setIntake] = useState('');
  const [section, setSection] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [commandMessage, setCommandMessage] = useState('');


  const handleIntakeChange = (event) => {
    setIntake(event.target.value);
  };

  const handleSectionChange = (event) => {
    setSection(event.target.value);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async () => {
    if (!intake || !section || !inputValue) {
      alert('Please fill out all fields before submitting.');
      return;
    }

    const commandText = {
      '0': 'Announcements',
      '1': 'Assignments',
      '2': 'Class Tests',
      '3': 'Notes',
      '4': 'Book Links',
      '5': 'Teacher Details',
      '404': 'Review',
    }[inputValue.trim()] || 'Unknown Command';
  
    setCommandMessage(`Show ${commandText} for intake ${intake} section ${section}`);
  
    setLoading(true);
    const sectionCode = `${intake}${section}`;
    const commandCode = inputValue.trim();
  
    let endpoint = '';
    switch (commandCode) {
      case '0':
        endpoint = '/announcements';
        break;
      case '1':
        endpoint = '/assignments';
        break;
      case '2':
        endpoint = '/classtest';
        break;
      case '3':
        endpoint = '/notes';
        break;
      case '4':
        endpoint = '/booklink';
        break;
      case '5':
        endpoint = '/teacherdetails';
        break;
      case '404':
        endpoint = '/review';
        break;
      default:
        setResponse('Invalid command. Please try again.');
        setLoading(false);
        return;
    }
  
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}${endpoint}?section_code=${sectionCode}`;
    console.log(`Fetching from API: ${apiUrl}`);
  
    try {
      const response = await fetch(apiUrl);
  
      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }
  
      const data = await response.json();
  
      // Format responses based on commandCode
      let formattedData;
      switch (commandCode) {
        case '0': // Announcements
          formattedData = data.map((item) => {
            const [dateLine, announcementLine] = item.split('\n').filter(Boolean);
            return {
              date: dateLine.replace('Date : ', '').trim(),
              announcement: announcementLine.replace('Announcement : ', '').trim(),
            };
          });
          break;
  
        case '1': // Assignments
          formattedData = data.map((item) => ({
            subject: item.subject,
            description: item.description,
            dueDate: item.due_date,
            demoLink: item.assignment_demo,
          }));
          break;
  
        case '2': // Class Tests
          formattedData = data.map((item) => {
            const [subjectLine, dateLine, topicLine] = item.split('\n').filter(Boolean);
            return {
              subject: subjectLine.replace('Subject Name : ', '').trim(),
              date: dateLine.replace('Exam Date : ', '').trim(),
              topic: topicLine.replace('Topic : ', '').trim(),
            };
          });
          break;
  
        case '3': // Notes
          formattedData = data.map((item) => {
            const [subjectLine, linkLine] = item.split('\n').filter(Boolean);
            return {
              subject: subjectLine.replace('Subject : ', '').trim(),
              link: linkLine.replace('Resources : ', '').trim(),
            };
          });
          break;
  
        case '4': // Book Links
          formattedData = data.map((item) => {
            const [subjectLine, linkLine] = item.split('\n').filter(Boolean);
            return {
              subject: subjectLine.replace('Subject Name : ', '').trim(),
              link: linkLine.replace('Book Link : ', '').trim(),
            };
          });
          break;
  
        case '5': // Teacher Details
          formattedData = data.map((item) => {
            const [facultyLine, nameLine, emailLine, deskLine] = item.split('\n').filter(Boolean);
            return {
              faculty: facultyLine.replace('Faculty Name : ', '').trim(),
              name: nameLine.replace('Teacher Name : ', '').trim(),
              email: emailLine.replace('Teacher Email : ', '').trim(),
              desk: deskLine.replace('Teacher Desk : ', '').trim(),
            };
          });
          break;
  
        case '404': // Review Link
          formattedData = data.map((item) => ({
            url: item.replace('URL : ', '').trim(),
          }));
          break;
  
        default:
          formattedData = 'Invalid command. Please try again.';
          break;
      }
  
      setResponse(formattedData);
    } catch (error) {
      console.error('Error fetching data:', error);
      setResponse(`An error occurred while fetching data. Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div style={styles.container}>
      <div style={styles.inputContainer}>
        <select value={intake} onChange={handleIntakeChange} style={styles.selectBox}>
          <option value="" disabled>Select Intake</option>
          <option value="45">45</option>
          <option value="46">46</option>
          <option value="47">47</option>
        </select>
        <select value={section} onChange={handleSectionChange} style={styles.selectBox}>
          <option value="" disabled>Select Section</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter command (e.g., 1 for assignments)"
          style={styles.inputBox}
        />
        <button onClick={handleSubmit} style={styles.submitButton}>Submit</button>
      </div>

      <div style={styles.chatContainer}>
        {commandMessage && (
          <div style={styles.commandMessage} className="slide-in-right">
            {commandMessage}
          </div>
         )}
      </div>

<div style={styles.responseContainer}>
  {loading ? (
    <div className="shimmer-element"></div>
  ) : Array.isArray(response) ? (
    response[0]?.url ? (
      // Review Link
      <ul style={styles.list}>
        {response.map((item, index) => (
          <li key={index} style={styles.listItem}>
            <strong>Review Form:</strong>{' '}
            <a href={item.url} target="_blank" rel="noopener noreferrer">
              Fill the Form
            </a>
          </li>
        ))}
      </ul>
    ) : response[0]?.faculty ? (
      // Teacher Details
      <ul style={styles.list}>
        {response.map((item, index) => (
          <li key={index} style={styles.listItem}>
            <strong>Faculty:</strong> {item.faculty} <br />
            <strong>Name:</strong> {item.name} <br />
            <strong>Email:</strong> {item.email || 'N/A'} <br />
            <strong>Desk:</strong> {item.desk || 'N/A'}
          </li>
        ))}
      </ul>
    ) : response[0]?.link ? (
      // Notes or Book Links
      <ul style={styles.list}>
        {response.map((item, index) => (
          <li key={index} style={styles.listItem}>
            <strong>Subject:</strong> {item.subject} <br />
            <strong>Link:</strong>{' '}
            <a href={item.link} target="_blank" rel="noopener noreferrer">
              {item.link}
            </a>
          </li>
        ))}
      </ul>
    ) : response[0]?.topic ? (
      // Class Tests
      <ul style={styles.list}>
        {response.map((item, index) => (
          <li key={index} style={styles.listItem}>
            <strong>Subject:</strong> {item.subject} <br />
            <strong>Date:</strong> {item.date} <br />
            <strong>Topic:</strong> {item.topic}
          </li>
        ))}
      </ul>
    ) : response[0]?.dueDate ? (
      // Assignments
      <ul style={styles.list}>
        {response.map((item, index) => (
          <li key={index} style={styles.listItem}>
            <strong>Subject:</strong> {item.subject} <br />
            <strong>Description:</strong> {item.description} <br />
            <strong>Due Date:</strong> {item.dueDate} <br />
            {item.demoLink && (
              <>
                <strong>Demo:</strong>{' '}
                <a href={item.demoLink} target="_blank" rel="noopener noreferrer">
                  View Demo
                </a>
              </>
            )}
          </li>
        ))}
      </ul>
    ) : response[0]?.date ? (
      // Announcements
      <ul style={styles.list}>
        {response.map((item, index) => (
          <li key={index} style={styles.listItem}>
            <strong>Date:</strong> {item.date} <br />
            <strong>Announcement:</strong> {item.announcement}
          </li>
        ))}
      </ul>
    ) : (
      // Default
      <pre style={styles.responseBox}>{JSON.stringify(response, null, 2)}</pre>
    )
  ) : (
    <pre style={styles.responseBox}>
      {response ? response : 'No response yet. Submit a query!'}
    </pre>
  )}
</div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f5f8fb',
  },
  inputContainer: {
    position: 'fixed',
    bottom: '10px',
    left: '52%',
    transform: 'translateX(-50%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '15px',
    borderRadius: '25px',
    backgroundColor: '#fff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    width: '90%',
    maxWidth: '600px',
  },
  selectBox: {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '14px',
    marginRight: '10px',
    outline: 'none',
  },
  inputBox: {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '14px',
    marginRight: '10px',
    outline: 'none',
  },
  submitButton: {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '8px',
    backgroundColor: '#212121',
    color: '#fff',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '14px',
  },
  responseContainer: {
    marginTop: '20px',
    width: '90%',
    maxWidth: '600px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    padding: '10px',
    overflowY: 'auto',
  },
  responseBox: {
    marginTop: '20px',
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    padding: '10px',
    overflowY: 'auto',
    animation: 'slide-in-left 0.5s ease-in-out',
  },
  list: {
    listStyleType: 'none',
    padding: 0,
  },
  listItem: {
    marginBottom: '15px',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: '#f9f9f9',
  },
  link: {
    color: '#007bff',
    textDecoration: 'none',
  },
  chatContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '10px',
    position: 'relative',
    width: '100%',
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
  },
  commandMessage: {
    position: 'absolute',
    right: '10px',
    backgroundColor: '#212121',
    color: '#fff',
    padding: '10px',
    borderRadius: '8px',
    zIndex: 10,
  },
};

export default Chat;
