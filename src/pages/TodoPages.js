import React from "react"
import {
  Button, FormControl, InputGroup, Table
} from 'react-bootstrap'
import Axios from 'axios'
import './style.css'
import { back } from '../Asset/index'

const API = 'https://api.coinpaprika.com/v1/coins/'

class TodoPages extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [],
      page: 1,
      prodPerPage: 4,
      max: 0
    }
  }


  componentDidMount() {
    Axios.get(`${API}`)
      .then(res => {
        console.log(res.data)
        this.setState({ list: res.data, max: Math.ceil(res.data.length / this.state.prodPerPage) })
      })
      .catch(error => {
        console.log(error + 'ini eror get list redzone');
      });
  }
  onNextPage = () => {
    this.setState({ page: this.state.page + 1 })

  }
  onPrevPage = () => {
    this.setState({ page: this.state.page - 1 })
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
  showData = () => {
    let beginningIndex = (this.state.page - 1) * this.state.prodPerPage
    let currentList = this.state.list.slice(beginningIndex, beginningIndex + this.state.prodPerPage)
    return (
      <Table>
        <thead style={{ backgroundColor: '#3783c6' }}>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>Symbol</th>
            <th>Rank</th>
            <th>Type</th>
            <th>Active</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="contain">
          {currentList.map(item => {
            return (
              <tr>
                <td style={{ color: 'blue' }}>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.symbol}</td>
                <td>{item.rank}</td>
                <td>{item.type}</td>
                <td>{item.is_active}</td>
                <td><div>
                  <Button variant="danger" onClick={() => this.onDelete(item.id)} className="me-2 btn">Delete</Button>
                </div></td>
              </tr>
            )
          })
          }
        </tbody>
      </Table>
    )
  }
  render() {
    return (
      <div className="layer-page">
        <p className="coin">Coin List</p>
        <div className="search">
        <FormControl className="formControl"
            placeholder="select"
          />
          <InputGroup className="mb-3">
          <FormControl className="formControl1"
            placeholder="search"
          />
          <Button className="butn">search</Button>
        </InputGroup>
        </div>
        <div className="page">
          <div className="list">
            {this.showData()}
            <div className='pagination'>
              <Button
                disabled={this.state.page <= 1 ? true : false}
                onClick={this.onPrevPage}
                variant="light"><i class="fad fa-angle-double-left"></i></Button>
              <p style={{ marginBottom: '0px' }}>page {this.state.page} of {this.state.max}</p>
              <Button
                disabled={this.state.page >= this.state.max ? true : false}
                onClick={this.onNextPage}
                variant="light"><i class="fad fa-angle-double-right"></i></Button>
            </div>
          </div>
          {/* <div><img src={back} /></div> */}
        </div>

      </div>
    )
  }
}

export default TodoPages