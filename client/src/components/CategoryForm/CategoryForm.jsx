import { useContext, useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import toast from "react-hot-toast";
import { addCategory } from "../../Service/CategoryService";
import { AppContext } from "../../context/AppContext";

export default function CategoryForm() {
  const {setCategories, categories} = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    name: '',
    description: '',
    bgColor: '#2c2c2c'
  });


  useEffect(()=>{
    console.log("Data changed:", data);
  },[data])

  const onChnageHadler = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setData((data)=>({...data, [name]: value}));
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    if(!image) {
      toast.error("Select image for category");
      setLoading(false);
      return;
    }
    const formData = new FormData();
    formData.append("category", JSON.stringify(data));
    formData.append("file", image);
    try {
       const res = await addCategory(formData);
       if(res.status===201){
          setCategories([...categories,res.data]);
          toast.success("Category added");
          setData({
            name: '',
            description: '',
            bgColor: '#2c2c2c'
          });
          setImage(false);
       }

    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    } 
  }
  return (
    <div className="mx-2 mt-2">
      <div className="row">
        <div className="card col-md-12 form-container">
          <div className="card-body">
            <form onSubmit={onSubmitHandler}>
              
              <div className="mb-3">
                <label htmlFor="image" className="form-label">
                  <img
                    src={image ? URL.createObjectURL(image) : assets.upload  }
                    alt="placeholder"
                    width={48}
                  />
                </label>
                <input
                  type="file"
                  name="image"
                  id="image"
                  className="form-control"
                  hidden
                  onChange={(e)=>{setImage(e.target.files[0])} }
                />
              </div>

           
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="form-control"
                  placeholder="Category Name"
                  onChange={onChnageHadler}
                  value={data.name}
                  required
                />
              </div>

              
              <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea
                  rows="5"
                  name="description"
                  id="description"
                  className="form-control"
                  placeholder="Write content here.."
                  onChange={onChnageHadler}
                  value={data.description}
                ></textarea>
              </div>

             
              <div className="mb-3">
                <label htmlFor="bgcolor" className="form-label">Background Color</label>
                <br />
                <input
                  type="color"
                  name="bgColor"
                  id="bgcolor"
                  placeholder="#ffffff"
                  onChange={onChnageHadler}
                  value={data.bgColor}
                />
              </div>

               
              <button type="submit" 
              className="btn btn-warning w-100"
              disabled={loading}>
              {loading ? "Loading...":"Submit"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
