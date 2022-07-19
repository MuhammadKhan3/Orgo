import React from 'react'
import ClientHeader from '../components/client/ClientHeader'
import CompanyDetails from '../components/client/CompanyDetails'
import '../pages/client.css'

function Client() {
  return (
    <div className='main-client'>
        <ClientHeader/>
        <CompanyDetails/>
    </div>
  )
}

export default Client