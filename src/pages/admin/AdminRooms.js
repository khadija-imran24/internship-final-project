import React, { useEffect, useMemo, useState } from "react";
import "./AdminRooms.css";
import { roomsMock, ROOM_TYPES, ROOM_STATUSES } from "../../data/roomsData";

// ---- localStorage helpers so your mock CRUD persists across reloads
const LS_KEY = "admin_rooms";
const loadRooms = () => {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? JSON.parse(raw) : roomsMock;
  } catch {
    return roomsMock;
  }
};
const saveRooms = (arr) => localStorage.setItem(LS_KEY, JSON.stringify(arr));

// ---- empty form model
const emptyRoom = {
  room_id: null,
  room_no: "",
  room_type: "Single",
  servant_name: "",
  servant_contact: "",
  price_per_day: "",
  description: "",
  image_url: "",
  status: "available",
};

export default function AdminRooms() {
  const [rooms, setRooms] = useState(loadRooms());
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyRoom);
  const [errors, setErrors] = useState({});

  useEffect(() => saveRooms(rooms), [rooms]);

  // ---- filters
  const filtered = useMemo(() => {
    return rooms.filter((r) => {
      const matchesSearch =
        r.room_no.toLowerCase().includes(search.toLowerCase()) ||
        r.room_type.toLowerCase().includes(search.toLowerCase()) ||
        r.servant_name.toLowerCase().includes(search.toLowerCase());
      const matchesType = typeFilter === "All" || r.room_type === typeFilter;
      const matchesStatus = statusFilter === "All" || r.status === statusFilter;
      return matchesSearch && matchesType && matchesStatus;
    });
  }, [rooms, search, typeFilter, statusFilter]);

  // ---- open create
  const openCreate = () => {
    setEditingId(null);
    setForm({ ...emptyRoom });
    setErrors({});
    setShowForm(true);
  };

  // ---- open edit
  const openEdit = (id) => {
    const r = rooms.find((x) => x.room_id === id);
    if (!r) return;
    setEditingId(id);
    setForm({ ...r });
    setErrors({});
    setShowForm(true);
  };

  // ---- delete
  const onDelete = (id) => {
    if (!window.confirm("Delete this room?")) return;
    setRooms((prev) => prev.filter((r) => r.room_id !== id));
  };

  // ---- validations (simple but ERD-friendly)
  const validate = () => {
    const e = {};
    if (!form.room_no.trim()) e.room_no = "Room no is required";
    if (!form.room_type) e.room_type = "Room type is required";
    if (!form.price_per_day || Number(form.price_per_day) <= 0)
      e.price_per_day = "Price per day must be > 0";
    if (!form.status) e.status = "Status is required";
    if (form.servant_contact && !/^\d{10,15}$/.test(form.servant_contact))
      e.servant_contact = "Contact must be 10–15 digits";
    // unique room_no check
    const clash = rooms.find(
      (r) => r.room_no.trim() === form.room_no.trim() && r.room_id !== editingId
    );
    if (clash) e.room_no = "Room no already exists";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // ---- submit create/update
  const onSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (editingId == null) {
      const nextId =
        rooms.length === 0 ? 1 : Math.max(...rooms.map((r) => r.room_id)) + 1;
      const payload = {
        ...form,
        room_id: nextId,
        price_per_day: Number(form.price_per_day),
      };
      setRooms((prev) => [payload, ...prev]);
    } else {
      setRooms((prev) =>
        prev.map((r) =>
          r.room_id === editingId
            ? { ...form, room_id: editingId, price_per_day: Number(form.price_per_day) }
            : r
        )
      );
    }
    setShowForm(false);
  };

  // ---- quick status toggle from table
  const toggleStatus = (id) => {
    setRooms((prev) =>
      prev.map((r) =>
        r.room_id === id
          ? { ...r, status: r.status === "available" ? "occupied" : "available" }
          : r
      )
    );
  };

  return (
    <div className="rooms-admin">
      {/* header actions */}
      <div className="rooms-admin__bar">
        <h2>Rooms</h2>
        <div className="rooms-admin__actions">
          <input
            placeholder="Search room no / type / servant"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
            <option value="All">All Types</option>
            {ROOM_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Statuses</option>
            {ROOM_STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <button className="btn primary" onClick={openCreate}>
            + Add Room
          </button>
        </div>
      </div>

      {/* table */}
      <div className="rooms-table__wrap">
        <table className="rooms-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Room No</th>
              <th>Type</th>
              <th>Price/Day</th>
              <th>Servant</th>
              <th>Contact</th>
              <th>Status</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr key={r.room_id}>
                <td>{r.room_id}</td>
                <td>{r.room_no}</td>
                <td>{r.room_type}</td>
                <td>Rs {r.price_per_day}</td>
                <td>{r.servant_name}</td>
                <td>{r.servant_contact}</td>
                <td>
                  <span className={`badge ${r.status}`}>{r.status}</span>
                  <button className="link" onClick={() => toggleStatus(r.room_id)}>
                    toggle
                  </button>
                </td>
                <td>
                  {r.image_url ? (
                    <img src={r.image_url} alt={r.room_no} className="thumb" />
                  ) : (
                    "-"
                  )}
                </td>
                <td className="actions">
                  <button className="btn small" onClick={() => openEdit(r.room_id)}>
                    Edit
                  </button>
                  <button className="btn small danger" onClick={() => onDelete(r.room_id)}>
                    Delete
                  </button>
                  {/* If you later add history page, link it here:
                  <Link className="btn small ghost" to={`/admin/room-history?roomId=${r.room_id}`}>History</Link>
                  */}
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan="9" style={{ textAlign: "center", padding: 24 }}>
                  No rooms found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* modal form */}
      {showForm && (
        <div className="modal__backdrop" onClick={() => setShowForm(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>{editingId == null ? "Add Room" : `Edit Room #${editingId}`}</h3>
            <form onSubmit={onSubmit} className="form-grid">
              <div className="field">
                <label>Room No *</label>
                <input
                  value={form.room_no}
                  onChange={(e) => setForm({ ...form, room_no: e.target.value })}
                />
                {errors.room_no && <span className="error">{errors.room_no}</span>}
              </div>

              <div className="field">
                <label>Room Type *</label>
                <select
                  value={form.room_type}
                  onChange={(e) => setForm({ ...form, room_type: e.target.value })}
                >
                  {ROOM_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <div className="field">
                <label>Price / day (Rs) *</label>
                <input
                  type="number"
                  min="1"
                  value={form.price_per_day}
                  onChange={(e) =>
                    setForm({ ...form, price_per_day: e.target.value })
                  }
                />
                {errors.price_per_day && (
                  <span className="error">{errors.price_per_day}</span>
                )}
              </div>

              <div className="field">
                <label>Status *</label>
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                >
                  {ROOM_STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                {errors.status && <span className="error">{errors.status}</span>}
              </div>

              <div className="field">
                <label>Servant Name</label>
                <input
                  value={form.servant_name}
                  onChange={(e) => setForm({ ...form, servant_name: e.target.value })}
                />
              </div>

              <div className="field">
                <label>Servant Contact</label>
                <input
                  value={form.servant_contact}
                  onChange={(e) =>
                    setForm({ ...form, servant_contact: e.target.value })
                  }
                  placeholder="03001234567"
                />
                {errors.servant_contact && (
                  <span className="error">{errors.servant_contact}</span>
                )}
              </div>

              <div className="field span-2">
                <label>Description</label>
                <textarea
                  rows="3"
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                />
              </div>

              <div className="field span-2">
                <label>Image URL</label>
                <input
                  value={form.image_url}
                  onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                  placeholder="https://..."
                />
                {form.image_url && (
                  <img src={form.image_url} alt="preview" className="preview" />
                )}
              </div>

              <div className="form-actions">
                <button type="button" className="btn ghost" onClick={() => setShowForm(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn primary">
                  {editingId == null ? "Create" : "Update"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
