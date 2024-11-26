import React, { useEffect, useState } from "react";
import CustomerFeedback from "./customerFeedback";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [applicationToDelete, setApplicationToDelete] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [activeTab, setActiveTab] = useState("applications");
  const navigate = useNavigate()

  axios.defaults.withCredentials = true;

  useEffect(() => {
    const fetchApplications = async () => {
        try {
            const verifyRes = await axios.get('http://localhost:5000/api/verify');
            
            if (verifyRes.data.status) {
                const appRes = await fetch("http://localhost:5000/api/getApplications");
                const appData = await appRes.json();
                setApplications(appData);
            } else {
                navigate('/login');
            }
        } catch (error) {
            console.error("Error fetching applications:", error);
        } finally {
            setLoading(false);
        }
    };

    fetchApplications();
}, [navigate]);


  const updateStatus = async (id, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/api/updateStatus/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        setApplications((prevApplications) =>
          prevApplications.map((app) =>
            app._id === id ? { ...app, status: newStatus } : app
          )
        );
      } else {
        console.error("Failed to update status");
      }
    } catch (error) {
      console.error("Error updating application status:", error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending Approval":
        return "bg-orange-300";
      case "Approved":
        return "bg-green-500";
      case "Rejected":
        return "bg-red-500";
      default:
        return "";
    }
  };
  axios.defaults.withCredentials = true;
const handleLogout = () => {
  axios.get('http://localhost:5000/api/logout')
  .then(res => {
    if(res.data.status){
      navigate('/login')
    }
  }).catch(err =>{
    console.log(err, err.message);
    
  })
}

  const handlePrint = () => {
    const printContent = document.getElementById("applicant-table").innerHTML;
    const printWindow = window.open("", "", "height=800,width=800");
    printWindow.document.write("<html><head><title>Applications</title><style>");
    printWindow.document.write("table { width: 100%; border-collapse: collapse; }");
    printWindow.document.write("th, td { border: 1px solid black; padding: 8px; text-align: left; }");
    printWindow.document.write("</style></head><body>");
    printWindow.document.write("<h1>Applications List</h1>");
    printWindow.document.write("<table>");
    printWindow.document.write("<thead><tr><th>Name</th><th>ID</th><th>Email</th><th>Course</th><th>Status</th><th>Update Status</th><th>Actions</th></tr></thead>");
    printWindow.document.write(printContent); // Table data rows
    printWindow.document.write("</table>");
    printWindow.document.close();
    printWindow.print();
  };

  const openViewModal = (application) => {
    setSelectedApplication(application);
    setIsViewModalOpen(true);
  };

  const closeViewModal = () => {
    setIsViewModalOpen(false);
    setSelectedApplication(null);
  };

  const openDeleteModal = (application) => {
    setApplicationToDelete(application);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setApplicationToDelete(null);
  };

  const deleteApplication = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/deleteApplication/${id}`, {
        method: "DELETE",
      });
      setApplications((prevApplications) =>
        prevApplications.filter((app) => app._id !== id)
      );
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Error deleting application:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="admin-dashboard">
      <h1 className="text-2xl font-extrabold mb-4">Admin Dashboard</h1>

      {/* Tabs */}
      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => setActiveTab("applications")}
          className={`px-4 py-2 rounded ${activeTab === "applications" ? "bg-blue-500 text-white" : "bg-gray-300 text-black"}`}
        >
          Received Applications
        </button>
        <button
          onClick={() => setActiveTab("feedback")}
          className={`px-4 py-2 rounded ${activeTab === "feedback" ? "bg-blue-500 text-white" : "bg-gray-300 text-black"}`}
        >
          Customer Feedback
        </button>
        <button
        onClick={handleLogout}
        className="bg-red-500 p-2 rounded-lg  flex align-end justify-center text-black font-italic">
          Logout
        </button>{" "}
      </div>

      {/* Print Button */}
      <button onClick={handlePrint} className="bg-gray-500 text-white px-2 py-1 rounded mb-4">
        Print
      </button>

      {/* Tab Content */}
      {activeTab === "applications" ? (
        // Applications Tab
        <>
          {applications.length === 0 ? (
            <p>No applications have been submitted yet.</p>
          ) : (
            <table id="applicant-table" className="table-auto w-full border-collapse">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Name</th>
                  <th className="border px-4 py-2">ID Number</th>
                  <th className="border px-4 py-2">Email</th>
                  <th className="border px-4 py-2">Course</th>
                  <th className="border px-4 py-2">Status</th>
                  <th className="border px-4 py-2">Update Status</th>
                  <th className="border px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((application) => (
                  <tr key={application._id}>
                    <td className="border px-4 py-2">{application.name}</td>
                    <td className="border px-4 py-2">{application.idNumber}</td>
                    <td className="border px-4 py-2">{application.email}</td>
                    <td className="border px-4 py-2">{application.course}</td>
                    <td className="border px-4 py-2">
                      <span className={`text-white px-2 py-1 rounded ${getStatusColor(application.status)}`}>
                        {application.status}
                      </span>
                    </td>
                    <td className="border px-4 py-2">
                      <select
                        value={application.status}
                        onChange={(e) => updateStatus(application._id, e.target.value)}
                        className="text-black px-2 py-1 rounded"
                      >
                        <option value="Pending Approval">Pending </option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </td>
                    <td className="border px-4 py-2 flex space-x-2">
                      <button
                        onClick={() => openViewModal(application)}
                        className="bg-blue-500 text-white px-2 py-1 rounded"
                      >
                        View
                      </button>
                      <button
                        onClick={() => openDeleteModal(application)}
                        className="bg-red-500 text-white px-2 py-1 rounded"
                      >
                        Delete
                      </button>
                      {application.certification && (
                        <a
                          href={`http://localhost:5000/uploads/${application.certification}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-green-500 text-white px-2 py-1 rounded"
                        >
                          View Attachment
                        </a>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      ) : (
        // Customer Feedback Tab
        <div>
          <CustomerFeedback />
        </div>
      )}

      {/* View Modal */}
      {isViewModalOpen && selectedApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-3/4 max-w-xl">
            <h3 className="text-3xl font-semibold mb-4 text-center">{selectedApplication.name}</h3>
            <div className="space-y-4">
              <p><strong>Application ID:</strong> {selectedApplication._id}</p>
              <p><strong>Email:</strong> {selectedApplication.email}</p>
              <p><strong>Course:</strong> {selectedApplication.course}</p>
              <p><strong>Certification:</strong> {selectedApplication.certification ? "Uploaded" : "Not uploaded"}</p>
              <button
                onClick={closeViewModal}
                className="bg-gray-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-gray-600 transition duration-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && applicationToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-3/4 max-w-xl">
            <h3 className="text-3xl font-semibold mb-4 text-center">Confirm Deletion</h3>
            <p className="mb-6">Are you sure you want to delete the application of {applicationToDelete.name}?</p>
            <div className="flex justify-between">
              <button
                onClick={() => deleteApplication(applicationToDelete._id)}
                className="bg-red-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-600 transition duration-300"
              >
                Yes, Delete
              </button>
              <button
                onClick={closeDeleteModal}
                className="bg-gray-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-gray-600 transition duration-300"
              >
                No, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Applications;
