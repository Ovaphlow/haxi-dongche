import React from 'React'

import Journal01Item from './Journal.01-Item'

export default class Journal01Filter extends React.Component {
  constructor(props) {
    super(props)

    this.state = { list: this.props.list }
    // this.state.list.map(item => console.log(item))

    this.filter = this.filter.bind(this)
  }

  filter() {
    var elDate = document.getElementById('date')
    var elDept = document.getElementById('dept')
    var elUser = document.getElementById('user')
    if (elDate.value === '' && elDept.value === '' && elUser.vaue === '') return false
    axios({
      method: 'POST',
      url: '../api/journal01/filter',
      data: { date: elDate.value, dept: elDept.value, user: elUser.value },
      responseType: 'json'
    }).then(response => {
      if (response.data.status === 200) this.setState({ list: response.data.content })
      else alert(response.data.message)
    })
  }

  render() {
    return (
      <div className="card">
        <div className="card-body row">
          <div className="col-4 form-group">
            <label>日期</label>
            <input type="date" id="date" className="form-control"/>
          </div>
          <div className="col-4 form-group">
            <label>部门</label>
            <input type="text" id="dept" className="form-control"/>
          </div>
          <div className="col-4 form-group">
            <label>用户</label>
            <input type="text" id="user" className="form-control"/>
          </div>
          <div className="clearfix"></div>

          <div className="col-12">
            <button type="button" id="filter" className="btn btn-primary pull-right" onClick={this.filter}>
              <i className="fa fa-search fa-fw"></i> 搜索
            </button>
          </div>
          <div className="clearfix"></div>

          <div className="col-12"><br/></div>

          <div className="col-12">
            <ul className="list-group">
              {this.state.list.map(item =>
                <Journal01Item key={item.id} item={item}/>
              )}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}