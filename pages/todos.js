import Header from '@/Components/Header'
import React, { useEffect, useState } from 'react'
import Footer from '@/Components/Footer'
import { AiOutlineDelete } from 'react-icons/ai'
import { CiEdit } from 'react-icons/ci'
import '@/app/globals.css'

const Todos = () => {
    // Initialize todos state with an empty array
    const [todos, setTodos] = useState([]);
    // Initialize editedTodo state to store the todo being edited
    const [editedTodo, setEditedTodo] = useState({ title: '', desc: '' });

    // Fetch todos data from localStorage when the component mounts
    useEffect(() => {
        const storedTodos = localStorage.getItem('todos');
        if (storedTodos) {
            // Parse the JSON data from localStorage and update the state
            setTodos(JSON.parse(storedTodos));
        }
    }, []);

    // Delete todo
    const deleteTodo = (title) => {
        // Filter out the todo with the matching title
        const newTodos = todos.filter((todo) => todo.title !== title);
        // Update the todos state and localStorage with the newTodos
        setTodos(newTodos);
        localStorage.setItem('todos', JSON.stringify(newTodos));
    };

    // Edit todo
    const editTodo = (todo) => {
        setEditedTodo({
            title: todo.title,
            desc: todo.desc
        });
    };

    // Save the edited todo
    const saveEditedTodo = () => {
        const editedTodos = todos.map((todo) =>
            todo.title === editedTodo.title ? editedTodo : todo
        );
        // Update the todos state and localStorage with the editedTodos
        setTodos(editedTodos);
        localStorage.setItem('todos', JSON.stringify(editedTodos));
        // Clear the editedTodo state
        setEditedTodo({
            title: '',
            desc: ''
        });
    };

    const onChange = (e) => {
        setEditedTodo({ ...editedTodo, [e.target.name]: e.target.value });
    };

    return (
        <div>
            <Header />
            <div className='w-full min-h-screen'>
                <section className="text-gray-600 body-font">
                    <div className="container px-5 py-10 mx-auto">
                        <div className="flex flex-col text-center w-full mb-20">
                            <h1 className="text-4xl font-medium title-font mb-4 text-gray-900">Your Todos</h1>
                            {todos.length === 0 ? (<p className="lg:w-2/3 mx-auto leading-relaxed text-base">Your Todos will show up here.
                                Please go to the <a href="/" className="text-indigo-500">Home</a> page to add a Todo.
                            </p>) : ''}
                        </div>

                        <div className='flex flex-wrap -m-4'>
                            {todos.map((item, key) => {
                                // Create a unique seed parameter using a combination of key and title
                                const seed = `${item.title}_${key}`;

                                // Generate the image URL with the unique seed parameter
                                const imageUrl = `https://picsum.photos/seed/${seed}/2003/3001`;
                                return <div key={key} className="p-4 lg:w-1/4 md:w-1/2">
                                    <div className="h-full flex flex-col items-center text-center">
                                        <img alt="team" className="flex-shrink-0 rounded-lg w-full h-56 object-cover object-center mb-4" src={imageUrl} />
                                        <div className="w-full">
                                            {editedTodo.title === item.title ? (
                                                // Show input fields if the todo is being edited
                                                <div className='space-y-2'>
                                                    <input
                                                        name="title"
                                                        type="text"
                                                        value={editedTodo.title}
                                                        onChange={onChange}
                                                        placeholder='Enter New Title'
                                                        className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                                    />
                                                    <input
                                                        name="desc"
                                                        type="text"
                                                        value={editedTodo.desc}
                                                        onChange={onChange}
                                                        placeholder='Enter New Description'
                                                        className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                                    />
                                                    <button
                                                        className="text-white bg-indigo-500 border-0 flex justify-center py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                                                        onClick={saveEditedTodo}
                                                    >
                                                        Save
                                                    </button>
                                                </div>
                                            ) : (
                                                // Show todo details if not being edited
                                                <>
                                                    <h2 className="title-font font-medium text-lg text-gray-900">{item.title}</h2>
                                                    <p className="mb-4">{item.desc}</p>
                                                    <span className="inline-flex">
                                                        <a
                                                            className="text-gray-500 text-2xl cursor-pointer"
                                                            onClick={() => deleteTodo(item.title)}
                                                        >
                                                            <AiOutlineDelete />
                                                        </a>
                                                        <a
                                                            className="ml-2 text-gray-500 text-2xl cursor-pointer"
                                                            onClick={() => editTodo(item)}
                                                        >
                                                            <CiEdit />
                                                        </a>
                                                    </span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            })}
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    )
}

export default Todos;
