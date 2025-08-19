import './DisplayItems.css';
import {useContext, useState} from "react";
import {AppContext} from "../../context/AppContext.jsx";
import Item from "../Item/Item.jsx";
import SearchBox from "../SearchBox/SearchBox.jsx";

const DisplayItems = ({selectedCategory}) => {
    const {itemsData} = useContext(AppContext);
    const [searchText, setSearchText] = useState("");

    const filteredItems = itemsData.filter(item => {
        if(!selectedCategory) return true;
        return item.categoryId === selectedCategory;
    }).filter(item => item.name.toLowerCase().includes(searchText.toLowerCase()));

    return (
        <div className="p-3">
            <div className="d-flex justify-content-between align-items-center align-items-center mb-4">
                <div></div>
                <div>
                    <SearchBox onSearch={setSearchText} />
                </div>
            </div>
            <div className="row g-3">
                {filteredItems.map((item, index) => (
                    <div key={index} className="col-md-4 col-sm-6">
                        <Item
                            itemName={item.name}
                            itemPrice={item.price}
                            itemImage={item.imgUrl}
                            itemId={item.itemId}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default DisplayItems;