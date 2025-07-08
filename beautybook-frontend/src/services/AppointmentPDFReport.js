import React from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const AppointmentPDFReport = ({ appointments }) => {
  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Appointment Report", 14, 20);

    autoTable(doc, {
      startY: 30,
      head: [["#", "Customer", "Service", "Staff", "Date", "Status"]],
      body: appointments.map((a, index) => [
        index + 1,
        a.customer?.name || "N/A",
        a.service?.name || "N/A",
        a.staff?.name || "N/A",
        new Date(a.date).toLocaleString(),
        a.status,
      ]),
    });

    doc.save("appointments_report.pdf");
  };

  return (
    <button className="btn btn-success" onClick={generatePDF}>
      Generate PDF Report
    </button>
  );
};

export default AppointmentPDFReport;
