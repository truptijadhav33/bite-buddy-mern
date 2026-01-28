/* eslint-disable no-unused-vars */
import toast from 'react-hot-toast';
import { useState, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  fetchGalleryItems,
  createGalleryItem,
  deleteGalleryItem,
} from "../../gallery/gallerySlice";
import Input from "../../../shared/ui/Input";
import Button from "../../../shared/ui/Button";
import CustomSelect from "../../../shared/ui/CustomSelect";
import Badge from "../../../shared/ui/Badge";

export default function GalleryTableAdmin() {
  const dispatch = useAppDispatch();
  const fileInputRef = useRef(null); // To reset the file input manually
  const { items, loading } = useAppSelector((state) => state.gallery);

  const [newItem, setNewItem] = useState({
    title: "",
    category: "Other",
    imageFile: null, // Changed from string to null for File object
    description: "",
  });

  useEffect(() => {
    dispatch(fetchGalleryItems());
  }, [dispatch]);

  const addItem = async (e) => {
    e.preventDefault();
    if (!newItem.title || !newItem.imageFile) {
      toast.error("Please provide a title and select an image file");
      return;
    }

    try {
      // 1. Create FormData for multipart/form-data upload
      const formData = new FormData();
      formData.append("title", newItem.title);
      formData.append("category", newItem.category.toLowerCase()); // Backend enum is lowercase
      formData.append("description", newItem.description);
      formData.append("image", newItem.imageFile); // 'image' matches upload.single("image")

      // 2. Dispatch. Note: Slice handles the API call
      await dispatch(createGalleryItem(formData)).unwrap();
      
      toast.success("Image uploaded to Cloudinary!");
      
      // 3. Reset form
      setNewItem({ title: "", category: "Other", imageFile: null, description: "" });
      if (fileInputRef.current) fileInputRef.current.value = ""; 
      
    } catch (err) {
      toast.error(err || "Failed to add image");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this image?")) {
      try {
        await dispatch(deleteGalleryItem(id)).unwrap();
        toast.success("Image removed successfully");
      } catch (err) {
        toast.error("Could not delete image");
      }
    }
  };

  return (
    <div className="rounded-xl border border-border text-card-foreground shadow-sm overflow-hidden border-white/10">
      <div className="p-6 border-b border-white/10">
        <h3 className="text-xl font-bold tracking-tight text-white italic font-serif">
          Visual<span className="text-primary">Inventory</span>
        </h3>
      </div>

      {/* Add New Image Section */}
      <div className="p-6 border-b border-white/10 bg-white/[0.02]">
        <form onSubmit={addItem} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              placeholder="Image Title"
              value={newItem.title}
              onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
              className="bg-white/5 border-white/10 text-white focus:border-primary/50"
            />
            
            <CustomSelect
              value={newItem.category}
              onValueChange={(value) => setNewItem({ ...newItem, category: value })}
              placeholder="Category"
              options={[
                { value: "Food", label: "Food" },
                { value: "Interior", label: "Interior" },
                { value: "Events", label: "Events" },
                { value: "Other", label: "Other" },
              ]}
            />

            {/* File Upload Input */}
            <div className="relative">
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={(e) => setNewItem({ ...newItem, imageFile: e.target.files[0] })}
                className="block w-full text-xs text-gray-400
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-lg file:border-0
                  file:text-xs file:font-bold
                  file:bg-primary file:text-black
                  hover:file:bg-primary/80 transition-all cursor-pointer
                  bg-white/5 border border-white/10 rounded-md py-1"
              />
            </div>
          </div>

          {/* Image Preview Area */}
          {newItem.imageFile && (
            <div className="flex items-center gap-4 p-3 bg-primary/10 rounded-lg border border-primary/20">
              <img
                src={URL.createObjectURL(newItem.imageFile)}
                alt="Preview"
                className="w-16 h-16 object-cover rounded border border-primary/30"
              />
              <div>
                <p className="text-[10px] font-black text-primary uppercase">Ready to Upload</p>
                <p className="text-xs text-white truncate max-w-[200px]">{newItem.imageFile.name}</p>
              </div>
            </div>
          )}

          <Input
            placeholder="Brief Description"
            value={newItem.description}
            onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
            className="bg-white/5 border-white/10 text-white focus:border-primary/50"
          />

          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={loading}
              className="bg-primary text-black hover:bg-primary/90 font-black uppercase tracking-widest px-8 rounded-xl"
            >
              {loading ? "Uploading..." : "Add to Gallery"}
            </Button>
          </div>
        </form>
      </div>

      {/* Gallery Table */}
      <div className="relative w-full overflow-auto">
        <table className="w-full text-sm">
          <thead className="bg-white/5 border-b border-white/5">
            <tr className="text-muted-foreground">
              <th className="h-12 px-6 text-left align-middle font-black uppercase tracking-widest text-[10px]">Preview</th>
              <th className="h-12 px-6 text-left align-middle font-black uppercase tracking-widest text-[10px]">Title</th>
              <th className="h-12 px-6 text-left align-middle font-black uppercase tracking-widest text-[10px]">Category</th>
              <th className="h-12 px-6 text-right align-middle font-black uppercase tracking-widest text-[10px]">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {items.map((item) => (
              <tr key={item._id} className="hover:bg-white/5 transition-colors group">
                <td className="p-6 align-middle">
                  <div className="w-16 h-12 rounded-lg overflow-hidden border border-white/10">
                    <img
                      src={item.imageUrl} // Use imageUrl from Backend
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </td>
                <td className="p-6 align-middle">
                  <div className="flex flex-col">
                    <span className="font-bold text-white group-hover:text-primary transition-colors">
                      {item.title}
                    </span>
                    <span className="text-[10px] text-muted-foreground truncate max-w-xs">
                      {item.description}
                    </span>
                  </div>
                </td>
                <td className="p-6 align-middle">
                  <Badge className="bg-white/10 text-white border-white/10 font-bold uppercase text-[10px]">
                    {item.category}
                  </Badge>
                </td>
                <td className="p-6 align-middle text-right">
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="text-muted-foreground hover:text-red-500 font-black uppercase tracking-widest text-[10px] transition-colors"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {items.length === 0 && !loading && (
          <div className="py-20 text-center text-muted-foreground italic">
            Gallery is empty.
          </div>
        )}
      </div>
    </div>
  );
}
