// import Image from "next/image";
import Navbar from "./components/navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Bienvenidos</h1>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <div style={{ width: '30%', padding: '1rem' }}>
          <h2 style={{ fontWeight: '600' }}>Columna 1</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>
        <div style={{ width: '30%', padding: '1rem' }}>
          <h2 style={{ fontWeight: '600' }}>Columna 2</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>
        <div style={{ width: '30%', padding: '1rem' }}>
          <h2 style={{ fontWeight: '600' }}>Columna 3</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>
      </div>
    </div>
  );
}
