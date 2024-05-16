import './App.css'
import ResizableAndDraggableContainer from './ResizableAndDraggableContainer';

function App() {

  return (
    <div className='flex flex-col gap-11'>
      <h1 className="text-3xl font-bold ">
        Resize the components or drag anywhere on the component to move it
      </h1>

      <div className='flex justify-between'>
        <ResizableAndDraggableContainer containerNo={1} />
        <ResizableAndDraggableContainer containerNo={2} />
        <ResizableAndDraggableContainer containerNo={3} />
      </div>


    </ div>
  )
}

export default App
