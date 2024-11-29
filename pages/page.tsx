"use client";
import { useState, useEffect } from "react";
import Chat from "./Chat";
import Image from 'next/image';
import { CSSProperties } from "react";

import Head from 'next/head';

const styles: { [key: string]: CSSProperties } = {
  p: {
    fontSize: "10px",
  },
  modal: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    zIndex: 1000,
    width: "300px",
    textAlign: "center",
  },
  overlay: {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 999,
    display: "block",
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
};

export default function HomePage() {


  const [isModalOpen, setModalOpen] = useState(false);
  const [visitorCount, setVisitorCount] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Open and close modal functions
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  // Prevent body overflow when the component mounts
  useEffect(() => {



    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    document.documentElement.style.margin = "0";
    document.body.style.margin = "0";
    document.documentElement.style.padding = "0";
    document.body.style.padding = "0";

    // Fetch visitor count from the API
    const fetchVisitorCount = async () => {
      try {
        const response = await fetch("/api/visitor"); // Calls your API route
        const data = await response.json();
        setVisitorCount(data.count); // Update state with visitor count
      } catch (error) {
        console.error("Error fetching visitor count:", error);
      }
    };

    fetchVisitorCount(); // Call the function when the component mounts

    return () => {
      document.body.style.overflow = originalOverflow;
      document.documentElement.style.margin = "";
      document.body.style.margin = "";
      document.documentElement.style.padding = "";
      document.body.style.padding = "";
    };
  }, []);

  useEffect(() => { const handleResize = () => { 
    setIsMobile(window.innerWidth <= 768); }; 
    window.addEventListener('resize', handleResize); handleResize(); // Initial check 
    return () => window.removeEventListener('resize', handleResize); 
  }, []);

  return (
    <>

      <Head>
        <title>BUBT ChatBot</title>
        <meta name="description" content="This is a chat bot website made bby Shahir Islam a student of BUBT intake 47." />
      </Head>

    <div className="pageContainer">

      {!isMobile && ( 
        <div className="leftSection"> 
        {/* Left Section content */} 
        <Image
          src="/bubtLogo.webp"
          alt="BUBT Logo"
          width={250}     // Set the width in pixels (e.g., 80% of the container)
          height={100}    // Maintain the aspect ratio based on the original image
        />



        <h4>Bangladesh University of Business and Technology (BUBT)</h4>
        <p>
          This project is developed by BUBT students to help provide necessary information.
        </p>
        <h3>User Guide</h3>
        <p>
          Select your Intake and Section, then type:
          <br />
          <b>0</b> for Announcement <br />
          <b>1</b> for Assignments <br />
          <b>2</b> for Class Tests <br />
          <b>3</b> for Additional Notes <br />
          <b>4</b> for Book PDFs <br />
          <b>5</b> for Teacher Details <br />
          <b>404</b> for User Review <br />
        </p>

        <br />

        <p>
          Copyright © 2024{" "}
          <a href="#" onClick={openModal}>
            Developer Credit
          </a>
        </p>

        <a 
          href="https://github.com/shahirislam/bubt-chat-ui" 
          target="_blank" 
          rel="noopener noreferrer"
        >
        <Image
          src="/githubLogo.svg"
          alt="Github Logo"
          width={70}
          height={80}
        />
      </a>

        <a 
        href="https://wa.me/8801600304131" 
        target="_blank" 
        rel="noopener noreferrer"
        >
        <Image
          src="/whatsappLogo.svg"
          alt="WhatsApp Logo"
          width={70}
          height={80}
          style={{ marginLeft: '8px' }}
        />
        </a>


        </div> 
      )}

      {/* Middle Section - Chat */}
      <div className="chatSection">
        <Chat />
      </div>

      {/* Right Section - Visitor Count */}

      {!isMobile && ( 
        <div className="rightSection"> 
          <center>
            <h3>Total Visitors</h3>
            <p>{visitorCount}</p> {/* Display visitor count */}
            <hr className="custom-divider"/>

            <h3>Total API Call</h3>
            <p>0</p>
            <hr className="custom-divider"/>

          </center>

        </div> 
      )}

      {/* Modal */}
      {isModalOpen && (
        <>
          <div style={styles.overlay} onClick={closeModal}></div>
          <div style={styles.modal}>
            <h4>Developer Name</h4>
            <p>
              <a href="https://github.com/shahirislam">Shahir Islam</a> - Lead Developer
            </p>
            <button onClick={closeModal}>Close</button>
          </div>
        </>
      )}
    </div>
    </>
  );
}
