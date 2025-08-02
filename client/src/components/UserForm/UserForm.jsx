const UserForm = () => {
    return (
        <div className="mx-2 mt-2">
            <div className="row">
                <div className="card col-md-12 form-container">
                    <div className="card-body">
                        <form >
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input type="text"
                                       name="name"
                                       id="name"
                                       className="form-control"
                                       placeholder="Jhon Doe"

                                       required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input type="email"
                                       name="email"
                                       id="email"
                                       className="form-control"
                                       placeholder="yourname@example.com"
                                       required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input type="password"
                                       name="password"
                                       id="password"
                                       className="form-control"
                                       placeholder="**************"

                                       required
                                />
                            </div>
                            <button type="submit" className="btn btn-warning w-100" >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default UserForm;