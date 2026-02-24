import { useState } from "react";
import API from "../services/api";

function BookmarkList({ bookmarks, fetchBookmarks }) {
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({ title: "", url: "" });

  const handleDelete = async (id) => {
    try {
      await API.delete(`/${id}`);
      fetchBookmarks();
    } catch (error) {
      console.error("Delete Error:", error);
    }
  };

  const handleEdit = (bookmark) => {
    setEditId(bookmark.id);
    setEditData({
      title: bookmark.title,
      url: bookmark.url
    });
  };

  const handleUpdate = async (id) => {
    try {
      await API.put(`/${id}`, editData);
      setEditId(null);
      fetchBookmarks();
    } catch (error) {
      console.error("Update Error:", error);
    }
  };

  return (
    <div>
      {bookmarks.length === 0 && (
        <p style={{ textAlign: "center", color: "#777" }}>
          No bookmarks yet 🌿
        </p>
      )}

      {bookmarks.map((bm) => (
        <div key={bm.id} className="card">
          {editId === bm.id ? (
            <>
              <input
                value={editData.title}
                onChange={(e) =>
                  setEditData({ ...editData, title: e.target.value })
                }
              />
              <input
                value={editData.url}
                onChange={(e) =>
                  setEditData({ ...editData, url: e.target.value })
                }
              />

              <div className="btn-group">
                <button
                  className="save-btn"
                  onClick={() => handleUpdate(bm.id)}
                >
                  Save
                </button>

                <button
                  className="delete-btn"
                  onClick={() => setEditId(null)}
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <a href={bm.url} target="_blank" rel="noreferrer">
                {bm.title}
              </a>

              <div className="btn-group">
                <button
                  className="edit-btn"
                  onClick={() => handleEdit(bm)}
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => handleDelete(bm.id)}
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default BookmarkList;