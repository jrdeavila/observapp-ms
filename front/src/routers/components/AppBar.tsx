import { Button, Navbar, NavbarBrand } from '@nextui-org/react';
import React from 'react';


const AppBar: React.FC = () => {
  return (
    <Navbar className='bg-light border-b-2 border-dark'>
      <NavbarBrand>
        <h1 className='text-2xl text-dark font-bold'>ObservApp</h1>
      </NavbarBrand>

      <Button className='bg-primary rounded-lg text-light font-bold'>
         Iniciar Sesión
      </Button>
      
    </Navbar> 
  )
}

export default AppBar;