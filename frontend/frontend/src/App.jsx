import { useEffect, useState } from "react";
import API from "./services/api";
import Navbar from "./components/Navbar";
import BookmarkForm from "./components/BookmarkForm";
import BookmarkList from "./components/BookmarkList";
import "./index.css";

function App() {
  const [bookmarks, setBookmarks] = useState([]);

  const fetchBookmarks = async () => {
    const res = await API.get("/");
    setBookmarks(res.data);
  };

  useEffect(() => {
    fetchBookmarks();
  }, []);

  return (
    <div className="container">
      <Navbar />
      <BookmarkForm fetchBookmarks={fetchBookmarks} />
      <BookmarkList
        bookmarks={bookmarks}
        fetchBookmarks={fetchBookmarks}
      />
    </div>
  );
}

export default App;