'use client';
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";

export default function Home() {

  const [todo, setTodo] = useState({
    title: '',
    desc: ''
  })

  const addTodo = (first) => {
    console.log(first)
    let todos = localStorage.getItem("todos")
    if (todos) {
      let todosJson = JSON.parse(todos)
      if (todosJson.filter(value => { return value.title == todo.title }).length > 0) {
        toast.error(" Todo already exists ")
      } else {
        todosJson.push(todo)
        localStorage.setItem("todos", JSON.stringify(todosJson))
        setTodo({
          title: '',
          desc: ''
        })
        toast.success(" Todo added successfully ")
      }
    } else {
      localStorage.setItem("todos", JSON.stringify([todo]))
      toast.success(" Todo added successfully ")
    }
  }

  const onChange = (e) => {
    setTodo({ ...todo, [e.target.name]: e.target.value })
  }

  return (
    <div className='items-center'>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
          <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
            <h1 className="title-font font-medium text-3xl text-gray-900">Slow-carb next level shoindcgoitch ethical authentic, poko scenester</h1>
            <p className="leading-relaxed mt-4">Poke slow-carb mixtape knausgaard, typewriter street art gentrify hammock starladder roathse. Craies vegan tousled etsy austin.</p>
          </div>
          <div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
            <h2 className="text-gray-900 font-medium title-font mb-5 text-2xl">Add a Todo</h2>
            <div className="relative mb-4">
              <label htmlFor="title" className="leading-7 text-sm text-gray-600">Todo Title</label>
              <input onChange={onChange} value={todo.title} type="text" id="title" name="title" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
            <div className="relative mb-4">
              <label htmlFor="desc" className="leading-7 text-sm text-gray-600">Todo text</label>
              <input onChange={onChange} value={todo.desc} type="text" id="desc" name="desc" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
            <button onClick={addTodo} className="text-white bg-indigo-500 border-0  flex justify-center py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Add Todo</button>
            <p className="text-xs text-gray-500 mt-3">Literally you probably haven't heard of them jean shorts.</p>
          </div>
        </div>
      </section>
      <Toaster position="bottom-right" />
    </div>
  )
}

