import {createContext, useEffect, useState} from "react";

import {fetchCategory} from "../service/CategoryService.js";

const AppContext = createContext(null);

const AppContextProvider = (props) => {

    const [categories, setCategories] = useState(null);

    useEffect(() => {
        async function loadData(){
            const response = await fetchCategory();
            setCategories(response.data);
        }
        loadData();
        }, []);

    const contextValue ={
        categories,
        setCategories
    }
    return <AppContext.Provider value={contextValue}>
        {props.children}
    </AppContext.Provider>
}

export {AppContext,AppContextProvider};