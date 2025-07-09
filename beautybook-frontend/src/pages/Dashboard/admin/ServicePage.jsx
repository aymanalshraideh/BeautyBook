import React, { useEffect, useState, useCallback } from "react";
import {
  getServices,
  createService,
  updateService,
  deleteService,
} from "../../../services/serviceService";
import ServiceTable from "../../../components/admin/services/ServiceTable";
import ServiceModal from "../../../components/admin/services/ServiceModal";
import ServicePriceRange from "../../../components/admin/services/ServicePriceRange";
import Pagination from "../../../components/Pagination";
import LimitDropdown from "../../../components/LimitDropdown";
import SearchInput from "../../../components/SearchInput";
import { toast } from "react-toastify";

function ServicePage() {
  const [services, setServices] = useState([]);
  const [editingService, setEditingService] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalPages: 1,
  });
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  
  const loadServices = useCallback(
    async (page = 1, limit = 10) => {
      const res = await getServices(page, limit, search, minPrice, maxPrice);
      setServices(res.data.data);
      setPagination({
        page: res.data.page,
        limit: res.data.limit,
        totalPages: res.data.totalPages,
      });
    },
    [search, minPrice, maxPrice] 
  );

  useEffect(() => {
    loadServices();
  }, [loadServices]); 

  const handleSave = async (data) => {
    try {
      if (data.price) {
        data.price = parseFloat(data.price);
      }
      if (editingService) {
        await updateService(editingService.id, data);
        toast.success("Service updated successfully");
      } else {
        await createService(data);
        toast.success("Service created successfully");
      }
      loadServices();
      closeModal();
    } catch (error) {
      const errorMsg = error.response?.data?.error || "Save failed";
      console.log(error.response);

      toast.error(errorMsg);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      try {
        await deleteService(id);
        loadServices();
        toast.success("Service deleted successfully");
      } catch (error) {
        console.error("Delete failed:", error);
        toast.error("Delete failed");
      }
    }
  };

  const openCreateModal = () => {
    setEditingService(null);
    setShowModal(true);
  };

  const openEditModal = (service) => {
    setEditingService(service);
    setShowModal(true);
  };

  const closeModal = () => {
    setEditingService(null);
    setShowModal(false);
  };

  const handlePageChange = (newPage) => {
    loadServices(newPage);
  };

  const handleLimitChange = (newLimit) => {
    setLimit(newLimit);
    loadServices(1, newLimit);
  };

  const handlePriceChange = (type, value) => {
    if (type === "minPrice") {
      setMinPrice(value);
    } else if (type === "maxPrice") {
      setMaxPrice(value);
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Manage Services</h2>
        <button className="btn btn-primary" onClick={openCreateModal}>
          + Add Service
        </button>
      </div>

      <div className="d-flex mb-3">
        <LimitDropdown limit={limit} onLimitChange={handleLimitChange} />
        <SearchInput
          value={search}
          onChange={(value) => {
            setSearch(value);
            loadServices(1, pagination.limit);
          }}
          placeholder="Search services by name or description"
        />
        <ServicePriceRange
          minPrice={minPrice}
          maxPrice={maxPrice}
          onPriceChange={handlePriceChange}
        />
      </div>

      <ServiceTable
        services={services}
        onEdit={openEditModal}
        onDelete={handleDelete}
      />

      <Pagination
        page={pagination.page}
        totalPages={pagination.totalPages}
        onPageChange={handlePageChange}
      />

      <ServiceModal
        show={showModal}
        service={editingService}
        onClose={closeModal}
        onSubmit={handleSave}
      />
    </div>
  );
}

export default ServicePage;
