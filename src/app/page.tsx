import Navbar from "./components/navbar"
export default function Home() {
  return (
       
    <div>
      <Navbar/>     
      <div className="text-center mb-8">
  <h1 className="text-3xl font-bold">Bienvenidos</h1>
</div>

<div className="flex justify-around">
  <div className="w-1/3 p-4">
    <h2 className="font-semibold">Columna 1</h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
  </div>
  <div className="w-1/3 p-4">
    <h2 className="font-semibold">Columna 2</h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
  </div>
  <div className="w-1/3 p-4">
    <h2 className="font-semibold">Columna 3</h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
  </div>
</div>
    </div>
  );
  
}
