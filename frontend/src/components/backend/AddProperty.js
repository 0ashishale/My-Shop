import React from 'react'

function AddProperties() {
  return (
    <div>
                <form action="">
                        Title : <input type="text" name='address' placeholder='Enter address' className='border'/> <br />
                        Location :   <input type="text" name='location' placeholder='Enter location' className='border'/> <br />                  
                        Price :   <input type="number" name='price' placeholder='Enter Price' className='border'/> <br />                  
                        Size :   <input type="number" name='bedroom' placeholder='Enter number of bedroom' className='border'/> <br /> 
                        Images : <input className='' type="image" name='img' />                 
                      
                </form>
    </div>
  )
}

export default AddProperties
