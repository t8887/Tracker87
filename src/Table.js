import React from 'react'
import './Table.css'

const Table = ({ countries }) => {

    return (
        <div className='table'>
            <tbody>
                {countries.map(e => (
                    <tr key={e.country} >
                        <td>{e.country}</td>
                        <td><strong>{e.cases}</strong></td>
                    </tr>
                ))
                }
            </tbody>

        </div>
    )
}

export default Table