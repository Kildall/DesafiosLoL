import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

interface appProps {
  nombre: string,
  apellido: string,
  DNI: string
}

function App() {
  return (
    <>
    <div className='h1 text-muted'>
      Hola Mundo Rober!
    </div>
    </>
  );
}

export default App;
