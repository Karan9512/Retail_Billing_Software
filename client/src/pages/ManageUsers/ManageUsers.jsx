import './ManageUsers.css'
import UserForm from "../../components/UserForm/UserForm.jsx";
import UsersList from "../../components/UsersList/UsersList.jsx";
const ManageUsers = () => {
    return (
        <div className="users-container text-light">
            <div className="left-column">
                <UserForm/>
            </div>
            <div className="right-column">
                <UsersList/>
            </div>
        </div>
    )
}
export default ManageUsers;