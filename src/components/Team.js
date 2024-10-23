// src/components/Team.js

import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import "../styles/login.css";
import "../styles/submitApplication.css";
import "../styles/team.css";

import member1 from './member1.png'; 

const Team = () => {
    const { t } = useTranslation();

    // Array to store information about each team member
    const teamMembers = [
      {
        name: "John Doe",
        role: "Lead Engineer",
        description: "John has over 10 years of experience in software development.",
        imageUrl: member1,
      },
      {
        name: "Jane Smith",
        role: "Project Manager",
        description: "Jane is a skilled manager with a background in agile methodologies.",
        imageUrl: member1,
      },
      {
        name: "Alice Brown",
        role: "UI/UX Designer",
        description: "Alice specializes in creating intuitive user experiences.",
        imageUrl: member1,
      },
    ];
  
    return (
      <div className="team-container" style={{ paddingTop: '100px' }}>

        {/* Adding link*/}
        <Link to="/team">{t("team")}</Link>

        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <div key={index} className="team-member">
              <img src={member.imageUrl} alt={member.name} className="team-member-image" />
              <h2>{member.name}</h2>
              <h3>{member.role}</h3>
              <p>{member.description}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
export default Team;

