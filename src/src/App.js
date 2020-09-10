import React,{useState} from 'react';
import Axios from 'axios';
import {v4 as uuidv4} from 'uuid'
import Recipe from './compomnents/Recipe';
import Alert from './compomnents/Alert';
import './App.css'

const App = () => {
    const [query,setQuery] = useState('');
    const [recipes,setRecipes] = useState([]);
    const [alert,setAlert] = useState('')
    
    const APP_ID ='b14abf7a';
    const APP_KEY ='2db054047e3c7ebb948947b6b98f147f'
    const url =`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;

    const getData = async()=>{
        if(query !== ''){
            const result = await Axios.get(url);
            if(!result.data.more){
                return setAlert('No Food With Such Name')
            }
            setRecipes(result.data.hits);
            console.log(result);
            setAlert('')
            setQuery('')
        }else {
            setAlert('Please Fill The Form')
        }
        
    }

    const onChange =e =>{
        setQuery(e.target.value)
    }
    const onSubmit = e=>{
        e.preventDefault();
        getData();
    }
    return (
        <div className="App">
            <h1>Food Searching App</h1>
            <form className='search-form' onSubmit={onSubmit}>
                {alert !== '' && <Alert alert={alert} />}
                <input type='text' placeholder='search food' autoComplete='off' onChange={onChange} value={query} />
                <input type='submit' value='search' />
            </form>
            <div className='recipes'>
    {recipes !== [] && recipes.map(recipe =><Recipe key={uuidv4()} recipe={recipe}/>)}
            </div>
        </div>
    )
}

export default App
