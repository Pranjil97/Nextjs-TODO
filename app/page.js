"use client";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
// import bg from "../public/bg.jpg"
import homebg from "../public/homebg.jpg"
import Image from 'next/image';

export default function Home() {
  const [todo, setTodo] = useState({
    title: '',
    desc: ''
  });

  const addTodo = () => {
    if (!todo.title.trim() || !todo.desc.trim()) {
      toast.error("Please enter both the title and text.");
      return;
    }

    let todos = localStorage.getItem("todos");
    if (todos) {
      let todosJson = JSON.parse(todos);
      if (todosJson.filter(value => value.title === todo.title).length > 0) {
        toast.error("Todo already exists.");
      } else {
        todosJson.push(todo);
        localStorage.setItem("todos", JSON.stringify(todosJson));
        setTodo({
          title: '',
          desc: ''
        });
        toast.success("Todo added successfully.");
      }
    } else {
      localStorage.setItem("todos", JSON.stringify([todo]));
      toast.success("Todo added successfully.");
    }
  };

  const onChange = (e) => {
    setTodo({ ...todo, [e.target.name]: e.target.value });
  };


  return (
    <div className='items-center'>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
          <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
            <Image src={homebg} alt="hero" className="w-full lg:max-h-[400px] max-h-[400px] object-cover object-center rounded" />
          </div>
          <div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
            <h2 className=" font-medium title-font mb-5 text-2xl text-branddark">Add a Todo</h2>
            <div className="relative mb-4">
              <label htmlFor="title" className="leading-7 text-sm text-gray-600">Todo Title</label>
              <input onChange={onChange} value={todo.title} type="text" id="title" name="title" className="w-full bg-white rounded border border-gray-300 focus:border-brandlight focus:ring-2 focus:ring-brandlight text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
            <div className="relative mb-4">
              <label htmlFor="desc" className="leading-7 text-sm text-gray-600">Todo text</label>
              <input onChange={onChange} value={todo.desc} type="text" id="desc" name="desc" className="w-full bg-white rounded border border-gray-300 focus:border-brandlight focus:ring-2 focus:ring-brandlight text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
            <button onClick={addTodo} className="text-white bg-branddark active:bg-branddark border-0  flex justify-center py-2 px-8 focus:outline-none hover:bg-brandnormal rounded text-lg">Add Todo</button>
          </div>
        </div>
      </section>
      <Toaster position="bottom-right" />
    </div>
  )
}

