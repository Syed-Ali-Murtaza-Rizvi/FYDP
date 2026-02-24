import React, { useState } from "react";
import orgAdminData from "../data/OrgAdminData";
import "../styles/orgAdmin.css";
import { LayoutDashboard } from "lucide-react";
import Overview from "../components/OrgAdmin/Overview";
import Admins from "../components/OrgAdmin/Admins";
import EventAdmins from "../components/OrgAdmin/EventAdmins";
import Meetings from "../components/OrgAdmin/Meetings";
import Payments from "../components/OrgAdmin/Payments";
import Users from "../components/OrgAdmin/Users";


const OrganizationalAdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const renderComponent = () => {
    switch (activeTab) {
      case "overview":
        return <Overview />;
      case "admins":
        return <Admins data={orgAdminData.admins} />;
      case "eventAdmins":
        return <EventAdmins />;
      case "meetings":
        return <Meetings />;
      case "payments":
        return <Payments />;
      case "users":
        return <Users />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className="orgdash">
        <div className="mainn">
      <h2>Organizational Admin Dashboard</h2>
      <br></br>
      <p>SaaS Platform - Multi-Organization Management</p>
     </div>
     <br></br>
     <div className="mainbox">
      <div className="tabs-container">
  <button
    className={activeTab === "overview" ? "tab active" : "tab"}
    onClick={() => setActiveTab("overview")}
  >
    <span className="tab-icon"> <LayoutDashboard size={18} /></span>
    Overview
  </button>

  <button
    className={activeTab === "admins" ? "tab active" : "tab"}
    onClick={() => setActiveTab("admins")}
  >
    <span className="tab-icon">👥</span>
    Admins
  </button>

  <button
    className={activeTab === "eventAdmins" ? "tab active" : "tab"}
    onClick={() => setActiveTab("eventAdmins")}
  >
    <span className="tab-icon">📅</span>
    Event Admins
  </button>

  <button
    className={activeTab === "meetings" ? "tab active" : "tab"}
    onClick={() => setActiveTab("meetings")}
  >
    <span className="tab-icon">🗓</span>
    Meetings
  </button>

  <button
    className={activeTab === "payments" ? "tab active" : "tab"}
    onClick={() => setActiveTab("payments")}
  >
    <span className="tab-icon">💲</span>
    Payments
  </button>

  <button
    className={activeTab === "users" ? "tab active" : "tab"}
    onClick={() => setActiveTab("users")}
  >
    <span className="tab-icon">👤</span>
    Users
  </button>
  
</div>
<div className="content">{renderComponent()}</div>

      </div>

      
    </div>
  );
};

export default OrganizationalAdminDashboard;
