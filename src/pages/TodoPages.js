import React from "react"
import {
  FormControl,
  Button
} from 'react-bootstrap'
import Axios from 'axios'
import './style.css'
import { back } from '../Asset/index'

const API = 'http://localhost:2000/activities/'

class TodoPages extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      list: []
    }
  }
  // UNSAFE_componentWillMount() {

  //   alert('ini will mount')
  // }

  componentDidMount() {
    Axios.get(`${API}`)
      .then(res => {
        console.log(res.data)
        this.setState({ list: res.data })
      })
      .catch(error => {
        console.log(error + 'ini eror get list redzone');
      });
  }

  onDelete = (id) => {
    Axios.delete(`${API}${id}`)
      .then(res => {
        Axios.get(`${API}`)
          .then(res => {
            this.setState({ list: res.data })
          })
      })
  }

  onComplete = (id) => {
    Axios.patch(`${API}${id}`, { isCompleted: true })
      .then(res => {
        Axios.get(`${API}`)
          .then(res => {
            this.setState({ list: res.data })
          })
      })
  }

  showData = () => {
    return (
      this.state.list.map((item, index) => {
        return (
          <div className="contain">
            <p> {index + 1}. {item.name}</p>
            <div>
              <Button variant="success" onClick={() => this.onDelete(item.id)} className="me-2 btn">Delete</Button>
              <Button variant="primary" onClick={() => this.onComplete(item.id)} className="btn"
                disabled={item.isCompleted}
              >
                {item.isCompleted ? "Finished" : "Completed"}
              </Button>
            </div>
          </div>
        )
      })

    )
  }

  onAdd = () => {
    let newTodo = this.refs.todo.value

    let obj = {
      name: newTodo,
      isCompleted: false
    }
    Axios.post(`${API}`, obj)
      .then(res => {
        Axios.get(`${API}`)
          .then(res => {
            this.setState({ list: res.data })
          })
      })
    this.refs.todo.value = ''
  }


  render() {
    // alert('ini render')
    console.log(this.state.list);
    return (
      <div className="layer-page">
        <div className="nav"> <h2 style={{ paddingLeft: '2rem',paddingTop:'0.5rem', color:'white' }}>TO DO LIST APP</h2> <h3 style={{ paddingRight: '2rem',paddingTop:'0.5rem',color:'white' }}>You have {this.state.list.length} to do items</h3></div>
        <div className="page">
          <div className="list"><h1>To Do List</h1>
            {this.showData()}
            <div className="input">
              <FormControl
                placeholder="Input New Todo"
                ref="todo"
              />
              <Button variant="info" onClick={this.onAdd} classname="ml-2">Add</Button>
            </div>
          </div>
          <div><img src={back} /></div>
        </div>

      </div>
    )
  }
}

export default TodoPages