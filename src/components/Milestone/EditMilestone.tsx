import {ErrorMessage} from "../ErrorMessage";
import {IMilestone, IMilestoneData} from "../../models";
import React, {useState} from "react";
import MilestoneService from "../../services/MilestoneService";

const milesData: IMilestone = {
    milestoneId:-1,
    dateTo:"",
    dateFrom:"",
    year:""
}


interface EditMilesProps{
    milestoneId: number
    onEdit:(miles: IMilestone)=> void
}

const inputStyle = "border py-2 px-4 mb-2 w-full outline-0"

export function EditMilestone({milestoneId,onEdit}: EditMilesProps){
    const [value, setValue] = useState('')
    const [dateTo, setDateTo] = useState('')
    const [year, setYear] = useState('')

    const [error, setError] = useState('')

    const SubmitHandler = async (event: React.FormEvent) => {
        event.preventDefault()
        setError('')

        if (value.trim().length === 0){
            setError('Please enter valid date.')
            return
        }

        if (dateTo.trim().length === 0){
            setError('Please enter valid date.')
            return
        }

        if (year.trim().length === 0){
            setError('Please enter valid year.')
            return
        }

        milesData.milestoneId = milestoneId
        milesData.dateFrom = value
        milesData.dateTo = dateTo
        milesData.year = year
        const response = await MilestoneService.editMiles(milestoneId,milesData)
        onEdit(response.data)
    }

    return(
        <form onSubmit={SubmitHandler} className="mb-3"
        >
            <input
                id="dateFrom"
                type="date"
                className={inputStyle}
                placeholder="Enter start date"
                value={value}
                onChange={event => setValue(event.target.value)}
            />

            <input
                id="dateTo"
                type="date"
                className={inputStyle}
                placeholder="Enter finish date"
                value={dateTo}
                onChange={event => setDateTo(event.target.value)}
            ></input>

            <input
                id="year"
                type="text"
                className={inputStyle}
                placeholder="Enter year"
                value={year}
                onChange={event => setYear(event.target.value)}
            ></input>


            {error && <ErrorMessage error={error}/>}
            <button type="submit">Save</button>
        </form>


    )
}