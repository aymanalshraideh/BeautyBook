import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import {
  getAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment,
} from "../../../services/appointmentService";
import { getServices } from "../../../services/serviceService";
import { getStaff } from "../../../services/staffService";
import { getCustomers } from "../../../services/customerService";
import AppointmentTable from "../../../components/admin/Appointments/AppointmentTable";
import AppointmentModal from "../../../components/admin/Appointments/AppointmentModal";
import AppointmentFilters from "../../../components/admin/Appointments/AppointmentFilters";
import Pagination from "../../../components/Pagination";
import SearchInput from "../../../components/SearchInput";
import LimitDropdown from "../../../components/LimitDropdown";
import AppointmentPDFReport from "../../../services/AppointmentPDFReport";


function AppointmentPage() {
  const [appointments, setAppointments] = useState([]);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [limit, setLimit] = useState(10);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalPages: 1,
  });
  const [search, setSearch] = useState("");
  const [services, setServices] = useState([]);
  const [staff, setStaff] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [filters, setFilters] = useState({
    status: "",
    dateFrom: "",
    dateTo: "",
    serviceId: "",
  });

  const loadAppointments = useCallback(
    async (page = 1, limit = 10) => {
      const res = await getAppointments(
        page,
        limit,
        search,
        filters.status,
        filters.dateFrom,
        filters.dateTo,
        filters.serviceId
      );
      setAppointments(res.data.data);
      setPagination({
        page: res.data.page,
        limit: res.data.limit,
        totalPages: res.data.totalPages,
      });
    },
    [search, filters]
  );

  const loadServicesStaffCustomers = async () => {
    try {
      const servicesRes = await getServices();
      setServices(servicesRes.data.data);
      const staffRes = await getStaff();
      setStaff(staffRes.data.data);
      const customersRes = await getCustomers();
      setCustomers(customersRes.data.data);
    } catch (error) {
      console.log("Error loading services, staff, and customers:", error);
    }
  };

  useEffect(() => {
    loadAppointments(pagination.page, limit); // Load appointments based on pagination state
    loadServicesStaffCustomers();
  }, [loadAppointments, pagination.page, limit]);

  const handleSave = async (data) => {
    try {
      if (editingAppointment) {
        await updateAppointment(editingAppointment.id, data);
        toast.success("Appointment updated successfully");
      } else {
        await createAppointment(data);
        toast.success("Appointment created successfully");
      }
      loadAppointments(pagination.page, limit); // Load the data after the appointment is created/updated
      closeModal();
    } catch (error) {
      console.log(error);

      toast.error(error.response?.data?.error || "Save failed");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this appointment?")) {
      try {
        await deleteAppointment(id);
        loadAppointments(pagination.page, limit); // Reload data after deletion
      } catch (error) {
        console.error("Delete failed:", error);
      }
    }
  };

  const openCreateModal = () => {
    setEditingAppointment(null);
    setShowModal(true);
  };

  const openEditModal = (appointment) => {
    setEditingAppointment(appointment);
    setShowModal(true);
  };

  const closeModal = () => {
    setEditingAppointment(null);
    setShowModal(false);
  };

  const handlePageChange = (newPage) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
  };

  const handleLimitChange = (newLimit) => {
    setLimit(newLimit);
    setPagination((prev) => ({ ...prev, page: 1 })); // Reset to page 1 when limit changes
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Manage Appointments</h2>
        <AppointmentPDFReport appointments={appointments} />
        <button className="btn btn-primary" onClick={openCreateModal}>
          + Add Appointment
        </button>
      </div>
     <div className="d-flex flex-column flex-md-row gap-2 mb-3">

        <LimitDropdown limit={limit} onLimitChange={handleLimitChange} />
        <SearchInput
          value={search}
          onChange={(value) => {
            setSearch(value);
            loadAppointments(1, limit); // Reset to page 1 when search changes
          }}
          placeholder="Search appointments by customer or service"
        />
        <AppointmentFilters
          filters={filters}
          onChange={(newFilters) => {
            setFilters(newFilters);
            loadAppointments(1, limit); // reset to page 1
          }}
          services={services}
        />
   

      </div>
      <AppointmentTable
        appointments={appointments}
        onEdit={openEditModal}
        onDelete={handleDelete}
      />
      <Pagination
        page={pagination.page}
        totalPages={pagination.totalPages}
        onPageChange={handlePageChange}
      />
      <AppointmentModal
        show={showModal}
        appointment={editingAppointment}
        onClose={closeModal}
        onSubmit={handleSave}
        services={services}
        staff={staff}
        customers={customers}
      />
    </div>
  );
}

export default AppointmentPage;
