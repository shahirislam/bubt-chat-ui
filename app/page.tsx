"use client";
import { useState, useEffect } from "react";
import Chat from "./Chat";

const styles = {
  pageContainer: {
    display: "flex",
    height: "100vh",
    overflow: "hidden",
  },
  sideSection: {
    flex: "0 0 25%",
    backgroundColor: "#e0e0e0",
    padding: "10px",
    overflowY: "auto",
  },
  chatSection: {
    flex: "0 0 50%",
    backgroundColor: "#f5f8fb",
  },
  image: {
    width: "80%",
  },
  p: {
    fontSize: "10px",
  },
  rightContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "10px",
    backgroundColor: "#f9f9f9",
    height: "100%",
    overflowY: "auto",
  },
  card: {
    backgroundColor: "white",
    width: "90%",
    padding: "15px",
    margin: "10px 0",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  placeholder: {
    color: "#888",
    fontSize: "14px",
    marginTop: "20px",
  },
};

export default function HomePage() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [contributions, setContributions] = useState([]); // Placeholder for future data

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";

    document.documentElement.style.margin = "0";
    document.body.style.margin = "0";
    document.documentElement.style.padding = "0";
    document.body.style.padding = "0";

    // Fetch contributions from an API in the future
    setContributions([]); // Currently empty for testing

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.margin = "";
      document.body.style.margin = "";
      document.documentElement.style.padding = "";
      document.body.style.padding = "";
    };
  }, []);

  return (
    <div style={styles.pageContainer}>
      {/* Left Section */}
      <div style={styles.sideSection}>
        <img
          src="https://play-lh.googleusercontent.com/i0bOugeoRKu4nj6jZA21i2cFA8hmlg06N86XnUqeCK3yf8E7Dl4reB39eta-M9VdFQ=w3840-h2160-rw"
          alt="BUBT Logo"
          style={styles.image}
        />
        <h4>Bangladesh University of Business and Technology (BUBT)</h4>
        <p>
          This is a project developed by students of BUBT to help out students with
          necessary information on day-to-day life.
        </p>
        <br />
        <h3>User Guide</h3>
        <p>
          Select your Intake and Section from the dropdown. Then Type :
          <br />
          <b>0</b> for Announcement <br />
          <b>1</b> for Assignments <br />
          <b>2</b> for Class Test <br />
          <b>3</b> for Additional Notes <br />
          <b>4</b> for Book PDF <br />
          <b>5</b> for Teacher Details <br />
        </p>

        <p>
          Copyright © 2024{" "}
          <a href="#" onClick={openModal}>
            Developer Credit
          </a>
        </p>
      </div>

      {/* Middle Section */}
      <div style={styles.chatSection}>
        <Chat />
      </div>

      {/* Right Section */}
      <div style={styles.sideSection}>
        <div style={styles.rightContent}>
          <h3>Contributions by Students</h3>
          {contributions.length === 0 ? (
            <p style={styles.placeholder}>No contributions yet</p>
          ) : (
            contributions.map((contribution, index) => (
              <div key={index} style={styles.card}>
                <h4>{contribution.name}</h4>
                <p>{contribution.description}</p>
                <a href={contribution.link} target="_blank" rel="noopener noreferrer">
                  View Contribution
                </a>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <>
          <div
            style={{
              position: "fixed",
              top: "0",
              left: "0",
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 999,
            }}
            onClick={closeModal}
          ></div>
          <div style={styles.modal}>
          {/* This is dev credit */}
            <h4>Developer Name</h4>
            <p>
              <a href="https://github.com/lifeofdekisugi">Shahir Islam</a> - Lead
              Developer
            </p>
            <p>
              <a href="https://github.com/devsazidhasan">Sazid Hasan</a> - Developer
            </p>
            <button onClick={closeModal}>Close</button>
          </div>
        </>
      )}
    </div>
  );
}
