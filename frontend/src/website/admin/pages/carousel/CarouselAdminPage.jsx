import React, { useState, useEffect } from 'react';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import SearchBar from '../../components/SearchBar';
import ActionButton from '../../components/ActionButton';
import DeleteModal from '../../components/DeleteModal';
import ImageUploader from '../../components/ImageUploader';
import Pagination from '../../components/Pagination';
import carouselApi from '../../api/carouselApi';
import { useToast } from '../../hooks/useToast';
import { getImageUrl } from '../../utils/formatters';

const CarouselAdminPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [previewItem, setPreviewItem] = useState(null);
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    carouseltitle: '',
    carouselDesc: '',
    carouselImage: null
  });

  const loadCarousel = async () => {
    setLoading(true);
    const data = await carouselApi.getAll();
    setItems(data);
    setLoading(false);
  };

  useEffect(() => {
    loadCarousel();
  }, []);

  const handleOpenAdd = () => {
    setSelectedItem(null);
    setFormData({ carouseltitle: '', carouselDesc: '', carouselImage: null });
    setModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setSelectedItem(item);
    setFormData({
      carouseltitle: item.carouseltitle || '',
      carouselDesc: item.carouselDesc || '',
      carouselImage: item.carouselImage || null
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('carouseltitle', formData.carouseltitle);
    data.append('carouselDesc', formData.carouselDesc);
    if (formData.carouselImage instanceof File) {
      data.append('carouselImage', formData.carouselImage);
    }

    let res;
    if (selectedItem) {
      res = await carouselApi.update(selectedItem.id, data);
    } else {
      res = await carouselApi.create(data);
    }

    if (res.success !== false) {
      addToast(selectedItem ? 'Carousel item updated!' : 'Carousel item created!');
      setModalOpen(false);
      loadCarousel();
    } else {
      addToast(res.error || 'Operation failed', 'error');
    }
  };

  const handleDelete = async () => {
    if (!selectedItem) return;
    const res = await carouselApi.delete(selectedItem.id);
    if (res.success !== false) {
      addToast('Carousel item deleted!');
      setDeleteModalOpen(false);
      loadCarousel();
    } else {
      addToast('Failed to delete item', 'error');
    }
  };

  const filteredItems = items.filter((item) =>
    (item.carouseltitle || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      label: 'Image',
      key: 'carouselImage',
      width: '100px',
      render: (row) => (
        <img
          src={getImageUrl(row.carouselImage)}
          alt="Slide"
          style={{ width: '60px', height: '40px', objectFit: 'cover', borderRadius: '8px' }}
        />
      )
    },
    { label: 'Title', key: 'carouseltitle' },
    { label: 'Description', key: 'carouselDesc' },
    {
      label: 'Actions',
      key: 'actions',
      render: (row) => (
        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="admin-btn admin-btn-sm admin-btn-outline" onClick={() => setPreviewItem(row)}>👁️ Preview</button>
          <button className="admin-btn admin-btn-sm admin-btn-outline" onClick={() => handleOpenEdit(row)}>✏️ Edit</button>
          <button
            className="admin-btn admin-btn-sm admin-btn-danger"
            onClick={() => {
              setSelectedItem(row);
              setDeleteModalOpen(true);
            }}
          >
            🗑️ Delete
          </button>
        </div>
      )
    }
  ];

  return (
    <div>
      <PageHeader
        title="Hero Carousel Manager"
        subtitle="Add and manage home page carousel slider images, titles, and descriptions"
        breadcrumbItems={[{ label: 'Carousel' }]}
        actionButton={
          <ActionButton icon="➕" onClick={handleOpenAdd}>
            Add Slide
          </ActionButton>
        }
      />

      <div className="admin-controls-card">
        <div className="admin-controls-left">
          <SearchBar value={searchTerm} onChange={setSearchTerm} placeholder="Search slider titles..." />
        </div>
      </div>

      <DataTable columns={columns} data={filteredItems} loading={loading} emptyMessage="No carousel slides found" />
      <Pagination currentPage={currentPage} totalPages={1} totalItems={filteredItems.length} onPageChange={setCurrentPage} />

      {/* Create / Edit Modal */}
      {modalOpen && (
        <div className="admin-modal-backdrop" onClick={() => setModalOpen(false)}>
          <div className="admin-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3>{selectedItem ? 'Edit Carousel Slide' : 'Add New Carousel Slide'}</h3>
              <button className="admin-modal-close-btn" onClick={() => setModalOpen(false)}>✕</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="admin-modal-body">
                <div className="admin-form-group">
                  <label>Slide Title</label>
                  <input
                    type="text"
                    className="admin-form-control"
                    required
                    value={formData.carouseltitle}
                    onChange={(e) => setFormData({ ...formData, carouseltitle: e.target.value })}
                  />
                </div>
                <div className="admin-form-group">
                  <label>Slide Description</label>
                  <textarea
                    className="admin-form-control"
                    rows={3}
                    value={formData.carouselDesc}
                    onChange={(e) => setFormData({ ...formData, carouselDesc: e.target.value })}
                  />
                </div>
                <ImageUploader
                  label="Banner Image"
                  value={formData.carouselImage}
                  onChange={(file) => setFormData({ ...formData, carouselImage: file })}
                />
              </div>
              <div className="admin-modal-footer">
                <button type="button" className="admin-btn admin-btn-outline" onClick={() => setModalOpen(false)}>Cancel</button>
                <button type="submit" className="admin-btn admin-btn-primary">Save Slide</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Live Preview Modal */}
      {previewItem && (
        <div className="admin-modal-backdrop" onClick={() => setPreviewItem(null)}>
          <div className="admin-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3>Carousel Slide Preview</h3>
              <button className="admin-modal-close-btn" onClick={() => setPreviewItem(null)}>✕</button>
            </div>
            <div className="admin-modal-body">
              <img
                src={getImageUrl(previewItem.carouselImage)}
                alt="Preview"
                style={{ width: '100%', height: '260px', objectFit: 'cover', borderRadius: '12px', marginBottom: '16px' }}
              />
              <h2 style={{ color: 'var(--admin-primary)', margin: '0 0 8px 0' }}>{previewItem.carouseltitle}</h2>
              <p style={{ color: 'var(--admin-text-muted)', margin: 0 }}>{previewItem.carouselDesc}</p>
            </div>
          </div>
        </div>
      )}

      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDelete}
        itemName={selectedItem?.carouseltitle}
      />
    </div>
  );
};

export default CarouselAdminPage;
