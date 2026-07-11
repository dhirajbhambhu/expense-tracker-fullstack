import { useEffect, useState } from "react";
import api from "../../services/api";

function Categories() {

    const [name, setName] = useState("");
    const [categories, setCategories] = useState([]);
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    async function fetchCategories() {

        try {

            const token = localStorage.getItem("token");

            const response = await api.get("/category", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setCategories(response.data);

        } catch (error) {

            console.log(error);
            alert("Failed to load categories");

        }

    }

    async function handleCategory(e) {

        e.preventDefault();

        if (name === "") {

            alert("Please enter category");

            return;

        }

        try {

            const token = localStorage.getItem("token");

            if (editId === null) {

                await api.post("/category",

                    {
                        name
                    },

                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });

                alert("Category Added Successfully");

            }

            else {

                await api.put(`/category/${editId}`,

                    {
                        name
                    },

                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });

                alert("Category Updated Successfully");

                setEditId(null);

            }

            setName("");

            fetchCategories();

        }

        catch (error) {

            console.log(error);

            alert("Operation Failed");

        }

    }

    async function deleteCategory(id) {

        try {

            const token = localStorage.getItem("token");

            await api.delete(`/category/${id}`, {

                headers: {

                    Authorization: `Bearer ${token}`

                }

            });

            alert("Category Deleted Successfully");

            fetchCategories();

        }

        catch (error) {

            console.log(error);

            alert("Delete Failed");

        }

    }

    function editCategory(category) {

        setEditId(category.id);

        setName(category.name);

    }

    function cancelEdit() {

        setEditId(null);

        setName("");

    }

    return (

        <div className="min-h-screen bg-gray-100 flex justify-center items-center">

            <div className="bg-white w-[550px] p-8 rounded-xl shadow-lg">

                <h1 className="text-3xl font-bold text-center mb-6">

                    {editId == null ? "Add Category" : "Update Category"}

                </h1>

                <form onSubmit={handleCategory}>

                    <input

                        type="text"

                        placeholder="Enter Category"

                        className="border rounded-lg w-full p-3"

                        value={name}

                        onChange={(e) => setName(e.target.value)}

                    />

                    <button

                        className="bg-green-600 text-white rounded-lg w-full p-3 mt-4"

                    >

                        {editId == null ? "Add Category" : "Update Category"}

                    </button>

                    {

                        editId != null &&

                        <button

                            type="button"

                            onClick={cancelEdit}

                            className="bg-gray-600 text-white rounded-lg w-full p-3 mt-3"

                        >

                            Cancel

                        </button>

                    }

                </form>

                <hr className="my-6"/>

                <h2 className="text-2xl font-bold mb-4">

                    All Categories

                </h2>

                {

                    categories.length == 0 ?

                        <p>No Categories Found</p>

                        :

                        categories.map(category => (

                            <div

                                key={category.id}

                                className="border rounded-lg p-4 mb-3 flex justify-between items-center"

                            >

                                <h3 className="font-bold">

                                    {category.name}

                                </h3>

                                <div className="flex gap-2">

                                    <button

                                        onClick={() => editCategory(category)}

                                        className="bg-blue-600 text-white px-4 py-2 rounded"

                                    >

                                        Edit

                                    </button>

                                    <button

                                        onClick={() => deleteCategory(category.id)}

                                        className="bg-red-600 text-white px-4 py-2 rounded"

                                    >

                                        Delete

                                    </button>

                                </div>

                            </div>

                        ))

                }

            </div>

        </div>

    );

}

export default Categories;