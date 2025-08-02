const ItemForm = () => {
    return (
        <div className="item-form-container" style={{height:'100vh', overflowY: 'auto', overflowX: 'hidden'}}>
            <div className="mx-2 mt-2">
                <div className="row">
                    <div className="card col-md-12 form-container">
                        <div className="card-body">
                            <form >
                                <div className="mb-3">
                                    <label htmlFor="image" className="form-label">
                                        <img src="" alt="" width={48}/>
                                    </label>
                                    <input type="file" name="image" id="image" className='form-control' />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input type="text"
                                           name="name"
                                           id="name"
                                           className="form-control"
                                           placeholder="Item Name"
                                           required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="category">
                                        Category
                                    </label>
                                    <select name="categoryId" id="category" className="form-control" required>
                                        <option value="">--SELECT CATEGORY--</option>

                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="price" className="form-label">Price</label>
                                    <input type="number" name="price" id="price" className="form-control" placeholder="&#8377;200.00" required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <textarea
                                        rows="5"
                                        name="description"
                                        id="description"
                                        className="form-control"
                                        placeholder="Write content here..">

                                    </textarea>
                                </div>
                                <button type="submit" className="btn btn-warning w-100">Submit </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ItemForm;