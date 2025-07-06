import React, { useEffect, useState, useCallback } from "react";
import {
  getStaff,
  createStaff,
  updateStaff,
  deleteStaff,
} from "../../../services/staffService";
import StaffTable from "../../../components/admin/StaffTable";
import StaffModal from "../../../components/admin/StaffModal";
import Pagination from "../../../components/Pagination";
import LimitDropdown from "../../../components/LimitDropdown";
import SearchInput from "../../../components/SearchInput";
import { toast } from "react-toastify";

function StaffPage() {
  const [staffList, setStaffList] = useState([]);
  const [editingStaff, setEditingStaff] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalPages: 1,
  });
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const loadStaff = useCallback(
    async (page = 1, limit = 10) => {
      const res = await getStaff(page, limit, search);
      setStaffList(res.data.data);
      setPagination({
        page: res.data.page,
        limit: res.data.limit,
        totalPages: res.data.totalPages,
      });
    },
    [search]
  );

  useEffect(() => {
    loadStaff();
  }, [loadStaff]);

  const handleSave = async (data) => {
    try {
      if (editingStaff) {
        await updateStaff(editingStaff.id, data);
        toast.success("Staff updated successfully");
      } else {
        await createStaff(data);
        toast.success("Staff created successfully");
      }
      loadStaff();
      closeModal();
    } catch (error) {
      const errorMsg = error.response?.data?.error || "Save failed";
      toast.error(errorMsg);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this staff member?")) {
      try {
        await deleteStaff(id);
        loadStaff();
      } catch (error) {
        console.error("Delete failed:", error);
      }
    }
  };

  const openCreateModal = () => {
    setEditingStaff(null);
    setShowModal(true);
  };

  const openEditModal = (staff) => {
    setEditingStaff(staff);
    setShowModal(true);
  };

  const closeModal = () => {
    setEditingStaff(null);
    setShowModal(false);
  };
  const handlePageChange = (newPage) => {
    loadStaff(newPage);
  };
  const handleLimitChange = (newLimit) => {
    setLimit(newLimit);
    loadStaff(1, newLimit);
  };
  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Manage Staff</h2>
        <button className="btn btn-primary" onClick={openCreateModal}>
          + Add Staff
        </button>
      </div>
      <div className="d-flex">
        <LimitDropdown limit={limit} onLimitChange={handleLimitChange} />
        <SearchInput
          value={search}
          onChange={(value) => {
            setSearch(value);
            loadStaff(1, pagination.limit);
          }}
          placeholder="Search staff by name or email"
        />
      </div>
      <StaffTable
        data={staffList}
        onEdit={openEditModal}
        onDelete={handleDelete}
      />
      <Pagination
        page={pagination.page}
        totalPages={pagination.totalPages}
        onPageChange={handlePageChange}
      />
      <StaffModal
        show={showModal}
        staff={editingStaff}
        onClose={closeModal}
        onSubmit={handleSave}
      />
    </div>
  );
}

export default StaffPage;
