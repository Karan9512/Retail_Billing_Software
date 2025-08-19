import './ManageCategory.css';
import CategoryForm from '../../components/CategoryForm/CategoryForm';
import CategoryList from '../../components/CategoryList/CategoryList';
export default function ManageCategory() {
  return (
    <div className="category-container text-light">
        <div className='left-column'>
           <CategoryForm/>
        </div>
        <div className='right-column'>
           <CategoryList/>
        </div>
    </div>
  )
}
