import { useState, useEffect } from 'react';
import PlantsCard from './PlantsCard';

const Plants = ()=> {
    const [product, setProduct] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    
    const handleDelete = () => {
        fetch('http:localhost:8000/product/' + product.id, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'}
        }).then(() => {
            console.log('Product has been deleted');
        })
    }

    useEffect(() => {
        fetch('http://localhost:8000/product')
            .then(res => {
                if(!res.ok) {
                    throw Error('Could not fetch the data')
                }
                return res.json();
            })
            .then(data => {
                setProduct(data)
                setIsPending(false);
                setError(null);
            })
            .catch(err => {
                setIsPending(false);
                setError(err.message);
            })
    }, []);

    return (
        <div>
            { error && <div>{ error }</div> }
            {isPending && <div>Loading...</div>}
            {product && <PlantsCard product={product} handleDelete={handleDelete}/>}
        </div>
    );
};

export default Plants;