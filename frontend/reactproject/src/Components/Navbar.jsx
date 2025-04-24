import React from 'react';
import { Link } from "react-router-dom"


function Navbar() {
  return (
    <div className='navigation-menu'>
        <Link to = '/'>
        <button>
          Linguagens
        </button>
      </Link>

      <Link to = '/details'>
        <button>
          Detalhes
        </button>
      </Link>

      <Link to = '/crud'>
        <button>
          Crud
        </button>
      </Link>
    </div>

  )
}

export default Navbar
