import React, { useState } from 'react';
import "./App.css"

function App(){    
  const [workouts, setWorkouts] = useState([]);  
  const [date, setDate] = useState('');
  const [distance, setDistance] = useState(''); 
  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleDistanceChange = (event) => {
    setDistance(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (date.trim() === '' || distance.trim() === '') {
        alert('Пожалуйста, заполните все поля');
        return;        
      }
    const existingWorkoutIndex = workouts.findIndex((workout) => workout.date === date);
    if (existingWorkoutIndex !== -1) {        
        const updatedWorkouts = [...workouts]; 
        updatedWorkouts[existingWorkoutIndex].distance += parseFloat(distance);               
        setWorkouts(updatedWorkouts);        
      }     
      else {      
        const newWorkout = {
        date: date,
        distance: parseFloat(distance)};    
        setWorkouts([...workouts, newWorkout]);
        setDate('');
        setDistance('');    
        };
    }

    const handleDelete = (index) => {
        const updatedWorkouts = [...workouts];
        updatedWorkouts.splice(index, 1);
        setWorkouts(updatedWorkouts);
    };
    workouts.sort((b, a) => new Date(a.date) - new Date(b.date));

  return (
    <div>      
      <form onSubmit={handleSubmit} >
        <div className='input_all'>
        <div>
        <label>
          Дата тренировки
          <br />
          <input type="date" value={date} onChange={handleDateChange} className='date_input'/>
        </label>
        </div>
        <div>
        <label>
          Пройденное расстояние (в км)
          <br />
          <input type="number" value={distance} onChange={handleDistanceChange} className='date_input' />
        </label>
        </div>
        <div>
        <button type="submit" >OK</button>
        </div>
        </div>        
      </form>
      <h2>Список тренировок:</h2>
      <div className='action' >
        <div className='title-item'>дата</div>
        <div className='title-item'>расстояние</div>
        <div className='title-item'>действия</div>
      </div>
      <ul>
        {workouts.map((workout, index) => (
          <li key={index} className='action'>  
            <div className='Item_value '>{workout.date}</div>        
            <div className='Item_value '>{workout.distance} км</div>
            <button  className='delete'onClick={() => handleDelete(index)}>&#10008;</button>
          </li>
        ))}
      </ul>
    </div>
  );
}; 

export default App;
