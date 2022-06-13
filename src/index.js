import React,{ useState} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './Store/store';
import { MainContext } from './context';
import { getMyXp } from './GetXp/GetXp';
import { useSelector } from 'react-redux'

const Main = ()=>{
    const pers = useSelector(({ pers: { pers } }) => pers)
    const [showCheat, setShowCheat] = useState(false)
    const [myXp, setMyXp] = useState(getMyXp(pers.xp))// жизнь героя
 
    return (
      
       <MainContext.Provider value = {{showCheat, setShowCheat,myXp, setMyXp,pers}}>
        <App />,
       </MainContext.Provider>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

<Provider store = {store}>
<Main/>
</Provider>
);


