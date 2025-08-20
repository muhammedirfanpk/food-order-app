import React, { useEffect, useState } from 'react';
import { fetchproducts,updateProduct } from '../features/productsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/authSlice';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { items, loading } = useSelector((state) => state.product);
   
  const [form,setForm] = useState({name:"",price:"",category:"",image:"",stock: true });
  const [editMode,setEditMode] = useState(false);
  const [editId,setEditId] = useState(null);

  useEffect(() => {
    dispatch(fetchproducts());
  }, [dispatch]);

  const handleEdit = (items) => {
    setForm({name:items.name, price:items.price, category:items.category, image:items.image, stock:items.stock
    });
    setEditMode(true);
    setEditId(items.id)
  }

  const handleSubmit = () => {
    if (!form.name || !form.price || !form.category){
      alert("all fieldes are required")
      return;
    }

    if(editMode) {
      dispatch(updateProduct({...form, id:editId}))
    }
    
  }

  

  const handleCancel = () => {
    setForm({name:"", price:"", category:"",image:"", stock : true})
    setEditMode(false)
    setEditId(null)
  }

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  

  return (
    <div className="min-h-screen bg-gray-900" >


       <header className="bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-yellow-400">Food Order Admin</h1>
          <nav className="space-x-4">
            <a href="#" className="text-yellow-500 ">Dashboard</a>
            <a href="#" className="text-yellow-500 ">Orders</a>
            <a href="#" onClick={handleLogout} className="text-red-500 ">Logout</a>
          </nav>
        </div>
      </header>

    
       <div className="p-5  m-auto  overflow-x-auto ">

        {
          editMode && (
            <div className='mb-8'>
              <h3 className='text-center font-semibold text-yellow-600 text-lg'>Edit Product</h3>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 p-6 '>
              <input type="text" 
              className=' p-2 focus:outline-none bg-yellow-100 rounded'
              placeholder='Name'
              value={form.name}
              onChange={(e) => setForm({...form, name: e.target.value})} />

              <input type="number"
              className='p-2 focus:outline-none bg-yellow-100 rounded '
              placeholder='Price'
              value={form.price}
              onChange={(e) => setForm({...form, price: e.target.value})}
               />

               <input type="text"
               className='p-2 focus:outline-none bg-yellow-100 rounded '
               placeholder='Category' 
               value={form.category}
               onChange={(e) => setForm({...form, category: e.target.value})}/>

               <input type="text" 
               placeholder='Image URL' 
               className='p-2 focus:outline-none bg-yellow-100 rounded '
               value={form.image}
               onChange={(e) => setForm({...form, image: e.target.value})}
               />
             </div>
               <div className='flex items-center justify-center gap-5'>

                  {editMode && <button className='bg-yellow-300 px-4 py-1 md:py-2 rounded text-white hover:bg-yellow-400' onClick={handleCancel}>Cancel</button>}

                <button onClick={handleSubmit}
                 className="bg-yellow-300 text-white px-4 py-1 md:py-2 rounded hover:bg-yellow-400"
                 >Update</button>

                
               </div>
              
            </div>
          )}


        <div className=''>
        <h2 className="text-2xl font-semibold  mb-4 text-center text-yellow-600 p-2">Product List</h2>

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <div className='overflow-x-auto'>
          <table className="min-w-full bg-gray-800 rounded shadow overflow-hidden text-sm sm:text-base">
            <thead className="bg-yellow-400 text-white">
              <tr>
                <th className="px-4 py-3 text-left whitespace-nowrap">Image</th>
                <th className="px-4 py-3 text-left whitespace-nowrap">Name</th>
                <th className="px-4 py-3 text-left whitespace-nowrap">Category</th>
                <th className="px-4 py-3 text-left whitespace-nowrap">Price</th>
                <th className="px-4 py-3 text-left whitespace-nowrap">Stock</th>
                <th className="px-4 py-3 text-left whitespace-nowrap">Actions</th>
              </tr>
            </thead>


            <tbody className='text-sm divide-y '>
                {items.map((item) => (

                <tr key={item.id} className={`border-b ${!item.stock ? 'bg-gray-800 text-white' : 'hover:bg-gray-700' }`}>
                  <td className="px-4 py-2">
                    <img src={item.image} alt={item.name} className="w-12 h-12 rounded object-cover border" />
                  </td>
                  <td className="px-4 py-3 font-medium text-white">{item.name}</td>
                  <td className="px-4 py-3 text-white">{item.category}</td>
                  <td className="px-4 py-3 text-white">₹{item.price}</td>

                  <td className='px-4 py-3'>
                    {item.stock ? (
                      <span className=' inline-block bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded'> In Stock</span>
                    ) : (
                     <span className='inline-block bg-red-100  text-red-800 text-xs font-semibold px-2 py-1 rounded'>Out of Stock</span> 
                    )}
                  </td>
                  <td className="px-4 py-3 space-x-2">
                    <button 
                      onClick={() => handleEdit(item)} className="bg-yellow-100 text-yellow-700 px-3 py-1 text-sm rounded hover:bg-yellow-200 mb-2">
                      Edit
                    </button>

                    <button onClick={() => dispatch(updateProduct({...item, stock: !item.stock}))}
                     className={`px-3 py-1 rounded text-xs font-medium ${
                      item.stock ?
                      'bg-gray-200 text-gray-800 hover:bg-gray-300' 
                      : 'bg-green-200 text-green-800 hover:bg-green-300'
                    }`}>
                      {item.stock ? 'Stock' : 'stock out'}
                    </button>
                    

                
                  </td>
                </tr>
              ))}
            
            </tbody>
          </table>
          </div>

              )}
          </div>    

      </div> 
    </div>
  );
};

export default Admin;


