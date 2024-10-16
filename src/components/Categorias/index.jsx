import { useEffect, useState } from "react";
import Tabela from "./Tabela";

export default function Categorias(){

    const [categorias, setCategorias] = useState([]);
    const [categoria, setCategoria] = useState({});

    const aoExcluir = async (dado) =>{
        await fetchDataFindById(dado);
    }

    const fetchDataFindById = async (id) =>{
        try{
            const response = await fetch(`http://localhost:8080/categoria/findById?id=${id}`);
            const result = await response.json();
            setCategoria(result);
            console.log(categoria);
        }catch(error){
            console.log(error);
        }
    }

    const fetchData = async () =>{
        try{
            const response = await fetch("http://localhost:8080/categoria/all");
            const result = await response.json();
            setCategorias(result);
        }catch(error){
            console.log(error);
        }
    }

    useEffect(()=>{
        fetchData();
    },[]);

    return (<>
        <div class="flex mb-4">
            <div class="w-full  h-12">
                <Tabela aoExcluir={aoExcluir} listagem = {categorias} />
            </div>
        </div>
    </>);
}

