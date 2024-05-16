
import './App.css'
import Layout from './components/Layout'

function App() {

  return (
    <div className='flex flex-col gap-5'>
      <h1 className='flex justify-center font-bold text-3xl'>Resize the components by dragging from sides</h1>
      <Layout />
    </ div>
  )
}

export default App