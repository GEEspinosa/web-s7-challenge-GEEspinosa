import React, { useEffect, useState } from 'react'
import axios from 'axios'
import * as yup from 'yup'

// 👇 Here are the validation errors you will use with Yup.
const validationErrors = {
  fullNameTooShort: 'full name must be at least 3 characters',
  fullNameTooLong: 'full name must be at most 20 characters',
  sizeIncorrect: 'size must be S or M or L'
}

const initialValues = {
  fullName: "", 
  size: "", 
  toppings: []
}

// 👇 Here you will create your schema.

const formSchema = yup.object().shape({
  fullName: yup
    .string()
    .required()
    .trim()
    .min(3, validationErrors.fullNameTooShort)
    .max(20, validationErrors.fullNameTooLong),
  size: yup
    .string()
    .required()
    .oneOf(['S', 'M', 'L'], validationErrors.sizeIncorrect)

})



// 👇 This array could help you construct your checkboxes using .map in the JSX.
const toppings = [
  { topping_id: '1', text: 'Pepperoni' },
  { topping_id: '2', text: 'Green Peppers' },
  { topping_id: '3', text: 'Pineapple' },
  { topping_id: '4', text: 'Mushrooms' },
  { topping_id: '5', text: 'Ham' },
]

export default function Form() {

  //states: (1) the form values, (2) the validation errors, 
  //(3) whether submit is disabled, (4) the success message from the server,
  //(5) the failure message from server

  const [formValues, setFormValues] = useState (initialValues)
  const [failureMessage, setFailureMessage] = useState('')
  const [enabled, setEnabled] = useState(false)
  const [success, setSuccess] = useState('')
  const [failure, setFailure] = useState('')

  console.log(formValues.fullName)
  //effect hook when state of form changes, validate it against the schema 
  //while updating the state tracking whether form is submittable

  useEffect(() => {
    formSchema.isValid(formValues).then((isValid) => {
      setEnabled(isValid)
    })
  }, [formValues])


  const handlingToppingsChange = (evt) => {
    console.log(evt.target.value)
    let {value, checked} = evt.target

    if (checked) {
      setFormValues(prevState => ({
      ...prevState, 
      toppings: [...prevState.toppings, value ]

    }))
  } else {
    setFormValues(prevState => ({
    ...prevState,
    toppings: prevState.toppings.filter(id => value !== id)

    }))
  }
}
  

  const change = (evt) => {
    let {name, value } = evt.target
    //  if (type === 'checkbox'){(name = 'toppings') && (value = [Number(value)])}
  
    setFormValues({...formValues, [name]: value})


    yup
      .reach(formSchema, name)
      .validate(value)
      .then(() => setFailureMessage({...failureMessage, [name]: ''}))
      .catch((err) => setFailureMessage({...failureMessage, [name]: err.errors[0]}))
      //.finally(console.log(failureMessage))
  }

  const submit = (evt) => {
    evt.preventDefault()
    axios.post('http://localhost:9009/api/order', formValues)
      .then((res) => {
        setSuccess(res.data.message)
        setFailure('')
        
      })
      .catch((err) => {
        setFailure(err.data.message)
        setSuccess('')
      })
      .finally(setFormValues(initialValues))
      
  }


  return (
    <form onSubmit = {submit}>
      <h2>Order Your Pizza</h2>
      {success && <div className='success'>{success}</div>}
      {failure && <div className='failure'>Something went wrong</div>}

      <div className="input-group">
        <div>
          <label htmlFor="fullName">Full Name</label><br />
          <input 
            placeholder="Type full name" 
            id="fullName" 
            name = "fullName" 
            type="text" 
            value = {formValues.fullName} 
            onChange = {change}
          />
        </div>
        {failureMessage.fullName && <div className='error'>{failureMessage.fullName}</div>}
      </div>

      <div className="input-group">
        <div>
          <label htmlFor="size">Size</label><br />
          <select 
            id="size" 
            name = "size" 
            value = {formValues.size} 
            onChange = {change}
          >
            <option value="">----Choose Size----</option>
            {/* Fill out the missing options */}
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
          </select>
        </div>
        {failureMessage.size && <div className='error'>{failureMessage.size}</div>}
      </div>

      <div className="input-group">
        {/* 👇 Maybe you could generate the checkboxes dynamically */}
        
        {toppings.map((top) => (
          <label key = {top.topping_id}> 
            <input 
            name = {top.text} 
            type = "checkbox"
            value = {top.topping_id} 
            onChange = {handlingToppingsChange}
            
            /> 
            {top.text}<br />
            </label>
          ))
        }
          
      </div>
      {/* 👇 Make sure the submit stays disabled until the form validates! */}
      <input type="submit" disabled ={!enabled}/>
    </form>
  )
}
