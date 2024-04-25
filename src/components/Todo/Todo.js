import React, { useState } from 'react'

const Todo = () => {
    const [inputTitle, setInputTitle] = useState('');
    const [inputDesc, setInputDesc] = useState('');
    const [items, setItems] = useState([
        {
            id:"001",
            name:"Task",
            desc:"Description",
            status: false,
        },
    ])
    const[isEditItem, setisEditItem] = useState(null);
    const [toggleSubmit, settoggleSubmit] = useState(true)
    const [showList, setShowList] = useState(true)
    const [showForm, setShowForm] = useState(false)
    const [showNew, setShowNew] = useState(true)
    const [showDelete, setShowDelete] = useState(true)
    // const [editMessage, setEditMessage] = useState(false)
    const [deleteMessage, setDeleteMessage] = useState(false)
    const [deleteMessageSuccess, setDeleteMessageSuccess] = useState(false)



    const handleInputTitle=(e)=>{
        setInputTitle(e.target.value);   
    }
    const handleInputDesc=(e)=>{
        setInputDesc(e.target.value)
    }
    const handleSubmit=(e)=>{
        setShowList(true)
        setShowNew(true)

        e.preventDefault();
        if(!inputTitle || !inputDesc){ 
            alert("Fill Data");
            showList(false);
        }else if(inputTitle && !toggleSubmit){
            setItems(
                items.map((elem)=>{
                    if (elem.id === isEditItem){
                        return{...elem, name: inputTitle, desc: inputDesc}
                    }
                    return elem;
                })
            );
            setInputTitle('');
            setInputDesc('')
            settoggleSubmit(true)
            setShowForm(false)
            setShowDelete(true)
        } else{
            const allInputData = {
                id: new Date().getTime().toString(),
                name: inputTitle,   //inputData
                desc: inputDesc,
            };
            setItems([allInputData, ...items]);
            setInputTitle('');
            setInputDesc('');
            setShowForm(false)
        }
    };

    //Delete
    const handleDelete =(i)=>{
        console.log(i)
        const updatedItems = items.filter((elem) => {
            return i !== elem.id;
        })
        setDeleteMessage(true);

        setTimeout(()=>{
            setItems(updatedItems);
            setDeleteMessage(false);
        }, 500);
        setDeleteMessageSuccess(false)
    }

    //Edit
    const handleEdit =(id) =>{

        setShowList(false);
        setShowDelete(false);
        setShowNew(false);
        setShowForm(true);

        settoggleSubmit(false);
        let newEditItem = items.find((elem) =>{
            return elem.id === id
        })
        setInputTitle(newEditItem.name);
        setInputDesc(newEditItem.desc);
        setisEditItem(id);
        console.log(newEditItem)
    }

    const handleAdd =()=> {
        //alert("Hello")
        setShowForm(true);
        setShowList(true);
        setShowNew(false);
    }


  return (
    <>
    {showNew ? 
    <div className='container'>
        <div className='col-12 text-end'>
            <button className='btn btn-primary' onClick={handleAdd}>Add New Task</button>
        </div>
    </div> : "" }
    
    {showForm ? (
        <>
            <div className='container border rounded d-flex justify-content-center shadow p-3 mb-5 bg-white rounded'>
                <div className='row'>
                    <div className='text-center'>
                        <h2>{toggleSubmit ? "Add Task" : "Edit Task"}</h2>
                    </div>
                    <form className='col-12 p-2' onSubmit={handleSubmit}>
                        <label htmlFor='title' className='my-2'>
                            Enter Title
                        </label>
                        <input
                            type='text'
                            name='title'
                            id='title'
                            placeholder='title'
                            className='w-100 my-1 p-2'
                            onChange={handleInputTitle}
                            value={inputTitle}/>
                        <label className='my-2' htmlFor='description'>
                            Enter
                        </label>
                        <input
                            type='text'
                            name='description'
                            id='description'
                            placeholder='Description'
                            className='w-100 my-1 p-2'
                            onChange={handleInputDesc}
                            value={inputDesc}/>
                            {toggleSubmit ? <button className='btn btn-primary my-2'>Save</button> : <button className='btn btn-primary my-2'>Update</button>}
                    </form>
                </div>
            </div>
        </>     
        ) : ("")}

    {showList ? 
        (<div className='container py-2'>         
            {deleteMessage ? (<p className='text-center text-danger'>Item Deleted Successfully</p>) : ("")}
                   
            {items.map((elem, index)=>{
                return(
                    <div className='row border rounded shadow p-3 m-5 mb-3 bg-white rounded p-2' key={elem.id}>
                        <div className='col-12 d-flex justify-content-between align-items-center'>
                            <div>
                                <h4>{elem.name}</h4>
                                <p>{elem.desc}</p>
                            </div>
                                <button className='btn btn-primary mx-2' onClick={()=> handleEdit(elem.id)}> Edit</button>
                                {showDelete ? (<button className='btn btn-primary mx-2' onClick={()=> handleDelete(elem.id)}>Delete</button>) : ("")}   
                            </div>  
                        </div>
                )
            })}
            </div>) : ("")}
    </>               
    )
}

export default Todo 
