import React, { useState } from 'react'
import CustomButton from '../custom/button';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';

export default function Welcome() {
  const selector = useSelector((state: any) => state.auth);
  const user = selector.user.userName;
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]){
      setImage(e.target.files[0]);
    }
  }

  const handleUpload = async () => {
    if (!image) return alert("Please select an image first");
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('image', image);

      const response = await fetch('http://localhost:3000/upload',{
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error uploading image", error);
    } finally{
      setUploading(false)}
  }

  const handleSubmit = () => {
    localStorage.removeItem("auth");
    dispatch(logout());
  };

  return (
    <div>
      <div>
        Welcome {user}
      </div>
      <div>
        <CustomButton
          text='logout'
          className='w-1/6 '
          onClick={handleSubmit}
          loader={loader}
        />
        <input type="file" 
          name='image' 
          onChange={handleFileChange} 
        />
        <button className='text-red-500!' onClick={handleUpload} disabled={uploading}>
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </div>
    </div>
  )
}
