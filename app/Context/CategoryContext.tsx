import api from '@/config/api';
import React, { createContext, useContext, useState, useCallback, useEffect} from 'react';

type Category = {
    id: number,
    name: string
}

type CategoryContextType = {
    category: Category[];
}

const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

export const CategoryProvider = ({children}: {children: React.ReactNode}) => {
    const [category, setCategory] = useState<Category[]>([]);

    const fetchCategory = useCallback(async () => {
        try {
            const res = await api.get('categories/', []);
            if(res.success) setCategory(res.data);

        } catch (error) {
            console.log(error);
        }
    }, []);

    useEffect(() => {
        fetchCategory();
    }, [fetchCategory])

    return (
        <CategoryContext.Provider value={{ category }}>
            {children}
        </CategoryContext.Provider>
    )
}

export const useCategory = () => useContext(CategoryContext);