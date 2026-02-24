import { useState } from "react";
import API from "../services/api";

function BookmarkForm({ fetchBookmarks }) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !url) return;

    await API.post("/", { title, url });

    setTitle("");
    setUrl("");

    fetchBookmarks();
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        type="text"
        placeholder="Enter Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <input
        type="url"
        placeholder="Enter URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        required
      />

      <button type="submit">Add</button>
    </form>
  );
}

const styles = {
  form: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px"
  }
};

export default BookmarkForm;