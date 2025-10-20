"use client"
import React, { useState, useEffect } from "react";
import axios from "axios";


const AdminWhatWeDo = () => {
  const [content, setContent] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await axios.get("/api/whatwedo"
       ,{ params: { _t: new Date().getTime() } // Add timestamp to bypass cache
      });
      setContent(response.data);
    } catch (error) {
      console.error("Error fetching content:", error);
    }
  };

  const handleAddOrUpdate = async (e:any) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`/api/whatwedo/${editingId}`, {
          title,
          description,
        });
      } else {
        await axios.post("/api/whatwedo", {
          title,
          description,
        });
      }
      setTitle("");
      setDescription("");
      setEditingId(null);
      fetchContent();
    } catch (error) {
      console.error("Error saving content:", error);
    }
  };

  const handleEdit = (item:any) => {
    setEditingId(item._id);
    setTitle(item.title);
    setDescription(item.description);
  };

  const handleDelete = async (id:any) => {
    try {
      await axios.delete(`/api/whatwedo/${id}`);
      fetchContent();
    } catch (error) {
      console.error("Error deleting content:", error);
    }
  };

  return (
    <div className="overalls">
       <h1 style={{ marginTop: '100px' }}>Manage What We Do</h1>
       <div className="adminaddform-container" style={{ marginBottom: '50px' }}>
       <form  onSubmit={handleAddOrUpdate}>
       <div className="form-row">
                        <div className="form-group">
                    
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        </div>
        </div>
        <div className="form-row">
                        <div className="form-group">
                    
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        </div>
        </div>
        <button className="contact-button" type="submit">{editingId ? "Update" : "Add"}</button>
      </form>

      <h2 className="admin-title">Manage Content</h2>
      <div className="content-list">
        {content.map((item:any) => (
          <div key={item._id} className="content-item">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <button  className="contact-button"onClick={() => handleEdit(item)}>Edit</button>
            <button className="contact-button" onClick={() => handleDelete(item._id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default AdminWhatWeDo;
