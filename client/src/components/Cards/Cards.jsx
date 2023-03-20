import Card from "./Card"
import useFetch from "../Hooks/useFetch";
import {getPostList} from '../../redux/slices/postSlices'
import {useDispatch, useSelector} from "react-redux";
import { useEffect } from "react";

const url = 'http://localhost:3001/jobs'

const Cards = () => {
    const dispatch = useDispatch()
    const { postJobs } = useSelector((state) => state.postSlice) 
    const {data, isLoading} = useFetch(url)

    useEffect(() => {
        if(data) dispatch(getPostList(data.data))
    }, [dispatch, data])
    if(isLoading) return <p>Cargando...</p>
    return (
    <div className="flex flex-wrap gap-3 justify-center dark:bg-slate-600 py-6">
      { 
      postJobs.map((card) => (
        <Card key={card.title} title={card.title} description={card.functions} id={card.id} modality={card.modality} Rango_salarial={card.min_salary} Rango_salarial1={card.max_salary}/>
          ))
      }
    </div>
    )
}

export default Cards